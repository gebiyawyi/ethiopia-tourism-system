import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // ✅ Check if user is logged in
  const token = localStorage.getItem("token");

  // ✅ If not logged in, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ✅ If logged in, render children
  return children;
};

export default ProtectedRoute;
