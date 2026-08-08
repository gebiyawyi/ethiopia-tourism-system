import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import api from "../../services/api";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [attemptCount, setAttemptCount] = useState(0);
  const navigate = useNavigate();

  // ============================================
  // ✅ VALIDATE FORM
  // ============================================
  const validateForm = () => {
    const errors = {};

    if (!identifier.trim()) {
      errors.identifier = "Username or email is required";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ============================================
  // ✅ HANDLE SUBMIT
  // ============================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Don't clear error on submit - keep it until corrected

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        identifier: identifier.trim(),
        password: password.trim(),
      });

      console.log("✅ Login response:", response.data);

      if (response.data.success) {
        // ✅ Clear error on success
        setError("");
        setFieldErrors({});
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
      } else {
        // ✅ Set error - this will stay
        setError(response.data.message || "Login failed. Please try again.");
        setAttemptCount(attemptCount + 1);
      }
    } catch (err) {
      console.error("❌ Login error:", err.response?.data);

      // ✅ Set specific error - this will stay
      const errorMessage = err.response?.data?.message;

      if (errorMessage === "Invalid username/email or password") {
        setError(
          "❌ Invalid username/email or password. Please check your credentials.",
        );
      } else if (errorMessage === "User not found") {
        setError(
          "❌ No account found with this username or email. Please sign up.",
        );
      } else if (err.response?.status === 401) {
        setError("❌ Authentication failed. Please check your credentials.");
      } else if (err.response?.status === 500) {
        setError("❌ Server error. Please try again later.");
      } else if (err.code === "ERR_NETWORK") {
        setError("❌ Network error. Please check your connection.");
      } else {
        setError(errorMessage || "❌ Login failed. Please try again.");
      }
      setAttemptCount(attemptCount + 1);
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // ✅ HANDLE FIELD CHANGE - Only clear field errors
  // ============================================
  const handleFieldChange = (e) => {
    const { name, value } = e.target;

    if (name === "identifier") {
      setIdentifier(value);
      // ✅ Clear field error when user types
      if (fieldErrors.identifier) {
        setFieldErrors({ ...fieldErrors, identifier: "" });
      }
    } else if (name === "password") {
      setPassword(value);
      if (fieldErrors.password) {
        setFieldErrors({ ...fieldErrors, password: "" });
      }
    }

    // ✅ IMPORTANT: General error STAYS until corrected
    // It will only clear when:
    // 1. User clicks the close (✕) button
    // 2. Successful login
  };

  // ============================================
  // ✅ CLEAR ERROR MANUALLY
  // ============================================
  const clearError = () => {
    setError("");
  };

  // ============================================
  // ✅ Check if fields are filled
  // ============================================
  const isFormFilled = () => {
    return identifier.trim().length > 0 && password.trim().length > 0;
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>🇪🇹 Welcome Back</h1>
            <p>Sign in with your username or email</p>
          </div>

          {/* ✅ Error Message - STAYS until corrected or dismissed */}
          {error && (
            <div className="login-error">
              <span className="error-text">{error}</span>
              <button className="error-close" onClick={clearError}>
                ✕
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            {/* ✅ Username/Email Field */}
            <div className="form-group">
              <label htmlFor="identifier">Username or Email</label>
              <input
                type="text"
                id="identifier"
                name="identifier"
                value={identifier}
                onChange={handleFieldChange}
                placeholder="Enter your username or email"
                className={fieldErrors.identifier ? "input-error" : ""}
                required
              />
              {fieldErrors.identifier && (
                <span className="field-error">{fieldErrors.identifier}</span>
              )}
              <span className="input-hint">
                Use your username or email address
              </span>
            </div>

            {/* ✅ Password Field */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleFieldChange}
                placeholder="Enter your password"
                className={fieldErrors.password ? "input-error" : ""}
                required
              />
              {fieldErrors.password && (
                <span className="field-error">{fieldErrors.password}</span>
              )}
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="login-footer">
            <p>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
            {attemptCount > 2 && (
              <p className="forgot-password">
                <Link to="/forgot-password">Forgot password?</Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
