import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSearch, FaTimes, FaFilter } from "react-icons/fa";
import { ProductGrid } from "../../../Components/product";
import { Button } from "../../../Components/Common";
import { productService } from "../../../Service/product.service";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "relevance",
  });

  useEffect(() => {
    if (query) {
      performSearch();
    }
  }, [query, filters]);

  const performSearch = async () => {
    setIsLoading(true);
    try {
      const params = {
        q: query,
        category: filters.category || undefined,
        minPrice: filters.minPrice || undefined,
        maxPrice: filters.maxPrice || undefined,
        sort: filters.sortBy,
      };
      const response = await productService.searchProducts(params);
      setProducts(response.data || []);
      setTotalResults(response.total || 0);
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  if (!query) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaSearch className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          Search for Products
        </h2>
        <p className="text-gray-500 mt-2">
          Enter a search term to find products
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Search Results for "{query}"
        </h1>
        <p className="text-gray-500 mt-1">{totalResults} products found</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search products..."
              defaultValue={query}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  window.location.href = `/search?q=${encodeURIComponent(e.target.value)}`;
                }
              }}
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <Button variant="primary">Search</Button>
        </div>
      </div>

      {/* Results */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-64 bg-gray-100 rounded-xl"></div>
            </div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <ProductGrid products={products} columns={4} />
      ) : (
        <div className="text-center py-12 bg-white rounded-xl">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaSearch className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            No results found
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            We couldn't find any products matching "{query}". Try adjusting your
            search terms.
          </p>
          <Link to="/shop" className="mt-4 inline-block">
            <Button variant="primary">Browse All Products</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Search;
