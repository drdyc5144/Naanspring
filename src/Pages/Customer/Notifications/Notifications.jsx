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
} from "react-icons/fa";
import { notificationService } from "../../../Service/notification.service";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const response = await notificationService.getNotifications();
      setNotifications(response.data || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
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
      await notificationService.markAllAsRead();
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, isRead: true })),
      );
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await notificationService.deleteNotification(id);
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    } catch (error) {
      console.error("Error deleting notification:", error);
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
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "unread") return !notif.isRead;
    if (filter === "read") return notif.isRead;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

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

        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              <FaCheckDouble className="w-4 h-4" />
              Mark all as read
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
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-20 bg-gray-100 rounded-xl"></div>
            </div>
          ))}
        </div>
      ) : filteredNotifications.length > 0 ? (
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
                            {new Date(notification.createdAt).toLocaleString()}
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
    </div>
  );
};

export default Notifications;
