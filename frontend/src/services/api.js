import axios from "axios";

// ✅ Get API URL from environment variable
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

console.log("🔗 API URL:", API_URL); // This helps debug

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// ✅ Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ✅ Handle responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("❌ API Error:", error);
    console.error("❌ URL:", error.config?.url);
    console.error("❌ BaseURL:", error.config?.baseURL);
    return Promise.reject(error);
  },
);

export default api;
