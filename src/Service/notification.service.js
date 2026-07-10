import axiosInstance from "./axios/axiosInstance";

const notificationService = {
  // Get all notifications
  getNotifications: async (params = {}) => {
    const response = await axiosInstance.get("/notifications", { params });
    return response.data;
  },

  // Get admin notifications (Admin only)
  getAdminNotifications: async (params = {}) => {
    const response = await axiosInstance.get("/notifications/admin", {
      params,
    });
    return response.data;
  },

  // Get single notification
  getNotificationById: async (id) => {
    const response = await axiosInstance.get(`/notifications/${id}`);
    return response.data;
  },

  // Mark notification as read
  markAsRead: async (id) => {
    const response = await axiosInstance.put(`/notifications/${id}/read`);
    return response.data;
  },

  // Mark admin notification as read (Admin only)
  markAdminNotificationAsRead: async (id) => {
    const response = await axiosInstance.put(`/notifications/admin/${id}/read`);
    return response.data;
  },

  // Mark all notifications as read
  markAllAsRead: async () => {
    const response = await axiosInstance.put("/notifications/read-all");
    return response.data;
  },

  // Delete notification
  deleteNotification: async (id) => {
    const response = await axiosInstance.delete(`/notifications/${id}`);
    return response.data;
  },

  // Delete admin notification (Admin only)
  deleteAdminNotification: async (id) => {
    const response = await axiosInstance.delete(`/notifications/admin/${id}`);
    return response.data;
  },

  // Delete all notifications
  deleteAllNotifications: async () => {
    const response = await axiosInstance.delete("/notifications");
    return response.data;
  },

  // Get unread count
  getUnreadCount: async () => {
    const response = await axiosInstance.get("/notifications/unread-count");
    return response.data;
  },

  // Send notification (Admin only)
  sendNotification: async (notificationData) => {
    const response = await axiosInstance.post(
      "/notifications/send",
      notificationData,
    );
    return response.data;
  },

  // Send bulk notifications (Admin only)
  sendBulkNotifications: async (notificationData) => {
    const response = await axiosInstance.post(
      "/notifications/send-bulk",
      notificationData,
    );
    return response.data;
  },
};

export { notificationService };
export default notificationService;
