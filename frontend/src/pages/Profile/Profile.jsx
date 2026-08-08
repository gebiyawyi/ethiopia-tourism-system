import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import api from "../../services/api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    username: "",
    profile_image: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  // ============================================
  // ✅ GET DISPLAY NAME
  // ============================================
  const getDisplayName = () => {
    if (!user) return "User";
    return user.full_name || user.username || "User";
  };

  // ============================================
  // ✅ GET INITIALS FOR AVATAR
  // ============================================
  const getInitials = () => {
    if (!user) return "U";
    const name = user.full_name || user.username || "User";
    if (name.includes(" ")) {
      const parts = name.split(" ");
      return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  // ============================================
  // ✅ LOAD USER DATA
  // ============================================
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await api.get("/auth/me");
        if (response.data.success) {
          const userData = response.data.user;
          setUser(userData);
          setFormData({
            full_name: userData.full_name || userData.username || "",
            email: userData.email || "",
            phone: userData.phone || "",
            username: userData.username || "",
            profile_image: userData.profile_image || "",
          });
          localStorage.setItem("user", JSON.stringify(userData));
        }
      } catch (error) {
        console.error("Error loading user:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [navigate]);

  // ============================================
  // ✅ HANDLE IMAGE CHANGE
  // ============================================
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        setMessage({ text: "Please upload a valid image (JPEG, PNG, GIF, or WEBP)", type: "error" });
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        setMessage({ text: "Image size must be less than 2MB", type: "error" });
        return;
      }

      setNewProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setMessage({ text: "", type: "" });
    }
  };

  // ============================================
  // ✅ REMOVE IMAGE
  // ============================================
  const removeImage = () => {
    setNewProfileImage(null);
    setImagePreview(null);
    document.getElementById("profile-image-input").value = "";
  };

  // ============================================
  // ✅ HANDLE FORM CHANGES
  // ============================================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  // ============================================
  // ✅ SAVE PROFILE
  // ============================================
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("full_name", formData.full_name);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("username", formData.username);

      if (newProfileImage) {
        formDataToSend.append("profile_image", newProfileImage);
      }

      const response = await api.put("/users/profile", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        const updatedUser = response.data.user;
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setFormData({
          ...formData,
          profile_image: updatedUser.profile_image || "",
        });
        setImagePreview(null);
        setNewProfileImage(null);

        setMessage({ text: "Profile updated successfully!", type: "success" });
        setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      }
    } catch (error) {
      console.error("❌ Profile update error:", error.response?.data);
      setMessage({
        text: error.response?.data?.message || "Error updating profile. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // ✅ CHANGE PASSWORD
  // ============================================
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ text: "New passwords do not match!", type: "error" });
      setLoading(false);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ text: "Password must be at least 6 characters!", type: "error" });
      setLoading(false);
      return;
    }

    try {
      const response = await api.put("/users/password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      if (response.data.success) {
        setMessage({ text: "Password changed successfully!", type: "success" });
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      }
    } catch (error) {
      console.error("❌ Password change error:", error.response?.data);
      setMessage({
        text: error.response?.data?.message || "Error changing password. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // ✅ LOGOUT
  // ============================================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-container">
          {/* ============================================
              ✅ PROFILE AVATAR - SHOW IMAGE
          ============================================ */}
          <div className="profile-sidebar">
            <div className="profile-avatar">
              {/* ✅ Show profile image if exists, otherwise show initials */}
              {user?.profile_image ? (
                <img
                  src={user.profile_image}
                  alt="Profile"
                  className="profile-image-large"
                  onError={(e) => {
                    // If image fails to load, show initials
                    e.target.style.display = 'none';
                    const parent = e.target.parentElement;
                    const div = document.createElement('div');
                    div.className = 'avatar-circle-large';
                    div.textContent = getInitials();
                    parent.insertBefore(div, e.target);
                  }}
                />
              ) : (
                <div className="avatar-circle-large">{getInitials()}</div>
              )}
              <h3>{getDisplayName()}</h3>
              <span>{user?.email}</span>
              <span className="profile-role">{user?.role || "User"}</span>
            </div>

            <nav className="profile-nav">
              <button
                className={`profile-nav-item ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                👤 My Profile
              </button>
              <button
                className={`profile-nav-item ${activeTab === "password" ? "active" : ""}`}
                onClick={() => setActiveTab("password")}
              >
                🔒 Change Password
              </button>
              <button
                className={`profile-nav-item ${activeTab === "bookings" ? "active" : ""}`}
                onClick={() => setActiveTab("bookings")}
              >
                📋 My Bookings
              </button>
              <button className="profile-nav-item logout" onClick={handleLogout}>
                🚪 Logout
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="profile-content">
            {message.text && (
              <div className={`profile-message ${message.type}`}>
                {message.text}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="profile-tab">
                <h2>My Profile</h2>
                <form onSubmit={handleSaveProfile} className="profile-form" encType="multipart/form-data">
                  {/* Profile Photo Upload */}
                  <div className="form-group full-width">
                    <label>Profile Photo</label>
                    <div className="photo-upload-container">
                      <div className="photo-preview-wrapper">
                        {imagePreview ? (
                          <div className="photo-preview">
                            <img src={imagePreview} alt="Profile preview" />
                            <button
                              type="button"
                              className="remove-photo-btn"
                              onClick={removeImage}
                            >
                              ✕
                            </button>
                          </div>
                        ) : user?.profile_image ? (
                          <div className="photo-preview">
                            <img src={user.profile_image} alt="Profile" />
                            <button
                              type="button"
                              className="remove-photo-btn"
                              onClick={() => {
                                setNewProfileImage(null);
                                setImagePreview(null);
                                setFormData({ ...formData, profile_image: "" });
                              }}
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <div className="photo-placeholder">
                            <span className="photo-icon">📷</span>
                            <p>No photo</p>
                          </div>
                        )}
                      </div>
                      <div className="photo-upload-actions">
                        <label htmlFor="profile-image-input" className="upload-btn">
                          Choose Photo
                        </label>
                        <input
                          type="file"
                          id="profile-image-input"
                          accept="image/*"
                          onChange={handleImageChange}
                          style={{ display: "none" }}
                        />
                        {imagePreview && (
                          <button
                            type="button"
                            className="remove-btn"
                            onClick={removeImage}
                          >
                            Remove
                          </button>
                        )}
                        <span className="upload-hint">
                          JPEG, PNG, GIF, WEBP (Max 2MB)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Enter your username"
                    />
                    <span className="input-hint">Choose a unique username</span>
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <button type="submit" className="save-btn" disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </form>
              </div>
            )}

            {/* Change Password Tab */}
            {activeTab === "password" && (
              <div className="profile-tab">
                <h2>Change Password</h2>
                <form onSubmit={handleChangePassword} className="profile-form">
                  <div className="form-group full-width">
                    <label>Current Password</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter current password"
                      required
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter new password (min 6 characters)"
                      required
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="Confirm new password"
                      required
                    />
                  </div>

                  <button type="submit" className="save-btn" disabled={loading}>
                    {loading ? "Changing..." : "Change Password"}
                  </button>
                </form>
              </div>
            )}

            {/* Bookings Tab */}
            {activeTab === "bookings" && (
              <div className="profile-tab">
                <h2>My Bookings</h2>
                <div className="booking-list">
                  <div className="booking-card">
                    <div className="booking-info">
                      <h4>Lalibela Tour Package</h4>
                      <p>📅 Jan 15, 2026 - Jan 18, 2026</p>
                      <p>👥 2 guests</p>
                      <span className="booking-status confirmed">Confirmed</span>
                    </div>
                    <button className="booking-view-btn">View Details →</button>
                  </div>

                  <div className="booking-card">
                    <div className="booking-info">
                      <h4>Simien Mountains Trek</h4>
                      <p>📅 Feb 5, 2026 - Feb 10, 2026</p>
                      <p>👥 3 guests</p>
                      <span className="booking-status pending">Pending</span>
                    </div>
                    <button className="booking-view-btn">View Details →</button>
                  </div>

                  <div className="booking-card">
                    <div className="booking-info">
                      <h4>Danakil Depression Adventure</h4>
                      <p>📅 Mar 1, 2026 - Mar 5, 2026</p>
                      <p>👥 1 guest</p>
                      <span className="booking-status cancelled">Cancelled</span>
                    </div>
                    <button className="booking-view-btn">View Details →</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;