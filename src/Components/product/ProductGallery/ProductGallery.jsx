import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaExpand } from "react-icons/fa";

const ProductGallery = ({
  images = [],
  activeIndex = 0,
  onImageChange,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(activeIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const mainImage =
    images[currentIndex] || images[0] || "/placeholder-product.jpg";

  const handleImageChange = (index) => {
    setCurrentIndex(index);
    if (onImageChange) {
      onImageChange(index);
    }
  };

  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    handleImageChange(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    handleImageChange(newIndex);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  if (!images || images.length === 0) {
    return (
      <div className={`bg-gray-100 rounded-2xl overflow-hidden ${className}`}>
        <div className="aspect-square flex items-center justify-center">
          <span className="text-6xl">🛒</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Image */}
      <div
        className="relative bg-gray-100 rounded-2xl overflow-hidden aspect-square"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={mainImage}
            alt={`Product image ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: isZoomed ? 1.5 : 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            style={{
              transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
            }}
          />
        </AnimatePresence>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-all"
            >
              <FaChevronLeft className="w-4 h-4 text-gray-700" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-all"
            >
              <FaChevronRight className="w-4 h-4 text-gray-700" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 text-white text-xs rounded-full">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {/* Expand Button */}
        <button
          onClick={() => window.open(mainImage, "_blank")}
          className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-all"
        >
          <FaExpand className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleImageChange(index)}
              className={`
                relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all
                ${
                  currentIndex === index
                    ? "border-primary-600 ring-2 ring-primary-200"
                    : "border-transparent hover:border-gray-300"
                }
              `}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {currentIndex === index && (
                <div className="absolute inset-0 bg-primary-600/10" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
