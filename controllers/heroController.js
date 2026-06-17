const HeroSection = require("../models/HeroSection");

exports.getHeroSection = async (req, res) => {
  try {
    let heroSection = await HeroSection.findOne({ isActive: true });
    if (!heroSection) {
      return res.status(404).json({ message: "Hero section not found" });
    }
    res.json(heroSection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateHeroSection = async (req, res) => {
  try {
    const { images, intervalMs } = req.body;

    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ message: "Images array is required and must not be empty" });
    }

    let heroSection = await HeroSection.findOne({ isActive: true });

    if (!heroSection) {
      heroSection = new HeroSection({
        images,
        intervalMs: intervalMs || 5000,
        isActive: true,
      });
    } else {
      heroSection.images = images;
      if (intervalMs) heroSection.intervalMs = intervalMs;
    }

    await heroSection.save();
    res.json(heroSection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.addImagesToHeroSection = async (req, res) => {
  try {
    const { images, mobileImages } = req.body;

    if ((!images || !Array.isArray(images) || images.length === 0) &&
        (!mobileImages || !Array.isArray(mobileImages) || mobileImages.length === 0)) {
      return res.status(400).json({ message: "Images array is required" });
    }

    let heroSection = await HeroSection.findOne({ isActive: true });

    if (!heroSection) {
      heroSection = new HeroSection({
        images: images || [],
        mobileImages: mobileImages || [],
        isActive: true,
      });
    } else {
      if (images && Array.isArray(images)) {
        heroSection.images.push(...images);
      }
      if (mobileImages && Array.isArray(mobileImages)) {
        if (!heroSection.mobileImages) heroSection.mobileImages = [];
        heroSection.mobileImages.push(...mobileImages);
      }
    }

    await heroSection.save();
    res.json(heroSection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.removeImageFromHeroSection = async (req, res) => {
  try {
    const { imageUrl, imageType } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ message: "Image URL is required" });
    }

    const heroSection = await HeroSection.findOne({ isActive: true });
    if (!heroSection) {
      return res.status(404).json({ message: "Hero section not found" });
    }

    if (imageType === "mobileImages") {
      heroSection.mobileImages = (heroSection.mobileImages || []).filter(img => img !== imageUrl);
    } else {
      heroSection.images = heroSection.images.filter(img => img !== imageUrl);
    }

    await heroSection.save();
    res.json(heroSection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
