// backend/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { protect } = require("../middleware/auth");

// ✅ Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// ✅ Import controllers
const {
  register,
  login,
  getCurrentUser,
  updateProfile,
  changePassword,
} = require("../controllers/authController");

// ============================================
// ✅ PUBLIC ROUTES
// ============================================

// ✅ Register - POST /api/auth/register
router.post("/register", upload.single("profile_image"), register);

// ✅ Login - POST /api/auth/login
router.post("/login", login);

// ============================================
// ✅ PROTECTED ROUTES (Require Authentication)
// ============================================

// ✅ Get current user - GET /api/auth/me
router.get("/me", protect, getCurrentUser);

// ✅ Update profile - PUT /api/auth/profile
router.put("/profile", protect, upload.single("profile_image"), updateProfile);

// ✅ Change password - PUT /api/auth/password
router.put("/password", protect, changePassword);

// ✅ Logout - POST /api/auth/logout
router.post("/logout", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

module.exports = router;
