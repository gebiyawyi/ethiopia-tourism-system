const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

// ============================================
// CREATE CONNECTION POOL
// ============================================
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "tourism_db",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// ============================================
// PROMISE WRAPPER
// ============================================
const promisePool = pool.promise();

// ============================================
// ✅ TEST CONNECTION FUNCTION
// ============================================
const testConnection = async () => {
  try {
    const connection = await promisePool.getConnection();
    console.log("✅ MySQL Database connected successfully");
    connection.release();
    return true;
  } catch (error) {
    console.error("❌ MySQL connection failed:", error.message);
    console.error("Please check:");
    console.error("  1. Is MySQL running?");
    console.error("  2. Are the credentials in .env correct?");
    console.error('  3. Does the database "tourism_db" exist?');
    return false;
  }
};

// ============================================
// ✅ EXPORT ALL FUNCTIONS
// ============================================
module.exports = {
  pool,
  promisePool,
  testConnection, // ← Make sure this is exported!
};
