const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

// ✅ Import controllers
const {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  cancelBooking,
  getTransportByDestination,
  getHotelsByDestination,
} = require("../controllers/bookingController");

// ============================================
// ✅ BOOKING ROUTES (Protected)
// ============================================
router.get("/", protect, getBookings); // ← Line 18 - FIXED
router.get("/:id", protect, getBookingById);
router.post("/", protect, createBooking);
router.put("/:id", protect, updateBooking);
router.delete("/:id", protect, cancelBooking);

// ============================================
// ✅ RELATED ROUTES
// ============================================
router.get("/transport/:destinationId", protect, getTransportByDestination);
router.get("/hotels/:destinationId", protect, getHotelsByDestination);

module.exports = router;
