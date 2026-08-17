const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

// ✅ Sample controller functions (replace with actual imports)
const {
  getDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
} = require("../controllers/destinationController");

// ============================================
// ✅ PUBLIC ROUTES
// ============================================
router.get("/", getDestinations);
router.get("/:id", getDestinationById);

// ============================================
// ✅ PROTECTED ROUTES (Admin only)
// ============================================
router.post("/", protect, createDestination);
router.put("/:id", protect, updateDestination);
router.delete("/:id", protect, deleteDestination);

module.exports = router; // ✅ IMPORTANT
