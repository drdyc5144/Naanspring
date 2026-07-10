import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaStore,
  FaSave,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGlobe,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaShippingFast,
  FaDollarSign,
  FaPercentage,
  FaCheckCircle,
  FaTimes,
  FaImage,
} from "react-icons/fa";
import { Button, Input } from "../../../Components/Common";
import { storeService } from "../../../Service/store.service";

const StoreSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [formData, setFormData] = useState({
    // General Settings
    storeName: "Naanspring",
    storeTagline: "Fresh. Natural. Trusted.",
    storeEmail: "info@naanspring.com",
    storePhone: "+234 800 123 4567",
    storeAddress: "123 Food Street, Lagos, Nigeria",
    storeWebsite: "www.naanspring.com",

    // Business Hours
    businessHours: {
      monday: { open: "08:00", close: "18:00", closed: false },
      tuesday: { open: "08:00", close: "18:00", closed: false },
      wednesday: { open: "08:00", close: "18:00", closed: false },
      thursday: { open: "08:00", close: "18:00", closed: false },
      friday: { open: "08:00", close: "18:00", closed: false },
      saturday: { open: "09:00", close: "15:00", closed: false },
      sunday: { open: "00:00", close: "00:00", closed: true },
    },

    // Shipping Settings
    shippingFee: 500,
    freeShippingThreshold: 50000,
    deliveryTimeframe: "24-48 hours",
    shippingZones: ["Lagos", "Abuja", "Port Harcourt", "Other States"],

    // Payment Settings
    currency: "NGN",
    paymentMethods: ["card", "transfer"],
    paystackPublicKey: "",
    flutterwavePublicKey: "",

    // Social Media
    socialMedia: {
      facebook: "https://facebook.com/naanspring",
      twitter: "https://twitter.com/naanspring",
      instagram: "https://instagram.com/naanspring",
      youtube: "https://youtube.com/naanspring",
      whatsapp: "https://wa.me/2348001234567",
    },

    // SEO
    metaTitle: "Naanspring - Quality Foodstuff Marketplace",
    metaDescription:
      "Shop quality foodstuff online. Fresh products delivered to your doorstep.",
    metaKeywords: "foodstuff, groceries, online shopping, Nigeria",

    // Others
    maintenanceMode: false,
    allowGuestCheckout: true,
  });

  useEffect(() => {
    fetchStoreSettings();
  }, []);

  const fetchStoreSettings = async () => {
    setIsLoading(true);
    try {
      // Mock data - replace with actual API call
      // const response = await storeService.getStoreSettings()
      // setFormData(response.data)

      // Using mock data for now
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Error fetching store settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // await storeService.updateStoreSettings(formData)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error("Error saving store settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (section, key, value) => {
    if (section) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  const handleBusinessHoursChange = (day, field, value) => {
    setFormData((prev) => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: {
          ...prev.businessHours[day],
          [field]: value,
        },
      },
    }));
  };

  const handleSocialMediaChange = (platform, value) => {
    setFormData((prev) => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value,
      },
    }));
  };

  const tabs = [
    { id: "general", label: "General", icon: FaStore },
    { id: "hours", label: "Business Hours", icon: FaClock },
    { id: "shipping", label: "Shipping", icon: FaShippingFast },
    { id: "payment", label: "Payment", icon: FaDollarSign },
    { id: "social", label: "Social Media", icon: FaGlobe },
    { id: "seo", label: "SEO", icon: FaGlobe },
  ];

  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const dayLabels = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Store Settings</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your store configuration and preferences
          </p>
        </div>

        <div className="flex items-center gap-3">
          {success && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-green-600 text-sm bg-green-50 px-4 py-2 rounded-lg"
            >
              <FaCheckCircle className="w-4 h-4" />
              Settings saved successfully!
            </motion.div>
          )}
          <Button
            variant="primary"
            onClick={handleSave}
            isLoading={isSaving}
            className="flex items-center gap-2"
          >
            <FaSave className="w-4 h-4" />
            Save Settings
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto px-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-4 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap
                    ${
                      isActive
                        ? "border-primary-600 text-primary-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* General Settings */}
          {activeTab === "general" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                General Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Store Name"
                  value={formData.storeName}
                  onChange={(e) =>
                    handleChange(null, "storeName", e.target.value)
                  }
                  icon={FaStore}
                />
                <Input
                  label="Store Tagline"
                  value={formData.storeTagline}
                  onChange={(e) =>
                    handleChange(null, "storeTagline", e.target.value)
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Store Email"
                  type="email"
                  value={formData.storeEmail}
                  onChange={(e) =>
                    handleChange(null, "storeEmail", e.target.value)
                  }
                  icon={FaEnvelope}
                />
                <Input
                  label="Store Phone"
                  value={formData.storePhone}
                  onChange={(e) =>
                    handleChange(null, "storePhone", e.target.value)
                  }
                  icon={FaPhone}
                />
              </div>

              <Input
                label="Store Address"
                value={formData.storeAddress}
                onChange={(e) =>
                  handleChange(null, "storeAddress", e.target.value)
                }
                icon={FaMapMarkerAlt}
              />

              <Input
                label="Store Website"
                value={formData.storeWebsite}
                onChange={(e) =>
                  handleChange(null, "storeWebsite", e.target.value)
                }
                icon={FaGlobe}
              />

              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Store Logo
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors">
                  <FaImage className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-400">
                    PNG, JPG, WEBP (Max 2MB)
                  </p>
                  <input type="file" className="hidden" accept="image/*" />
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.maintenanceMode}
                    onChange={(e) =>
                      handleChange(null, "maintenanceMode", e.target.checked)
                    }
                    className="w-4 h-4 text-primary-600 rounded"
                  />
                  Enable Maintenance Mode
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.allowGuestCheckout}
                    onChange={(e) =>
                      handleChange(null, "allowGuestCheckout", e.target.checked)
                    }
                    className="w-4 h-4 text-primary-600 rounded"
                  />
                  Allow Guest Checkout
                </label>
              </div>
            </div>
          )}

          {/* Business Hours */}
          {activeTab === "hours" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Business Hours
              </h3>
              <div className="space-y-3">
                {daysOfWeek.map((day, index) => (
                  <div
                    key={day}
                    className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-28 font-medium text-gray-700">
                      {dayLabels[index]}
                    </div>
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                      <input
                        type="checkbox"
                        checked={!formData.businessHours[day].closed}
                        onChange={(e) =>
                          handleBusinessHoursChange(
                            day,
                            "closed",
                            !e.target.checked,
                          )
                        }
                        className="w-4 h-4 text-primary-600 rounded"
                      />
                      Open
                    </label>
                    {!formData.businessHours[day].closed && (
                      <>
                        <input
                          type="time"
                          value={formData.businessHours[day].open}
                          onChange={(e) =>
                            handleBusinessHoursChange(
                              day,
                              "open",
                              e.target.value,
                            )
                          }
                          className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                        <span className="text-gray-400">to</span>
                        <input
                          type="time"
                          value={formData.businessHours[day].close}
                          onChange={(e) =>
                            handleBusinessHoursChange(
                              day,
                              "close",
                              e.target.value,
                            )
                          }
                          className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </>
                    )}
                    {formData.businessHours[day].closed && (
                      <span className="text-sm text-gray-400">Closed</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Shipping Settings */}
          {activeTab === "shipping" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Shipping Settings
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Standard Shipping Fee (₦)"
                  type="number"
                  value={formData.shippingFee}
                  onChange={(e) =>
                    handleChange(null, "shippingFee", e.target.value)
                  }
                  icon={FaDollarSign}
                />
                <Input
                  label="Free Shipping Threshold (₦)"
                  type="number"
                  value={formData.freeShippingThreshold}
                  onChange={(e) =>
                    handleChange(null, "freeShippingThreshold", e.target.value)
                  }
                  icon={FaDollarSign}
                />
              </div>

              <Input
                label="Delivery Timeframe"
                value={formData.deliveryTimeframe}
                onChange={(e) =>
                  handleChange(null, "deliveryTimeframe", e.target.value)
                }
                icon={FaClock}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Shipping Zones
                </label>
                <div className="flex flex-wrap gap-2">
                  {formData.shippingZones.map((zone, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm flex items-center gap-2"
                    >
                      {zone}
                      <button
                        onClick={() => {
                          const newZones = formData.shippingZones.filter(
                            (_, i) => i !== index,
                          );
                          handleChange(null, "shippingZones", newZones);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTimes className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <button
                    onClick={() => {
                      const newZone = prompt("Enter new shipping zone:");
                      if (newZone) {
                        handleChange(null, "shippingZones", [
                          ...formData.shippingZones,
                          newZone,
                        ]);
                      }
                    }}
                    className="px-3 py-1 border-2 border-dashed border-gray-300 text-gray-500 rounded-full text-sm hover:border-primary-500 hover:text-primary-600 transition-colors"
                  >
                    + Add Zone
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Payment Settings */}
          {activeTab === "payment" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Payment Settings
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Currency
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) =>
                    handleChange(null, "currency", e.target.value)
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="NGN">NGN - Nigerian Naira</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Payment Methods
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={formData.paymentMethods.includes("card")}
                      onChange={(e) => {
                        const methods = e.target.checked
                          ? [...formData.paymentMethods, "card"]
                          : formData.paymentMethods.filter((m) => m !== "card");
                        handleChange(null, "paymentMethods", methods);
                      }}
                      className="w-4 h-4 text-primary-600 rounded"
                    />
                    Credit/Debit Card
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={formData.paymentMethods.includes("transfer")}
                      onChange={(e) => {
                        const methods = e.target.checked
                          ? [...formData.paymentMethods, "transfer"]
                          : formData.paymentMethods.filter(
                              (m) => m !== "transfer",
                            );
                        handleChange(null, "paymentMethods", methods);
                      }}
                      className="w-4 h-4 text-primary-600 rounded"
                    />
                    Bank Transfer
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={formData.paymentMethods.includes("wallet")}
                      onChange={(e) => {
                        const methods = e.target.checked
                          ? [...formData.paymentMethods, "wallet"]
                          : formData.paymentMethods.filter(
                              (m) => m !== "wallet",
                            );
                        handleChange(null, "paymentMethods", methods);
                      }}
                      className="w-4 h-4 text-primary-600 rounded"
                    />
                    Wallet
                  </label>
                </div>
              </div>

              <Input
                label="Paystack Public Key"
                value={formData.paystackPublicKey}
                onChange={(e) =>
                  handleChange(null, "paystackPublicKey", e.target.value)
                }
                placeholder="pk_live_xxxxxxxxxx"
              />

              <Input
                label="Flutterwave Public Key"
                value={formData.flutterwavePublicKey}
                onChange={(e) =>
                  handleChange(null, "flutterwavePublicKey", e.target.value)
                }
                placeholder="FLWPUBK-xxxxxxxxxx"
              />
            </div>
          )}

          {/* Social Media */}
          {activeTab === "social" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Social Media Links
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600 text-white rounded-lg">
                    <FaFacebook className="w-5 h-5" />
                  </div>
                  <Input
                    placeholder="Facebook URL"
                    value={formData.socialMedia.facebook}
                    onChange={(e) =>
                      handleSocialMediaChange("facebook", e.target.value)
                    }
                    className="flex-1"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-400 text-white rounded-lg">
                    <FaTwitter className="w-5 h-5" />
                  </div>
                  <Input
                    placeholder="Twitter URL"
                    value={formData.socialMedia.twitter}
                    onChange={(e) =>
                      handleSocialMediaChange("twitter", e.target.value)
                    }
                    className="flex-1"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-pink-600 text-white rounded-lg">
                    <FaInstagram className="w-5 h-5" />
                  </div>
                  <Input
                    placeholder="Instagram URL"
                    value={formData.socialMedia.instagram}
                    onChange={(e) =>
                      handleSocialMediaChange("instagram", e.target.value)
                    }
                    className="flex-1"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-600 text-white rounded-lg">
                    <FaYoutube className="w-5 h-5" />
                  </div>
                  <Input
                    placeholder="YouTube URL"
                    value={formData.socialMedia.youtube}
                    onChange={(e) =>
                      handleSocialMediaChange("youtube", e.target.value)
                    }
                    className="flex-1"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500 text-white rounded-lg">
                    <FaWhatsapp className="w-5 h-5" />
                  </div>
                  <Input
                    placeholder="WhatsApp URL"
                    value={formData.socialMedia.whatsapp}
                    onChange={(e) =>
                      handleSocialMediaChange("whatsapp", e.target.value)
                    }
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SEO Settings */}
          {activeTab === "seo" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                SEO Settings
              </h3>

              <Input
                label="Meta Title"
                value={formData.metaTitle}
                onChange={(e) =>
                  handleChange(null, "metaTitle", e.target.value)
                }
                placeholder="Your store meta title"
              />
              <p className="text-xs text-gray-400 -mt-2">
                Recommended length: 50-60 characters. Currently:{" "}
                {formData.metaTitle.length} characters
              </p>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Meta Description
                </label>
                <textarea
                  rows="3"
                  value={formData.metaDescription}
                  onChange={(e) =>
                    handleChange(null, "metaDescription", e.target.value)
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  placeholder="Your store meta description"
                />
                <p className="text-xs text-gray-400">
                  Recommended length: 150-160 characters. Currently:{" "}
                  {formData.metaDescription.length} characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Meta Keywords
                </label>
                <input
                  type="text"
                  value={formData.metaKeywords}
                  onChange={(e) =>
                    handleChange(null, "metaKeywords", e.target.value)
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="foodstuff, groceries, online shopping, Nigeria"
                />
                <p className="text-xs text-gray-400">
                  Separate keywords with commas
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreSettings;
