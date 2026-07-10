import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaFilter,
  FaBox,
  FaExclamationTriangle,
  FaCheckCircle,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { Button, Input, Loader } from "../../../Components/Common";
import { productService } from "../../../Service/product.service";

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [stockFilter, setStockFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchQuery, stockFilter]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await productService.getProducts();
      setProducts(response.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((product) =>
        product.name?.toLowerCase().includes(query),
      );
    }

    if (stockFilter === "low") {
      filtered = filtered.filter((product) => product.stock <= 10);
    } else if (stockFilter === "out") {
      filtered = filtered.filter((product) => product.stock === 0);
    } else if (stockFilter === "instock") {
      filtered = filtered.filter((product) => product.stock > 10);
    }

    setFilteredProducts(filtered);
  };

  const handleUpdateStock = async (productId, newStock) => {
    try {
      const product = products.find((p) => p.id === productId);
      await productService.updateProduct(productId, {
        ...product,
        stock: Number(newStock),
      });
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, stock: Number(newStock) } : p,
        ),
      );
      setEditingId(null);
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  const getStockStatus = (stock) => {
    if (stock === 0) {
      return { label: "Out of Stock", color: "bg-red-100 text-red-800" };
    } else if (stock <= 10) {
      return { label: "Low Stock", color: "bg-yellow-100 text-yellow-800" };
    } else {
      return { label: "In Stock", color: "bg-green-100 text-green-800" };
    }
  };

  if (isLoading) {
    return <Loader size="lg" text="Loading inventory..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Inventory Management
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {filteredProducts.length} products in inventory
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          <div className="relative">
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none bg-white"
            >
              <option value="all">All Stock</option>
              <option value="instock">In Stock</option>
              <option value="low">Low Stock</option>
              <option value="out">Out of Stock</option>
            </select>
            <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      {filteredProducts.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => {
                  const status = getStockStatus(product.stock);
                  const isEditing = editingId === product.id;

                  return (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={product.image || "/placeholder-product.jpg"}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="font-medium text-gray-800">
                            {product.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.category?.name || "Uncategorized"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
                        ₦{product.price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {isEditing ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                              min="0"
                            />
                            <button
                              onClick={() =>
                                handleUpdateStock(product.id, editValue)
                              }
                              className="p-1 text-green-600 hover:text-green-700 transition-colors"
                            >
                              <FaSave className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="p-1 text-red-600 hover:text-red-700 transition-colors"
                            >
                              <FaTimes className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <span className="font-medium">{product.stock}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${status.color}`}
                        >
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {!isEditing && (
                          <button
                            onClick={() => {
                              setEditingId(product.id);
                              setEditValue(product.stock.toString());
                            }}
                            className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                          >
                            <FaEdit className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaBox className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            No products found
          </h3>
          <p className="text-gray-500">
            {searchQuery
              ? "Try adjusting your search"
              : "Add products to manage inventory"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Inventory;
