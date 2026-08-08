const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisePool } = require("../config/database");
const { uploadImage } = require("../config/cloudinary");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

// ============================================
// ✅ REGISTER - WITH PROFILE IMAGE
// ============================================
const register = async (req, res) => {
  try {
    console.log("📝 ============ REGISTRATION STARTED ============");
    console.log("📸 File received:", req.file ? "✅ YES" : "❌ NO");
    if (req.file) {
      console.log("📸 File name:", req.file.originalname);
      console.log("📸 File size:", req.file.size);
      console.log("📸 File type:", req.file.mimetype);
    }

    const { username, email, password, full_name } = req.body;

    // Validate
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email, and password are required",
      });
    }

    // Check if user exists
    const [existing] = await promisePool.query(
      "SELECT id FROM users WHERE email = ? OR username = ?",
      [email, username],
    );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email or username",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let profileImageUrl = null;

    // ✅ Upload image to Cloudinary if provided
    if (req.file) {
      try {
        console.log("📸 Uploading to Cloudinary...");
        const result = await uploadImage(
          req.file.buffer,
          "ethiopia_tourism/profiles",
        );
        profileImageUrl = result.url;
        console.log("✅ Image uploaded successfully!");
        console.log("📸 Image URL:", profileImageUrl);
      } catch (uploadError) {
        console.error("❌ Image upload error:", uploadError.message);
        // Continue without image
      }
    }

    // ✅ Insert user with profile_image
    const [result] = await promisePool.query(
      `INSERT INTO users (username, email, password_hash, full_name, profile_image) 
       VALUES (?, ?, ?, ?, ?)`,
      [username, email, hashedPassword, full_name || username, profileImageUrl],
    );

    console.log("✅ User registered with ID:", result.insertId);
    console.log("📸 Profile Image URL saved:", profileImageUrl);

    const token = generateToken(result.insertId);

    // ✅ Return user with profile_image
    const userData = {
      id: result.insertId,
      username,
      email,
      full_name: full_name || username,
      role: "user",
      profile_image: profileImageUrl,
    };

    console.log("📤 Returning user data:", userData);
    console.log("📝 ============ REGISTRATION COMPLETED ============");

    res.status(201).json({
      success: true,
      token,
      user: userData,
    });
  } catch (error) {
    console.error("❌ Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};

// ============================================
// ✅ LOGIN
// ============================================
const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const [users] = await promisePool.query(
      "SELECT id, username, email, password_hash, full_name, role, profile_image FROM users WHERE email = ? OR username = ?",
      [identifier, identifier],
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid username/email or password",
      });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid username/email or password",
      });
    }

    const token = generateToken(user.id);

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        profile_image: user.profile_image,
      },
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

// ============================================
// ✅ GET CURRENT USER
// ============================================
const getMe = async (req, res) => {
  try {
    const [users] = await promisePool.query(
      "SELECT id, username, email, full_name, phone, role, profile_image, created_at FROM users WHERE id = ?",
      [req.user.id],
    );
    res.json({ success: true, user: users[0] });
  } catch (error) {
    console.error("❌ GetMe error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = { register, login, getMe };
