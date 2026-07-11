import axiosInstance from "./axios/axiosInstance";

// ============================================================
// 📦 MOCK DATA FOR LOCAL TESTING
// ============================================================
const MOCK_USERS = {
  customer: {
    id: 1,
    firstName: "Demo",
    lastName: "Customer",
    email: "customer@naanspring.com",
    role: "customer",
    phone: "+234 801 234 5678",
    createdAt: "2026-07-01T10:00:00Z",
  },
  admin: {
    id: 2,
    firstName: "Demo",
    lastName: "Admin",
    email: "admin@naanspring.com",
    role: "admin",
    phone: "+234 802 345 6789",
    createdAt: "2026-07-01T10:00:00Z",
  },
};

const MOCK_TOKEN = {
  customer: "mock-token-customer-12345",
  admin: "mock-token-admin-67890",
};

// ============================================================
// Flag to use mock data (set to false when API is ready)
// ============================================================
const USE_MOCK_AUTH = true; // ← Change to false when API is ready

// ============================================================
// Auth Service
// ============================================================
const authService = {
  // Login user
  login: async (credentials) => {
    // ✅ If using mock auth, check against mock users
    if (USE_MOCK_AUTH) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Check if customer credentials match
          if (
            credentials.email === MOCK_USERS.customer.email &&
            credentials.password === "password123"
          ) {
            resolve({
              data: {
                token: MOCK_TOKEN.customer,
                user: MOCK_USERS.customer,
              },
            });
            return;
          }

          // Check if admin credentials match
          if (
            credentials.email === MOCK_USERS.admin.email &&
            credentials.password === "admin123"
          ) {
            resolve({
              data: {
                token: MOCK_TOKEN.admin,
                user: MOCK_USERS.admin,
              },
            });
            return;
          }

          // If no match, reject with error
          reject({
            response: {
              data: {
                message: "Invalid email or password. Use demo credentials.",
              },
            },
          });
        }, 500);
      });
    }

    // 🔒 Real API call (when USE_MOCK_AUTH is false)
    const response = await axiosInstance.post("/auth/login", credentials);
    return response.data;
  },

  // Register user
  register: async (userData) => {
    if (USE_MOCK_AUTH) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newUser = {
            id: 3,
            ...userData,
            role: "customer",
            createdAt: new Date().toISOString(),
          };
          resolve({
            data: {
              token: "mock-token-new-user-67890",
              user: newUser,
            },
          });
        }, 500);
      });
    }

    const response = await axiosInstance.post("/auth/register", userData);
    return response.data;
  },

  // Logout user
  logout: async () => {
    if (USE_MOCK_AUTH) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: { message: "Logged out successfully" } });
        }, 500);
      });
    }

    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  },

  // Forgot password
  forgotPassword: async (data) => {
    if (USE_MOCK_AUTH) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: { message: "Password reset email sent" } });
        }, 500);
      });
    }

    const response = await axiosInstance.post("/auth/forgot-password", data);
    return response.data;
  },

  // Reset password
  resetPassword: async (data) => {
    if (USE_MOCK_AUTH) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: { message: "Password reset successfully" } });
        }, 500);
      });
    }

    const response = await axiosInstance.post("/auth/reset-password", data);
    return response.data;
  },

  // Verify OTP
  verifyOTP: async (data) => {
    if (USE_MOCK_AUTH) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: { message: "OTP verified successfully" } });
        }, 500);
      });
    }

    const response = await axiosInstance.post("/auth/verify-otp", data);
    return response.data;
  },

  // Get current user profile
  getProfile: async () => {
    if (USE_MOCK_AUTH) {
      // Get user from localStorage
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: user });
        }, 500);
      });
    }

    const response = await axiosInstance.get("/auth/profile");
    return response.data;
  },

  // Update user profile
  updateProfile: async (data) => {
    if (USE_MOCK_AUTH) {
      // Update user in localStorage
      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
      const updatedUser = { ...currentUser, ...data };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: updatedUser });
        }, 500);
      });
    }

    const response = await axiosInstance.put("/auth/profile", data);
    return response.data;
  },

  // Change password
  changePassword: async (data) => {
    if (USE_MOCK_AUTH) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: { message: "Password changed successfully" } });
        }, 500);
      });
    }

    const response = await axiosInstance.post("/auth/change-password", data);
    return response.data;
  },
};

// ============================================================
// Exports
// ============================================================
export { authService };
export default authService;
