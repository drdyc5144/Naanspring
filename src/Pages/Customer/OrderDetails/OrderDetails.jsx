import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaBox,
  FaClock,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaPrint,
  FaDownload,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCreditCard,
  FaCalendarAlt,
} from "react-icons/fa";
import { orderService } from "../../../Service/order.service";
import { Button, Loader } from "../../../Components/Common";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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

  const statusSteps = {
    pending: ["Order Placed", "Processing", "Shipped", "Delivered"],
    processing: ["Order Placed", "Processing", "Shipped", "Delivered"],
    shipped: ["Order Placed", "Processing", "Shipped", "Delivered"],
    delivered: ["Order Placed", "Processing", "Shipped", "Delivered"],
    cancelled: ["Order Placed", "Cancelled"],
  };

  const getStatusIndex = (status) => {
    const steps = ["pending", "processing", "shipped", "delivered"];
    return steps.indexOf(status);
  };

  if (isLoading) {
    return <Loader size="lg" text="Loading order details..." />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => navigate("/account/orders")}
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
          to="/account/orders"
          className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  const StatusIcon = statusIcons[order.status] || FaBox;
  const currentStatusIndex = getStatusIndex(order.status);
  const steps = statusSteps[order.status] || ["Order Placed"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            to="/account/orders"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-600 transition-colors mb-2"
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Orders
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">
            Order #{order.id}
          </h1>
          <p className="text-sm text-gray-500">
            Placed on {new Date(order.createdAt).toLocaleDateString()} at{" "}
            {new Date(order.createdAt).toLocaleTimeString()}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}
          >
            <StatusIcon className="inline mr-1 w-4 h-4" />
            {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
          </span>
          <button className="p-2 text-gray-500 hover:text-primary-600 transition-colors">
            <FaPrint className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-primary-600 transition-colors">
            <FaDownload className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Order Status Timeline */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="font-semibold text-gray-800 mb-6">Order Status</h3>
        <div className="relative">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const isActive = index <= currentStatusIndex;
              const isLast = index === steps.length - 1;

              return (
                <div key={step} className="flex-1 relative">
                  <div className="flex flex-col items-center">
                    <div
                      className={`
                      w-8 h-8 rounded-full flex items-center justify-center
                      ${isActive ? "bg-primary-800 text-white" : "bg-gray-200 text-gray-400"}
                      transition-colors duration-500
                    `}
                    >
                      {index < currentStatusIndex ? (
                        <FaCheckCircle className="w-5 h-5" />
                      ) : (
                        <span className="text-sm font-bold">{index + 1}</span>
                      )}
                    </div>
                    <p
                      className={`text-xs mt-2 text-center ${isActive ? "text-gray-800 font-medium" : "text-gray-400"}`}
                    >
                      {step}
                    </p>
                    {!isLast && (
                      <div
                        className={`absolute top-4 left-1/2 w-full h-0.5 ${isActive ? "bg-primary-800" : "bg-gray-200"}`}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Order Items</h3>
            <div className="space-y-4">
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
        </div>

        {/* Order Summary & Details */}
        <div className="space-y-4">
          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Order Summary</h3>
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

          {/* Delivery Information */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-4">
              Delivery Information
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-0.5 text-primary-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-800">Shipping Address</p>
                  <p className="text-gray-600">{order.shippingAddress}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-primary-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-800">Phone</p>
                  <p className="text-gray-600">{order.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-primary-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-800">Email</p>
                  <p className="text-gray-600">{order.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-4">
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

          {/* Action Buttons */}
          <div className="space-y-3">
            {order.status === "delivered" && (
              <Button variant="secondary" fullWidth>
                Write a Review
              </Button>
            )}
            {order.status === "pending" && (
              <Button variant="danger" fullWidth>
                Cancel Order
              </Button>
            )}
            <Button
              variant="outline"
              fullWidth
              onClick={() => navigate("/shop")}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
