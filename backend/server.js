// server.js
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
// ✅ CORS CONFIGURATION
// ============================================
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://gebiyawtourism.netlify.app",
      process.env.FRONTEND_URL,
    ].filter(Boolean),
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
  windowMs: 15 * 60 * 1000,
  max: 100,
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
  const connected = await testConnection();
  if (!connected) {
    console.error("❌ Database connection failed - exiting...");
    process.exit(1);
  }
})();

// ============================================
// ✅ ROUTES - CHECK IF FILES EXIST
// ============================================
const fs = require("fs");
const path = require("path");

const routeFiles = [
  { path: "./routes/authRoutes", name: "auth" },
  { path: "./routes/destinationRoutes", name: "destinations" },
  { path: "./routes/hotelRoutes", name: "hotels" },
  { path: "./routes/contactRoutes", name: "contact" },
  { path: "./routes/bookingRoutes", name: "bookings" },
];

routeFiles.forEach((route) => {
  try {
    const fullPath = path.join(__dirname, route.path + ".js");
    if (fs.existsSync(fullPath)) {
      app.use(`/api/${route.name}`, require(fullPath));
      console.log(`✅ Loaded /api/${route.name} routes`);
    } else {
      console.log(`⚠️ Route file not found: ${route.path}`);
    }
  } catch (err) {
    console.log(`⚠️ Error loading ${route.name} routes:`, err.message);
  }
});

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
