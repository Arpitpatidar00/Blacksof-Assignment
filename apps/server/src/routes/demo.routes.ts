import { Router } from "express";
import { DemoController } from "../controllers/demo.controller";

const router = Router();
const demoController = new DemoController();

router.post("/", demoController.requestDemo);

export default router;
