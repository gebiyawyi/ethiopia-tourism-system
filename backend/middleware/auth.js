const jwt = require("jsonwebtoken");

// ============================================
// ✅ AUTHENTICATION MIDDLEWARE
// ============================================
const protect = async (req, res, next) => {
  try {
    let token;

    // ✅ Get token from Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no token provided",
      });
    }

    try {
      // ✅ Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      console.error("❌ Token verification error:", error.message);
      return res.status(401).json({
        success: false,
        message: "Not authorized, invalid token",
      });
    }
  } catch (error) {
    console.error("❌ Auth middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ============================================
// ✅ ADMIN MIDDLEWARE
// ============================================
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Not authorized as admin",
    });
  }
};

module.exports = { protect, admin };
