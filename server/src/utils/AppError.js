class AppError extends Error {
    constructor(statusCode, message) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = true; // Operational errors vs programming errors
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
export default AppError;
  