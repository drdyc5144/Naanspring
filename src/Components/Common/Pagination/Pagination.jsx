import { motion } from "framer-motion";
import {
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
  showPrevNext = true,
  size = "md",
  className = "",
}) => {
  const sizes = {
    sm: {
      button: "w-8 h-8 text-sm",
      icon: "w-3 h-3",
    },
    md: {
      button: "w-10 h-10 text-base",
      icon: "w-4 h-4",
    },
    lg: {
      button: "w-12 h-12 text-lg",
      icon: "w-5 h-5",
    },
  };

  const sizeStyles = sizes[size] || sizes.md;

  const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const getPageNumbers = () => {
    const totalPageNumbers = siblingCount * 2 + 3;
    const firstPage = 1;
    const lastPage = totalPages;

    if (totalPages <= totalPageNumbers) {
      return range(firstPage, lastPage);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, firstPage);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, lastPage);

    const shouldShowLeftDots = leftSiblingIndex > firstPage + 1;
    const shouldShowRightDots = rightSiblingIndex < lastPage - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftRange = range(firstPage, 3 + siblingCount * 2);
      return [...leftRange, "...", lastPage];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightRange = range(lastPage - (3 + siblingCount * 2) + 1, lastPage);
      return [firstPage, "...", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPage, "...", ...middleRange, "...", lastPage];
    }
  };

  const handlePageChange = (page) => {
    if (page === currentPage || page < 1 || page > totalPages) return;
    if (onPageChange) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers();

  return (
    <nav className={`flex items-center justify-center gap-1 ${className}`}>
      {/* First Page Button */}
      {showFirstLast && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className={`
            ${sizeStyles.button}
            rounded-lg border border-gray-200 
            flex items-center justify-center
            transition-colors duration-200
            ${
              currentPage === 1
                ? "text-gray-300 cursor-not-allowed bg-gray-50"
                : "text-gray-600 hover:bg-primary-50 hover:border-primary-300 hover:text-primary-600"
            }
          `}
          aria-label="First page"
        >
          <FaAngleDoubleLeft className={sizeStyles.icon} />
        </motion.button>
      )}

      {/* Previous Page Button */}
      {showPrevNext && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`
            ${sizeStyles.button}
            rounded-lg border border-gray-200 
            flex items-center justify-center
            transition-colors duration-200
            ${
              currentPage === 1
                ? "text-gray-300 cursor-not-allowed bg-gray-50"
                : "text-gray-600 hover:bg-primary-50 hover:border-primary-300 hover:text-primary-600"
            }
          `}
          aria-label="Previous page"
        >
          <FaChevronLeft className={sizeStyles.icon} />
        </motion.button>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`dots-${index}`}
                className={`${sizeStyles.button} flex items-center justify-center text-gray-400`}
              >
                …
              </span>
            );
          }

          const isActive = page === currentPage;

          return (
            <motion.button
              key={page}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePageChange(page)}
              className={`
                ${sizeStyles.button}
                rounded-lg border font-medium
                flex items-center justify-center
                transition-all duration-200
                ${
                  isActive
                    ? "bg-primary-600 text-white border-primary-600 shadow-md"
                    : "border-gray-200 text-gray-600 hover:bg-primary-50 hover:border-primary-300 hover:text-primary-600"
                }
              `}
              aria-label={`Go to page ${page}`}
              aria-current={isActive ? "page" : undefined}
            >
              {page}
            </motion.button>
          );
        })}
      </div>

      {/* Next Page Button */}
      {showPrevNext && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`
            ${sizeStyles.button}
            rounded-lg border border-gray-200 
            flex items-center justify-center
            transition-colors duration-200
            ${
              currentPage === totalPages
                ? "text-gray-300 cursor-not-allowed bg-gray-50"
                : "text-gray-600 hover:bg-primary-50 hover:border-primary-300 hover:text-primary-600"
            }
          `}
          aria-label="Next page"
        >
          <FaChevronRight className={sizeStyles.icon} />
        </motion.button>
      )}

      {/* Last Page Button */}
      {showFirstLast && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`
            ${sizeStyles.button}
            rounded-lg border border-gray-200 
            flex items-center justify-center
            transition-colors duration-200
            ${
              currentPage === totalPages
                ? "text-gray-300 cursor-not-allowed bg-gray-50"
                : "text-gray-600 hover:bg-primary-50 hover:border-primary-300 hover:text-primary-600"
            }
          `}
          aria-label="Last page"
        >
          <FaAngleDoubleRight className={sizeStyles.icon} />
        </motion.button>
      )}
    </nav>
  );
};

export default Pagination;
