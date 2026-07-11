import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCamera,
  FaSave,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import { Button, Input } from "../../../Components/Common";
import { useAuth } from "../../../Hooks/useAuth";
import { customerService } from "../../../Service/customer.service";

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone) newErrors.phone = "Phone number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setSuccess(false);
    try {
      const result = await updateProfile(formData);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
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

  // ✅ Image upload handlers
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size must be less than 2MB");
        return;
      }

      // Validate file type
      if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type)) {
        alert("Please upload a valid image (JPEG, PNG, WEBP, GIF)");
        return;
      }

      setProfileImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Profile Photo */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 text-center">
            <div className="relative inline-block">
              {/* ✅ Profile Image */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-primary-500 to-primary-800 rounded-full flex items-center justify-center text-white text-3xl sm:text-5xl font-bold mx-auto overflow-hidden">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    {formData.firstName?.charAt(0) || "U"}
                    {formData.lastName?.charAt(0) || ""}
                  </>
                )}
              </div>
              
              {/* ✅ Camera Button - Now functional */}
              <button
                onClick={handleImageClick}
                className="absolute bottom-0 right-0 p-1.5 sm:p-2 bg-primary-800 text-white rounded-full hover:bg-primary-700 transition-colors shadow-md"
              >
                <FaCamera className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              
              {/* ✅ Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
              
              {/* ✅ Remove image button (only if image exists) */}
              {imagePreview && (
                <button
                  onClick={handleRemoveImage}
                  className="absolute -top-1 -right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-md"
                >
                  <FaTrash className="w-3 h-3" />
                </button>
              )}
            </div>
            
            <h3 className="mt-3 sm:mt-4 font-semibold text-gray-800 text-sm sm:text-base">
              {formData.firstName} {formData.lastName}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">{formData.email}</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">{formData.phone}</p>
          </div>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
              Edit Profile Information
            </h3>

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm flex items-center justify-between"
              >
                <span>Profile updated successfully!</span>
                <button onClick={() => setSuccess(false)}>
                  <FaTimes className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={errors.firstName}
                  icon={FaUser}
                  required
                />
                <Input
                  label="Last Name"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                  icon={FaUser}
                  required
                />
              </div>

              <Input
                label="Email Address"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                icon={FaEnvelope}
                disabled
                required
              />

              <Input
                label="Phone Number"
                type="tel"
                name="phone"
                placeholder="080 1234 5678"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                icon={FaPhone}
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Bio
                </label>
                <textarea
                  name="bio"
                  rows="4"
                  placeholder="Tell us a little about yourself..."
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-sm sm:text-base"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isLoading}
                  className="flex items-center gap-2 w-full sm:w-auto"
                >
                  <FaSave className="w-4 h-4" />
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;