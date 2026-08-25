// backend/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { protect } = require("../middleware/auth");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const {
  register,
  login,
  getCurrentUser,
  updateProfile,
  changePassword,
} = require("../controllers/authController");

// Public routes
router.post("/register", upload.single("profile_image"), register);
router.post("/login", login);

// Protected routes
router.get("/me", protect, getCurrentUser);
router.put("/profile", protect, upload.single("profile_image"), updateProfile);
router.put("/password", protect, changePassword);
router.post("/logout", protect, (req, res) => {
  res.status(200).json({ success: true, message: "Logged out successfully" });
});

module.exports = router;
