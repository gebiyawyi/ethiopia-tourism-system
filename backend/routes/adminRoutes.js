const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/auth");

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard stats
// @access  Private/Admin
router.get("/dashboard", protect, admin, (req, res) => {
  res.json({
    success: true,
    data: {
      totalUsers: 234,
      totalBookings: 156,
      totalDestinations: 22,
      totalHotels: 45,
    },
  });
});

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get("/users", protect, admin, (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, name: "John Doe", email: "john@example.com", role: "user" },
      { id: 2, name: "Admin User", email: "admin@example.com", role: "admin" },
    ],
  });
});

// @route   GET /api/admin/bookings
// @desc    Get all bookings
// @access  Private/Admin
router.get("/bookings", protect, admin, (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, user: "John Doe", destination: "Lalibela", status: "confirmed" },
      { id: 2, user: "Sarah Smith", destination: "Simien", status: "pending" },
    ],
  });
});

module.exports = router;
