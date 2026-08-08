const { promisePool } = require("../config/database");

const getDestinations = async (req, res) => {
  try {
    const { region, featured, limit } = req.query;
    let query = "SELECT * FROM destinations WHERE 1=1";
    const params = [];

    if (region) {
      query += " AND region = ?";
      params.push(region);
    }

    if (featured === "true") {
      query += " AND is_featured = TRUE";
    }

    if (limit) {
      query += " LIMIT ?";
      params.push(parseInt(limit));
    }

    const [rows] = await promisePool.query(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Get destinations error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getDestinationById = async (req, res) => {
  try {
    const [rows] = await promisePool.query(
      "SELECT * FROM destinations WHERE id = ?",
      [req.params.id],
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Destination not found" });
    }

    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error("Get destination error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { getDestinations, getDestinationById };
