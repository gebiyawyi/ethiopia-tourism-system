const express = require("express");
const router = express.Router();
const { register, login, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/auth");
const { uploadSingle } = require("../config/multer");

// ✅ Register with optional profile image
router.post("/register", uploadSingle, register);

// ✅ Login
router.post("/login", login);

// ✅ Get current user
router.get("/me", protect, getMe);

module.exports = router;
