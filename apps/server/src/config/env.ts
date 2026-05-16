import dotenv from "dotenv";
dotenv.config();

import { z } from "zod";

const envSchema = z.object({
  // Server
  PORT: z.string().default("8000"),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  // Database
  MONGODB_URI: z.string().url("MONGODB_URI must be a valid connection string"),

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: z.string().min(1, "Cloudinary Cloud Name is required"),
  CLOUDINARY_API_KEY: z.string().min(1, "Cloudinary API Key is required"),
  CLOUDINARY_API_SECRET: z.string().min(1, "Cloudinary API Secret is required"),

  // Email
  ADMIN_EMAIL: z.string().email("ADMIN_EMAIL must be a valid email"),
  SMTP_HOST: z.string().min(1, "SMTP Host is required"),
  SMTP_PORT: z.string().default("587"),
  SMTP_SECURE: z.string().transform((val) => val === "true"),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

const formatErrors = (errors: z.ZodError) => {
  return errors.issues
    .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
    .join("\n");
};

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("\n❌ Invalid environment variables:\n");
  console.error(formatErrors(_env.error));
  console.error(
    "\nCheck your .env file or deployment environment variables.\n",
  );
  process.exit(1);
}

export const env = _env.data;
