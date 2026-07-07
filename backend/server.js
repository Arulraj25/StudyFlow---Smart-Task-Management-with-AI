// server.js - Entry point for the StudyFlow backend
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

// --- Environment Variables ---
const {
  PORT = 5000,
  NODE_ENV = "development",
  FRONTEND_URL = "http://localhost:8081",
  JWT_SECRET
} = process.env;

// --- Validate required env vars ---
if (!JWT_SECRET) {
  console.error("❌ JWT_SECRET is not defined in environment variables");
  process.exit(1);
}

console.log(`🚀 Starting in ${NODE_ENV} mode`);

// --- Middleware ---
app.use(cors({
  origin: [FRONTEND_URL, 'http://localhost:8081', 'http://localhost:8080'],
  credentials: true,
}));
app.use(express.json());

// --- Connect to MongoDB ---
connectDB();

// --- Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/ai", aiRoutes);

// --- Health Check ---
app.get("/health", (req, res) => {
  const mongoose = require("mongoose");
  const mongoStatus = mongoose.connection.readyState;
  const statusMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    mongodb: statusMap[mongoStatus] || 'unknown',
    mongodbReadyState: mongoStatus,
    environment: NODE_ENV,
    service: 'backend'
  });
});

// --- Root Route ---
app.get("/", (req, res) => {
  res.json({ 
    message: "StudyFlow API is running 🚀",
    version: "1.0.0",
    environment: NODE_ENV
  });
});

// --- Global error handler ---
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({ 
    message: "Something went wrong on the server",
    error: NODE_ENV === "development" ? err.message : undefined
  });
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 Environment: ${NODE_ENV}`);
});
