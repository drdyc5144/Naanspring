import axiosInstance from "./axios/axiosInstance";

const categoryService = {
  getCategories: async (params = {}) => {
    const response = await axiosInstance.get("/categories", { params });
    return response.data;
  },

  getCategoryById: async (id) => {
    const response = await axiosInstance.get(`/categories/${id}`);
    return response.data;
  },

  createCategory: async (categoryData) => {
    const response = await axiosInstance.post("/categories", categoryData);
    return response.data;
  },

  updateCategory: async (id, categoryData) => {
    const response = await axiosInstance.put(`/categories/${id}`, categoryData);
    return response.data;
  },

  deleteCategory: async (id) => {
    const response = await axiosInstance.delete(`/categories/${id}`);
    return response.data;
  },

  getProductsByCategory: async (categoryId, params = {}) => {
    const response = await axiosInstance.get(
      `/categories/${categoryId}/products`,
      { params },
    );
    return response.data;
  },

  getCategoryStats: async () => {
    const response = await axiosInstance.get("/categories/stats");
    return response.data;
  },

  bulkCreateCategories: async (categories) => {
    const response = await axiosInstance.post("/categories/bulk", {
      categories,
    });
    return response.data;
  },

  reorderCategories: async (orderedIds) => {
    const response = await axiosInstance.put("/categories/reorder", {
      orderedIds,
    });
    return response.data;
  },
};

export { categoryService };
export default categoryService;
