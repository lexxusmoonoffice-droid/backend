const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const initHeroSection = require("./utils/initHeroSection");

dotenv.config();

const app = express();

// Middleware
// ⚠️ TEMPORARY: CORS fully open (allows every origin) so no CORS errors occur in
// deployment. This is INSECURE — restore the restricted allowlist below before
// hardening security for production.
app.use(cors({ origin: true, credentials: true }));
// app.use(cors({
//   origin: [
//     "http://localhost:3000",
//     "http://localhost:3001",
//     "https://lexxusmoon.vercel.app",
//     "https://lexxusmoon-admin.vercel.app",
//   ],
//   credentials: true,
// }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));
app.use("/api/hero", require("./routes/heroRoutes"));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Lexxusmoon API is running" });
});

// Error handler
app.use(require("./middleware/errorHandler"));

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await initHeroSection();
  } catch (err) {
    console.error("Startup DB error:", err.message);
  }
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
