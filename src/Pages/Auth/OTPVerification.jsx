import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import { Button } from "../../Components/Common/";
import { authService } from "../../Service/auth.service";

const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Timer for resend
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); // Only take first character
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    // Clear error when user types
    if (error) setError("");
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const numbers = pastedData.replace(/\D/g, "").slice(0, 6);

    if (numbers) {
      const newOtp = [...otp];
      numbers.split("").forEach((num, index) => {
        if (index < 6) newOtp[index] = num;
      });
      setOtp(newOtp);

      // Focus last filled input or next empty
      const lastIndex = Math.min(numbers.length - 1, 5);
      if (inputRefs.current[lastIndex]) {
        inputRefs.current[lastIndex].focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await authService.verifyOTP({ email, otp: otpCode });
      if (result.success) {
        navigate("/reset-password", { state: { email, otp: otpCode } });
      } else {
        setError(result.error || "Invalid verification code");
      }
    } catch (error) {
      setError("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    try {
      await authService.forgotPassword({ email });
      setTimeLeft(120);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      setError("");
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    } catch (error) {
      setError("Failed to resend code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl"
      >
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
        >
          <FaArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>

        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary-800">Verify OTP</h2>
          <p className="mt-2 text-gray-600">
            Enter the 6-digit code sent to your email
          </p>
          {email && <p className="text-sm text-gray-500 mt-1">{email}</p>}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        {/* OTP Form */}
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-3 my-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                disabled={isLoading}
              />
            ))}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
          >
            Verify OTP
          </Button>
        </form>

        {/* Resend */}
        <div className="text-center mt-4">
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-primary-600 hover:text-primary-700 font-medium"
              disabled={isLoading}
            >
              Resend Code
            </button>
          ) : (
            <p className="text-sm text-gray-500">
              Resend code in {Math.floor(timeLeft / 60)}:
              {String(timeLeft % 60).padStart(2, "0")}
            </p>
          )}
        </div>

        {/* Login Link */}
        <div className="text-center mt-2">
          <p className="text-sm text-gray-600">
            <Link
              to="/login"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Back to Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default OTPVerification;
