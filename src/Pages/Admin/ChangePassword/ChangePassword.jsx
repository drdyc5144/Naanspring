import { useState } from "react";
import { motion } from "framer-motion";
import { FaLock, FaCheckCircle } from "react-icons/fa";
import { Button, Input } from "../../../Components/Common";
import { useAuth } from "../../../Hooks/useAuth";

const AdminChangePassword = () => {
  const { changePassword } = useAuth();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }
    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const result = await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      if (result.success) {
        setSuccess(true);
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setErrors({ general: result.error });
      }
    } catch (error) {
      setErrors({ general: "Failed to change password. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Change Password</h1>

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm flex items-center gap-2"
        >
          <FaCheckCircle className="w-4 h-4" />
          Password changed successfully!
        </motion.div>
      )}

      {errors.general && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          {errors.general}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm p-6 space-y-4"
      >
        <Input
          label="Current Password"
          type="password"
          name="currentPassword"
          placeholder="Enter your current password"
          value={formData.currentPassword}
          onChange={handleChange}
          error={errors.currentPassword}
          icon={FaLock}
          required
        />

        <Input
          label="New Password"
          type="password"
          name="newPassword"
          placeholder="Enter a new password"
          value={formData.newPassword}
          onChange={handleChange}
          error={errors.newPassword}
          icon={FaLock}
          required
        />

        <Input
          label="Confirm New Password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm your new password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          icon={FaLock}
          required
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isLoading}
        >
          Change Password
        </Button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Password must be at least 6 characters long
        </p>
      </form>
    </div>
  );
};

export default AdminChangePassword;
