import mongoose from "mongoose";
import { env } from "./env.js";

const MONGODB_URI = env.MONGODB_URI;

// Cache the connection state
let isConnected = false;

export const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("=> Using existing database connection");
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI);
    isConnected = db.connections[0].readyState === 1;
    console.log("MongoDB Connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    // Don't exit the process in serverless, just throw so Vercel can retry
    throw error;
  }
};
