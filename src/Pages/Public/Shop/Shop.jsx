import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFilter,
  FaTimes,
  FaSearch,
  FaTh,
  FaList,
  FaSort,
  FaSortUp,
  FaSortDown,
} from "react-icons/fa";
import { ProductGrid } from "../../../Components/product";
import { Button, Select, Loader } from "../../../Components/Common";
import productService from "../../../Service/product.service";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [categories, setCategories] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    minPrice: "",
    maxPrice: "",
    sortBy: "newest",
    view: "grid",
  });

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [filters, searchParams]);

  const fetchCategories = async () => {
    try {
      const response = await productService.getCategories();
      setCategories(response.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const params = {
        category: filters.category || undefined,
        minPrice: filters.minPrice || undefined,
        maxPrice: filters.maxPrice || undefined,
        sort: filters.sortBy,
      };
      const response = await productService.getProducts(params);
      setProducts(response.data || []);
      setTotalProducts(response.total || 0);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    if (key === "category") {
      setSearchParams({ category: value });
    }
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "newest",
      view: "grid",
    });
    setSearchParams({});
  };

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "popular", label: "Most Popular" },
    { value: "rating", label: "Highest Rated" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Shop</h1>
        <p className="text-gray-500 mt-1">{totalProducts} products available</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3">
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* View Toggle */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => handleFilterChange("view", "grid")}
                className={`p-2 ${filters.view === "grid" ? "bg-primary-600 text-white" : "bg-white text-gray-600"}`}
              >
                <FaTh className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleFilterChange("view", "list")}
                className={`p-2 ${filters.view === "list" ? "bg-primary-600 text-white" : "bg-white text-gray-600"}`}
              >
                <FaList className="w-4 h-4" />
              </button>
            </div>

            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="lg:hidden p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FaFilter className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters (Mobile) */}
      {isFilterOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-white rounded-2xl shadow-sm p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Filters</h3>
            <button onClick={() => setIsFilterOpen(false)}>
              <FaTimes className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Min Price
                </label>
                <input
                  type="number"
                  placeholder="₦0"
                  value={filters.minPrice}
                  onChange={(e) =>
                    handleFilterChange("minPrice", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Max Price
                </label>
                <input
                  type="number"
                  placeholder="₦10000"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    handleFilterChange("maxPrice", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <button
              onClick={clearFilters}
              className="w-full py-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear Filters
            </button>
          </div>
        </motion.div>
      )}

      {/* Filters (Desktop) */}
      <div className="hidden lg:grid grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <div className="col-span-1">
          <div className="bg-white rounded-2xl shadow-sm p-4 sticky top-24">
            <h3 className="font-semibold text-gray-800 mb-4">Filters</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    handleFilterChange("category", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Price Range
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) =>
                      handleFilterChange("minPrice", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) =>
                      handleFilterChange("maxPrice", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  />
                </div>
              </div>

              <button
                onClick={clearFilters}
                className="w-full py-2 text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="col-span-3">
          <ProductGrid
            products={products}
            isLoading={isLoading}
            columns={3}
            view={filters.view}
          />
        </div>
      </div>

      {/* Products (Mobile/Tablet) */}
      <div className="lg:hidden">
        <ProductGrid
          products={products}
          isLoading={isLoading}
          columns={2}
          view={filters.view}
        />
      </div>
    </div>
  );
};

export default Shop;
