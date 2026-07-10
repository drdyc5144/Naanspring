import axiosInstance from "./axios/axiosInstance";

// ============================================================
// 📦 DUMMY DATA FOR TESTING
// ============================================================
const dummyCategories = [
  {
    id: 1,
    name: "Fish",
    description: "Premium dried and fresh fish products",
    icon: "🐟",
    productCount: 12,
    isActive: true,
    createdAt: "2026-07-01T10:00:00Z",
  },
  {
    id: 2,
    name: "Seeds",
    description: "Quality seeds for cooking and planting",
    icon: "🌾",
    productCount: 18,
    isActive: true,
    createdAt: "2026-07-02T11:00:00Z",
  },
  {
    id: 3,
    name: "Seafood",
    description: "Fresh and dried seafood products",
    icon: "🦐",
    productCount: 8,
    isActive: true,
    createdAt: "2026-07-03T12:00:00Z",
  },
  {
    id: 4,
    name: "Oils",
    description: "Pure and organic cooking oils",
    icon: "🫒",
    productCount: 6,
    isActive: true,
    createdAt: "2026-07-04T13:00:00Z",
  },
  {
    id: 5,
    name: "Meat",
    description: "Premium meat products",
    icon: "🥩",
    productCount: 10,
    isActive: true,
    createdAt: "2026-07-05T14:00:00Z",
  },
  {
    id: 6,
    name: "Legumes",
    description: "Healthy beans and legumes",
    icon: "🫘",
    productCount: 15,
    isActive: true,
    createdAt: "2026-07-06T15:00:00Z",
  },
  {
    id: 7,
    name: "Grains",
    description: "Premium grains and cereals",
    icon: "🌽",
    productCount: 20,
    isActive: true,
    createdAt: "2026-07-07T16:00:00Z",
  },
];

// Dummy products for category relationships
const dummyProductsByCategory = {
  1: [
    {
      id: 1,
      name: "Premium Stock Fish",
      price: 3500,
      image:
        "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=100",
    },
    {
      id: 2,
      name: "Smoked Fish",
      price: 2800,
      image:
        "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=100",
    },
  ],
  2: [
    {
      id: 3,
      name: "Premium Egusi Seeds",
      price: 2500,
      image:
        "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=100",
    },
    {
      id: 4,
      name: "Organic Ogbono",
      price: 3000,
      image:
        "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=100",
    },
  ],
  3: [
    {
      id: 5,
      name: "Crawfish (Dried)",
      price: 2800,
      image:
        "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=100",
    },
  ],
  4: [
    {
      id: 6,
      name: "Palm Oil (Pure)",
      price: 4500,
      image:
        "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=100",
    },
  ],
  5: [
    {
      id: 7,
      name: "Kpomo (Cow Skin)",
      price: 2000,
      image:
        "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=100",
    },
  ],
  6: [
    {
      id: 8,
      name: "Brown Beans (Nigeria)",
      price: 1800,
      image:
        "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=100",
    },
  ],
  7: [
    {
      id: 9,
      name: "Tuwo Rice",
      price: 2200,
      image:
        "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=100",
    },
  ],
};

// ============================================================
// Flag to use dummy data (set to false when API is ready)
// ============================================================
const USE_DUMMY_DATA = true; // ← Change to false when API is ready

