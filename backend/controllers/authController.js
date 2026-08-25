// backend/controllers/authController.js
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
    if (req.file) {
      try {
        const uploadResult = await uploadImage(
          req.file.buffer,
          "ethiopia_tourism/profiles",
        );
        profileImageUrl = uploadResult.url;
      } catch (uploadError) {
        console.error("❌ Image upload failed:", uploadError.message);
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

    const [users] = await promisePool.query(
      `SELECT id, username, email, full_name, profile_image, role, created_at 
       FROM users WHERE id = ?`,
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

    console.log("✅ User registered with ID:", userId);
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
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
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

    try {
      await promisePool.query(
        "UPDATE users SET last_login = NOW() WHERE id = ?",
        [user.id],
      );
    } catch (err) {
      console.log("⚠️ Could not update last_login:", err.message);
    }

    const token = generateToken(user.id);

    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
      profile_image: user.profile_image,
      created_at: user.created_at,
      phone: user.phone || "",
      bio: user.bio || "",
    };

    console.log("✅ User logged in:", user.username);
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
      `SELECT id, username, email, full_name, profile_image, role, created_at, phone, bio 
       FROM users WHERE id = ?`,
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
// ✅ UPDATE PROFILE - WITH USERNAME & EMAIL
// ============================================
const updateProfile = async (req, res) => {
  console.log("📝 ============ UPDATE PROFILE STARTED ============");
  console.log("📝 User ID:", req.user?.id);
  console.log("📝 Request body:", req.body);
  console.log("📝 File received:", req.file ? "✅ YES" : "❌ NO");

  try {
    const userId = req.user.id;
    const { username, email, full_name, phone, bio } = req.body;

    // ✅ Validate user exists
    const [userCheck] = await promisePool.query(
      "SELECT id FROM users WHERE id = ?",
      [userId],
    );

    if (userCheck.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ Check if username is taken by another user
    if (username) {
      const [existingUsername] = await promisePool.query(
        "SELECT id FROM users WHERE username = ? AND id != ?",
        [username, userId],
      );
      if (existingUsername.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Username is already taken by another user",
        });
      }
    }

    // ✅ Check if email is taken by another user
    if (email) {
      const [existingEmail] = await promisePool.query(
        "SELECT id FROM users WHERE email = ? AND id != ?",
        [email, userId],
      );
      if (existingEmail.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Email is already taken by another user",
        });
      }
    }

    // ✅ Upload image if provided
    let profileImageUrl = null;
    if (req.file) {
      try {
        console.log("📸 Uploading profile image...");
        const uploadResult = await uploadImage(
          req.file.buffer,
          "ethiopia_tourism/profiles",
        );
        profileImageUrl = uploadResult.url;
        console.log("✅ Image uploaded:", profileImageUrl);
      } catch (uploadError) {
        console.error("❌ Image upload failed:", uploadError.message);
      }
    }

    // ✅ Build update query dynamically
    let updateFields = [];
    let updateValues = [];

    if (username !== undefined && username !== null) {
      updateFields.push("username = ?");
      updateValues.push(username);
    }

    if (email !== undefined && email !== null) {
      updateFields.push("email = ?");
      updateValues.push(email);
    }

    if (full_name !== undefined && full_name !== null) {
      updateFields.push("full_name = ?");
      updateValues.push(full_name);
    }

    if (phone !== undefined && phone !== null) {
      updateFields.push("phone = ?");
      updateValues.push(phone);
    }

    if (bio !== undefined && bio !== null) {
      updateFields.push("bio = ?");
      updateValues.push(bio);
    }

    if (profileImageUrl) {
      updateFields.push("profile_image = ?");
      updateValues.push(profileImageUrl);
    }

    // ✅ If no fields to update
    if (updateFields.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields to update",
      });
    }

    // ✅ Add updated_at
    updateFields.push("updated_at = NOW()");
    updateValues.push(userId);

    const query = `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`;
    console.log("📝 Update query:", query);

    // ✅ Execute update
    await promisePool.query(query, updateValues);

    // ✅ Get updated user data
    const [users] = await promisePool.query(
      `SELECT id, username, email, full_name, profile_image, role, phone, bio, created_at 
       FROM users WHERE id = ?`,
      [userId],
    );

    console.log("✅ User updated:", users[0]);
    console.log("📝 ============ UPDATE PROFILE COMPLETED ============");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: users[0],
    });
  } catch (error) {
    console.error("❌ Update profile error:", error);
    console.error("❌ Error code:", error.code);
    console.error("❌ Error message:", error.message);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        success: false,
        message: "Username or email already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error updating profile",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ============================================
// ✅ CHANGE PASSWORD
// ============================================
const changePassword = async (req, res) => {
  console.log("📝 ============ CHANGE PASSWORD STARTED ============");

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
    const isMatch = await bcrypt.compare(currentPassword, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await promisePool.query("UPDATE users SET password_hash = ? WHERE id = ?", [
      hashedPassword,
      userId,
    ]);

    console.log("✅ Password changed for user:", userId);
    console.log("📝 ============ CHANGE PASSWORD COMPLETED ============");

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
