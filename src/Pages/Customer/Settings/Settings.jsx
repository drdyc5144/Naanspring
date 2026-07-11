import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBell,
  FaEnvelope,
  FaSms,
  FaMoon,
  FaSun,
  FaTag,
} from "react-icons/fa";
import { Button } from "../../../Components/Common";
import { useDarkMode } from "../../../Contexts/DarkModeContext";

const Settings = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();

  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    orderUpdates: true,
    promotions: false,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const ToggleSwitch = ({ enabled, onChange }) => (
    <button
      onClick={onChange}
      className={`relative w-12 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${
        enabled ? "bg-primary-600" : "bg-gray-300"
      }`}
    >
      <div
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
          enabled ? "transform translate-x-6" : ""
        }`}
      />
    </button>
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
        Settings
      </h1>

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm dark:bg-green-900/30 dark:border-green-800 dark:text-green-400"
        >
          Settings saved successfully!
        </motion.div>
      )}

      <div className="space-y-4">
        {/* Notification Settings - UNCHANGED */}
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 dark:bg-gray-800 dark:shadow-gray-900/50">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2 dark:text-white">
            <FaBell className="text-primary-600" />
            Notification Preferences
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-gray-400 dark:text-gray-500" />
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    Email Notifications
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive updates via email
                  </p>
                </div>
              </div>
              <ToggleSwitch
                enabled={settings.emailNotifications}
                onChange={() => handleToggle("emailNotifications")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaSms className="text-gray-400 dark:text-gray-500" />
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    SMS Notifications
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive updates via SMS
                  </p>
                </div>
              </div>
              <ToggleSwitch
                enabled={settings.smsNotifications}
                onChange={() => handleToggle("smsNotifications")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaBell className="text-gray-400 dark:text-gray-500" />
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    Order Updates
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive order status updates
                  </p>
                </div>
              </div>
              <ToggleSwitch
                enabled={settings.orderUpdates}
                onChange={() => handleToggle("orderUpdates")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaTag className="text-gray-400 dark:text-gray-500" />
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    Promotions & Offers
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive promotional emails
                  </p>
                </div>
              </div>
              <ToggleSwitch
                enabled={settings.promotions}
                onChange={() => handleToggle("promotions")}
              />
            </div>
          </div>
        </div>

        {/* Appearance Settings - UNCHANGED */}
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 dark:bg-gray-800 dark:shadow-gray-900/50">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 dark:text-white">
            Appearance
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {darkMode ? (
                  <FaMoon className="text-gray-600 dark:text-gray-300" />
                ) : (
                  <FaSun className="text-gray-400 dark:text-gray-500" />
                )}
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    Dark Mode
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Toggle dark/light theme
                  </p>
                </div>
              </div>
              <ToggleSwitch
                enabled={darkMode}
                onChange={toggleDarkMode}
              />
            </div>
          </div>
        </div>

        {/* ✅ Account Settings - FIXED for mobile responsiveness */}
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 dark:bg-gray-800 dark:shadow-gray-900/50">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 dark:text-white">
            Account Settings
          </h3>

          <div className="space-y-3">
            {/* Change Password - Mobile Responsive */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div>
                <p className="font-medium text-gray-800 dark:text-white">
                  Change Password
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Update your password regularly
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => navigate("/account/change-password")}
                className="w-full sm:w-auto"
              >
                Change Password
              </Button>
            </div>

            {/* Delete Account - Mobile Responsive */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-800/30">
              <div>
                <p className="font-medium text-red-600 dark:text-red-400">
                  Delete Account
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Permanently delete your account
                </p>
              </div>
              <Button 
                variant="danger" 
                className="w-full sm:w-auto"
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button 
            variant="primary" 
            onClick={handleSave} 
            isLoading={isSaving}
            className="w-full sm:w-auto"
          >
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;