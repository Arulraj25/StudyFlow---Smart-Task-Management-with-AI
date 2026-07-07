// db.js - Handles connection to MongoDB using Mongoose
const mongoose = require("mongoose");

const connectDB = async (retries = 5) => {
  try {
    const mongoURI = process.env.MONGO_URI;
    
    if (!mongoURI) {
      console.error("❌ MONGO_URI is not defined in environment variables");
      process.exit(1);
    }

    console.log(`🔗 Connecting to MongoDB (${retries} retries left)...`);
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    
    console.log("✅ MongoDB connected successfully");
    return true;
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    
    if (retries > 0) {
      console.log(`⏳ Retrying in 5 seconds... (${retries - 1} retries left)`);
      setTimeout(() => connectDB(retries - 1), 5000);
    } else {
      console.error("❌ All retries exhausted. Exiting...");
      process.exit(1);
    }
  }
};

module.exports = connectDB;
