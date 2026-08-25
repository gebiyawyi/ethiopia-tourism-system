// frontend/src/pages/Register/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Register.css";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    full_name: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const getReturnUrl = () => {
    const params = new URLSearchParams(location.search);
    return params.get("return") || "/";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        setError("Please upload a valid image (JPEG, PNG, GIF, or WEBP)");
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        setError("Image size must be less than 2MB");
        return;
      }

      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError("");
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    setImagePreview(null);
    document.getElementById("profile-image-input").value = "";
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.username.trim()) {
      errors.username = "Username is required";
    } else if (formData.username.length < 3) {
      errors.username = "Username must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username.trim());
      formDataToSend.append("email", formData.email.trim());
      formDataToSend.append("password", formData.password);
      formDataToSend.append(
        "full_name",
        formData.full_name.trim() || formData.username.trim(),
      );

      if (profileImage) {
        formDataToSend.append("profile_image", profileImage);
      }

      console.log("📤 Sending registration data...");
      console.log("📤 Username:", formData.username);
      console.log("📤 Email:", formData.email);
      console.log("📤 Full Name:", formData.full_name);
      console.log("📤 Has Image:", !!profileImage);

      const response = await api.post("/auth/register", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ Register response:", response.data);

      if (response.data.success) {
        const { token, user } = response.data;

        // ✅ Use AuthContext login (auto-login after registration)
        login(token, user);

        setSuccess(true);
        setTimeout(() => {
          const returnUrl = getReturnUrl();
          navigate(returnUrl);
        }, 1500);
      } else {
        setError(response.data.message || "Registration failed");
      }
    } catch (err) {
      console.error("❌ Registration error:", err);
      console.error("❌ Response:", err.response?.data);

      // ✅ Show the actual error from backend
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Registration failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: "" });
    }
    if (error) setError("");
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <h1>🇪🇹 Create Account</h1>
            <p>Join us to explore Ethiopia</p>
          </div>

          {error && (
            <div className="register-error">
              <span className="error-text">{error}</span>
              <button className="error-close" onClick={() => setError("")}>
                ✕
              </button>
            </div>
          )}

          {success && (
            <div className="register-success">
              <span className="success-icon">✅</span>
              <span className="success-text">
                Registration successful! Redirecting...
              </span>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="register-form"
            encType="multipart/form-data"
          >
            {/* Profile Photo Upload */}
            <div className="form-group full-width">
              <label>
                Profile Photo <span className="optional">(Optional)</span>
              </label>
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

            {/* Username */}
            <div className="form-group">
              <label>
                Username <span className="required">*</span>
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a username"
                className={fieldErrors.username ? "input-error" : ""}
                required
              />
              {fieldErrors.username && (
                <span className="field-error">{fieldErrors.username}</span>
              )}
            </div>

            {/* Full Name */}
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Enter your full name (optional)"
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label>
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={fieldErrors.email ? "input-error" : ""}
                required
              />
              {fieldErrors.email && (
                <span className="field-error">{fieldErrors.email}</span>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label>
                Password <span className="required">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password (min 6 characters)"
                className={fieldErrors.password ? "input-error" : ""}
                required
              />
              {fieldErrors.password && (
                <span className="field-error">{fieldErrors.password}</span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label>
                Confirm Password <span className="required">*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className={fieldErrors.confirmPassword ? "input-error" : ""}
                required
              />
              {fieldErrors.confirmPassword && (
                <span className="field-error">
                  {fieldErrors.confirmPassword}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="register-btn"
              disabled={loading || success}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="register-footer">
            <p>
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
