import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaShoppingBag,
  FaUsers,
  FaBox,
  FaMoneyBillWave,
  FaEye,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { DashboardCard } from "../../../Components/Common";
import { adminService } from "../../../Service/admin.service";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    totalProducts: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    revenueGrowth: 0,
    ordersGrowth: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // Mock data - replace with actual API call
      const data = {
        totalOrders: 156,
        totalRevenue: 2450000,
        totalCustomers: 89,
        totalProducts: 45,
        pendingOrders: 12,
        deliveredOrders: 134,
        revenueGrowth: 12.5,
        ordersGrowth: 8.3,
        recentOrders: [
          {
            id: "ORD-001",
            customerName: "John Doe",
            total: 35000,
            status: "pending",
            createdAt: new Date().toISOString(),
          },
          {
            id: "ORD-002",
            customerName: "Jane Smith",
            total: 42000,
            status: "shipped",
            createdAt: new Date().toISOString(),
          },
          {
            id: "ORD-003",
            customerName: "Mike Johnson",
            total: 28000,
            status: "delivered",
            createdAt: new Date().toISOString(),
          },
        ],
      };

      setStats({
        totalOrders: data.totalOrders,
        totalRevenue: data.totalRevenue,
        totalCustomers: data.totalCustomers,
        totalProducts: data.totalProducts,
        pendingOrders: data.pendingOrders,
        deliveredOrders: data.deliveredOrders,
        revenueGrowth: data.revenueGrowth,
        ordersGrowth: data.ordersGrowth,
      });

      setRecentOrders(data.recentOrders);
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

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Welcome back! Here's what's happening with your store.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Total Revenue"
          value={`₦${stats.totalRevenue.toLocaleString()}`}
          icon={FaMoneyBillWave}
          color="success"
          trend={stats.revenueGrowth}
          isLoading={isLoading}
        />
        <DashboardCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={FaShoppingBag}
          color="primary"
          trend={stats.ordersGrowth}
          isLoading={isLoading}
        />
        <DashboardCard
          title="Total Customers"
          value={stats.totalCustomers}
          icon={FaUsers}
          color="secondary"
          isLoading={isLoading}
        />
        <DashboardCard
          title="Total Products"
          value={stats.totalProducts}
          icon={FaBox}
          color="warning"
          isLoading={isLoading}
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Orders</p>
              <p className="text-2xl font-bold text-yellow-600">
                {stats.pendingOrders}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <FaClock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Delivered Orders</p>
              <p className="text-2xl font-bold text-green-600">
                {stats.deliveredOrders}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <FaCheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Cancelled Orders</p>
              <p className="text-2xl font-bold text-red-600">
                {stats.totalOrders -
                  stats.pendingOrders -
                  stats.deliveredOrders}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <FaTimesCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
          <Link
            to="/admin/orders"
            className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-1"
          >
            View All
            <FaEye className="w-4 h-4" />
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
                className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:border-primary-200 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FaShoppingBag className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      Order #{order.id}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.customerName} •{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">
                    ₦{order.total.toLocaleString()}
                  </p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${statusColors[order.status]}`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No recent orders</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
