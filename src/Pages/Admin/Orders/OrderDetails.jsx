import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaPrint,
  FaDownload,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaBox,
  FaClock,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCreditCard,
  FaCalendarAlt,
  FaShoppingBag,
} from "react-icons/fa";
import { Button, Loader, StatusBadge } from "../../../Components/Common";
import { orderService } from "../../../Service/order.service";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await orderService.getOrderById(id);
      setOrder(response.data);
    } catch (error) {
      console.error("Error fetching order details:", error);
      setError("Failed to load order details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    setIsUpdating(true);
    try {
      await orderService.updateOrderStatus(id, { status: newStatus });
      setOrder((prev) => ({ ...prev, status: newStatus }));
    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadInvoice = async () => {
    try {
      const blob = await orderService.getOrderInvoice(id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Invoice-${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading invoice:", error);
    }
  };

  const getStatusActions = () => {
    const actions = [];

    switch (order?.status) {
      case "pending":
        actions.push({
          label: "Confirm Order",
          action: () => handleStatusUpdate("processing"),
          color: "bg-green-600 hover:bg-green-700",
          icon: FaCheckCircle,
        });
        break;
      case "processing":
        actions.push({
          label: "Mark as Shipped",
          action: () => handleStatusUpdate("shipped"),
          color: "bg-blue-600 hover:bg-blue-700",
          icon: FaTruck,
        });
        break;
      case "shipped":
        actions.push({
          label: "Mark as Delivered",
          action: () => handleStatusUpdate("delivered"),
          color: "bg-purple-600 hover:bg-purple-700",
          icon: FaCheckCircle,
        });
        break;
      default:
        break;
    }

    // Add cancel action for non-cancelled orders
    if (order?.status !== "cancelled" && order?.status !== "delivered") {
      actions.push({
        label: "Cancel Order",
        action: () => {
          if (window.confirm("Are you sure you want to cancel this order?")) {
            handleStatusUpdate("cancelled");
          }
        },
        color: "bg-red-600 hover:bg-red-700",
        icon: FaTimesCircle,
      });
    }

    return actions;
  };

  if (isLoading) {
    return <Loader size="lg" text="Loading order details..." />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => navigate("/admin/orders")}
          className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Order not found</p>
        <Link
          to="/admin/orders"
          className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/admin/orders")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Order #{order.id}
            </h1>
            <p className="text-sm text-gray-500">
              Placed on {new Date(order.createdAt).toLocaleDateString()} at{" "}
              {new Date(order.createdAt).toLocaleTimeString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <StatusBadge status={order.status} size="lg" />
          <button
            onClick={handlePrint}
            className="p-2 text-gray-500 hover:text-primary-600 transition-colors"
            title="Print Invoice"
          >
            <FaPrint className="w-5 h-5" />
          </button>
          <button
            onClick={handleDownloadInvoice}
            className="p-2 text-gray-500 hover:text-primary-600 transition-colors"
            title="Download Invoice"
          >
            <FaDownload className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Order Items */}
        <div className="lg:col-span-2 space-y-4">
          {/* Order Items */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaShoppingBag className="text-primary-600" />
              Order Items
            </h3>
            <div className="space-y-3">
              {order.items?.map((item, index) => (
                <motion.div
                  key={item.id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-4 p-3 border border-gray-100 rounded-lg hover:border-primary-200 transition-colors"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image || "/placeholder-product.jpg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary-800">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      ₦{item.price.toLocaleString()} each
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Order Timeline */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Order Timeline
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaCheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Order Placed</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {order.confirmedAt && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaBox className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Order Confirmed</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.confirmedAt).toLocaleString()} by{" "}
                      {order.confirmedBy || "Admin"}
                    </p>
                  </div>
                </div>
              )}

              {order.status === "shipped" && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaTruck className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Order Shipped</p>
                    <p className="text-sm text-gray-500">
                      Package is on the way
                    </p>
                  </div>
                </div>
              )}

              {order.status === "delivered" && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaCheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Order Delivered</p>
                    <p className="text-sm text-gray-500">
                      Customer has received the order
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar - Order Details & Actions */}
        <div className="space-y-4">
          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Order Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  ₦{order.subtotal?.toLocaleString() || "0"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  ₦{order.shipping?.toLocaleString() || "0"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (7.5%)</span>
                <span className="font-medium">
                  ₦{order.tax?.toLocaleString() || "0"}
                </span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₦{order.discount?.toLocaleString() || "0"}</span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary-800">
                    ₦{order.total?.toLocaleString() || "0"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Customer Information
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <FaUser className="mt-0.5 text-primary-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-800">
                    {order.customerName}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-primary-600 flex-shrink-0" />
                <p className="text-gray-600">{order.customerEmail}</p>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-primary-600 flex-shrink-0" />
                <p className="text-gray-600">{order.customerPhone}</p>
              </div>
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-0.5 text-primary-600 flex-shrink-0" />
                <p className="text-gray-600">{order.shippingAddress}</p>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Payment Information
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <FaCreditCard className="text-primary-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-800">Payment Method</p>
                  <p className="text-gray-600">
                    {order.paymentMethod || "Card Payment"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaCalendarAlt className="text-primary-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-800">Payment Status</p>
                  <p
                    className={`font-medium ${
                      order.paymentStatus === "paid"
                        ? "text-green-600"
                        : order.paymentStatus === "refunded"
                          ? "text-blue-600"
                          : "text-yellow-600"
                    }`}
                  >
                    {order.paymentStatus?.charAt(0).toUpperCase() +
                      order.paymentStatus?.slice(1) || "Pending"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Order Actions
            </h3>
            <div className="space-y-3">
              {getStatusActions().map((action, index) => (
                <Button
                  key={index}
                  variant="primary"
                  fullWidth
                  isLoading={isUpdating}
                  onClick={action.action}
                  className={`${action.color} text-white`}
                >
                  <action.icon className="w-4 h-4 mr-2" />
                  {action.label}
                </Button>
              ))}
              <Button
                variant="outline"
                fullWidth
                onClick={() => navigate("/admin/orders")}
              >
                Back to Orders
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
