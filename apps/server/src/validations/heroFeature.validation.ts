import { body, param } from "express-validator";

export const heroFeatureValidationRules = {
  create: [
    body("title").notEmpty().withMessage("Title is required").isString(),
    body("description").notEmpty().withMessage("Description is required"),
    body("order").optional().isNumeric().withMessage("Order must be a number"),
  ],
  update: [
    param("id").isMongoId().withMessage("Invalid hero feature ID format"),
    body("title").optional().isString(),
    body("description").optional().isString(),
    body("order").optional().isNumeric(),
  ],
  getById: [
    param("id").isMongoId().withMessage("Invalid hero feature ID format"),
  ],
};
