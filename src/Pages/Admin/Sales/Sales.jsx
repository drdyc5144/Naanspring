import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaMoneyBillWave,
  FaShoppingBag,
  FaUsers,
  FaBox,
  FaCalendarAlt,
  FaDownload,
  FaPrint,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { Button, Loader } from "../../../Components/Common";
import { adminService } from "../../../Service/admin.service";

const Sales = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState("month");
  const [salesData, setSalesData] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    topProducts: [],
    dailySales: [],
    comparison: {
      revenue: 0,
      orders: 0,
    },
  });

  useEffect(() => {
    fetchSalesData();
  }, [period]);

  const fetchSalesData = async () => {
    setIsLoading(true);
    try {
      // Mock data - replace with actual API call
      const data = {
        totalRevenue: 2450000,
        totalOrders: 156,
        averageOrderValue: 15705,
        comparison: {
          revenue: 12.5,
          orders: 8.3,
        },
        topProducts: [
          { name: "Stock Fish", sales: 45, revenue: 450000 },
          { name: "Egusi", sales: 38, revenue: 304000 },
          { name: "Ogbono", sales: 32, revenue: 256000 },
          { name: "Crawfish", sales: 28, revenue: 224000 },
          { name: "Palm Oil", sales: 25, revenue: 200000 },
        ],
        dailySales: [
          { date: "2026-07-01", orders: 12, revenue: 180000 },
          { date: "2026-07-02", orders: 15, revenue: 225000 },
          { date: "2026-07-03", orders: 10, revenue: 150000 },
          { date: "2026-07-04", orders: 18, revenue: 270000 },
          { date: "2026-07-05", orders: 14, revenue: 210000 },
        ],
      };
      setSalesData(data);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return `₦${amount.toLocaleString()}`;
  };

  if (isLoading) {
    return <Loader size="lg" text="Loading sales data..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Sales Report</h1>
          <p className="text-sm text-gray-500">
            Track your store's performance
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <Button variant="outline" className="flex items-center gap-2">
            <FaDownload className="w-4 h-4" />
            Export
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <FaPrint className="w-4 h-4" />
            Print
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-800">
                {formatCurrency(salesData.totalRevenue)}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <FaMoneyBillWave className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1 text-sm">
            {salesData.comparison.revenue > 0 ? (
              <>
                <FaArrowUp className="text-green-600" />
                <span className="text-green-600">
                  {salesData.comparison.revenue}%
                </span>
              </>
            ) : (
              <>
                <FaArrowDown className="text-red-600" />
                <span className="text-red-600">
                  {Math.abs(salesData.comparison.revenue)}%
                </span>
              </>
            )}
            <span className="text-gray-500">vs previous period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold text-gray-800">
                {salesData.totalOrders}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FaShoppingBag className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1 text-sm">
            {salesData.comparison.orders > 0 ? (
              <>
                <FaArrowUp className="text-green-600" />
                <span className="text-green-600">
                  {salesData.comparison.orders}%
                </span>
              </>
            ) : (
              <>
                <FaArrowDown className="text-red-600" />
                <span className="text-red-600">
                  {Math.abs(salesData.comparison.orders)}%
                </span>
              </>
            )}
            <span className="text-gray-500">vs previous period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Average Order Value</p>
              <p className="text-2xl font-bold text-gray-800">
                {formatCurrency(salesData.averageOrderValue)}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <FaUsers className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Top Product Sales</p>
              <p className="text-2xl font-bold text-gray-800">
                {salesData.topProducts[0]?.sales || 0}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <FaBox className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            {salesData.topProducts[0]?.name || "No sales"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Products */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Top Selling Products
          </h3>
          <div className="space-y-4">
            {salesData.topProducts.map((product, index) => {
              const maxSales = salesData.topProducts[0]?.sales || 1;
              const percentage = (product.sales / maxSales) * 100;

              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-400">
                        #{index + 1}
                      </span>
                      <span className="font-medium text-gray-800">
                        {product.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-gray-800">
                        {product.sales} sales
                      </span>
                      <span className="text-sm text-gray-500 ml-2">
                        {formatCurrency(product.revenue)}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.5 }}
                      className="bg-primary-600 h-2 rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Daily Sales Summary */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Daily Sales
          </h3>
          <div className="space-y-3">
            {salesData.dailySales.map((day, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border border-gray-100 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {new Date(day.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-gray-500">{day.orders} orders</p>
                </div>
                <p className="font-semibold text-primary-800">
                  {formatCurrency(day.revenue)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;
