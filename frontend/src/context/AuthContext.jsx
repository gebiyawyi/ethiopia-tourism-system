// frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Load user from localStorage on startup
  useEffect(() => {
    const loadUser = () => {
      try {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        console.log("🔍 Checking auth on load...");
        console.log("📝 Token exists:", !!token);
        console.log("📝 User data exists:", !!userData);

        if (token && userData) {
          try {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
            setIsLoggedIn(true);
            console.log(
              "✅ User loaded from localStorage:",
              parsedUser.username,
            );
          } catch (e) {
            console.error("❌ Error parsing user data:", e);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          }
        }
      } catch (error) {
        console.error("❌ Error loading user:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // ✅ Login function
  const login = (token, userData) => {
    console.log("🔐 Login called with:", {
      token: token?.substring(0, 20) + "...",
      userData,
    });

    try {
      // ✅ Store in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      // ✅ Update state
      setUser(userData);
      setIsLoggedIn(true);

      console.log("✅ User logged in:", userData.username);
      console.log("✅ User state updated:", userData);
    } catch (error) {
      console.error("❌ Login error:", error);
    }
  };

  // ✅ Register function
  const register = (token, userData) => {
    console.log("📝 Register called with:", {
      token: token?.substring(0, 20) + "...",
      userData,
    });

    try {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setIsLoggedIn(true);
      console.log("✅ User registered:", userData.username);
    } catch (error) {
      console.error("❌ Register error:", error);
    }
  };

  // ✅ Logout function
  const logout = () => {
    console.log("🚪 Logging out...");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
    console.log("✅ User logged out");
  };

  // ✅ Refresh user data
  const refreshUser = () => {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsLoggedIn(true);
        console.log("✅ User refreshed:", parsedUser.username);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("❌ Error refreshing user:", error);
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  console.log("📊 Auth state:", { isLoggedIn, user: user?.username, loading });

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isLoggedIn,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
