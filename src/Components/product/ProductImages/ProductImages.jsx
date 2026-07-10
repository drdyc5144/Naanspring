import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ProductImages = ({ images = [], className = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div
        className={`bg-gray-100 rounded-lg aspect-square flex items-center justify-center ${className}`}
      >
        <span className="text-4xl text-gray-400">No Image</span>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
        <img
          src={images[currentIndex]}
          alt={`Product ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev === 0 ? images.length - 1 : prev - 1,
                )
              }
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 rounded-full shadow"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev === images.length - 1 ? 0 : prev + 1,
                )
              }
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 rounded-full shadow"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                currentIndex === index
                  ? "border-primary-600"
                  : "border-transparent"
              }`}
            >
              <img src={image} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImages;
