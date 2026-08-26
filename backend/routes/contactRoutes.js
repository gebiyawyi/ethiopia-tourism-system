const express = require("express");
const router = express.Router();
const {
  sendContactEmail,
  testEmail,
} = require("../controllers/contactController");

router.post("/", sendContactEmail);
router.get("/test", testEmail);

module.exports = router;
