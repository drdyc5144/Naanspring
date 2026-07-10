import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaTruck,
  FaShieldAlt,
  FaMoneyBillWave,
  FaStar,
  FaArrowRight,
  FaClock,
  FaShoppingBag,
} from "react-icons/fa";
import { ProductCard, ProductGrid } from "../../../Components/product";
import { Button } from "../../../Components/Common";
import { productService } from "../../../Service/product.service";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const features = [
    {
      icon: FaTruck,
      title: "Fast Delivery",
      description:
        "Get your food items delivered to your doorstep within 24-48 hours",
    },
    {
      icon: FaShieldAlt,
      title: "Quality Guaranteed",
      description:
        "All our products are carefully selected for quality and freshness",
    },
    {
      icon: FaMoneyBillWave,
      title: "Best Prices",
      description: "Competitive prices on all foodstuff items",
    },
    {
      icon: FaClock,
      title: "24/7 Support",
      description: "Our customer service team is always ready to help you",
    },
  ];

  const categories = [
    { name: "Stock Fish", icon: "🐟", count: 24 },
    { name: "Egusi", icon: "🌾", count: 18 },
    { name: "Ogbono", icon: "🌿", count: 15 },
    { name: "Crawfish", icon: "🦐", count: 12 },
    { name: "Palm Oil", icon: "🥥", count: 20 },
    { name: "Beans", icon: "🫘", count: 16 },
    { name: "Rice", icon: "🍚", count: 22 },
    { name: "Kpomo", icon: "🥩", count: 10 },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const featuredResponse = await productService.getFeaturedProducts();
      setFeaturedProducts(featuredResponse.data || []);

      const newResponse = await productService.getProducts({ sort: "new" });
      setNewArrivals(newResponse.data?.slice(0, 8) || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-800 to-primary-600 rounded-3xl overflow-hidden">
        <div className="relative z-10 px-6 py-16 md:py-20 lg:py-24">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              Fresh Foodstuff,
              <br />
              <span className="text-secondary-400">
                Delivered to Your Doorstep
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-lg text-primary-100"
            >
              Quality food items from trusted sources. Shop now and get the best
              prices on all your favorite foodstuff.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link to="/shop">
                <Button variant="accent" size="lg">
                  <FaShoppingBag className="mr-2" />
                  Start Shopping
                </Button>
              </Link>
              <Link to="/categories">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary-800"
                >
                  Browse Categories
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Hero Decoration */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-l from-primary-700/50 to-transparent" />
          <div className="absolute right-10 top-1/2 -translate-y-1/2">
            <div className="w-64 h-64 bg-secondary-500 rounded-full opacity-20 blur-3xl" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl">🛒</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-7 h-7 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-800">{feature.title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Shop by Category</h2>
          <Link
            to="/categories"
            className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
          >
            View All
            <FaArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-xl shadow-sm p-4 text-center hover:shadow-md transition-all cursor-pointer"
            >
              <div className="text-4xl mb-2">{category.icon}</div>
              <h4 className="font-medium text-gray-800">{category.name}</h4>
              <p className="text-sm text-gray-500">{category.count} products</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Featured Products
          </h2>
          <Link
            to="/shop"
            className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
          >
            View All
            <FaArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <ProductGrid
          products={featuredProducts}
          isLoading={isLoading}
          columns={4}
        />
      </section>

      {/* New Arrivals */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">New Arrivals</h2>
          <Link
            to="/shop"
            className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
          >
            View All
            <FaArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <ProductGrid products={newArrivals} isLoading={isLoading} columns={4} />
      </section>

      {/* Newsletter */}
      <section className="bg-gradient-to-r from-primary-800 to-primary-600 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-white">
          Subscribe to Our Newsletter
        </h3>
        <p className="text-primary-100 mt-2">
          Get the latest updates on new products and special offers
        </p>
        <div className="mt-6 max-w-md mx-auto flex gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500"
          />
          <Button variant="accent" size="lg">
            Subscribe
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
