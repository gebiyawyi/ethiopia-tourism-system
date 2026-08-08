const express = require("express");
const router = express.Router();
const {
  getBookings,
  createBooking,
  cancelBooking,
} = require("../controllers/bookingController");
const { protect } = require("../middleware/auth");

router.get("/", protect, getBookings);
router.post("/", protect, createBooking);
router.put("/:id/cancel", protect, cancelBooking);

module.exports = router; // ✅ MUST HAVE THIS
