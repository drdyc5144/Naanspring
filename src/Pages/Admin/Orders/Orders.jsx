import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaEye,
  FaSearch,
  FaFilter,
  FaClock,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaBox,
  FaPrint,
  FaDownload,
} from "react-icons/fa";
import { Button, Loader, Modal } from "../../../Components/Common";
import { orderService } from "../../../Service/order.service";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const statusOptions = [
    { value: "all", label: "All Orders" },
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const statusIcons = {
    pending: FaClock,
    processing: FaBox,
    shipped: FaTruck,
    delivered: FaCheckCircle,
    cancelled: FaTimesCircle,
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchQuery, statusFilter]);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await orderService.getOrders();
      setOrders(response.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = orders;

    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.id?.toString().includes(query) ||
          order.customerName?.toLowerCase().includes(query) ||
          order.customerEmail?.toLowerCase().includes(query),
      );
    }

    setFilteredOrders(filtered);
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, { status: newStatus });
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order,
        ),
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const getStatusIcon = (status) => {
    const Icon = statusIcons[status] || FaBox;
    return <Icon className="w-4 h-4" />;
  };

  if (isLoading) {
    return <Loader size="lg" text="Loading orders..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
          <p className="text-sm text-gray-500">
            {filteredOrders.length} orders found
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-500 hover:text-primary-600 transition-colors">
            <FaPrint className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-primary-600 transition-colors">
            <FaDownload className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search orders by ID, customer name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none bg-white"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      {filteredOrders.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => {
                  const StatusIcon = statusIcons[order.status] || FaBox;

                  return (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium text-gray-800">
                          #{order.id}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="font-medium text-gray-800">
                            {order.customerName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {order.customerEmail}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-800">
                        ₦{order.total.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusUpdate(order.id, e.target.value)
                          }
                          className={`px-3 py-1 rounded-full text-sm font-medium border-0 focus:ring-2 focus:ring-primary-500 ${statusColors[order.status]}`}
                        >
                          {statusOptions
                            .filter((opt) => opt.value !== "all")
                            .map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              setIsModalOpen(true);
                            }}
                            className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                            title="View Details"
                          >
                            <FaEye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaBox className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            No orders found
          </h3>
          <p className="text-gray-500">
            {searchQuery
              ? "Try adjusting your search"
              : "Orders will appear here once customers place them"}
          </p>
        </div>
      )}

      {/* Order Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Order #${selectedOrder?.id}`}
        size="lg"
      >
        {selectedOrder && (
          <div className="space-y-4">
            {/* Customer Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Customer</h4>
                <p className="font-medium text-gray-800">
                  {selectedOrder.customerName}
                </p>
                <p className="text-sm text-gray-500">
                  {selectedOrder.customerEmail}
                </p>
                <p className="text-sm text-gray-500">
                  {selectedOrder.customerPhone}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  Order Date
                </h4>
                <p className="font-medium text-gray-800">
                  {new Date(selectedOrder.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(selectedOrder.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h4 className="text-sm font-medium text-gray-500">
                Shipping Address
              </h4>
              <p className="text-gray-800">{selectedOrder.shippingAddress}</p>
            </div>

            {/* Order Items */}
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Order Items
              </h4>
              <div className="space-y-2">
                {selectedOrder.items?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={item.image || "/placeholder-product.jpg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium text-gray-800">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t border-gray-200 pt-4">
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">
                    ₦{selectedOrder.subtotal?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-medium">
                    ₦{selectedOrder.shipping?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tax (7.5%)</span>
                  <span className="font-medium">
                    ₦{selectedOrder.tax?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-primary-800">
                    ₦{selectedOrder.total?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
              <Button variant="primary">
                <FaPrint className="w-4 h-4 mr-2" />
                Print Invoice
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminOrders;
