import axiosInstance from "./axios/axiosInstance";

// ============================================================
// 📦 DUMMY DATA FOR TESTING
// ============================================================
const dummyCustomers = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+234 801 234 5678",
    isActive: true,
    createdAt: "2026-07-01T10:00:00Z",
    orderCount: 5,
    totalSpent: 45000,
    addresses: [
      {
        id: 1,
        label: "home",
        firstName: "John",
        lastName: "Doe",
        phone: "+234 801 234 5678",
        address: "123 Main Street, Surulere",
        city: "Lagos",
        state: "Lagos",
        postalCode: "100001",
        isDefault: true,
      },
      {
        id: 2,
        label: "work",
        firstName: "John",
        lastName: "Doe",
        phone: "+234 801 234 5678",
        address: "456 Victoria Island",
        city: "Lagos",
        state: "Lagos",
        postalCode: "100001",
        isDefault: false,
      },
    ],
    recentOrders: [
      {
        id: "ORD-001",
        total: 16087.5,
        status: "delivered",
        createdAt: "2026-07-08T10:00:00Z",
      },
      {
        id: "ORD-003",
        total: 8025,
        status: "shipped",
        createdAt: "2026-07-06T14:00:00Z",
      },
    ],
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@email.com",
    phone: "+234 802 345 6789",
    isActive: true,
    createdAt: "2026-07-02T11:00:00Z",
    orderCount: 3,
    totalSpent: 28000,
    addresses: [
      {
        id: 3,
        label: "home",
        firstName: "Jane",
        lastName: "Smith",
        phone: "+234 802 345 6789",
        address: "789 Adeola Street, Ikeja",
        city: "Lagos",
        state: "Lagos",
        postalCode: "100001",
        isDefault: true,
      },
    ],
    recentOrders: [
      {
        id: "ORD-002",
        total: 13400,
        status: "processing",
        createdAt: "2026-07-07T09:00:00Z",
      },
    ],
  },
];

// Dummy addresses for getAddresses
const dummyAddresses = [
  {
    id: 1,
    label: "home",
    firstName: "John",
    lastName: "Doe",
    phone: "+234 801 234 5678",
    address: "123 Main Street, Surulere",
    city: "Lagos",
    state: "Lagos",
    postalCode: "100001",
    isDefault: true,
  },
  {
    id: 2,
    label: "work",
    firstName: "John",
    lastName: "Doe",
    phone: "+234 801 234 5678",
    address: "456 Victoria Island",
    city: "Lagos",
    state: "Lagos",
    postalCode: "100001",
    isDefault: false,
  },
  {
    id: 3,
    label: "home",
    firstName: "Jane",
    lastName: "Smith",
    phone: "+234 802 345 6789",
    address: "789 Adeola Street, Ikeja",
    city: "Lagos",
    state: "Lagos",
    postalCode: "100001",
    isDefault: true,
  },
];

// Dummy wishlist
const dummyWishlist = [
  {
    id: 1,
    productId: 1,
    name: "Premium Stock Fish",
    price: 3500,
    image: "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=100",
  },
  {
    id: 2,
    productId: 3,
    name: "Organic Ogbono",
    price: 3000,
    image: "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=100",
  },
];

// ============================================================
// Flag to use dummy data (set to false when API is ready)
// ============================================================
const USE_DUMMY_DATA = true; // ← Change to false when API is ready

