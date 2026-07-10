import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaShoppingCart,
  FaHeart,
  FaRegHeart,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaEye,
} from "react-icons/fa";
import { useCart } from "../../../Hooks/useCart";
import { useAuth } from "../../../Hooks/useAuth";

const ProductCard = ({
  product,
  variant = "default", // default, compact, featured
  onQuickView,
  className = "",
  showActions = true,
  showRating = true,
}) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const {
    id,
    name,
    price,
    originalPrice,
    image,
    rating = 4.5,
    reviews = 0,
    stock = 10,
    discount,
    isFeatured,
  } = product;

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="w-3.5 h-3.5 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <FaStarHalfAlt className="w-3.5 h-3.5 text-yellow-400" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar
            key={`empty-${i}`}
            className="w-3.5 h-3.5 text-yellow-400"
          />
        ))}
      </div>
    );
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddingToCart(true);
    try {
      await addToCart(product, 1);
      // Show success notification
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  // Variant styles
  const variants = {
    default: {
      wrapper:
        "bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300",
      image: "h-48",
      padding: "p-4",
    },
    compact: {
      wrapper:
        "bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300",
      image: "h-32",
      padding: "p-3",
    },
    featured: {
      wrapper:
        "bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-primary-100",
      image: "h-64",
      padding: "p-5",
    },
  };

  const currentVariant = variants[variant] || variants.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={`${currentVariant.wrapper} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${id}`} className="block">
        {/* Image Section */}
        <div
          className={`relative ${currentVariant.image} overflow-hidden bg-gray-100`}
        >
          <img
            src={image || "/placeholder-product.jpg"}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {discount && (
              <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-semibold rounded-full">
                -{discount}%
              </span>
            )}
            {isFeatured && (
              <span className="px-2 py-0.5 bg-secondary-500 text-white text-xs font-semibold rounded-full">
                Featured
              </span>
            )}
            {stock === 0 && (
              <span className="px-2 py-0.5 bg-gray-700 text-white text-xs font-semibold rounded-full">
                Out of Stock
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          {showActions && (
            <button
              onClick={handleWishlist}
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
            >
              {isWishlisted ? (
                <FaHeart className="w-4 h-4 text-red-500" />
              ) : (
                <FaRegHeart className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors" />
              )}
            </button>
          )}

          {/* Quick View Overlay */}
          {showActions && isHovered && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-opacity">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onQuickView && onQuickView(product);
                }}
                className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-lg"
              >
                <FaEye className="w-4 h-4 text-gray-700" />
              </button>
              <button
                onClick={handleAddToCart}
                disabled={stock === 0 || isAddingToCart}
                className="p-2 bg-primary-800 text-white rounded-full hover:bg-primary-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaShoppingCart className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className={currentVariant.padding}>
          {/* Product Name */}
          <h3 className="font-semibold text-gray-800 line-clamp-2 hover:text-primary-600 transition-colors">
            {name}
          </h3>

          {/* Rating */}
          {showRating && (
            <div className="flex items-center gap-2 mt-1">
              {renderStars(rating)}
              <span className="text-xs text-gray-500">({reviews})</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-lg font-bold text-primary-800">
              ₦{price.toLocaleString()}
            </span>
            {originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ₦{originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Stock Status */}
          {stock > 0 && stock <= 5 && (
            <p className="text-xs text-orange-500 mt-1">
              Only {stock} left in stock
            </p>
          )}

          {/* Add to Cart Button (Mobile/Tablet) */}
          {showActions && stock > 0 && (
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="w-full mt-3 py-2 bg-primary-800 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 lg:hidden"
            >
              <FaShoppingCart className="w-4 h-4" />
              {isAddingToCart ? "Adding..." : "Add to Cart"}
            </button>
          )}

          {showActions && stock === 0 && (
            <button
              disabled
              className="w-full mt-3 py-2 bg-gray-300 text-gray-500 rounded-lg text-sm font-medium cursor-not-allowed"
            >
              Out of Stock
            </button>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
