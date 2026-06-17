const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const initHeroSection = require("../utils/initHeroSection");

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();
initHeroSection();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://lexxusmoon.vercel.app",
    "https://lexxusmoon-admin.vercel.app",
  ],
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", require("../routes/authRoutes"));
app.use("/api/products", require("../routes/productRoutes"));
app.use("/api/blogs", require("../routes/blogRoutes"));
app.use("/api/contacts", require("../routes/contactRoutes"));
app.use("/api/comments", require("../routes/commentRoutes"));
app.use("/api/upload", require("../routes/uploadRoutes"));
app.use("/api/hero", require("../routes/heroRoutes"));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Lexxusmoon API is running" });
});

// Error handler
app.use(require("../middleware/errorHandler"));

module.exports = app;
