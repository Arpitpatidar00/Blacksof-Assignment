import { FeatureCard } from "@blacksof/types";
import FeatureModel from "../models/feature.model.js";
import { cloudinary } from "../config/storage.js";

export class FeatureBackendService {
  private async deleteFileFromUrl(url: string) {
    if (!url) return;
    
    try {
      // Cloudinary URL format: https://res.cloudinary.com/<cloud_name>/image/upload/v<version>/<folder>/<filename>.<ext>
      // We need to extract <folder>/<filename> (which is the public_id)
      
      // Basic check to see if it's a Cloudinary URL
      if (!url.includes("cloudinary.com")) return;

      const urlParts = url.split("/");
      // The public_id usually starts after the 'upload/' segment, and may or may not have a 'v1234567/' version segment.
      const uploadIndex = urlParts.findIndex(part => part === "upload");
      if (uploadIndex === -1) return;

      let idParts = urlParts.slice(uploadIndex + 1);
      
      // If the first part after 'upload' starts with 'v' and is a number, it's a version tag, so skip it
      if (idParts[0].startsWith("v") && !isNaN(parseInt(idParts[0].substring(1)))) {
        idParts = idParts.slice(1);
      }

      // Join the remaining parts back, and remove the file extension
      let publicId = idParts.join("/");
      const lastDotIndex = publicId.lastIndexOf(".");
      if (lastDotIndex !== -1) {
        publicId = publicId.substring(0, lastDotIndex);
      }

      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    } catch (error) {
      console.error("Failed to delete file from Cloudinary:", error);
    }
  }
  async findAll() {
    return await FeatureModel.find().sort({ order: 1 });
  }

  async count() {
    return await FeatureModel.countDocuments();
  }

  async findById(id: string) {
    return await FeatureModel.findById(id);
  }

  async create(data: Omit<FeatureCard, "id">) {
    const feature = new FeatureModel(data);
    return await feature.save();
  }

  async update(id: string, data: Partial<FeatureCard>) {
    const existingFeature = await FeatureModel.findById(id);
    if (!existingFeature) return null;

    // Delete old image if a new one is provided
    if (data.image && data.image !== existingFeature.image) {
      await this.deleteFileFromUrl(existingFeature.image);
    }
    // Delete old icon if a new one is provided
    if (data.icon && data.icon !== existingFeature.icon) {
      await this.deleteFileFromUrl(existingFeature.icon);
    }

    return await FeatureModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    const feature = await FeatureModel.findById(id);
    if (feature) {
      await this.deleteFileFromUrl(feature.image);
      await this.deleteFileFromUrl(feature.icon);
    }
    return await FeatureModel.findByIdAndDelete(id);
  }
}
