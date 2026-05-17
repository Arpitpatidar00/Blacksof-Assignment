export const ERRORS = {
  GENERIC: "Something went wrong. Please try again.",
  NETWORK: "Unable to connect to server. Check your connection.",
  VALIDATION: {
    NAME_MIN: "Name must be at least 2 characters.",
    EMAIL_INVALID: "Please enter a valid email address.",
    COMPANY_REQUIRED: "Company name is required.",
    TITLE_MIN: "Title must be at least 2 characters.",
    HEADING_REQUIRED: "Heading is required.",
    DESCRIPTION_MIN: "Description must be at least 10 characters.",
    ICON_REQUIRED: "Icon is required.",
    IMAGE_REQUIRED: "Image is required.",
    CTA_REQUIRED: "CTA text is required.",
    FEATURES_REQUIRED: "Enter at least one feature (one per line).",
  },
  FILE: {
    ICON_TOO_LARGE: "Icon must be less than 5MB.",
    IMAGE_TOO_LARGE: "Image must be less than 10MB.",
  },
} as const;
