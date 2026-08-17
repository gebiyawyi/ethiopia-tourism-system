import axios from "axios";

// ✅ Base URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// ✅ Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request interceptor - Add token to headers
api.interceptors.request.use(
  (config) => {
    // ✅ Get token - clean any extra quotes
    let token = localStorage.getItem("token");

    // ✅ Clean token if it has extra quotes
    if (token && token.startsWith('"') && token.endsWith('"')) {
      console.log("⚠️ Cleaning token with extra quotes...");
      token = token.slice(1, -1);
      // ✅ Save cleaned token back
      localStorage.setItem("token", token);
    }

    if (token) {
      console.log(
        "🔐 Adding token to request:",
        token.substring(0, 20) + "...",
      );
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log("🔐 No token found");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// ✅ Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("❌ API Error:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      console.log("🔐 Token expired or invalid, redirecting to login...");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
