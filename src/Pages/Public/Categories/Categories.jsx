import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaFolder, FaFolderOpen } from "react-icons/fa";
import { categoryService } from "../../../Service/category.service";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await categoryService.getCategories();
      setCategories(response.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Group categories into rows of 3 for better display
  const categoryGroups = categories.reduce((acc, cat, index) => {
    const groupIndex = Math.floor(index / 3);
    if (!acc[groupIndex]) acc[groupIndex] = [];
    acc[groupIndex].push(cat);
    return acc;
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Shop by Category</h1>
        <p className="text-gray-500 mt-2">
          Browse our wide selection of quality foodstuff categories
        </p>
      </div>

      {/* Categories Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-40 bg-gray-100 rounded-xl"></div>
            </div>
          ))}
        </div>
      ) : categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all"
            >
              <Link to={`/shop?category=${category.id}`} className="block">
                <div className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{category.icon || "📦"}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {category.description ||
                          `Browse our selection of ${category.name}`}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-sm text-primary-600">
                        <span>View Products</span>
                        <FaArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-3 flex items-center justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-2">
                    <FaFolder className="w-4 h-4" />
                    {Math.floor(Math.random() * 20) + 5} products
                  </span>
                  <span className="text-gray-400">→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaFolderOpen className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            No categories found
          </h3>
          <p className="text-gray-500">Check back later for new categories</p>
        </div>
      )}
    </div>
  );
};

export default Categories;
