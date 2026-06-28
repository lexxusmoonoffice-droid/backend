const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { login, verify, seed, changePassword } = require("../controllers/authController");

router.post("/login", login);
router.get("/verify", auth, verify);
router.post("/seed", seed);
router.post("/change-password", auth, changePassword);

module.exports = router;
