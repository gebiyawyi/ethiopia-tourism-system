const bcrypt = require("bcryptjs");
const { promisePool } = require("../config/database");

// ============================================
// ✅ UPDATE PROFILE (INCLUDING USERNAME)
// ============================================
const updateProfile = async (req, res) => {
  try {
    const { full_name, phone, email, username } = req.body;
    const userId = req.user.id;

    // Log what we're updating
    console.log("📤 Updating user:", {
      userId,
      full_name,
      phone,
      email,
      username,
    });

    // ✅ Check if username is taken
    if (username) {
      const [existing] = await promisePool.query(
        "SELECT id FROM users WHERE username = ? AND id != ?",
        [username, userId],
      );
      if (existing.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Username is already taken by another user",
        });
      }
    }

    // ✅ Check if email is taken
    if (email) {
      const [existing] = await promisePool.query(
        "SELECT id FROM users WHERE email = ? AND id != ?",
        [email, userId],
      );
      if (existing.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Email is already taken by another user",
        });
      }
    }

    // ✅ UPDATE ALL FIELDS
    const [result] = await promisePool.query(
      `UPDATE users 
       SET full_name = ?, phone = ?, email = ?, username = ? 
       WHERE id = ?`,
      [full_name, phone, email, username, userId],
    );

    console.log("✅ Update result:", result);

    // Get updated user
    const [users] = await promisePool.query(
      "SELECT id, username, email, full_name, phone, role FROM users WHERE id = ?",
      [userId],
    );

    console.log("✅ Updated user:", users[0]);

    res.json({
      success: true,
      user: users[0],
      message: "Profile updated successfully",
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
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    const [users] = await promisePool.query(
      "SELECT password_hash FROM users WHERE id = ?",
      [userId],
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      users[0].password_hash,
    );
    if (!isMatch) {
      return res.status(400).json({
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

    res.json({
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
// ✅ GET USER PROFILE
// ============================================
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const [users] = await promisePool.query(
      "SELECT id, username, email, full_name, phone, role, created_at FROM users WHERE id = ?",
      [userId],
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user: users[0],
    });
  } catch (error) {
    console.error("❌ Get user profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error getting profile",
    });
  }
};

module.exports = { updateProfile, changePassword, getUserProfile };
