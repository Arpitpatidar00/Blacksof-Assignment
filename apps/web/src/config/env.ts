import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().default("/api"),
});

// For client-side envs, we can't use process.exit(1) in the browser,
// but we can log a big error.
const _env = envSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "/api",
});

if (!_env.success) {
  console.error("❌ Invalid Client Environment Variables:", _env.error.format());
}

export const env = _env.success 
  ? _env.data 
  : { NEXT_PUBLIC_API_URL: "http://localhost:8000/api" };
