import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import routes from "./routes/index.js";
import { notFound, errorHandler } from "./middleware/error.js";

const app = express();

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(
  cors({
    origin: (process.env.CLIENT_URL || "http://localhost:5173").split(",").map((s) => s.trim()),
  })
);
app.use(express.json({ limit: "100kb" }));
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

// Slow down brute-force attempts on login/register
app.use("/api/auth", rateLimit({ windowMs: 15 * 60 * 1000, limit: 50, standardHeaders: true, legacyHeaders: false }));

app.use("/api", routes);
app.use(notFound);
app.use(errorHandler);

export default app;
