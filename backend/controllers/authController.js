// ============================================
// 🔐 AUTH CONTROLLER - WITH IMAGE UPLOAD
// ============================================

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisePool } = require("../config/database");
const { uploadImage } = require("../config/cloudinary"); // ✅ Import Cloudinary

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

// ============================================
// 📝 REGISTER - WITH PROFILE IMAGE
// ============================================
const register = async (req, res) => {
  try {
    console.log("📝 ============ REGISTRATION STARTED ============");
    console.log("📝 Request body:", req.body);
    console.log("📸 File received:", req.file ? "✅ YES" : "❌ NO");

    const { username, email, password, full_name } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email, and password are required",
      });
    }

    // Check if user already exists
    console.log("🔍 Checking if user exists...");
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
    console.log("🔐 Hashing password...");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ============================================
    // 📸 UPLOAD IMAGE TO CLOUDINARY (IF PROVIDED)
    // ============================================
    let profileImageUrl = null;

    if (req.file) {
      try {
        console.log("📸 Uploading image to Cloudinary...");
        const result = await uploadImage(
          req.file.buffer,
          "ethiopia_tourism/profiles",
        );
        profileImageUrl = result.url;
        console.log("✅ Image uploaded successfully!");
        console.log("📸 Image URL:", profileImageUrl);
        console.log("📸 Public ID:", result.public_id);
      } catch (uploadError) {
        console.error("❌ Image upload error:", uploadError.message);
        // Continue registration even if image upload fails
        // This way the user can still register without an image
      }
    } else {
      console.log("📸 No image provided, skipping upload");
    }

    // ============================================
    // 💾 SAVE USER TO DATABASE
    // ============================================
    console.log("💾 Saving user to database...");
    const [result] = await promisePool.query(
      `INSERT INTO users (username, email, password_hash, full_name, profile_image) 
       VALUES (?, ?, ?, ?, ?)`,
      [username, email, hashedPassword, full_name || username, profileImageUrl],
    );

    console.log("✅ User registered with ID:", result.insertId);

    // ============================================
    // 🔐 GENERATE JWT TOKEN
    // ============================================
    const token = generateToken(result.insertId);

    // ============================================
    // 📤 RETURN USER DATA
    // ============================================
    const userData = {
      id: result.insertId,
      username,
      email,
      full_name: full_name || username,
      role: "user",
      profile_image: profileImageUrl, // ✅ This is the key!
    };

    console.log("📤 Returning user data:", userData);
    console.log("📸 Profile image URL in response:", profileImageUrl);
    console.log("📝 ============ REGISTRATION COMPLETED ============");

    res.status(201).json({
      success: true,
      token,
      user: userData,
    });
  } catch (error) {
    console.error("❌ Registration error:", error);
    console.error("❌ Error stack:", error.stack);
    res.status(500).json({
      success: false,
      message: "Server error during registration: " + error.message,
    });
  }
};

// ============================================
// 🔑 LOGIN - Return profile image
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
        profile_image: user.profile_image, // ✅ Return profile image
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
// 👤 GET CURRENT USER
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
