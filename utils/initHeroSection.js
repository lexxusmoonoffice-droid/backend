const HeroSection = require("../models/HeroSection");

const defaultHeroImages = [
  "/web/1.jpg",
  "/web/2.jpg",
  "/web/3.jpg",
  "/web/17.jpg",
  "/web/18.jpg",
  "/web/19.jpg",
];

async function initHeroSection() {
  try {
    const existingHeroSection = await HeroSection.findOne({ isActive: true });

    if (!existingHeroSection) {
      const heroSection = new HeroSection({
        images: defaultHeroImages,
        intervalMs: 5000,
        isActive: true,
      });

      await heroSection.save();
      console.log("✓ Hero section initialized with default images");
    } else {
      console.log("✓ Hero section already exists");
    }
  } catch (error) {
    console.error("Error initializing hero section:", error);
  }
}

module.exports = initHeroSection;
