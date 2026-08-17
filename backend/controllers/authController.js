const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisePool } = require("../config/database");
const { uploadImage } = require("../config/cloudinary");

// ============================================
// ✅ GENERATE JWT TOKEN
// ============================================
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

// ============================================
// ✅ REGISTER USER
// ============================================
const register = async (req, res) => {
  console.log("📝 ============ REGISTRATION STARTED ============");

  try {
    const { username, email, password, full_name } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide username, email and password",
      });
    }

    const [existingUsers] = await promisePool.query(
      "SELECT id FROM users WHERE username = ? OR email = ?",
      [username, email],
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Username or email already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let profileImageUrl = null;
    console.log("📸 File received:", req.file ? "✅ YES" : "❌ NO");

    if (req.file) {
      try {
        console.log("📸 Uploading image to Cloudinary...");
        const uploadResult = await uploadImage(
          req.file.buffer,
          "ethiopia_tourism/profiles",
        );
        profileImageUrl = uploadResult.url;
        console.log("✅ Image uploaded:", profileImageUrl);
      } catch (uploadError) {
        console.error("❌ Image upload failed:", uploadError);
      }
    }

    const [result] = await promisePool.query(
      `INSERT INTO users (username, email, password_hash, full_name, profile_image, role) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        username,
        email,
        hashedPassword,
        full_name || username,
        profileImageUrl,
        "user",
      ],
    );

    const userId = result.insertId;
    console.log(`✅ User registered with ID: ${userId}`);

    const [users] = await promisePool.query(
      "SELECT id, username, email, full_name, profile_image, role, created_at FROM users WHERE id = ?",
      [userId],
    );

    const user = users[0];
    const token = generateToken(user.id);

    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
      profile_image: user.profile_image,
      created_at: user.created_at,
    };

    console.log("📤 Returning user data:", userData);
    console.log("📝 ============ REGISTRATION COMPLETED ============");

    res.status(201).json({
      success: true,
      token: token,
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
// ✅ LOGIN USER
// ============================================
const login = async (req, res) => {
  console.log("📝 ============ LOGIN STARTED ============");

  try {
    const { identifier, password } = req.body;
    console.log("🔑 Login attempt for:", identifier);

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide username/email and password",
      });
    }

    const [users] = await promisePool.query(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [identifier, identifier],
    );

    if (users.length === 0) {
      console.log("❌ User not found:", identifier);
      return res.status(401).json({
        success: false,
        message: "Invalid username/email or password",
      });
    }

    const user = users[0];
    console.log("✅ User found:", user.username);

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      console.log("❌ Password mismatch for:", user.username);
      return res.status(401).json({
        success: false,
        message: "Invalid username/email or password",
      });
    }

    console.log("✅ Password matched for:", user.username);

    const token = generateToken(user.id);

    await promisePool.query(
      "UPDATE users SET last_login = NOW() WHERE id = ?",
      [user.id],
    );

    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
      profile_image: user.profile_image,
      created_at: user.created_at,
    };

    console.log("📤 Returning user data:", userData);
    console.log("📝 ============ LOGIN COMPLETED ============");

    res.status(200).json({
      success: true,
      token: token,
      user: userData,
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
const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const [users] = await promisePool.query(
      "SELECT id, username, email, full_name, profile_image, role, created_at, last_login, phone, bio FROM users WHERE id = ?",
      [userId],
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: users[0],
    });
  } catch (error) {
    console.error("❌ Get current user error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ============================================
// ✅ UPDATE PROFILE
// ============================================
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { full_name, phone, bio } = req.body;

    let profileImageUrl = null;
    if (req.file) {
      try {
        const uploadResult = await uploadImage(
          req.file.buffer,
          "ethiopia_tourism/profiles",
        );
        profileImageUrl = uploadResult.url;
      } catch (uploadError) {
        console.error("❌ Image upload failed:", uploadError);
      }
    }

    // Build update query
    let updateFields = [];
    let updateValues = [];

    if (full_name !== undefined) {
      updateFields.push("full_name = ?");
      updateValues.push(full_name);
    }
    if (phone !== undefined) {
      updateFields.push("phone = ?");
      updateValues.push(phone);
    }
    if (bio !== undefined) {
      updateFields.push("bio = ?");
      updateValues.push(bio);
    }
    if (profileImageUrl) {
      updateFields.push("profile_image = ?");
      updateValues.push(profileImageUrl);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields to update",
      });
    }

    updateValues.push(userId);
    const query = `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`;

    await promisePool.query(query, updateValues);

    // Get updated user
    const [users] = await promisePool.query(
      "SELECT id, username, email, full_name, profile_image, role, phone, bio FROM users WHERE id = ?",
      [userId],
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: users[0],
    });
  } catch (error) {
    console.error("❌ Update profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error updating profile",
    });
  }
};

// ============================================
// ✅ CHANGE PASSWORD
// ============================================
const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide current and new password",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters",
      });
    }

    // Get user with password
    const [users] = await promisePool.query(
      "SELECT * FROM users WHERE id = ?",
      [userId],
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const user = users[0];

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await promisePool.query("UPDATE users SET password_hash = ? WHERE id = ?", [
      hashedPassword,
      userId,
    ]);

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("❌ Change password error:", error);
    res.status(500).json({
      success: false,
      message: "Server error changing password",
    });
  }
};

// ============================================
// ✅ EXPORT ALL CONTROLLERS
// ============================================
module.exports = {
  register,
  login,
  getCurrentUser,
  updateProfile,
  changePassword,
};
