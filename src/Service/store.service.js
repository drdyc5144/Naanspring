import axiosInstance from "./axios/axiosInstance";

const storeService = {
  // Get store settings
  getStoreSettings: async () => {
    const response = await axiosInstance.get("/store/settings");
    return response.data;
  },

  // Update store settings (Admin only)
  updateStoreSettings: async (settings) => {
    const response = await axiosInstance.put("/store/settings", settings);
    return response.data;
  },

  // Upload store logo (Admin only)
  uploadLogo: async (file) => {
    const formData = new FormData();
    formData.append("logo", file);
    const response = await axiosInstance.post("/store/logo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Delete store logo (Admin only)
  deleteLogo: async () => {
    const response = await axiosInstance.delete("/store/logo");
    return response.data;
  },

  // Get store information (Public)
  getStoreInfo: async () => {
    const response = await axiosInstance.get("/store/info");
    return response.data;
  },

  // Update store theme (Admin only)
  updateTheme: async (themeData) => {
    const response = await axiosInstance.put("/store/theme", themeData);
    return response.data;
  },

  // Get store analytics (Admin only)
  getStoreAnalytics: async (params = {}) => {
    const response = await axiosInstance.get("/store/analytics", { params });
    return response.data;
  },
};

export { storeService };
export default storeService;
