const { cloudinary } = require("../config/cloudinary");

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    res.json({
      url: req.file.path,
      publicId: req.file.filename,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.listImages = async (req, res) => {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "lexxusmoon",
      max_results: 100,
    });
    const images = (result.resources || [])
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .map((r) => ({ url: r.secure_url, publicId: r.public_id }));
    res.json({ images });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const { publicId } = req.body;
    if (!publicId) {
      return res.status(400).json({ message: "Public ID is required" });
    }
    await cloudinary.uploader.destroy(publicId);
    res.json({ message: "Image deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
