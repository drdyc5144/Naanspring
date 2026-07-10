import { motion } from "framer-motion";
import ProductCard from "../ProductCard/ProductCard";
import { FaBox } from "react-icons/fa";

const ProductGrid = ({
  products = [],
  isLoading = false,
  columns = 4,
  variant = "default",
  showActions = true,
  showRating = true,
  onQuickView,
  className = "",
  emptyMessage = "No products found",
}) => {
  // Grid column classes
  const gridColumns = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
    6: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div
        className={`grid ${gridColumns[columns] || gridColumns[4]} gap-4 ${className}`}
      >
        {[...Array(columns * 2)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaBox className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {emptyMessage}
        </h3>
        <p className="text-gray-500">Check back later for new products</p>
      </div>
    );
  }

  return (
    <div
      className={`grid ${gridColumns[columns] || gridColumns[4]} gap-4 ${className}`}
    >
      {products.map((product, index) => (
        <motion.div
          key={product.id || index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <ProductCard
            product={product}
            variant={variant}
            showActions={showActions}
            showRating={showRating}
            onQuickView={onQuickView}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ProductGrid;
