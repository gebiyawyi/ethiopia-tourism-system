// frontend/src/components/ProtectedRoute/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading, user } = useAuth();

  console.log("🔒 ProtectedRoute check:", {
    isLoggedIn,
    loading,
    user: user?.username,
    hasUser: !!user,
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

  // ✅ If authenticated, render children
  console.log("✅ Authenticated, rendering protected content");
  return children;
};

export default ProtectedRoute;
