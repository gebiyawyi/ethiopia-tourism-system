const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  updateProfile,
  changePassword,
  getUserProfile,
} = require("../controllers/userController");

// ✅ Get user profile
router.get("/profile", protect, getUserProfile);

// ✅ Update profile (includes username)
router.put("/profile", protect, updateProfile);

// ✅ Change password
router.put("/password", protect, changePassword);

module.exports = router;
