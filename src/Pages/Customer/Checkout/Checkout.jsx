import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaTruck,
  FaCreditCard,
  FaMapMarkerAlt,
  FaPlus,
  FaCheckCircle,
  FaShoppingBag,
} from "react-icons/fa";
import { Button, Input, Modal } from "../../../Components/Common";
import { useCart } from "../../../Hooks/useCart";
import { useAuth } from "../../../Hooks/useAuth";
import { customerService } from "../../../Service/customer.service";
import { orderService } from "../../../Service/order.service";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    label: "home",
  });
  const [deliveryNote, setDeliveryNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const shipping = totalPrice > 0 ? 500 : 0;
  const tax = totalPrice * 0.075;
  const grandTotal = totalPrice + shipping + tax;

  useEffect(() => {
    if (items.length === 0) {
      navigate("/account/cart");
    }
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await customerService.getAddresses();
      setAddresses(response.data || []);
      const defaultAddress = response.data?.find((addr) => addr.isDefault);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress);
      } else if (response.data?.length > 0) {
        setSelectedAddress(response.data[0]);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await customerService.createAddress(formData);
      await fetchAddresses();
      setSelectedAddress(response.data);
      setIsModalOpen(false);
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        label: "home",
      });
    } catch (error) {
      console.error("Error adding address:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }

    setIsLoading(true);
    try {
      const orderData = {
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress: selectedAddress,
        deliveryNote,
        paymentMethod,
        subtotal: totalPrice,
        shipping,
        tax,
        total: grandTotal,
      };

      const response = await orderService.createOrder(orderData);
      clearCart();
      navigate("/account/payment", {
        state: {
          orderId: response.data.id,
          amount: grandTotal,
          orderData: response.data,
        },
      });
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate("/account/cart")}
        className="flex items-center gap-2 text-gray-500 hover:text-primary-600 transition-colors"
      >
        <FaArrowLeft className="w-4 h-4" />
        Back to Cart
      </button>

      <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Address */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaMapMarkerAlt className="text-primary-600" />
              Delivery Address
            </h3>

            {addresses.length > 0 ? (
              <div className="space-y-3">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    onClick={() => setSelectedAddress(address)}
                    className={`
                      p-4 border-2 rounded-lg cursor-pointer transition-all
                      ${
                        selectedAddress?.id === address.id
                          ? "border-primary-500 bg-primary-50"
                          : "border-gray-200 hover:border-primary-200"
                      }
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {selectedAddress?.id === address.id ? (
                          <FaCheckCircle className="w-5 h-5 text-primary-600" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-800">
                            {address.firstName} {address.lastName}
                          </span>
                          {address.isDefault && (
                            <span className="text-xs px-2 py-0.5 bg-primary-100 text-primary-600 rounded-full">
                              Default
                            </span>
                          )}
                          <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                            {address.label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {address.address}
                        </p>
                        <p className="text-sm text-gray-600">
                          {address.city}, {address.state} {address.postalCode}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Phone: {address.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500 mb-4">No saved addresses</p>
              </div>
            )}

            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2"
            >
              <FaPlus className="w-4 h-4" />
              Add New Address
            </button>
          </div>

          {/* Delivery Note */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Delivery Note (Optional)
            </h3>
            <textarea
              rows="3"
              placeholder="Any special delivery instructions?"
              value={deliveryNote}
              onChange={(e) => setDeliveryNote(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaCreditCard className="text-primary-600" />
              Payment Method
            </h3>
            <div className="space-y-3">
              <div
                onClick={() => setPaymentMethod("card")}
                className={`
                  p-4 border-2 rounded-lg cursor-pointer transition-all flex items-center gap-3
                  ${
                    paymentMethod === "card"
                      ? "border-primary-500 bg-primary-50"
                      : "border-gray-200 hover:border-primary-200"
                  }
                `}
              >
                <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">
                  💳
                </div>
                <div>
                  <p className="font-medium text-gray-800">Card Payment</p>
                  <p className="text-sm text-gray-500">
                    Pay with credit/debit card
                  </p>
                </div>
                {paymentMethod === "card" && (
                  <FaCheckCircle className="ml-auto text-primary-600 w-5 h-5" />
                )}
              </div>

              <div
                onClick={() => setPaymentMethod("transfer")}
                className={`
                  p-4 border-2 rounded-lg cursor-pointer transition-all flex items-center gap-3
                  ${
                    paymentMethod === "transfer"
                      ? "border-primary-500 bg-primary-50"
                      : "border-gray-200 hover:border-primary-200"
                  }
                `}
              >
                <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">
                  🏦
                </div>
                <div>
                  <p className="font-medium text-gray-800">Bank Transfer</p>
                  <p className="text-sm text-gray-500">Pay via bank transfer</p>
                </div>
                {paymentMethod === "transfer" && (
                  <FaCheckCircle className="ml-auto text-primary-600 w-5 h-5" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Order Summary
            </h3>

            {/* Items Preview */}
            <div className="max-h-48 overflow-y-auto space-y-2 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
                    <img
                      src={item.image || "/placeholder-product.jpg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 truncate">
                      {item.name}
                    </p>
                    <p className="text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Subtotal ({items.length} items)
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

              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary-800">
                    ₦{grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              className="mt-6"
              onClick={handlePlaceOrder}
              isLoading={isLoading}
              disabled={!selectedAddress}
            >
              <FaShoppingBag className="w-4 h-4 mr-2" />
              Place Order
            </Button>

            <p className="text-xs text-gray-500 text-center mt-3">
              By placing your order, you agree to our Terms & Conditions
            </p>
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Address"
        size="lg"
      >
        <form onSubmit={handleAddAddress} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="First Name"
              placeholder="John"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              required
            />
            <Input
              label="Last Name"
              placeholder="Doe"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              required
            />
          </div>

          <Input
            label="Phone Number"
            type="tel"
            placeholder="080 1234 5678"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            required
          />

          <Input
            label="Street Address"
            placeholder="123 Main Street"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="City"
              placeholder="Lagos"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              required
            />
            <Input
              label="State"
              placeholder="Lagos"
              value={formData.state}
              onChange={(e) =>
                setFormData({ ...formData, state: e.target.value })
              }
              required
            />
            <Input
              label="Postal Code"
              placeholder="100001"
              value={formData.postalCode}
              onChange={(e) =>
                setFormData({ ...formData, postalCode: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Address Label
            </label>
            <select
              value={formData.label}
              onChange={(e) =>
                setFormData({ ...formData, label: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="home">Home</option>
              <option value="work">Work</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" isLoading={isLoading}>
              Add Address
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Checkout;
