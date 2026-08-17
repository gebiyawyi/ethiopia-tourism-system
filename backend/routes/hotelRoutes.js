const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

// ✅ Import controllers
const {
  getHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel,
  getHotelsByDestination,
} = require("../controllers/hotelController");

// ============================================
// ✅ PUBLIC ROUTES
// ============================================
router.get("/", getHotels);
router.get("/:id", getHotelById);
router.get("/destination/:destinationId", getHotelsByDestination);

// ============================================
// ✅ PROTECTED ROUTES (Admin only)
// ============================================
router.post("/", protect, createHotel); // ← Line 23 - NOW FIXED
router.put("/:id", protect, updateHotel);
router.delete("/:id", protect, deleteHotel);

module.exports = router;
