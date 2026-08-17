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

// ✅ Middleware
app.use(helmet());
app.use(compression());

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      process.env.FRONTEND_URL_PROD,
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use("/api/", limiter);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// ✅ Database connection
(async () => {
  await testConnection();
})();

// ============================================
// ✅ ROUTES
// ============================================
console.log("📂 Loading routes...");

// ✅ Auth routes
app.use("/api/auth", require("./routes/authRoutes"));

// ✅ Destination routes
app.use("/api/destinations", require("./routes/destinationRoutes"));

// ✅ Hotel routes
app.use("/api/hotels", require("./routes/hotelRoutes"));

// ✅ Booking routes
app.use("/api/bookings", require("./routes/bookingRoutes"));

// ✅ Optional routes - with error handling
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

// ✅ Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "OK",
    message: "Ethiopia Tourism API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// ✅ Error handler
app.use(errorHandler);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
});

module.exports = app;
