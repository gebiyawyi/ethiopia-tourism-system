const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

dotenv.config();

const { testConnection } = require("./config/database");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// ============================================
// ✅ SECURITY MIDDLEWARE
// ============================================
app.use(helmet());
app.use(compression());

// ============================================
// ✅ CORS CONFIGURATION (UPDATED)
// ============================================
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://gebiyawtourism.netlify.app",
      process.env.FRONTEND_URL,
      process.env.FRONTEND_URL_PROD,
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
  }),
);

// ============================================
// ✅ RATE LIMITING
// ============================================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use("/api/", limiter);

// ============================================
// ✅ BODY PARSERS
// ============================================
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// ============================================
// ✅ DATABASE CONNECTION
// ============================================
(async () => {
  await testConnection();
})();

// ============================================
// ✅ LOG ROUTES LOADING
// ============================================
console.log("📂 Loading routes...");

// ============================================
// ✅ ROUTES
// ============================================

// ✅ Auth routes - REGISTRATION & LOGIN
app.use("/api/auth", require("./routes/authRoutes"));

// ✅ Destination routes
app.use("/api/destinations", require("./routes/destinationRoutes"));

// ✅ Hotel routes
app.use("/api/hotels", require("./routes/hotelRoutes"));

// ✅ Contact routes
app.use("/api/contact", require("./routes/contactRoutes"));

// ✅ Booking routes
app.use("/api/bookings", require("./routes/bookingRoutes"));

// ✅ Optional routes - with error handling (prevents crashes if files don't exist)
try {
  app.use("/api/reviews", require("./routes/reviewRoutes"));
} catch (err) {
  console.log("⚠️ reviewRoutes not found, skipping...");
}

try {
  app.use("/api/transport", require("./routes/transportRoutes"));
} catch (err) {
  console.log("⚠️ transportRoutes not found, skipping...");
}

try {
  app.use("/api/users", require("./routes/userRoutes"));
} catch (err) {
  console.log("⚠️ userRoutes not found, skipping...");
}

try {
  app.use("/api/upload", require("./routes/uploadRoutes"));
} catch (err) {
  console.log("⚠️ uploadRoutes not found, skipping...");
}

try {
  app.use("/api/admin", require("./routes/adminRoutes"));
} catch (err) {
  console.log("⚠️ adminRoutes not found, skipping...");
}

console.log("✅ All routes loaded");

// ============================================
// ✅ HEALTH CHECK
// ============================================
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "OK",
    message: "Ethiopia Tourism API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// ============================================
// ✅ ERROR HANDLER
// ============================================
app.use(errorHandler);

// ============================================
// ✅ START SERVER
// ============================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔗 API URL: http://localhost:${PORT}/api`);
});

module.exports = app;
