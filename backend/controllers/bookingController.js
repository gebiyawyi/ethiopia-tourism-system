const { promisePool } = require("../config/database");

// ============================================
// ✅ GET ALL BOOKINGS FOR USER
// ============================================
const getBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("📝 Fetching bookings for user:", userId);

    const [bookings] = await promisePool.query(
      `SELECT b.*, d.name as destination_name 
       FROM bookings b 
       LEFT JOIN destinations d ON b.destination_id = d.id 
       WHERE b.user_id = ? 
       ORDER BY b.created_at DESC`,
      [userId],
    );

    res.json({ success: true, data: bookings });
  } catch (error) {
    console.error("❌ Get bookings error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error fetching bookings" });
  }
};

// ============================================
// ✅ GET BOOKING BY ID
// ============================================
const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    console.log("📝 Fetching booking ID:", id, "for user:", userId);

    const [bookings] = await promisePool.query(
      `SELECT b.*, d.name as destination_name 
       FROM bookings b 
       LEFT JOIN destinations d ON b.destination_id = d.id 
       WHERE b.id = ? AND b.user_id = ?`,
      [id, userId],
    );

    if (bookings.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }
    res.json({ success: true, data: bookings[0] });
  } catch (error) {
    console.error("❌ Get booking error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error fetching booking" });
  }
};

// ============================================
// ✅ CREATE BOOKING
// ============================================
const createBooking = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("📝 Creating booking for user:", userId);
    console.log("📝 Request body:", req.body);

    const {
      destination_id,
      travel_date,
      return_date,
      guests,
      special_requests,
    } = req.body;

    // ✅ Validate required fields
    if (!destination_id || !travel_date) {
      return res.status(400).json({
        success: false,
        message: "Please provide destination_id and travel_date",
      });
    }

    // ✅ Generate booking reference
    const bookingReference = `TRIP-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const [result] = await promisePool.query(
      `INSERT INTO bookings 
        (user_id, destination_id, booking_reference, travel_date, return_date, guests, special_requests, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        destination_id,
        bookingReference,
        travel_date,
        return_date || null,
        guests || 1,
        special_requests || null,
        "pending",
      ],
    );

    console.log("✅ Booking created with ID:", result.insertId);

    const [newBooking] = await promisePool.query(
      `SELECT b.*, d.name as destination_name 
       FROM bookings b 
       LEFT JOIN destinations d ON b.destination_id = d.id 
       WHERE b.id = ?`,
      [result.insertId],
    );

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: newBooking[0],
    });
  } catch (error) {
    console.error("❌ Create booking error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error creating booking" });
  }
};

// ============================================
// ✅ UPDATE BOOKING
// ============================================
const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    console.log("📝 Updating booking ID:", id, "for user:", userId);
    console.log("📝 Request body:", req.body);

    const { travel_date, return_date, guests, special_requests } = req.body;

    // ✅ Check if booking exists and belongs to user
    const [existing] = await promisePool.query(
      "SELECT id FROM bookings WHERE id = ? AND user_id = ?",
      [id, userId],
    );

    if (existing.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    await promisePool.query(
      `UPDATE bookings SET 
        travel_date = ?, 
        return_date = ?, 
        guests = ?, 
        special_requests = ? 
       WHERE id = ?`,
      [travel_date, return_date, guests, special_requests, id],
    );

    console.log("✅ Booking updated:", id);

    res.json({ success: true, message: "Booking updated successfully" });
  } catch (error) {
    console.error("❌ Update booking error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error updating booking" });
  }
};

// ============================================
// ✅ CANCEL BOOKING
// ============================================
const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    console.log("📝 Cancelling booking ID:", id, "for user:", userId);

    // ✅ Check if booking exists and belongs to user
    const [existing] = await promisePool.query(
      "SELECT id FROM bookings WHERE id = ? AND user_id = ?",
      [id, userId],
    );

    if (existing.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    await promisePool.query(`UPDATE bookings SET status = ? WHERE id = ?`, [
      "cancelled",
      id,
    ]);

    console.log("✅ Booking cancelled:", id);

    res.json({ success: true, message: "Booking cancelled successfully" });
  } catch (error) {
    console.error("❌ Cancel booking error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error cancelling booking" });
  }
};

// ============================================
// ✅ GET TRANSPORT BY DESTINATION
// ============================================
const getTransportByDestination = async (req, res) => {
  try {
    const { destinationId } = req.params;
    console.log("📝 Fetching transport for destination:", destinationId);

    const [transport] = await promisePool.query(
      "SELECT * FROM transport WHERE destination_id = ?",
      [destinationId],
    );

    res.json({ success: true, data: transport });
  } catch (error) {
    console.error("❌ Get transport error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error fetching transport" });
  }
};

// ============================================
// ✅ GET HOTELS BY DESTINATION
// ============================================
const getHotelsByDestination = async (req, res) => {
  try {
    const { destinationId } = req.params;
    console.log("📝 Fetching hotels for destination:", destinationId);

    const [hotels] = await promisePool.query(
      "SELECT * FROM hotels WHERE destination_id = ?",
      [destinationId],
    );

    res.json({ success: true, data: hotels });
  } catch (error) {
    console.error("❌ Get hotels error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error fetching hotels" });
  }
};

// ============================================
// ✅ EXPORT ALL CONTROLLERS - IMPORTANT!
// ============================================
module.exports = {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  cancelBooking,
  getTransportByDestination,
  getHotelsByDestination,
};
