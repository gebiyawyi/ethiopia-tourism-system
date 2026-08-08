// ============================================
// 🚀 SERVER
// ============================================

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const compression = require("compression");
const path = require("path");

dotenv.config();

const app = express();

// ============================================
// 🔒 MIDDLEWARE
// ============================================
app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// 📁 STATIC FILES (for uploaded files)
// ============================================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ============================================
// 🗄️ DATABASE CONNECTION
// ============================================
const { testConnection } = require("./config/database");
testConnection();

// ============================================
// 📍 ROUTES
// ============================================
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/destinations", require("./routes/destinationRoutes"));
app.use("/api/hotels", require("./routes/hotelRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// ============================================
// ❤️ HEALTH CHECK
// ============================================
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Ethiopia Tourism API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// ============================================
// ❌ ERROR HANDLER
// ============================================
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ============================================
// 🚀 START SERVER
// ============================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
});
