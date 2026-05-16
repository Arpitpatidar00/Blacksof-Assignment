import mongoose, { Schema, Document } from "mongoose";
import { FeatureCard } from "@blacksof/types";

export interface IFeatureCard extends Omit<FeatureCard, "id">, Document {}

const FeatureCardSchema: Schema = new Schema(
  {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    heading: { type: String, required: true },
    description: { type: String, required: true },
    features: [{ type: String }],
    image: { type: String, required: true },
    cta: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc: Record<string, unknown>, ret: Record<string, unknown>) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export default mongoose.model<IFeatureCard>("FeatureCard", FeatureCardSchema);
