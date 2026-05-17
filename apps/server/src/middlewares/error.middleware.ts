import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors.js";
import { HttpStatus } from "../utils/responseHandler.js";
import { cloudinary } from "../config/storage.js";

// Helper to safely extract public_id and delete from Cloudinary
const cleanupFailedUploads = async (req: Request) => {
  try {
    const filesToDelete: Express.Multer.File[] = [];
    if (req.file) filesToDelete.push(req.file);
    if (req.files) {
      if (Array.isArray(req.files)) {
        filesToDelete.push(...req.files);
      } else {
        Object.values(req.files).forEach((files) => {
          filesToDelete.push(...(files as Express.Multer.File[]));
        });
      }
    }

    for (const file of filesToDelete) {
      // multer-storage-cloudinary attaches 'filename' which is actually the public_id
      if (file.filename) {
        await cloudinary.uploader.destroy(file.filename).catch(() => {});
      }
    }
  } catch (e) {
    console.error("Failed to clean up Cloudinary uploads:", e);
  }
};

export const errorMiddleware = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // If an error occurred and files were uploaded, clean them up
  await cleanupFailedUploads(req);
  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    err = new AppError("Invalid resource ID format", HttpStatus.BAD_REQUEST);
  }

  // Mongoose duplicate key
  if (err.code === 11000 && err.keyValue) {
    const field = Object.keys(err.keyValue).join(", ");
    err = new AppError(`Duplicate value for field: ${field}`, HttpStatus.BAD_REQUEST);
  }

  // Mongoose validation error
  if (err.name === "ValidationError" && err.errors) {
    const messages = Object.values(err.errors as Record<string, { message: string }>).map((e) => e.message);
    err = new AppError("Validation Failed", HttpStatus.BAD_REQUEST, true, messages) as any;
  }

  const statusCode = err.statusCode || 500;
  const isDev = process.env.NODE_ENV === "development";

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(err.errors?.length && { errors: err.errors }),
    ...(isDev && { stack: err.stack }),
  });
};
