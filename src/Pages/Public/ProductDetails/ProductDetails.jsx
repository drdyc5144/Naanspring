import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaShoppingCart,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaTruck,
  FaShieldAlt,
  FaArrowLeft,
  FaMinus,
  FaPlus,
  FaHeart,
  FaRegHeart,
  FaCheckCircle,
  FaShare,
} from "react-icons/fa";
import { Button } from "../../../Components/Common";
import { ProductGallery, ProductGrid } from "../../../Components/product";
import { useCart } from "../../../Hooks/useCart";
import { productService } from "../../../Service/product.service";

{
  /* <ProductGallery
  images={product.images}
  activeIndex={activeImage}
  onImageChange={setActiveImage}
/>; */
}

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    fetchProductDetails();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchProductDetails = async () => {
    setIsLoading(true);
    try {
      const response = await productService.getProductById(id);
      setProduct(response.data);

      // Fetch related products
      const relatedResponse = await productService.getProducts({
        category: response.data.categoryId,
        limit: 4,
      });
      setRelatedProducts(
        relatedResponse.data?.filter((p) => p.id !== id) || [],
      );
    } catch (error) {
      console.error("Error fetching product:", error);
      navigate("/shop");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      // Show success notification
    }
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prev) =>
      Math.max(1, Math.min(prev + delta, product?.stock || 10)),
    );
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} className="w-4 h-4 text-yellow-400" />
        ))}
        {hasHalfStar && <FaStarHalfAlt className="w-4 h-4 text-yellow-400" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={i} className="w-4 h-4 text-yellow-400" />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const images = product.images || [product.image];
  const rating = product.rating || 4.5;
  const reviews = product.reviews || 127;

  return (
    <div className="space-y-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500">
        <Link to="/" className="hover:text-primary-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-primary-600">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <Link
          to={`/categories/${product.categoryId}`}
          className="hover:text-primary-600"
        >
          {product.category?.name || "Products"}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{product.name}</span>
      </nav>

      {/* Product Main */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images */}
        <div>
          <ProductGallery
            images={images}
            activeIndex={activeImage}
            onImageChange={setActiveImage}
          />
        </div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Title & Rating */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-2">
                {renderStars(rating)}
                <span className="text-sm text-gray-500">
                  ({reviews} reviews)
                </span>
              </div>
              {product.inStock ? (
                <span className="text-sm text-green-600 flex items-center gap-1">
                  <FaCheckCircle className="w-4 h-4" />
                  In Stock
                </span>
              ) : (
                <span className="text-sm text-red-600">Out of Stock</span>
              )}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-primary-800">
              ₦{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through">
                ₦{product.originalPrice.toLocaleString()}
              </span>
            )}
            {product.discount && (
              <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-semibold rounded">
                -{product.discount}%
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Quantity */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="p-2 border border-gray-300 rounded-lg hover:border-primary-600 transition-colors"
                disabled={quantity <= 1}
              >
                <FaMinus className="w-4 h-4 text-gray-600" />
              </button>
              <span className="w-12 text-center font-medium text-lg">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="p-2 border border-gray-300 rounded-lg hover:border-primary-600 transition-colors"
                disabled={quantity >= product.stock}
              >
                <FaPlus className="w-4 h-4 text-gray-600" />
              </button>
              <span className="text-sm text-gray-500 ml-2">
                {product.stock} available
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1"
            >
              <FaShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="px-4"
            >
              {isWishlisted ? (
                <FaHeart className="w-5 h-5 text-red-500" />
              ) : (
                <FaRegHeart className="w-5 h-5" />
              )}
            </Button>
            <Button variant="outline" size="lg" className="px-4">
              <FaShare className="w-5 h-5" />
            </Button>
          </div>

          {/* Shipping Info */}
          <div className="border-t border-gray-200 pt-6 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <FaTruck className="w-5 h-5 text-primary-600" />
              <span className="text-gray-600">
                Free delivery on orders over ₦50,000
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <FaShieldAlt className="w-5 h-5 text-primary-600" />
              <span className="text-gray-600">
                Quality guaranteed or your money back
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <Link to={`/product/${product.id}`}>
                  <div className="h-48 bg-gray-100">
                    <img
                      src={product.image || "/placeholder-product.jpg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium text-gray-800 truncate">
                      {product.name}
                    </h4>
                    <p className="text-lg font-bold text-primary-800 mt-1">
                      ₦{product.price.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      {renderStars(product.rating || 4)}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
