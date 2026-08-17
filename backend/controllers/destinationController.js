const { promisePool } = require("../config/database");

// Get all destinations
const getDestinations = async (req, res) => {
  try {
    const [destinations] = await promisePool.query(
      "SELECT * FROM destinations",
    );
    res.json({ success: true, data: destinations });
  } catch (error) {
    console.error("❌ Get destinations error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get destination by ID
const getDestinationById = async (req, res) => {
  try {
    const { id } = req.params;
    const [destinations] = await promisePool.query(
      "SELECT * FROM destinations WHERE id = ?",
      [id],
    );
    if (destinations.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Destination not found" });
    }
    res.json({ success: true, data: destinations[0] });
  } catch (error) {
    console.error("❌ Get destination error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Create destination (Admin only)
const createDestination = async (req, res) => {
  try {
    const { name, description, region, price } = req.body;
    const [result] = await promisePool.query(
      "INSERT INTO destinations (name, description, region, price) VALUES (?, ?, ?, ?)",
      [name, description, region, price],
    );
    res
      .status(201)
      .json({ success: true, data: { id: result.insertId, ...req.body } });
  } catch (error) {
    console.error("❌ Create destination error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update destination (Admin only)
const updateDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, region, price } = req.body;
    await promisePool.query(
      "UPDATE destinations SET name = ?, description = ?, region = ?, price = ? WHERE id = ?",
      [name, description, region, price, id],
    );
    res.json({ success: true, message: "Destination updated" });
  } catch (error) {
    console.error("❌ Update destination error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete destination (Admin only)
const deleteDestination = async (req, res) => {
  try {
    const { id } = req.params;
    await promisePool.query("DELETE FROM destinations WHERE id = ?", [id]);
    res.json({ success: true, message: "Destination deleted" });
  } catch (error) {
    console.error("❌ Delete destination error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  getDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
};
