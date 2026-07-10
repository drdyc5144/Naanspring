import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaShoppingBag,
  FaBox,
  FaHeart,
  FaUser,
  FaClock,
  FaTruck,
  FaStar,
  FaArrowRight,
} from "react-icons/fa";
import { DashboardCard } from "../../../Components/Common";
import { useAuth } from "../../../Hooks/useAuth";
import { orderService } from "../../../Service/order.service";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    wishlistCount: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // Fetch orders
      const ordersResponse = await orderService.getUserOrders();
      const orders = ordersResponse.data || [];

      setRecentOrders(orders.slice(0, 5));
      setStats({
        totalOrders: orders.length,
        pendingOrders: orders.filter((o) => o.status === "pending").length,
        deliveredOrders: orders.filter((o) => o.status === "delivered").length,
        wishlistCount: 0, // Will implement wishlist later
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const statusIcons = {
    pending: <FaClock className="w-4 h-4" />,
    processing: <FaBox className="w-4 h-4" />,
    shipped: <FaTruck className="w-4 h-4" />,
    delivered: <FaStar className="w-4 h-4" />,
    cancelled: <FaBox className="w-4 h-4" />,
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-800 to-primary-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold">
          Welcome back, {user?.firstName || "Customer"}! 👋
        </h1>
        <p className="text-primary-100 mt-1">
          Here's what's happening with your orders today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={FaShoppingBag}
          color="primary"
          isLoading={isLoading}
        />
        <DashboardCard
          title="Pending Orders"
          value={stats.pendingOrders}
          icon={FaClock}
          color="warning"
          isLoading={isLoading}
        />
        <DashboardCard
          title="Delivered"
          value={stats.deliveredOrders}
          icon={FaTruck}
          color="success"
          isLoading={isLoading}
        />
        <DashboardCard
          title="Wishlist"
          value={stats.wishlistCount}
          icon={FaHeart}
          color="secondary"
          isLoading={isLoading}
        />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
          <Link
            to="/account/orders"
            className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
          >
            View All
            <FaArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-gray-100 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : recentOrders.length > 0 ? (
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-primary-200 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded-full ${statusColors[order.status] || "bg-gray-100"}`}
                  >
                    {statusIcons[order.status] || <FaBox className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      Order #{order.id}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">
                    ₦{order.total?.toLocaleString()}
                  </p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${statusColors[order.status] || "bg-gray-100"}`}
                  >
                    {order.status?.charAt(0).toUpperCase() +
                      order.status?.slice(1)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <FaShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No orders yet</p>
            <Link
              to="/shop"
              className="mt-3 inline-block text-primary-600 hover:text-primary-700 font-medium"
            >
              Start Shopping →
            </Link>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          to="/shop"
          className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
        >
          <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-2">
            <FaShoppingBag className="w-6 h-6 text-primary-600" />
          </div>
          <span className="text-sm font-medium text-gray-700">Shop Now</span>
        </Link>

        <Link
          to="/account/orders"
          className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
        >
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
            <FaBox className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-sm font-medium text-gray-700">My Orders</span>
        </Link>

        <Link
          to="/account/profile"
          className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
        >
          <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-2">
            <FaUser className="w-6 h-6 text-purple-600" />
          </div>
          <span className="text-sm font-medium text-gray-700">Profile</span>
        </Link>

        <Link
          to="/account/addresses"
          className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
        >
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-2">
            <FaTruck className="w-6 h-6 text-green-600" />
          </div>
          <span className="text-sm font-medium text-gray-700">Addresses</span>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
