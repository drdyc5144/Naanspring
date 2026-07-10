import axiosInstance from "./axios/axiosInstance";

const paymentService = {
  // Initialize payment
  initializePayment: async (paymentData) => {
    const response = await axiosInstance.post(
      "/payments/initialize",
      paymentData,
    );
    return response.data;
  },

  // Verify payment
  verifyPayment: async (reference) => {
    const response = await axiosInstance.get(`/payments/verify/${reference}`);
    return response.data;
  },

  // Process payment
  processPayment: async (paymentData) => {
    const response = await axiosInstance.post("/payments/process", paymentData);
    return response.data;
  },

  // Get payment history
  getPaymentHistory: async (params = {}) => {
    const response = await axiosInstance.get("/payments/history", { params });
    return response.data;
  },

  // Get payment by ID
  getPaymentById: async (id) => {
    const response = await axiosInstance.get(`/payments/${id}`);
    return response.data;
  },

  // Refund payment (Admin only)
  refundPayment: async (id, refundData) => {
    const response = await axiosInstance.post(
      `/payments/${id}/refund`,
      refundData,
    );
    return response.data;
  },

  // Get payment methods
  getPaymentMethods: async () => {
    const response = await axiosInstance.get("/payments/methods");
    return response.data;
  },

  // Save payment method (Customer)
  savePaymentMethod: async (methodData) => {
    const response = await axiosInstance.post(
      "/payments/methods/save",
      methodData,
    );
    return response.data;
  },

  // Delete payment method (Customer)
  deletePaymentMethod: async (id) => {
    const response = await axiosInstance.delete(`/payments/methods/${id}`);
    return response.data;
  },
};

export default paymentService;
