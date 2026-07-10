import axiosInstance from "./axios/axiosInstance";

// ============================================================
// 📦 DUMMY DATA FOR TESTING
// ============================================================
const dummyOrders = [
  {
    id: "ORD-001",
    customerName: "John Doe",
    customerEmail: "john.doe@email.com",
    customerPhone: "+234 801 234 5678",
    items: [
      {
        id: 1,
        name: "Premium Stock Fish",
        quantity: 2,
        price: 3500,
        image:
          "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=100",
      },
      {
        id: 3,
        name: "Organic Ogbono",
        quantity: 1,
        price: 3000,
        image:
          "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=100",
      },
      {
        id: 5,
        name: "Palm Oil (Pure)",
        quantity: 1,
        price: 4500,
        image:
          "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=100",
      },
    ],
    subtotal: 14500,
    shipping: 500,
    tax: 1087.5,
    total: 16087.5,
    status: "pending",
    paymentMethod: "card",
    paymentStatus: "paid",
    shippingAddress: "123 Main Street, Surulere, Lagos, 100001",
    createdAt: "2026-07-10T10:30:00Z",
    confirmedBy: null,
    confirmedAt: null,
  },
  {
    id: "ORD-002",
    customerName: "Jane Smith",
    customerEmail: "jane.smith@email.com",
    customerPhone: "+234 802 345 6789",
    items: [
      {
        id: 4,
        name: "Crawfish (Dried)",
        quantity: 3,
        price: 2800,
        image:
          "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=100",
      },
      {
        id: 7,
        name: "Brown Beans (Nigeria)",
        quantity: 2,
        price: 1800,
        image:
          "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=100",
      },
    ],
    subtotal: 12000,
    shipping: 500,
    tax: 900,
    total: 13400,
    status: "processing",
    paymentMethod: "transfer",
    paymentStatus: "paid",
    shippingAddress: "45 Adeola Street, Ikeja, Lagos, 100001",
    createdAt: "2026-07-09T14:20:00Z",
    confirmedBy: "Admin",
    confirmedAt: "2026-07-09T15:00:00Z",
  },
  {
    id: "ORD-003",
    customerName: "Mike Johnson",
    customerEmail: "mike.johnson@email.com",
    customerPhone: "+234 803 456 7890",
    items: [
      {
        id: 2,
        name: "Premium Egusi Seeds",
        quantity: 2,
        price: 2500,
        image:
          "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=100",
      },
      {
        id: 6,
        name: "Kpomo (Cow Skin)",
        quantity: 1,
        price: 2000,
        image:
          "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=100",
      },
    ],
    subtotal: 7000,
    shipping: 500,
    tax: 525,
    total: 8025,
    status: "shipped",
    paymentMethod: "card",
    paymentStatus: "paid",
    shippingAddress: "789 Victoria Island, Lagos, 100001",
    createdAt: "2026-07-08T09:15:00Z",
    confirmedBy: "Admin",
    confirmedAt: "2026-07-08T10:00:00Z",
  },
  {
    id: "ORD-004",
    customerName: "Sarah Adeyemi",
    customerEmail: "sarah.adeyemi@email.com",
    customerPhone: "+234 804 567 8901",
    items: [
      {
        id: 5,
        name: "Palm Oil (Pure)",
        quantity: 2,
        price: 4500,
        image:
          "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=100",
      },
      {
        id: 8,
        name: "Tuwo Rice",
        quantity: 3,
        price: 2200,
        image:
          "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=100",
      },
    ],
    subtotal: 15600,
    shipping: 500,
    tax: 1170,
    total: 17270,
    status: "delivered",
    paymentMethod: "card",
    paymentStatus: "paid",
    shippingAddress: "12 Ajah Road, Lekki, Lagos, 100001",
    createdAt: "2026-07-07T16:45:00Z",
    confirmedBy: "Admin",
    confirmedAt: "2026-07-07T17:30:00Z",
  },
  {
    id: "ORD-005",
    customerName: "Chidi Okonkwo",
    customerEmail: "chidi.okonkwo@email.com",
    customerPhone: "+234 805 678 9012",
    items: [
      {
        id: 1,
        name: "Premium Stock Fish",
        quantity: 1,
        price: 3500,
        image:
          "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=100",
      },
    ],
    subtotal: 3500,
    shipping: 500,
    tax: 262.5,
    total: 4262.5,
    status: "cancelled",
    paymentMethod: "transfer",
    paymentStatus: "refunded",
    shippingAddress: "56 Owerri Road, Enugu, 100001",
    createdAt: "2026-07-06T11:30:00Z",
    confirmedBy: "Admin",
    confirmedAt: "2026-07-06T12:00:00Z",
  },
];

// ============================================================
// Flag to use dummy data (set to false when API is ready)
// ============================================================
const USE_DUMMY_DATA = true; // ← Change to false when API is ready

