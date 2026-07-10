import axiosInstance from "./axios/axiosInstance";

const orderService = {
  // Get all orders (Admin only)
  getOrders: async (params = {}) => {
    const response = await axiosInstance.get("/orders", { params });
    return response.data;
  },

  // Get user's orders (Customer only)
  getUserOrders: async (params = {}) => {
    const response = await axiosInstance.get("/orders/user", { params });
    return response.data;
  },

  // Get single order by ID
  getOrderById: async (id) => {
    const response = await axiosInstance.get(`/orders/${id}`);
    return response.data;
  },

  // Create new order
  createOrder: async (orderData) => {
    const response = await axiosInstance.post("/orders", orderData);
    return response.data;
  },

  // Update order status (Admin only)
  updateOrderStatus: async (id, statusData) => {
    const response = await axiosInstance.put(
      `/orders/${id}/status`,
      statusData,
    );
    return response.data;
  },

  // Cancel order (Customer only)
  cancelOrder: async (id) => {
    const response = await axiosInstance.put(`/orders/${id}/cancel`);
    return response.data;
  },

  // Get order tracking info
  getOrderTracking: async (id) => {
    const response = await axiosInstance.get(`/orders/${id}/tracking`);
    return response.data;
  },

  // Get order invoice
  getOrderInvoice: async (id) => {
    const response = await axiosInstance.get(`/orders/${id}/invoice`, {
      responseType: "blob",
    });
    return response.data;
  },

  // Get order statistics (Admin only)
  getOrderStats: async (params = {}) => {
    const response = await axiosInstance.get("/orders/stats", { params });
    return response.data;
  },

  // Export orders (Admin only)
  exportOrders: async (params = {}) => {
    const response = await axiosInstance.get("/orders/export", {
      params,
      responseType: "blob",
    });
    return response.data;
  },
};
export { orderService };
export default orderService;
