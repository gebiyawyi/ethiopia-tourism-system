const express = require("express");
const router = express.Router();
const {
  sendContactEmail,
  testEmail,
} = require("../controllers/contactController");

// 👇 Your POST route for sending emails
router.post("/", sendContactEmail);

// 👇 ADD THIS GET ROUTE FOR TESTING
router.get("/test", testEmail);

module.exports = router;
