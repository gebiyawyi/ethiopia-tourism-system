import React, { createContext, useState, useContext, useEffect } from "react";
import authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const currentUser = authService.getCurrentUser();
      const token = authService.getToken();

      console.log("🔐 AuthContext - Token:", !!token);
      console.log("👤 AuthContext - User:", currentUser);

      if (currentUser && token) {
        setUser(currentUser);
        setIsLoggedIn(true);
        console.log("✅ AuthContext - User set:", currentUser);
      } else {
        setUser(null);
        setIsLoggedIn(false);
        console.log("❌ AuthContext - No user found");
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // ✅ LOGIN - Saves user data and updates state
  const login = (token, userData) => {
    console.log("🔐 AuthContext - Login called with:", userData);

    // ✅ Save to localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    // ✅ Update state
    setUser(userData);
    setIsLoggedIn(true);

    console.log("✅ AuthContext - User logged in:", userData);
    return { user: userData, token };
  };

  // ✅ REGISTER - Saves user data and updates state
  const register = (token, userData) => {
    console.log("🔐 AuthContext - Register called with:", userData);

    // ✅ Save to localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    // ✅ Update state
    setUser(userData);
    setIsLoggedIn(true);

    console.log("✅ AuthContext - User registered:", userData);
    return { user: userData, token };
  };

  // ✅ LOGOUT
  const logout = () => {
    console.log("🔐 AuthContext - Logout called");
    authService.logout();
    setUser(null);
    setIsLoggedIn(false);
  };

  // ✅ UPDATE USER - For profile updates
  const updateUser = (updatedUser) => {
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  // ✅ REFRESH USER - Re-read from localStorage
  const refreshUser = () => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsLoggedIn(true);
        console.log("✅ AuthContext - User refreshed:", parsedUser);
        return parsedUser;
      } catch (e) {
        console.error("❌ AuthContext - Error refreshing user:", e);
      }
    }
    return null;
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    refreshUser,
    isLoggedIn,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
