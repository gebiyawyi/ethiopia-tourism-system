import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  // ✅ Check if user is logged in
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // ✅ Check if user is admin
  const isAdmin = user?.role === "admin";

  // ✅ If not logged in, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ✅ If not admin, redirect to home
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // ✅ If admin, render children
  return children;
};

export default AdminRoute;
