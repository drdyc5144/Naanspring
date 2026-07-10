import axiosInstance from "./axios/axiosInstance";

const adminService = {
  // Get dashboard statistics
  getDashboardStats: async () => {
    const response = await axiosInstance.get("/admin/dashboard/stats");
    return response.data;
  },

  // Get sales analytics
  getSalesAnalytics: async (params = {}) => {
    const response = await axiosInstance.get("/admin/analytics/sales", {
      params,
    });
    return response.data;
  },

  // Get revenue data
  getRevenueData: async (params = {}) => {
    const response = await axiosInstance.get("/admin/analytics/revenue", {
      params,
    });
    return response.data;
  },

  // Get customer analytics
  getCustomerAnalytics: async (params = {}) => {
    const response = await axiosInstance.get("/admin/analytics/customers", {
      params,
    });
    return response.data;
  },

  // Get product analytics
  getProductAnalytics: async (params = {}) => {
    const response = await axiosInstance.get("/admin/analytics/products", {
      params,
    });
    return response.data;
  },

  // Export sales report
  exportSalesReport: async (params = {}) => {
    const response = await axiosInstance.get("/admin/reports/sales", {
      params,
      responseType: "blob",
    });
    return response.data;
  },

  // Export customer report
  exportCustomerReport: async (params = {}) => {
    const response = await axiosInstance.get("/admin/reports/customers", {
      params,
      responseType: "blob",
    });
    return response.data;
  },

  // Export product report
  exportProductReport: async (params = {}) => {
    const response = await axiosInstance.get("/admin/reports/products", {
      params,
      responseType: "blob",
    });
    return response.data;
  },
};
export { adminService };
export default adminService;
