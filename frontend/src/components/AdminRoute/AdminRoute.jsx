// frontend/src/components/AdminRoute/AdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { isLoggedIn, loading, user } = useAuth();

  console.log("🔒 AdminRoute check:", {
    isLoggedIn,
    loading,
    user: user?.username,
    role: user?.role,
  });

  // ✅ Wait for auth to load
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <div className="spinner"></div>
        <p style={{ marginTop: "10px", color: "#6b7280" }}>Loading...</p>
      </div>
    );
  }

  // ✅ Check if user is logged in
  if (!isLoggedIn || !user) {
    console.log("❌ Not authenticated, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  // ✅ Check if user is admin
  if (user.role !== "admin") {
    console.log("❌ Not admin, redirecting to home");
    return <Navigate to="/" replace />;
  }

  // ✅ If admin, render children
  console.log("✅ Admin authenticated, rendering admin content");
  return children;
};

export default AdminRoute;
