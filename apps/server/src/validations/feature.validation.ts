import { body, param } from "express-validator";

export const featureValidationRules = {
  create: [
    body("title")
      .notEmpty().withMessage("Title is required")
      .isString().withMessage("Title must be a string"),
    body("heading")
      .notEmpty().withMessage("Heading is required"),
    body("description")
      .notEmpty().withMessage("Description is required"),
    body("icon")
      .notEmpty().withMessage("Icon path is required"),
    body("image")
      .notEmpty().withMessage("Image path is required"),
    body("features")
      .isArray({ min: 1 }).withMessage("At least one feature is required"),
    body("cta")
      .notEmpty().withMessage("CTA text is required"),
  ],
  update: [
    param("id").isMongoId().withMessage("Invalid feature ID format"),
    body("title").optional().isString(),
    body("features").optional().isArray(),
    body("order").optional().isNumeric(),
  ],
  getById: [
    param("id").isMongoId().withMessage("Invalid feature ID format"),
  ],
};
