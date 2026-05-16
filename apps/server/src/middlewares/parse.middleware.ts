import { RequestHandler } from "express";

export const parseFormMiddleware: RequestHandler = (req, res, next) => {
  if (req.body.features && typeof req.body.features === "string") {
    try {
      req.body.features = JSON.parse(req.body.features);
    } catch (e) {}
  }

  if (req.files) {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    if (files.icon && files.icon[0]) {
      req.body.icon = (
        files.icon[0] as Express.Multer.File & { path: string }
      ).path; // Cloudinary secure URL
    }
    if (files.image && files.image[0]) {
      req.body.image = (
        files.image[0] as Express.Multer.File & { path: string }
      ).path; // Cloudinary secure URL
    }
  }
  next();
};
