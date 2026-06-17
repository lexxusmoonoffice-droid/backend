const mongoose = require("mongoose");

const heroSectionSchema = new mongoose.Schema(
  {
    images: [{ type: String, required: true }],
    mobileImages: [{ type: String }],
    intervalMs: { type: Number, default: 5000 },
    mobileIntervalMs: { type: Number },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HeroSection", heroSectionSchema);
