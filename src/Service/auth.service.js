import axiosInstance from "./axios/axiosInstance";

// ✅ Use default export
const authService = {
  // Login user
  login: async (credentials) => {
    const response = await axiosInstance.post("/auth/login", credentials);
    return response.data;
  },

  // Register user
  register: async (userData) => {
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data;
  },

  // Logout user
  logout: async () => {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  },

  // Forgot password
  forgotPassword: async (data) => {
    const response = await axiosInstance.post("/auth/forgot-password", data);
    return response.data;
  },

  // Reset password
  resetPassword: async (data) => {
    const response = await axiosInstance.post("/auth/reset-password", data);
    return response.data;
  },

  // Verify OTP
  verifyOTP: async (data) => {
    const response = await axiosInstance.post("/auth/verify-otp", data);
    return response.data;
  },

  // Get current user profile
  getProfile: async () => {
    const response = await axiosInstance.get("/auth/profile");
    return response.data;
  },

  // Update user profile
  updateProfile: async (data) => {
    const response = await axiosInstance.put("/auth/profile", data);
    return response.data;
  },

  // Change password
  changePassword: async (data) => {
    const response = await axiosInstance.post("/auth/change-password", data);
    return response.data;
  },
};

export { authService };
export default authService;
