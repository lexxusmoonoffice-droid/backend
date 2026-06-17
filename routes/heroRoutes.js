const express = require("express");
const router = express.Router();
const heroController = require("../controllers/heroController");
const auth = require("../middleware/auth");

router.get("/", heroController.getHeroSection);
router.put("/", auth, heroController.updateHeroSection);
router.post("/add-images", auth, heroController.addImagesToHeroSection);
router.post("/remove-image", auth, heroController.removeImageFromHeroSection);

module.exports = router;
