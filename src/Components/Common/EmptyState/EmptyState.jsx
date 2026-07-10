import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaBox,
  FaSearch,
  FaShoppingBag,
  FaHeart,
  FaUser,
} from "react-icons/fa";
import Button from "../Button/Button";

const EmptyState = ({
  icon: Icon,
  title = "Nothing to see here",
  description = "There are no items to display at the moment.",
  actionText,
  actionLink,
  onAction,
  size = "md",
  className = "",
  image,
}) => {
  const sizes = {
    sm: {
      container: "p-6",
      icon: "w-16 h-16",
      iconWrapper: "w-20 h-20",
      title: "text-lg",
      description: "text-sm",
    },
    md: {
      container: "p-8",
      icon: "w-24 h-24",
      iconWrapper: "w-28 h-28",
      title: "text-2xl",
      description: "text-base",
    },
    lg: {
      container: "p-12",
      icon: "w-32 h-32",
      iconWrapper: "w-36 h-36",
      title: "text-3xl",
      description: "text-lg",
    },
  };

  const sizeStyles = sizes[size] || sizes.md;

  // Default icons based on common use cases
  const defaultIcons = {
    cart: FaShoppingBag,
    search: FaSearch,
    products: FaBox,
    wishlist: FaHeart,
    profile: FaUser,
  };

  const DisplayIcon = Icon || defaultIcons.products;

  const handleAction = () => {
    if (onAction) {
      onAction();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        text-center 
        ${sizeStyles.container}
        bg-white rounded-2xl shadow-sm
        ${className}
      `}
    >
      {/* Image or Icon */}
      <div className="flex justify-center mb-4">
        {image ? (
          <img
            src={image}
            alt={title}
            className={`${sizeStyles.icon} object-contain`}
          />
        ) : (
          <div
            className={`
            ${sizeStyles.iconWrapper}
            rounded-full 
            bg-gradient-to-br from-primary-50 to-secondary-50
            flex items-center justify-center
            mx-auto
          `}
          >
            <DisplayIcon
              className={`
              ${sizeStyles.icon}
              text-primary-400
            `}
            />
          </div>
        )}
      </div>

      {/* Title */}
      <h3
        className={`
        font-bold text-gray-800
        ${sizeStyles.title}
      `}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className={`
        text-gray-500 mt-2 max-w-md mx-auto
        ${sizeStyles.description}
      `}
      >
        {description}
      </p>

      {/* Action Button */}
      {actionText && (actionLink || onAction) && (
        <div className="mt-6">
          {actionLink ? (
            <Link to={actionLink}>
              <Button variant="primary" size={size === "sm" ? "md" : "lg"}>
                {actionText}
              </Button>
            </Link>
          ) : (
            <Button
              variant="primary"
              size={size === "sm" ? "md" : "lg"}
              onClick={handleAction}
            >
              {actionText}
            </Button>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default EmptyState;
