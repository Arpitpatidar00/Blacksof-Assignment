import { env } from "./config/env.js";
import express, { Request, Response, RequestHandler } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

import featureRoutes from "./routes/feature.routes.js";
import demoRoutes from "./routes/demo.routes.js";
import { connectDB } from "./config/db.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();
const port = env.PORT;

// Database Connection
// connectDB();

// Global Middleware
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

app.use(helmet());
app.use(cors());
app.use(compression() as unknown as RequestHandler);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/features", featureRoutes);
app.use("/api/demo", demoRoutes);

// Health check
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "UP", timestamp: new Date().toISOString() });
});

// Root route
app.get("/", (req: Request, res: Response) => {
  res.send("Blacksof Monorepo API Server v1.0.0");
});

// Global Error Handler (Must be last)
app.use(errorMiddleware);

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port} in ${env.NODE_ENV} mode`);
  });
}

export default app;
