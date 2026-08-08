const { promisePool } = require("../config/database");

const getBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await promisePool.query(
      "SELECT * FROM bookings WHERE user_id = ? ORDER BY created_at DESC",
      [userId],
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Get bookings error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const createBooking = async (req, res) => {
  try {
    const {
      booking_type,
      destination_id,
      hotel_id,
      start_date,
      end_date,
      number_of_guests,
    } = req.body;

    const [result] = await promisePool.query(
      `INSERT INTO bookings 
       (user_id, booking_type, destination_id, hotel_id,
        start_date, end_date, number_of_guests)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        req.user.id,
        booking_type,
        destination_id || null,
        hotel_id || null,
        start_date,
        end_date,
        number_of_guests || 1,
      ],
    );

    const [newBooking] = await promisePool.query(
      "SELECT * FROM bookings WHERE id = ?",
      [result.insertId],
    );

    res.status(201).json({ success: true, data: newBooking[0] });
  } catch (error) {
    console.error("Create booking error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const [result] = await promisePool.query(
      'UPDATE bookings SET status = "cancelled" WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id],
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    res.json({ success: true, message: "Booking cancelled successfully" });
  } catch (error) {
    console.error("Cancel booking error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { getBookings, createBooking, cancelBooking };
