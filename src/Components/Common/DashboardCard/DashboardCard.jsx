import { motion } from "framer-motion";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const DashboardCard = ({
  title,
  value,
  icon: Icon,
  color = "primary",
  trend,
  isLoading = false,
  className = "",
  subtitle,
  onClick,
  size = "md",
  variant = "solid",
  showBorder = false,
}) => {
  const colors = {
    primary: {
      bg: "bg-primary-50",
      iconBg: "bg-primary-500",
      text: "text-primary-600",
      border: "border-primary-200",
      trendUp: "text-green-600",
      trendDown: "text-red-600",
    },
    secondary: {
      bg: "bg-secondary-50",
      iconBg: "bg-secondary-500",
      text: "text-secondary-600",
      border: "border-secondary-200",
      trendUp: "text-green-600",
      trendDown: "text-red-600",
    },
    success: {
      bg: "bg-green-50",
      iconBg: "bg-green-500",
      text: "text-green-600",
      border: "border-green-200",
      trendUp: "text-green-600",
      trendDown: "text-red-600",
    },
    warning: {
      bg: "bg-yellow-50",
      iconBg: "bg-yellow-500",
      text: "text-yellow-600",
      border: "border-yellow-200",
      trendUp: "text-green-600",
      trendDown: "text-red-600",
    },
    danger: {
      bg: "bg-red-50",
      iconBg: "bg-red-500",
      text: "text-red-600",
      border: "border-red-200",
      trendUp: "text-green-600",
      trendDown: "text-red-600",
    },
    info: {
      bg: "bg-blue-50",
      iconBg: "bg-blue-500",
      text: "text-blue-600",
      border: "border-blue-200",
      trendUp: "text-green-600",
      trendDown: "text-red-600",
    },
  };

  const sizes = {
    sm: {
      padding: "p-4",
      title: "text-xs",
      value: "text-xl",
      icon: "w-4 h-4",
      iconContainer: "p-2",
    },
    md: {
      padding: "p-6",
      title: "text-sm",
      value: "text-2xl",
      icon: "w-6 h-6",
      iconContainer: "p-3",
    },
    lg: {
      padding: "p-8",
      title: "text-base",
      value: "text-3xl",
      icon: "w-8 h-8",
      iconContainer: "p-4",
    },
  };

  const colorStyles = colors[color] || colors.primary;
  const sizeStyles = sizes[size] || sizes.md;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div
        className={`bg-white rounded-xl shadow-sm ${sizeStyles.padding} animate-pulse ${className}`}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-20"></div>
          </div>
          <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="mt-4 h-4 bg-gray-200 rounded w-32"></div>
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.01,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
      className={`
        bg-white rounded-xl shadow-sm ${sizeStyles.padding}
        hover:shadow-lg transition-all duration-300 
        ${onClick ? "cursor-pointer" : ""} 
        ${showBorder ? `border-2 ${colorStyles.border}` : ""}
        ${className}
      `}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between">
        {/* Title and Value */}
        <div className="flex-1">
          <p className={`font-medium text-gray-500 ${sizeStyles.title}`}>
            {title}
          </p>
          <p className={`font-bold text-gray-800 mt-1 ${sizeStyles.value}`}>
            {value}
          </p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>

        {/* Icon */}
        {Icon && (
          <div
            className={`rounded-lg ${colorStyles.bg} ${sizeStyles.iconContainer}`}
          >
            <Icon className={`${sizeStyles.icon} ${colorStyles.text}`} />
          </div>
        )}
      </div>

      {/* Trend Indicator */}
      {trend !== undefined && trend !== null && (
        <div className="mt-4 flex items-center gap-2">
          {trend > 0 ? (
            <div className="flex items-center gap-1 text-green-600">
              <FaArrowUp className="w-3 h-3" />
              <span className="text-sm font-medium">{trend}%</span>
            </div>
          ) : trend < 0 ? (
            <div className="flex items-center gap-1 text-red-600">
              <FaArrowDown className="w-3 h-3" />
              <span className="text-sm font-medium">{Math.abs(trend)}%</span>
            </div>
          ) : null}
          <span className="text-xs text-gray-400">vs last period</span>
        </div>
      )}
    </motion.div>
  );
};

export default DashboardCard;
