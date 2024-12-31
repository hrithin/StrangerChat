
import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import connectDB from "./config/connectDB.js";





// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION! Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});

// Start the server
const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 3000;

    // Create the HTTP server
    const server = http.createServer(app);

    // Initialize socket.io on the HTTP server
    const io = new Server(server, {
      cors: {
        origin: process.env.CLIENT_URL || "*", // Adjust based on your client
        methods: ["GET", "POST"],
      },
    });

    // Handle socket.io connections
    io.on("connection", (socket) => {
      console.log("New WebSocket connection");

      socket.on("message", (message) => {
        console.log("Received message:", message);
      });

      socket.on("disconnect", () => {
        console.log("WebSocket disconnected");
      });
    });

    // Start the server
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Handle unhandled promise rejections
    process.on("unhandledRejection", (err) => {
      console.error("UNHANDLED REJECTION! Shutting down...");
      console.error(err.name, err.message);
      server.close(() => {
        process.exit(1);
      });
    });
  } catch (err) {
    console.error("Failed to start the server:", err.message);
    process.exit(1);
  }
};



startServer();
