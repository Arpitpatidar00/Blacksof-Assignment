import { Router } from "express";
import { DemoController } from "../controllers/demo.controller.js";

const router = Router();
const demoController = new DemoController();

router.post("/", demoController.requestDemo);

export default router;
