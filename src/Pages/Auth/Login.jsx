import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Button, Input } from "../../Components/Common/";
import { useAuth } from "../../Hooks/useAuth";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/account/dashboard";

  // ✅ Demo credentials
  const DEMO_CREDENTIALS = {
    customer: { email: "customer@naanspring.com", password: "password123" },
    admin: { email: "admin@naanspring.com", password: "admin123" },
  };

  // ✅ Auto-fill demo credentials
  const fillDemoCredentials = (role) => {
    if (role === "customer") {
      setFormData({
        email: DEMO_CREDENTIALS.customer.email,
        password: DEMO_CREDENTIALS.customer.password,
      });
    } else if (role === "admin") {
      setFormData({
        email: DEMO_CREDENTIALS.admin.email,
        password: DEMO_CREDENTIALS.admin.password,
      });
    }
    // Clear any previous errors
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        // Redirect based on user role
        if (result.user?.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate(from, { replace: true });
        }
      } else {
        setErrors({ general: result.error });
      }
    } catch (error) {
      setErrors({ general: "Login failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
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
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary-800">Welcome Back</h2>
          <p className="mt-2 text-gray-600">
            Sign in to your Naanspring account
          </p>
        </div>

        {/* Error Message */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
            {errors.general}
          </div>
        )}

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              icon={FaEnvelope}
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              icon={FaLock}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>

            <Link
              to="/forgot-password"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
          >
            Sign In
          </Button>
        </form>

        {/* ✅ DEMO CREDENTIALS BUTTONS */}
        <div className="mt-4 space-y-3">
          <p className="text-xs text-gray-500 text-center">
            Quick Login with Demo Account:
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => fillDemoCredentials("customer")}
              className="flex-1 px-4 py-2.5 text-sm bg-green-50 text-green-700 rounded-lg border border-green-200 hover:bg-green-100 transition-colors font-medium"
            >
              🧑 Customer
            </button>
            <button
              type="button"
              onClick={() => fillDemoCredentials("admin")}
              className="flex-1 px-4 py-2.5 text-sm bg-purple-50 text-purple-700 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors font-medium"
            >
              👨‍💼 Admin
            </button>
          </div>
          <div className="text-[10px] text-gray-400 text-center space-y-0.5">
            <p>Customer: customer@naanspring.com / password123</p>
            <p>Admin: admin@naanspring.com / admin123</p>
          </div>
        </div>

        {/* Register Link */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Create one now
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
