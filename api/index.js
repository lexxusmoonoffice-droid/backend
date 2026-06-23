const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const initHeroSection = require("../utils/initHeroSection");

dotenv.config();

const app = express();

// ⚠️ TEMPORARY: CORS open to every origin so no CORS errors occur in deployment.
// This is INSECURE — restore a restricted allowlist before hardening security.
// Must be registered first so even error responses carry CORS headers.
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Ensure MongoDB is connected before any route runs. In serverless this runs per
// cold start and reuses the cached connection. On failure it forwards a clean
// error (which still has CORS headers) instead of crashing the function.
let heroSeeded = false;
app.use(async (req, res, next) => {
  try {
    await connectDB();
    if (!heroSeeded) {
      heroSeeded = true;
      await initHeroSection();
    }
    next();
  } catch (err) {
    next(err);
  }
});

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
