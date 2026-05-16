import { env } from "./config/env";
import express, { RequestHandler } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

import featureRoutes from "./routes/feature.routes";
import demoRoutes from "./routes/demo.routes";
import { connectDB } from "./config/db";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();
const port = env.PORT;

// Database Connection
connectDB();

// Global Middleware
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
app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP", timestamp: new Date().toISOString() });
});

// Root route
app.get("/", (req, res) => {
  res.send("Blacksof Monorepo API Server v1.0.0");
});

// Global Error Handler (Must be last)
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port} in ${env.NODE_ENV} mode`);
});
