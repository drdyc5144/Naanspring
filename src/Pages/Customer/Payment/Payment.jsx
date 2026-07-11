import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCreditCard,
  FaLock,
  FaCheckCircle,
  FaSpinner,
  FaArrowLeft,
} from "react-icons/fa";
import { Button, Input } from "../../../Components/Common";
import paymentService from "../../../Service/payment.service";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, amount, orderData } = location.state || {};

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });

  useEffect(() => {
    if (!orderId) {
      navigate("/account/cart");
    }
  }, [orderId, navigate]);

  const handleCardInput = (e) => {
    const { name, value } = e.target;

    // Format card number
    if (name === "cardNumber") {
      const cleaned = value.replace(/\D/g, "");
      const formatted = cleaned.replace(/(.{4})/g, "$1 ").trim();
      setCardDetails((prev) => ({ ...prev, [name]: formatted.slice(0, 19) }));
      return;
    }

    // Format expiry date
    if (name === "expiryDate") {
      const cleaned = value.replace(/\D/g, "");
      const formatted = cleaned.replace(/(.{2})/g, "$1/").trim();
      setCardDetails((prev) => ({ ...prev, [name]: formatted.slice(0, 5) }));
      return;
    }

    // CVV - only numbers, max 4 digits
    if (name === "cvv") {
      const cleaned = value.replace(/\D/g, "");
      setCardDetails((prev) => ({ ...prev, [name]: cleaned.slice(0, 4) }));
      return;
    }

    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateCard = () => {
    const cardNumberClean = cardDetails.cardNumber.replace(/\s/g, "");
    if (cardNumberClean.length < 16) {
      setError("Please enter a valid card number");
      return false;
    }
    if (cardDetails.expiryDate.length < 5) {
      setError("Please enter a valid expiry date");
      return false;
    }
    if (cardDetails.cvv.length < 3) {
      setError("Please enter a valid CVV");
      return false;
    }
    if (!cardDetails.cardName.trim()) {
      setError("Please enter the cardholder name");
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!validateCard()) return;

    setIsProcessing(true);
    setError("");

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Process payment
      const paymentData = {
        orderId,
        amount,
        paymentMethod: "card",
        cardDetails: {
          last4: cardDetails.cardNumber.slice(-4),
          expiryDate: cardDetails.expiryDate,
        },
      };

      await paymentService.processPayment(paymentData);

      setIsSuccess(true);

      // Redirect to order confirmation after 3 seconds
      setTimeout(() => {
        navigate("/account/orders");
      }, 3000);
    } catch (error) {
      console.error("Payment failed:", error);
      setError("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!orderId) {
    return null;
  }

  return (
    <div className="max-w-lg mx-auto">
      <button
        onClick={() => navigate("/account/checkout")}
        className="flex items-center gap-2 text-gray-500 hover:text-primary-600 transition-colors mb-6"
      >
        <FaArrowLeft className="w-4 h-4" />
        Back to Checkout
      </button>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        {isSuccess ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-8"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Payment Successful! 🎉
            </h2>
            <p className="text-gray-500 mt-2">
              Your order has been confirmed and is being processed.
            </p>
            <p className="text-sm text-gray-400 mt-4">
              Redirecting to your orders...
            </p>
          </motion.div>
        ) : (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Complete Payment
              </h2>
              <p className="text-gray-500 mt-1">
                Order #{orderId} • ₦{amount?.toLocaleString()}
              </p>
            </div>

            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {/* Card Form */}
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 mb-4 flex items-center gap-3">
                <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">
                  💳
                </div>
                <div>
                  <p className="font-medium text-gray-800">Card Payment</p>
                  <p className="text-xs text-gray-500">
                    Secure encrypted payment
                  </p>
                </div>
                <FaLock className="ml-auto text-gray-400" />
              </div>

              <Input
                label="Card Number"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.cardNumber}
                onChange={handleCardInput}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Expiry Date"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={cardDetails.expiryDate}
                  onChange={handleCardInput}
                  required
                />
                <Input
                  label="CVV"
                  name="cvv"
                  type="password"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={handleCardInput}
                  required
                />
              </div>

              <Input
                label="Cardholder Name"
                name="cardName"
                placeholder="John Doe"
                value={cardDetails.cardName}
                onChange={handleCardInput}
                required
              />

              <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
                <FaLock className="w-4 h-4" />
                <span>Your payment is secure and encrypted</span>
              </div>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handlePayment}
                isLoading={isProcessing}
                className="mt-4"
              >
                {isProcessing ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  `Pay ₦${amount?.toLocaleString()}`
                )}
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Order Summary */}
      <div className="mt-4 bg-gray-50 rounded-xl p-4">
        <h4 className="font-medium text-gray-800 mb-2">Order Summary</h4>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Items</span>
            <span className="font-medium">{orderData?.items?.length || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total</span>
            <span className="font-bold text-primary-800">
              ₦{amount?.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
