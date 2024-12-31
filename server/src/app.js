import dotenv from "dotenv";
// Load environment variables
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler.js";
import AppError from "./utils/AppError.js";
import authRoutes from "./routes/authRoutes.js";



const app = express();


// Middleware
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests
app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true })); // Allow cross-origin requests
app.use(helmet()); // Secure headers
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev")); // HTTP request logging
app.use(cookieParser());

// Static file serving
const __dirname = path.resolve(); // Resolve current directory
app.use("/public", express.static(path.join(__dirname, "public"))); // Serve static files from "public"
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files from "uploads"

// Routes
app.use("/v1/auth", authRoutes);

// Handle undefined routes
app.all("*", (req, res, next) => {
  next(new AppError(404, `Cannot find ${req.originalUrl} on this server`));
});

// Global error handler
app.use(errorHandler);

export default app;
