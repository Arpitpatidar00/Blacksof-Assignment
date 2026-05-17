import { Router } from "express";
import { FeatureController } from "../controllers/feature.controller.js";
import { featureValidationRules } from "../validations/feature.validation.js";
import { validate } from "../middlewares/validate.middleware.js";
import { upload } from "../config/storage.js";
import { RequestHandler } from "express";
import { parseFormMiddleware } from "../middlewares/parse.middleware.js";

const router = Router();
const controller = new FeatureController();

router.get("/", controller.getAll);

router.get(
  "/:id",
  featureValidationRules.getById,
  validate,
  controller.getById,
);

router.post(
  "/",
  upload.fields([
    { name: "icon", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]) as unknown as RequestHandler,
  parseFormMiddleware,
  featureValidationRules.create,
  validate,
  controller.create,
);

router.put(
  "/:id",
  upload.fields([
    { name: "icon", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]) as unknown as RequestHandler,
  parseFormMiddleware,
  featureValidationRules.update,
  validate,
  controller.update,
);

router.delete(
  "/:id",
  featureValidationRules.getById,
  validate,
  controller.delete,
);

export default router;
