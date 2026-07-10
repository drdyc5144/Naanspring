import axiosInstance from "./axios/axiosInstance";

// ============================================================
// 📦 DUMMY DATA FOR TESTING
// ============================================================
const dummyCategories = [
  { id: 1, name: "Fish", icon: "🐟", productCount: 12 },
  { id: 2, name: "Seeds", icon: "🌾", productCount: 18 },
  { id: 3, name: "Seafood", icon: "🦐", productCount: 8 },
  { id: 4, name: "Oils", icon: "🫒", productCount: 6 },
  { id: 5, name: "Meat", icon: "🥩", productCount: 10 },
  { id: 6, name: "Legumes", icon: "🫘", productCount: 15 },
  { id: 7, name: "Grains", icon: "🌽", productCount: 20 },
];

const dummyProducts = [
  {
    id: 1,
    name: "Premium Stock Fish",
    description:
      "High-quality dried stock fish, perfect for soups and stews. Sourced from the finest catch.",
    price: 3500,
    originalPrice: 4000,
    discount: 12.5,
    image: "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=300",
    images: [
      "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=600",
      "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=600&h=400",
      "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=600&h=400",
    ],
    category: { id: 1, name: "Fish", icon: "🐟" }, // ← Category object
    categoryId: 1, // ← Category ID
    stock: 45,
    rating: 4.8,
    reviews: 127,
    isFeatured: true,
    isNew: false,
    inStock: true,
    createdAt: "2026-07-01T10:00:00Z",
  },
  {
    id: 2,
    name: "Smoked Fish",
    description:
      "Premium smoked fish, perfect for adding rich flavor to your dishes.",
    price: 2800,
    originalPrice: 3200,
    discount: 12.5,
    image: "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=300",
    images: [
      "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=600",
    ],
    category: { id: 1, name: "Fish", icon: "🐟" },
    categoryId: 1,
    stock: 20,
    rating: 4.5,
    reviews: 45,
    isFeatured: false,
    isNew: true,
    inStock: true,
    createdAt: "2026-07-05T10:00:00Z",
  },
  {
    id: 3,
    name: "Premium Egusi Seeds",
    description:
      "High-quality egusi seeds, perfect for making delicious egusi soup. Cleaned and sorted.",
    price: 2500,
    originalPrice: null,
    discount: 0,
    image: "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=300",
    images: [
      "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=600",
    ],
    category: { id: 2, name: "Seeds", icon: "🌾" },
    categoryId: 2,
    stock: 30,
    rating: 4.6,
    reviews: 89,
    isFeatured: true,
    isNew: false,
    inStock: true,
    createdAt: "2026-07-02T11:00:00Z",
  },
  {
    id: 4,
    name: "Organic Ogbono",
    description:
      "Premium ogbono seeds, perfect for making traditional ogbono soup. Rich in nutrients.",
    price: 3000,
    originalPrice: 3500,
    discount: 14.3,
    image: "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=300",
    images: [
      "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=600",
    ],
    category: { id: 2, name: "Seeds", icon: "🌾" },
    categoryId: 2,
    stock: 20,
    rating: 4.7,
    reviews: 56,
    isFeatured: false,
    isNew: true,
    inStock: true,
    createdAt: "2026-07-03T10:00:00Z",
  },
  {
    id: 5,
    name: "Crawfish (Dried)",
    description:
      "Premium dried crawfish, perfect for adding flavor to soups and stews. Packed with protein.",
    price: 2800,
    originalPrice: null,
    discount: 0,
    image: "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=300",
    images: [
      "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=600",
    ],
    category: { id: 3, name: "Seafood", icon: "🦐" },
    categoryId: 3,
    stock: 8,
    rating: 4.9,
    reviews: 203,
    isFeatured: false,
    isNew: false,
    inStock: true,
    createdAt: "2026-07-04T10:00:00Z",
  },
  {
    id: 6,
    name: "Palm Oil (Pure)",
    description:
      "100% pure organic palm oil, extracted from the finest palm fruits. Rich in vitamins.",
    price: 4500,
    originalPrice: 5000,
    discount: 10,
    image: "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=300",
    images: [
      "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=600",
    ],
    category: { id: 4, name: "Oils", icon: "🫒" },
    categoryId: 4,
    stock: 15,
    rating: 4.8,
    reviews: 167,
    isFeatured: true,
    isNew: false,
    inStock: true,
    createdAt: "2026-07-05T10:00:00Z",
  },
  {
    id: 7,
    name: "Kpomo (Cow Skin)",
    description:
      "Premium cow skin (kpomo), cleaned and ready for cooking. Perfect for soups and stews.",
    price: 2000,
    originalPrice: null,
    discount: 0,
    image: "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=300",
    images: [
      "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=600",
    ],
    category: { id: 5, name: "Meat", icon: "🥩" },
    categoryId: 5,
    stock: 25,
    rating: 4.5,
    reviews: 78,
    isFeatured: false,
    isNew: false,
    inStock: true,
    createdAt: "2026-07-06T10:00:00Z",
  },
  {
    id: 8,
    name: "Brown Beans (Nigeria)",
    description:
      "Premium Nigerian brown beans, rich in protein and fiber. Perfect for making beans porridge.",
    price: 1800,
    originalPrice: 2000,
    discount: 10,
    image: "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=300",
    images: [
      "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=600",
    ],
    category: { id: 6, name: "Legumes", icon: "🫘" },
    categoryId: 6,
    stock: 50,
    rating: 4.7,
    reviews: 112,
    isFeatured: false,
    isNew: false,
    inStock: true,
    createdAt: "2026-07-07T10:00:00Z",
  },
  {
    id: 9,
    name: "Tuwo Rice",
    description:
      "Premium tuwo rice, perfect for making tuwo shinkafa. Smooth and easy to prepare.",
    price: 2200,
    originalPrice: null,
    discount: 0,
    image: "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=300",
    images: [
      "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=600",
    ],
    category: { id: 7, name: "Grains", icon: "🌽" },
    categoryId: 7,
    stock: 5,
    rating: 4.4,
    reviews: 45,
    isFeatured: false,
    isNew: true,
    inStock: true,
    createdAt: "2026-07-08T10:00:00Z",
  },
];