const orderService = {
  // Get all orders (Admin only)
  getOrders: async (params = {}) => {
    if (USE_DUMMY_DATA) {
      // Return dummy data for testing
      return new Promise((resolve) => {
        setTimeout(() => {
          // Apply filters if needed
          let filtered = [...dummyOrders];
          if (params.status) {
            filtered = filtered.filter(
              (order) => order.status === params.status,
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

    // Real API call (when USE_DUMMY_DATA is false)
    const response = await axiosInstance.get("/orders", { params });
    return response.data;
  },

  // Get user's orders (Customer only)
  getUserOrders: async (params = {}) => {
    if (USE_DUMMY_DATA) {
      // Return dummy data filtered for customer
      return new Promise((resolve) => {
        setTimeout(() => {
          // Return first 3 orders as "customer orders"
          resolve({
            data: dummyOrders.slice(0, 3),
            total: 3,
            totalPages: 1,
            currentPage: 1,
          });
        }, 500);
      });
    }

    const response = await axiosInstance.get("/orders/user", { params });
    return response.data;
  },

  // Get single order by ID
  getOrderById: async (id) => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const order = dummyOrders.find((o) => o.id === id);
          if (order) {
            resolve({ data: order });
          } else {
            reject({ response: { data: { message: "Order not found" } } });
          }
        }, 500);
      });
    }

    const response = await axiosInstance.get(`/orders/${id}`);
    return response.data;
  },

  // Create new order
  createOrder: async (orderData) => {
    if (USE_DUMMY_DATA) {
      // Create a new order with dummy data
      return new Promise((resolve) => {
        setTimeout(() => {
          const newOrder = {
            id: `ORD-${String(dummyOrders.length + 1).padStart(3, "0")}`,
            ...orderData,
            createdAt: new Date().toISOString(),
            status: "pending",
            confirmedBy: null,
            confirmedAt: null,
          };
          dummyOrders.unshift(newOrder);
          resolve({ data: newOrder });
        }, 500);
      });
    }

    const response = await axiosInstance.post("/orders", orderData);
    return response.data;
  },

  // Update order status (Admin only)
  updateOrderStatus: async (id, statusData) => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const order = dummyOrders.find((o) => o.id === id);
          if (order) {
            order.status = statusData.status;
            if (statusData.status === "processing") {
              order.confirmedBy = "Admin";
              order.confirmedAt = new Date().toISOString();
            }
            resolve({ data: order });
          }
        }, 500);
      });
    }

    const response = await axiosInstance.put(
      `/orders/${id}/status`,
      statusData,
    );
    return response.data;
  },

  // Cancel order (Customer only)
  cancelOrder: async (id) => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const order = dummyOrders.find((o) => o.id === id);
          if (order) {
            order.status = "cancelled";
            resolve({ data: order });
          }
        }, 500);
      });
    }

    const response = await axiosInstance.put(`/orders/${id}/cancel`);
    return response.data;
  },

  // Get order tracking info
  getOrderTracking: async (id) => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: {
              orderId: id,
              status: "in_transit",
              trackingNumber: "TRK-123456",
              estimatedDelivery: "2026-07-12T00:00:00Z",
              updates: [
                { date: "2026-07-10T10:30:00Z", message: "Order confirmed" },
                { date: "2026-07-10T14:00:00Z", message: "Packed and ready" },
                { date: "2026-07-11T08:00:00Z", message: "In transit" },
              ],
            },
          });
        }, 500);
      });
    }

    const response = await axiosInstance.get(`/orders/${id}/tracking`);
    return response.data;
  },

  // Get order invoice
  getOrderInvoice: async (id) => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Return a dummy PDF blob
          const blob = new Blob(["Dummy Invoice Content"], {
            type: "application/pdf",
          });
          resolve(blob);
        }, 500);
      });
    }

    const response = await axiosInstance.get(`/orders/${id}/invoice`, {
      responseType: "blob",
    });
    return response.data;
  },

  // Get order statistics (Admin only)
  getOrderStats: async (params = {}) => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const totalOrders = dummyOrders.length;
          const pendingOrders = dummyOrders.filter(
            (o) => o.status === "pending",
          ).length;
          const processingOrders = dummyOrders.filter(
            (o) => o.status === "processing",
          ).length;
          const shippedOrders = dummyOrders.filter(
            (o) => o.status === "shipped",
          ).length;
          const deliveredOrders = dummyOrders.filter(
            (o) => o.status === "delivered",
          ).length;
          const cancelledOrders = dummyOrders.filter(
            (o) => o.status === "cancelled",
          ).length;
          const totalRevenue = dummyOrders.reduce((sum, o) => sum + o.total, 0);

          resolve({
            data: {
              totalOrders,
              pendingOrders,
              processingOrders,
              shippedOrders,
              deliveredOrders,
              cancelledOrders,
              totalRevenue,
              averageOrderValue:
                totalOrders > 0 ? totalRevenue / totalOrders : 0,
            },
          });
        }, 500);
      });
    }

    const response = await axiosInstance.get("/orders/stats", { params });
    return response.data;
  },

  // Export orders (Admin only)
  exportOrders: async (params = {}) => {
    if (USE_DUMMY_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Return a dummy CSV blob
          const csvData =
            "Order ID,Customer,Total,Status\n" +
            dummyOrders
              .map((o) => `${o.id},${o.customerName},${o.total},${o.status}`)
              .join("\n");
          const blob = new Blob([csvData], { type: "text/csv" });
          resolve(blob);
        }, 500);
      });
    }

    const response = await axiosInstance.get("/orders/export", {
      params,
      responseType: "blob",
    });
    return response.data;
  },
};

// ============================================================
// Exports
// ============================================================
export { orderService };
export default orderService;
