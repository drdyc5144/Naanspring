import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBell,
  FaCheck,
  FaCheckDouble,
  FaTrash,
  FaShoppingBag,
  FaTruck,
  FaCreditCard,
  FaTag,
  FaClock,
  FaUser,
  FaBox,
  FaExclamationTriangle,
} from "react-icons/fa";
import { Button, Loader } from "../../../Components/Common";
import { notificationService } from "../../../Service/notification.service";

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      // Mock data - replace with actual API call
      const mockData = [
        {
          id: 1,
          type: "order",
          title: "New Order #ORD-1234",
          message: "John Doe placed a new order for ₦35,000",
          isRead: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
        },
        {
          id: 2,
          type: "payment",
          title: "Payment Received",
          message: "Payment of ₦42,000 confirmed for Order #ORD-1230",
          isRead: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
        },
        {
          id: 3,
          type: "shipping",
          title: "Order Shipped",
          message: "Order #ORD-1228 has been shipped to Jane Smith",
          isRead: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        },
        {
          id: 4,
          type: "customer",
          title: "New Customer Registered",
          message: "Michael Johnson created a new account",
          isRead: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
        },
        {
          id: 5,
          type: "inventory",
          title: "Low Stock Alert",
          message: "Stock Fish is running low (5 units remaining)",
          isRead: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
        },
        {
          id: 6,
          type: "order",
          title: "Order Cancelled",
          message: "Order #ORD-1225 was cancelled by customer",
          isRead: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
        },
        {
          id: 7,
          type: "promotion",
          title: "Promotion Ended",
          message: "Summer Sale promotion has ended",
          isRead: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
        },
      ];

      setNotifications(mockData);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      // await notificationService.markAsRead(id)
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, isRead: true } : notif,
        ),
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      // await notificationService.markAllAsRead()
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, isRead: true })),
      );
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // await notificationService.deleteNotification(id)
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      // await notificationService.deleteAllNotifications()
      setNotifications([]);
    } catch (error) {
      console.error("Error deleting all notifications:", error);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "order":
        return FaShoppingBag;
      case "shipping":
        return FaTruck;
      case "payment":
        return FaCreditCard;
      case "promotion":
        return FaTag;
      case "customer":
        return FaUser;
      case "inventory":
        return FaBox;
      default:
        return FaBell;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case "order":
        return "bg-blue-100 text-blue-600";
      case "shipping":
        return "bg-purple-100 text-purple-600";
      case "payment":
        return "bg-green-100 text-green-600";
      case "promotion":
        return "bg-orange-100 text-orange-600";
      case "customer":
        return "bg-indigo-100 text-indigo-600";
      case "inventory":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(date).toLocaleDateString();
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "unread") return !notif.isRead;
    if (filter === "read") return notif.isRead;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  if (isLoading) {
    return <Loader size="lg" text="Loading notifications..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
          <p className="text-sm text-gray-500">
            {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              <FaCheckDouble className="w-4 h-4" />
              Mark all as read
            </button>
          )}

          {notifications.length > 0 && (
            <button
              onClick={handleDeleteAll}
              className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium"
            >
              <FaTrash className="w-4 h-4" />
              Delete all
            </button>
          )}

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
          >
            <option value="all">All</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        </div>
      </div>

      {/* Notifications List */}
      {filteredNotifications.length > 0 ? (
        <div className="space-y-3">
          <AnimatePresence>
            {filteredNotifications.map((notification) => {
              const Icon = getIcon(notification.type);
              const color = getColor(notification.type);

              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className={`
                    bg-white rounded-xl shadow-sm p-4 transition-all
                    ${!notification.isRead ? "border-l-4 border-primary-500" : ""}
                    hover:shadow-md
                  `}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${color} flex-shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4
                            className={`font-medium ${!notification.isRead ? "text-gray-800" : "text-gray-600"}`}
                          >
                            {notification.title}
                          </h4>
                          <p className="text-sm text-gray-500 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                            <FaClock className="w-3 h-3" />
                            {getTimeAgo(notification.createdAt)}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          {!notification.isRead && (
                            <button
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
                              title="Mark as read"
                            >
                              <FaCheck className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(notification.id)}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaBell className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            No notifications
          </h3>
          <p className="text-gray-500">
            {filter !== "all"
              ? `No ${filter} notifications found`
              : "You're all caught up! No notifications to show."}
          </p>
        </div>
      )}

      {/* Notification Types Legend */}
      {notifications.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Notification Types
          </h4>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 text-sm">
              <div className="p-1.5 rounded bg-blue-100 text-blue-600">
                <FaShoppingBag className="w-3 h-3" />
              </div>
              <span className="text-gray-600">Order</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="p-1.5 rounded bg-purple-100 text-purple-600">
                <FaTruck className="w-3 h-3" />
              </div>
              <span className="text-gray-600">Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="p-1.5 rounded bg-green-100 text-green-600">
                <FaCreditCard className="w-3 h-3" />
              </div>
              <span className="text-gray-600">Payment</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="p-1.5 rounded bg-orange-100 text-orange-600">
                <FaTag className="w-3 h-3" />
              </div>
              <span className="text-gray-600">Promotion</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="p-1.5 rounded bg-indigo-100 text-indigo-600">
                <FaUser className="w-3 h-3" />
              </div>
              <span className="text-gray-600">Customer</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="p-1.5 rounded bg-red-100 text-red-600">
                <FaBox className="w-3 h-3" />
              </div>
              <span className="text-gray-600">Inventory</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNotifications;
