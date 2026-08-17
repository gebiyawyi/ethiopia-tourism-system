import api from "./api";

const authService = {
  // ============================================
  // ✅ LOGIN
  // ============================================
  async login(credentials) {
    try {
      const response = await api.post("/auth/login", credentials);

      console.log("✅ authService - Login response:", response.data);

      if (response.data.success) {
        const { token, user } = response.data;

        // ✅ Debug logs
        console.log("🔐 Token received:", token);
        console.log("👤 User received:", user);
        console.log("📝 Token type:", typeof token);
        console.log(
          "📝 Token first 20 chars:",
          token?.substring(0, 20) + "...",
        );

        // ✅ Save to localStorage - token is already a raw string
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // ✅ Verify saved data
        console.log("💾 Saved token:", localStorage.getItem("token"));
        console.log("💾 Saved user:", localStorage.getItem("user"));

        return { user, token };
      }
      throw new Error(response.data.message || "Login failed");
    } catch (error) {
      console.error("❌ authService - Login error:", error);
      throw error;
    }
  },

  // ============================================
  // ✅ REGISTER
  // ============================================
  async register(userData) {
    try {
      const response = await api.post("/auth/register", userData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ authService - Register response:", response.data);

      if (response.data.success) {
        const { token, user } = response.data;

        // ✅ Debug logs
        console.log("🔐 Token received:", token);
        console.log("👤 User received:", user);
        console.log("📝 Token type:", typeof token);
        console.log(
          "📝 Token first 20 chars:",
          token?.substring(0, 20) + "...",
        );

        // ✅ Save to localStorage - token is already a raw string
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // ✅ Verify saved data
        console.log("💾 Saved token:", localStorage.getItem("token"));
        console.log("💾 Saved user:", localStorage.getItem("user"));

        return { user, token };
      }
      throw new Error(response.data.message || "Registration failed");
    } catch (error) {
      console.error("❌ authService - Register error:", error);
      throw error;
    }
  },

  // ============================================
  // ✅ LOGOUT
  // ============================================
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  // ============================================
  // ✅ GET CURRENT USER
  // ============================================
  getCurrentUser() {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (e) {
        console.error("❌ Error parsing user data:", e);
        return null;
      }
    }
    return null;
  },

  // ============================================
  // ✅ GET TOKEN
  // ============================================
  getToken() {
    const token = localStorage.getItem("token");
    // ✅ Remove any extra quotes if present
    if (token && token.startsWith('"') && token.endsWith('"')) {
      console.log("⚠️ Token had extra quotes, cleaning...");
      return token.slice(1, -1);
    }
    return token;
  },

  // ============================================
  // ✅ IS LOGGED IN
  // ============================================
  isLoggedIn() {
    return !!this.getToken() && !!this.getCurrentUser();
  },
};

export default authService;
