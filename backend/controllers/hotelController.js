const { promisePool } = require("../config/database");

// ============================================
// ✅ GET ALL HOTELS
// ============================================
const getHotels = async (req, res) => {
  try {
    console.log("📝 Fetching all hotels...");
    const [hotels] = await promisePool.query("SELECT * FROM hotels");
    res.json({ success: true, data: hotels });
  } catch (error) {
    console.error("❌ Get hotels error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error fetching hotels" });
  }
};

// ============================================
// ✅ GET HOTEL BY ID
// ============================================
const getHotelById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("📝 Fetching hotel ID:", id);

    const [hotels] = await promisePool.query(
      "SELECT * FROM hotels WHERE id = ?",
      [id],
    );
    if (hotels.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Hotel not found" });
    }
    res.json({ success: true, data: hotels[0] });
  } catch (error) {
    console.error("❌ Get hotel error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error fetching hotel" });
  }
};

// ============================================
// ✅ CREATE HOTEL
// ============================================
const createHotel = async (req, res) => {
  try {
    console.log("📝 Creating hotel...");
    console.log("📝 Request body:", req.body);

    const {
      name,
      description,
      location,
      price,
      rating,
      destination_id,
      image,
    } = req.body;

    // ✅ Validate required fields
    if (!name || !description || !location) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, description and location",
      });
    }

    const [result] = await promisePool.query(
      `INSERT INTO hotels (name, description, location, price, rating, destination_id, image) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        description,
        location,
        price || 0,
        rating || 0,
        destination_id || null,
        image || null,
      ],
    );

    console.log("✅ Hotel created with ID:", result.insertId);

    res.status(201).json({
      success: true,
      message: "Hotel created successfully",
      data: {
        id: result.insertId,
        name,
        description,
        location,
        price,
        rating,
        destination_id,
        image,
      },
    });
  } catch (error) {
    console.error("❌ Create hotel error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error creating hotel" });
  }
};

// ============================================
// ✅ UPDATE HOTEL
// ============================================
const updateHotel = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("📝 Updating hotel ID:", id);
    console.log("📝 Request body:", req.body);

    const {
      name,
      description,
      location,
      price,
      rating,
      destination_id,
      image,
    } = req.body;

    // ✅ Check if hotel exists
    const [existing] = await promisePool.query(
      "SELECT id FROM hotels WHERE id = ?",
      [id],
    );
    if (existing.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Hotel not found" });
    }

    await promisePool.query(
      `UPDATE hotels SET 
        name = ?, 
        description = ?, 
        location = ?, 
        price = ?, 
        rating = ?, 
        destination_id = ?,
        image = ?
       WHERE id = ?`,
      [name, description, location, price, rating, destination_id, image, id],
    );

    console.log("✅ Hotel updated:", id);

    res.json({ success: true, message: "Hotel updated successfully" });
  } catch (error) {
    console.error("❌ Update hotel error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error updating hotel" });
  }
};

// ============================================
// ✅ DELETE HOTEL
// ============================================
const deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("📝 Deleting hotel ID:", id);

    // ✅ Check if hotel exists
    const [existing] = await promisePool.query(
      "SELECT id FROM hotels WHERE id = ?",
      [id],
    );
    if (existing.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Hotel not found" });
    }

    await promisePool.query("DELETE FROM hotels WHERE id = ?", [id]);

    console.log("✅ Hotel deleted:", id);

    res.json({ success: true, message: "Hotel deleted successfully" });
  } catch (error) {
    console.error("❌ Delete hotel error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error deleting hotel" });
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
    console.error("❌ Get hotels by destination error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ============================================
// ✅ EXPORT ALL CONTROLLERS - IMPORTANT!
// ============================================
module.exports = {
  getHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel,
  getHotelsByDestination,
};
