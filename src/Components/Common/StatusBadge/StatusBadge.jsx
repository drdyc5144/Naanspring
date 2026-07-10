import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaTruck,
  FaBox,
  FaExclamationTriangle,
  FaHourglassHalf,
  FaCheck,
  FaSpinner,
} from "react-icons/fa";

const StatusBadge = ({
  status,
  label,
  className = "",
  size = "md",
  showIcon = true,
  animated = false,
  customColor,
}) => {
  // Predefined status types and their configurations
  const statusTypes = {
    // Order Statuses
    pending: {
      label: "Pending",
      icon: FaClock,
      color: "bg-yellow-100 text-yellow-800",
      dotColor: "bg-yellow-500",
    },
    processing: {
      label: "Processing",
      icon: FaSpinner,
      color: "bg-blue-100 text-blue-800",
      dotColor: "bg-blue-500",
    },
    shipped: {
      label: "Shipped",
      icon: FaTruck,
      color: "bg-purple-100 text-purple-800",
      dotColor: "bg-purple-500",
    },
    delivered: {
      label: "Delivered",
      icon: FaCheckCircle,
      color: "bg-green-100 text-green-800",
      dotColor: "bg-green-500",
    },
    cancelled: {
      label: "Cancelled",
      icon: FaTimesCircle,
      color: "bg-red-100 text-red-800",
      dotColor: "bg-red-500",
    },

    // Payment Statuses
    paid: {
      label: "Paid",
      icon: FaCheckCircle,
      color: "bg-green-100 text-green-800",
      dotColor: "bg-green-500",
    },
    unpaid: {
      label: "Unpaid",
      icon: FaTimesCircle,
      color: "bg-red-100 text-red-800",
      dotColor: "bg-red-500",
    },
    refunded: {
      label: "Refunded",
      icon: FaCheck,
      color: "bg-blue-100 text-blue-800",
      dotColor: "bg-blue-500",
    },

    // Product Statuses
    inStock: {
      label: "In Stock",
      icon: FaCheckCircle,
      color: "bg-green-100 text-green-800",
      dotColor: "bg-green-500",
    },
    lowStock: {
      label: "Low Stock",
      icon: FaExclamationTriangle,
      color: "bg-orange-100 text-orange-800",
      dotColor: "bg-orange-500",
    },
    outOfStock: {
      label: "Out of Stock",
      icon: FaTimesCircle,
      color: "bg-red-100 text-red-800",
      dotColor: "bg-red-500",
    },

    // User Statuses
    active: {
      label: "Active",
      icon: FaCheckCircle,
      color: "bg-green-100 text-green-800",
      dotColor: "bg-green-500",
    },
    inactive: {
      label: "Inactive",
      icon: FaTimesCircle,
      color: "bg-gray-100 text-gray-800",
      dotColor: "bg-gray-500",
    },
    suspended: {
      label: "Suspended",
      icon: FaExclamationTriangle,
      color: "bg-red-100 text-red-800",
      dotColor: "bg-red-500",
    },

    // General Statuses
    success: {
      label: "Success",
      icon: FaCheckCircle,
      color: "bg-green-100 text-green-800",
      dotColor: "bg-green-500",
    },
    warning: {
      label: "Warning",
      icon: FaExclamationTriangle,
      color: "bg-orange-100 text-orange-800",
      dotColor: "bg-orange-500",
    },
    error: {
      label: "Error",
      icon: FaTimesCircle,
      color: "bg-red-100 text-red-800",
      dotColor: "bg-red-500",
    },
    info: {
      label: "Info",
      icon: FaClock,
      color: "bg-blue-100 text-blue-800",
      dotColor: "bg-blue-500",
    },
  };

  const sizes = {
    sm: {
      padding: "px-2 py-0.5",
      text: "text-xs",
      icon: "w-3 h-3",
      dot: "w-1.5 h-1.5",
    },
    md: {
      padding: "px-3 py-1",
      text: "text-sm",
      icon: "w-4 h-4",
      dot: "w-2 h-2",
    },
    lg: {
      padding: "px-4 py-1.5",
      text: "text-base",
      icon: "w-5 h-5",
      dot: "w-2.5 h-2.5",
    },
  };

  // Get status configuration
  const statusConfig = statusTypes[status] || {
    label: label || status || "Unknown",
    icon: FaBox,
    color: "bg-gray-100 text-gray-800",
    dotColor: "bg-gray-500",
  };

  // Use custom label if provided, otherwise use status label
  const displayLabel = label || statusConfig.label;
  const Icon = statusConfig.icon;
  const colorClass = customColor || statusConfig.color;
  const dotColor = customColor?.replace("bg-", "") || statusConfig.dotColor;

  const sizeStyles = sizes[size] || sizes.md;

  return (
    <motion.span
      initial={animated ? { scale: 0.8, opacity: 0 } : false}
      animate={animated ? { scale: 1, opacity: 1 } : false}
      transition={{ duration: 0.3, type: "spring" }}
      className={`
        inline-flex items-center gap-1.5
        font-medium
        ${sizeStyles.padding}
        ${sizeStyles.text}
        ${colorClass}
        rounded-full
        ${className}
      `}
    >
      {/* Dot Indicator */}
      <span className={`${sizeStyles.dot} rounded-full ${dotColor}`} />

      {/* Icon */}
      {showIcon && <Icon className={sizeStyles.icon} />}

      {/* Label */}
      <span>{displayLabel}</span>
    </motion.span>
  );
};

export default StatusBadge;