const customerService = {
  // Get all customers (Admin only)
  getCustomers: async (params = {}) => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          let filtered = [...dummyCustomers];

          // Filter by search
          if (params.search) {
            const query = params.search.toLowerCase();
            filtered = filtered.filter(
              (c) =>
                c.firstName.toLowerCase().includes(query) ||
                c.lastName.toLowerCase().includes(query) ||
                c.email.toLowerCase().includes(query) ||
                c.phone.includes(query),
            );
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

    const response = await axiosInstance.get("/customers", { params });
    return response.data;
  },

  // Get single customer (Admin only)
  getCustomerById: async (id) => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const customer = dummyCustomers.find((c) => c.id === parseInt(id));
          if (customer) {
            resolve({ data: customer });
          } else {
            reject({ response: { data: { message: "Customer not found" } } });
          }
        }, 500);
      });
    }

    const response = await axiosInstance.get(`/customers/${id}`);
    return response.data;
  },

  // Get customer profile (Customer)
  getProfile: async () => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Return first customer as "logged in" user
          resolve({ data: dummyCustomers[0] });
        }, 500);
      });
    }

    const response = await axiosInstance.get("/customers/profile");
    return response.data;
  },

  // Update customer profile (Customer)
  updateProfile: async (profileData) => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const updated = { ...dummyCustomers[0], ...profileData };
          dummyCustomers[0] = updated;
          resolve({ data: updated });
        }, 500);
      });
    }

    const response = await axiosInstance.put("/customers/profile", profileData);
    return response.data;
  },

  // Get customer addresses
  getAddresses: async () => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: dummyAddresses });
        }, 500);
      });
    }

    const response = await axiosInstance.get("/customers/addresses");
    return response.data;
  },

  // Create new address
  createAddress: async (addressData) => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newAddress = {
            id: dummyAddresses.length + 1,
            ...addressData,
          };
          dummyAddresses.push(newAddress);
          resolve({ data: newAddress });
        }, 500);
      });
    }

    const response = await axiosInstance.post(
      "/customers/addresses",
      addressData,
    );
    return response.data;
  },

  // Update address
  updateAddress: async (id, addressData) => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const index = dummyAddresses.findIndex((a) => a.id === parseInt(id));
          if (index !== -1) {
            dummyAddresses[index] = {
              ...dummyAddresses[index],
              ...addressData,
            };
            resolve({ data: dummyAddresses[index] });
          }
        }, 500);
      });
    }

    const response = await axiosInstance.put(
      `/customers/addresses/${id}`,
      addressData,
    );
    return response.data;
  },

  // Delete address
  deleteAddress: async (id) => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const index = dummyAddresses.findIndex((a) => a.id === parseInt(id));
          if (index !== -1) {
            dummyAddresses.splice(index, 1);
            resolve({ data: { message: "Address deleted successfully" } });
          }
        }, 500);
      });
    }

    const response = await axiosInstance.delete(`/customers/addresses/${id}`);
    return response.data;
  },

  // Set default address
  setDefaultAddress: async (id) => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          dummyAddresses.forEach((a) => {
            a.isDefault = a.id === parseInt(id);
          });
          resolve({ data: { message: "Default address set successfully" } });
        }, 500);
      });
    }

    const response = await axiosInstance.put(
      `/customers/addresses/${id}/default`,
    );
    return response.data;
  },

  // Get customer orders
  getCustomerOrders: async (params = {}) => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: dummyCustomers[0].recentOrders || [],
            total: dummyCustomers[0].recentOrders?.length || 0,
            totalPages: 1,
            currentPage: 1,
          });
        }, 500);
      });
    }

    const response = await axiosInstance.get("/customers/orders", { params });
    return response.data;
  },

  // Get customer wishlist
  getWishlist: async () => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: dummyWishlist });
        }, 500);
      });
    }

    const response = await axiosInstance.get("/customers/wishlist");
    return response.data;
  },

  // Add to wishlist
  addToWishlist: async (productId) => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newItem = {
            id: dummyWishlist.length + 1,
            productId,
            name: `Product ${productId}`,
            price: 1000,
            image:
              "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=100",
          };
          dummyWishlist.push(newItem);
          resolve({ data: newItem });
        }, 500);
      });
    }

    const response = await axiosInstance.post("/customers/wishlist", {
      productId,
    });
    return response.data;
  },

  // Remove from wishlist
  removeFromWishlist: async (productId) => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const index = dummyWishlist.findIndex(
            (w) => w.productId === parseInt(productId),
          );
          if (index !== -1) {
            dummyWishlist.splice(index, 1);
            resolve({ data: { message: "Removed from wishlist" } });
          }
        }, 500);
      });
    }

    const response = await axiosInstance.delete(
      `/customers/wishlist/${productId}`,
    );
    return response.data;
  },

  // Get customer statistics (Admin only)
  getCustomerStats: async () => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const totalCustomers = dummyCustomers.length;
          const activeCustomers = dummyCustomers.filter(
            (c) => c.isActive,
          ).length;
          const totalRevenue = dummyCustomers.reduce(
            (sum, c) => sum + c.totalSpent,
            0,
          );

          resolve({
            data: {
              totalCustomers,
              activeCustomers,
              inactiveCustomers: totalCustomers - activeCustomers,
              totalRevenue,
              averageOrderValue:
                totalCustomers > 0 ? totalRevenue / totalCustomers : 0,
              customers: dummyCustomers.map((c) => ({
                name: `${c.firstName} ${c.lastName}`,
                email: c.email,
                totalSpent: c.totalSpent,
                orderCount: c.orderCount,
              })),
            },
          });
        }, 500);
      });
    }

    const response = await axiosInstance.get("/customers/stats");
    return response.data;
  },
};

// ============================================================
// Exports
// ============================================================
export { customerService };
export default customerService;
