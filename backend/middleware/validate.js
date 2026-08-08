const { body, validationResult } = require("express-validator");

// ============================================
// ✅ REQUEST VALIDATION MIDDLEWARE
// ============================================

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

// User validation rules
const userValidation = {
  register: [
    body("username")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters"),
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("full_name")
      .optional()
      .isLength({ min: 2 })
      .withMessage("Name must be at least 2 characters"),
  ],
  login: [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
};

module.exports = { validate, userValidation };
