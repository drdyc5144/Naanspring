import axiosInstance from "./axios/axiosInstance";

const customerService = {
  // Get all customers (Admin only)
  getCustomers: async (params = {}) => {
    const response = await axiosInstance.get("/customers", { params });
    return response.data;
  },

  // Get single customer (Admin only)
  getCustomerById: async (id) => {
    const response = await axiosInstance.get(`/customers/${id}`);
    return response.data;
  },

  // Get customer profile (Customer)
  getProfile: async () => {
    const response = await axiosInstance.get("/customers/profile");
    return response.data;
  },

  // Update customer profile (Customer)
  updateProfile: async (profileData) => {
    const response = await axiosInstance.put("/customers/profile", profileData);
    return response.data;
  },

  // Get customer addresses
  getAddresses: async () => {
    const response = await axiosInstance.get("/customers/addresses");
    return response.data;
  },

  // Create new address
  createAddress: async (addressData) => {
    const response = await axiosInstance.post(
      "/customers/addresses",
      addressData,
    );
    return response.data;
  },

  // Update address
  updateAddress: async (id, addressData) => {
    const response = await axiosInstance.put(
      `/customers/addresses/${id}`,
      addressData,
    );
    return response.data;
  },

  // Delete address
  deleteAddress: async (id) => {
    const response = await axiosInstance.delete(`/customers/addresses/${id}`);
    return response.data;
  },

  // Set default address
  setDefaultAddress: async (id) => {
    const response = await axiosInstance.put(
      `/customers/addresses/${id}/default`,
    );
    return response.data;
  },

  // Get customer orders
  getCustomerOrders: async (params = {}) => {
    const response = await axiosInstance.get("/customers/orders", { params });
    return response.data;
  },

  // Get customer wishlist
  getWishlist: async () => {
    const response = await axiosInstance.get("/customers/wishlist");
    return response.data;
  },

  // Add to wishlist
  addToWishlist: async (productId) => {
    const response = await axiosInstance.post("/customers/wishlist", {
      productId,
    });
    return response.data;
  },

  // Remove from wishlist
  removeFromWishlist: async (productId) => {
    const response = await axiosInstance.delete(
      `/customers/wishlist/${productId}`,
    );
    return response.data;
  },

  // Get customer statistics (Admin only)
  getCustomerStats: async () => {
    const response = await axiosInstance.get("/customers/stats");
    return response.data;
  },
};

export { customerService };
export default customerService;
