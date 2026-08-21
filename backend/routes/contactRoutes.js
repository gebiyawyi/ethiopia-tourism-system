const express = require("express");
const router = express.Router();
const {
  sendContactEmail,
  testEmail,
} = require("../controllers/contactController");

// ✅ POST /api/contact - Send contact message
router.post("/", sendContactEmail);

// ✅ GET /api/contact/test - Test email configuration
router.get("/test", testEmail);

module.exports = router;
