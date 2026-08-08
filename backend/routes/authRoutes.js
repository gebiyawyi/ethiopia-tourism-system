// ============================================
// 🔐 AUTH ROUTES
// ============================================

const express = require("express");
const router = express.Router();
const { register, login, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/auth");
const { uploadSingle } = require("../config/multer"); // ✅ Import multer

// ============================================
// 📝 REGISTER - With optional profile image
// ============================================
// uploadSingle handles the file upload
// The field name must be 'profile_image' (matches frontend)
// ============================================

router.post("/register", uploadSingle, register);

// ============================================
// 🔑 LOGIN
// ============================================
router.post("/login", login);

// ============================================
// 👤 GET CURRENT USER
// ============================================
router.get("/me", protect, getMe);

module.exports = router;
