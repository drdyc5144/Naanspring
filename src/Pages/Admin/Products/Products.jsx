import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaEye,
  FaBox,
  FaTag,
} from "react-icons/fa";
import { Button, Loader, Modal } from "../../../Components/Common";
import { productService } from "../../../Service/product.service";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [categories, setCategories] = useState([]);
  const [deleteModal, setDeleteModal] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchQuery, categoryFilter]);

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

  const fetchCategories = async () => {
    try {
      const response = await productService.getCategories();
      setCategories(response.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name?.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query),
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (product) => product.categoryId === categoryFilter,
      );
    }

    setFilteredProducts(filtered);
  };

  const handleDelete = async () => {
    if (!deleteModal) return;

    try {
      await productService.deleteProduct(deleteModal.id);
      setProducts((prev) => prev.filter((p) => p.id !== deleteModal.id));
      setDeleteModal(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (isLoading) {
    return <Loader size="lg" text="Loading products..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Products</h1>
          <p className="text-sm text-gray-500">
            {filteredProducts.length} products found
          </p>
        </div>

        <Link to="/admin/products/add">
          <Button variant="primary" className="flex items-center gap-2">
            <FaPlus className="w-4 h-4" />
            Add Product
          </Button>
        </Link>
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
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none bg-white"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-48 bg-gray-100">
                <img
                  src={product.image || "/placeholder-product.jpg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <Link
                    to={`/admin/products/edit/${product.id}`}
                    className="p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition-colors"
                  >
                    <FaEdit className="w-4 h-4 text-primary-600" />
                  </Link>
                  <button
                    onClick={() => setDeleteModal(product)}
                    className="p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition-colors"
                  >
                    <FaTrash className="w-4 h-4 text-red-600" />
                  </button>
                </div>
                {product.stock <= 10 && (
                  <span className="absolute bottom-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    Low Stock
                  </span>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-800 truncate">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mt-3">
                  <div>
                    <p className="text-xl font-bold text-primary-800">
                      ₦{product.price.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {product.stock} in stock
                    </p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                    {product.category?.name || "Uncategorized"}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
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
              : "Start adding products to your store"}
          </p>
          {!searchQuery && (
            <Link to="/admin/products/add" className="mt-4 inline-block">
              <Button variant="primary">Add First Product</Button>
            </Link>
          )}
        </div>
      )}

      {/* Delete Modal */}
      <Modal
        isOpen={!!deleteModal}
        onClose={() => setDeleteModal(null)}
        title="Delete Product"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaTrash className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Are you sure?
          </h3>
          <p className="text-gray-500 mb-6">
            This action cannot be undone. This will permanently delete the
            product "{deleteModal?.name}".
          </p>
          <div className="flex justify-center gap-3">
            <Button variant="outline" onClick={() => setDeleteModal(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete Product
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Products;
