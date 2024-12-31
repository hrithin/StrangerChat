// src/middleware/errorHandler.js
import AppError from "../utils/AppError.js";

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  // Default to 500 for unexpected errors
  if (!statusCode) statusCode = 500;
  if (!message) message = "Internal Server Error";

  // Log unexpected errors in production
  if (process.env.NODE_ENV === "production" && !(err instanceof AppError)) {
    console.error("UNEXPECTED ERROR:", err);
    message = "Something went wrong!";
    statusCode = 500;
  }

  // Send structured response
  res.status(statusCode).json({
    status: statusCode,
    message,
  });
};

export default errorHandler;