const categoryService = {
  // Get all categories
  getCategories: async (params = {}) => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          let filtered = [...dummyCategories];

          // Filter by active status
          if (params.isActive !== undefined) {
            filtered = filtered.filter((c) => c.isActive === params.isActive);
          }

          resolve({
            data: filtered,
            total: filtered.length,
            totalPages: 1,
            currentPage: 1,
          });
        }, 500);
      });
    }

    const response = await axiosInstance.get("/categories", { params });
    return response.data;
  },

  // Get single category by ID
  getCategoryById: async (id) => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const category = dummyCategories.find((c) => c.id === parseInt(id));
          if (category) {
            resolve({ data: category });
          } else {
            reject({ response: { data: { message: "Category not found" } } });
          }
        }, 500);
      });
    }

    const response = await axiosInstance.get(`/categories/${id}`);
    return response.data;
  },

  // Create new category (Admin only)
  createCategory: async (categoryData) => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newCategory = {
            id: dummyCategories.length + 1,
            ...categoryData,
            productCount: 0,
            isActive: true,
            createdAt: new Date().toISOString(),
          };
          dummyCategories.push(newCategory);
          resolve({ data: newCategory });
        }, 500);
      });
    }

    const response = await axiosInstance.post("/categories", categoryData);
    return response.data;
  },

  // Update category (Admin only)
  updateCategory: async (id, categoryData) => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const index = dummyCategories.findIndex((c) => c.id === parseInt(id));
          if (index !== -1) {
            dummyCategories[index] = {
              ...dummyCategories[index],
              ...categoryData,
            };
            resolve({ data: dummyCategories[index] });
          }
        }, 500);
      });
    }

    const response = await axiosInstance.put(`/categories/${id}`, categoryData);
    return response.data;
  },

  // Delete category (Admin only)
  deleteCategory: async (id) => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const index = dummyCategories.findIndex((c) => c.id === parseInt(id));
          if (index !== -1) {
            const deleted = dummyCategories.splice(index, 1);
            resolve({
              data: {
                message: `Category "${deleted[0].name}" deleted successfully`,
              },
            });
          } else {
            reject({ response: { data: { message: "Category not found" } } });
          }
        }, 500);
      });
    }

    const response = await axiosInstance.delete(`/categories/${id}`);
    return response.data;
  },

  // Get products by category
  getProductsByCategory: async (categoryId, params = {}) => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const products = dummyProductsByCategory[categoryId] || [];
          resolve({
            data: products,
            total: products.length,
            totalPages: 1,
            currentPage: 1,
          });
        }, 500);
      });
    }

    const response = await axiosInstance.get(
      `/categories/${categoryId}/products`,
      { params },
    );
    return response.data;
  },

  // Get category statistics (Admin only)
  getCategoryStats: async () => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const totalCategories = dummyCategories.length;
          const activeCategories = dummyCategories.filter(
            (c) => c.isActive,
          ).length;
          const totalProducts = dummyCategories.reduce(
            (sum, c) => sum + c.productCount,
            0,
          );

          resolve({
            data: {
              totalCategories,
              activeCategories,
              inactiveCategories: totalCategories - activeCategories,
              totalProducts,
              categories: dummyCategories.map((c) => ({
                name: c.name,
                productCount: c.productCount,
              })),
            },
          });
        }, 500);
      });
    }

    const response = await axiosInstance.get("/categories/stats");
    return response.data;
  },

  // Bulk create categories (Admin only)
  bulkCreateCategories: async (categories) => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newCategories = categories.map((cat, index) => ({
            id: dummyCategories.length + index + 1,
            ...cat,
            productCount: 0,
            isActive: true,
            createdAt: new Date().toISOString(),
          }));
          dummyCategories.push(...newCategories);
          resolve({
            data: newCategories,
            message: `${newCategories.length} categories created successfully`,
          });
        }, 500);
      });
    }

    const response = await axiosInstance.post("/categories/bulk", {
      categories,
    });
    return response.data;
  },

  // Reorder categories (Admin only)
  reorderCategories: async (orderedIds) => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Reorder the categories based on the orderedIds
          const ordered = orderedIds
            .map((id) => dummyCategories.find((c) => c.id === parseInt(id)))
            .filter(Boolean);

          // Update the order (in a real app, you'd store the order)
          resolve({
            data: ordered,
            message: "Categories reordered successfully",
          });
        }, 500);
      });
    }

    const response = await axiosInstance.put("/categories/reorder", {
      orderedIds,
    });
    return response.data;
  },
};

// ============================================================
// Exports
// ============================================================
export { categoryService };
export default categoryService;
