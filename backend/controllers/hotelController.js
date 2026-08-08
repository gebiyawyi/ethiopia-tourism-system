const { promisePool } = require("../config/database");

const getHotels = async (req, res) => {
  try {
    const { region, destination, minPrice, maxPrice, rating } = req.query;
    let query = "SELECT * FROM hotels WHERE 1=1";
    const params = [];

    if (region) {
      query += " AND region = ?";
      params.push(region);
    }

    if (destination) {
      query += " AND destination_id = ?";
      params.push(destination);
    }

    if (minPrice) {
      query += " AND price_per_night >= ?";
      params.push(parseFloat(minPrice));
    }

    if (maxPrice) {
      query += " AND price_per_night <= ?";
      params.push(parseFloat(maxPrice));
    }

    if (rating) {
      query += " AND rating >= ?";
      params.push(parseFloat(rating));
    }

    const [rows] = await promisePool.query(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Get hotels error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getHotelById = async (req, res) => {
  try {
    const [rows] = await promisePool.query(
      "SELECT * FROM hotels WHERE id = ?",
      [req.params.id],
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Hotel not found" });
    }

    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error("Get hotel error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { getHotels, getHotelById };
