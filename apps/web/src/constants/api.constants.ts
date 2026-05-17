import { env } from "../config/env";

export const API = {
  BASE_URL: env.NEXT_PUBLIC_API_URL,
  ENDPOINTS: {
    FEATURES: "/features",
    DEMO: "/demo",
    HEALTH: "/health",
  },
  LIMITS: {
    MAX_FEATURE_CARDS: 10,
    MAX_IMAGE_SIZE_MB: 10,
    MAX_ICON_SIZE_MB: 5,
  },
} as const;
