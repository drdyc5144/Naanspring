import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaShoppingCart,
  FaTrash,
  FaPlus,
  FaMinus,
  FaArrowLeft,
  FaLock,
} from "react-icons/fa";
import { Button } from "../../../Components/Common";
import { useCart } from "../../../Hooks/useCart";
import { useAuth } from "../../../Hooks/useAuth";

const Cart = () => {
  const {
    items,
    totalItems,
    totalPrice,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");

  const shipping = totalPrice > 0 ? 500 : 0;
  const tax = totalPrice * 0.075; // 7.5% VAT
  const grandTotal = totalPrice + shipping + tax - discount;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/account/cart" } });
      return;
    }
    navigate("/account/checkout");
  };

  const handleApplyCoupon = () => {
    if (couponCode === "NAAN10") {
      setDiscount(totalPrice * 0.1);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code");
      setDiscount(0);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <FaShoppingCart className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-6">
          Looks like you haven't added any items to your cart yet.
        </p>
        <Link to="/shop">
          <Button variant="primary" size="lg">
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-white rounded-xl shadow-sm p-4 flex flex-col sm:flex-row gap-4"
              >
                {/* Product Image */}
                <div className="w-full sm:w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                  <img
                    src={item.image || "/placeholder-product.jpg"}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    ₦{item.price?.toLocaleString()}
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <FaMinus className="w-3 h-3 text-gray-600" />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <FaPlus className="w-3 h-3 text-gray-600" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="text-right sm:text-left">
                  <p className="font-bold text-primary-800">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Clear Cart */}
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-red-500 hover:text-red-700 text-sm transition-colors"
            >
              Clear Cart
            </button>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Order Summary
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Subtotal ({totalItems} items)
                </span>
                <span className="font-medium">
                  ₦{totalPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  ₦{shipping.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (7.5%)</span>
                <span className="font-medium">₦{tax.toLocaleString()}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₦{discount.toLocaleString()}</span>
                </div>
              )}

              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary-800">
                    ₦{grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Coupon */}
            <div className="mt-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="px-4 py-2 bg-primary-800 text-white rounded-md hover:bg-primary-700 transition-colors text-sm font-medium"
                >
                  Apply
                </button>
              </div>
              {couponError && (
                <p className="text-red-500 text-xs mt-1">{couponError}</p>
              )}
              {discount > 0 && (
                <p className="text-green-600 text-xs mt-1">
                  Coupon applied successfully!
                </p>
              )}
            </div>

            {/* Checkout Button */}
            <Button
              variant="primary"
              size="lg"
              fullWidth
              className="mt-4"
              onClick={handleCheckout}
            >
              <FaLock className="w-4 h-4 mr-2" />
              Proceed to Checkout
            </Button>

            <Link
              to="/shop"
              className="flex items-center justify-center gap-2 mt-3 text-sm text-gray-500 hover:text-primary-600 transition-colors"
            >
              <FaArrowLeft className="w-3 h-3" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
