import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000;

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("token");

    // If token exists, add to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Clear local storage and redirect to login
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Redirect to login page
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    // Handle 403 Forbidden errors
    if (error.response?.status === 403) {
      // Redirect to unauthorized page
      if (window.location.pathname !== "/unauthorized") {
        window.location.href = "/unauthorized";
      }
    }

    // Handle 404 Not Found
    if (error.response?.status === 404) {
      // Log error for debugging
      console.error("Resource not found:", error.config.url);
    }

    // Handle network errors
    if (!error.response) {
      console.error("Network error - please check your connection");
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