// ============================================================
// Flag to use dummy data (set to false when API is ready)
// ============================================================
const USE_DUMMY_DATA = true; // ← Change to false when API is ready

const productService = {
  // Get all products
  getProducts: async (params = {}) => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          let filtered = [...dummyProducts];

          // Filter by category
          if (params.category) {
            filtered = filtered.filter(
              (p) => p.categoryId === parseInt(params.category),
            );
          }

          // Filter by price range
          if (params.minPrice) {
            filtered = filtered.filter(
              (p) => p.price >= parseInt(params.minPrice),
            );
          }
          if (params.maxPrice) {
            filtered = filtered.filter(
              (p) => p.price <= parseInt(params.maxPrice),
            );
          }

          // Sort
          if (params.sort) {
            switch (params.sort) {
              case "price_asc":
                filtered.sort((a, b) => a.price - b.price);
                break;
              case "price_desc":
                filtered.sort((a, b) => b.price - a.price);
                break;
              case "newest":
                filtered.sort(
                  (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
                );
                break;
              case "popular":
                filtered.sort((a, b) => b.reviews - a.reviews);
                break;
              case "rating":
                filtered.sort((a, b) => b.rating - a.rating);
                break;
              default:
                break;
            }
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

    const response = await axiosInstance.get("/products", { params });
    return response.data;
  },

  // Get single product
  getProductById: async (id) => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const product = dummyProducts.find((p) => p.id === parseInt(id));
          if (product) {
            resolve({ data: product });
          } else {
            reject({ response: { data: { message: "Product not found" } } });
          }
        }, 500);
      });
    }

    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  },

  // Create product (Admin)
  createProduct: async (productData) => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newProduct = {
            id: dummyProducts.length + 1,
            ...productData,
            // Add category object if categoryId is provided
            category:
              dummyCategories.find((c) => c.id === productData.categoryId) ||
              null,
            rating: 0,
            reviews: 0,
            createdAt: new Date().toISOString(),
          };
          dummyProducts.push(newProduct);
          resolve({ data: newProduct });
        }, 500);
      });
    }

    const response = await axiosInstance.post("/products", productData);
    return response.data;
  },

  // Update product (Admin)
  updateProduct: async (id, productData) => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const index = dummyProducts.findIndex((p) => p.id === parseInt(id));
          if (index !== -1) {
            dummyProducts[index] = {
              ...dummyProducts[index],
              ...productData,
              // Update category object if categoryId changes
              category: productData.categoryId
                ? dummyCategories.find((c) => c.id === productData.categoryId)
                : dummyProducts[index].category,
            };
            resolve({ data: dummyProducts[index] });
          }
        }, 500);
      });
    }

    const response = await axiosInstance.put(`/products/${id}`, productData);
    return response.data;
  },

  // Delete product (Admin)
  deleteProduct: async (id) => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const index = dummyProducts.findIndex((p) => p.id === parseInt(id));
          if (index !== -1) {
            dummyProducts.splice(index, 1);
            resolve({ data: { message: "Product deleted successfully" } });
          }
        }, 500);
      });
    }

    const response = await axiosInstance.delete(`/products/${id}`);
    return response.data;
  },

  // Search products
  searchProducts: async (query) => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const filtered = dummyProducts.filter(
            (p) =>
              p.name.toLowerCase().includes(query.toLowerCase()) ||
              p.description.toLowerCase().includes(query.toLowerCase()),
          );
          resolve({
            data: filtered,
            total: filtered.length,
            totalPages: 1,
            currentPage: 1,
          });
        }, 500);
      });
    }

    const response = await axiosInstance.get("/products/search", {
      params: { q: query },
    });
    return response.data;
  },

  // Get products by category
  getProductsByCategory: async (categoryId) => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const filtered = dummyProducts.filter(
            (p) => p.categoryId === parseInt(categoryId),
          );
          resolve({
            data: filtered,
            total: filtered.length,
            totalPages: 1,
            currentPage: 1,
          });
        }, 500);
      });
    }

    const response = await axiosInstance.get(
      `/products/category/${categoryId}`,
    );
    return response.data;
  },

  // Get featured products
  getFeaturedProducts: async () => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const filtered = dummyProducts.filter((p) => p.isFeatured);
          resolve({
            data: filtered,
            total: filtered.length,
            totalPages: 1,
            currentPage: 1,
          });
        }, 500);
      });
    }

    const response = await axiosInstance.get("/products/featured");
    return response.data;
  },

  // Get product reviews
  getProductReviews: async (productId) => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: [
              {
                id: 1,
                user: "John Doe",
                rating: 5,
                comment: "Excellent product! Highly recommended.",
                createdAt: "2026-07-01T10:00:00Z",
              },
              {
                id: 2,
                user: "Jane Smith",
                rating: 4,
                comment: "Good quality, fast delivery.",
                createdAt: "2026-07-02T11:00:00Z",
              },
            ],
            total: 2,
          });
        }, 500);
      });
    }

    const response = await axiosInstance.get(`/products/${productId}/reviews`);
    return response.data;
  },

  // Add product review
  addProductReview: async (productId, reviewData) => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newReview = {
            id: Math.floor(Math.random() * 1000),
            ...reviewData,
            createdAt: new Date().toISOString(),
          };
          resolve({ data: newReview });
        }, 500);
      });
    }

    const response = await axiosInstance.post(
      `/products/${productId}/reviews`,
      reviewData,
    );
    return response.data;
  },

  // Get categories (Helper method)
  getCategories: async () => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: dummyCategories,
          });
        }, 500);
      });
    }

    const response = await axiosInstance.get("/categories");
    return response.data;
  },
};

// ============================================================
// Exports
// ============================================================
export { productService };
export default productService;
