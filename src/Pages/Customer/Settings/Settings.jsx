import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaBell,
  FaEnvelope,
  FaSms,
  FaToggleOn,
  FaToggleOff,
  FaLanguage,
  FaGlobe,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { Button } from "../../../Components/Common";

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    orderUpdates: true,
    promotions: false,
    darkMode: false,
    language: "en",
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
      // Simulate API call
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
      className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
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
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Settings</h1>

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm"
        >
          Settings saved successfully!
        </motion.div>
      )}

      <div className="space-y-4">
        {/* Notification Settings */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaBell className="text-primary-600" />
            Notification Preferences
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-gray-400" />
                <div>
                  <p className="font-medium text-gray-800">
                    Email Notifications
                  </p>
                  <p className="text-sm text-gray-500">
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
                <FaSms className="text-gray-400" />
                <div>
                  <p className="font-medium text-gray-800">SMS Notifications</p>
                  <p className="text-sm text-gray-500">
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
                <FaBell className="text-gray-400" />
                <div>
                  <p className="font-medium text-gray-800">Order Updates</p>
                  <p className="text-sm text-gray-500">
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
                <FaTag className="text-gray-400" />
                <div>
                  <p className="font-medium text-gray-800">
                    Promotions & Offers
                  </p>
                  <p className="text-sm text-gray-500">
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

        {/* Appearance Settings */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaGlobe className="text-primary-600" />
            Appearance & Language
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {settings.darkMode ? (
                  <FaMoon className="text-gray-400" />
                ) : (
                  <FaSun className="text-gray-400" />
                )}
                <div>
                  <p className="font-medium text-gray-800">Dark Mode</p>
                  <p className="text-sm text-gray-500">
                    Toggle dark/light theme
                  </p>
                </div>
              </div>
              <ToggleSwitch
                enabled={settings.darkMode}
                onChange={() => handleToggle("darkMode")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaLanguage className="text-gray-400" />
                <div>
                  <p className="font-medium text-gray-800">Language</p>
                  <p className="text-sm text-gray-500">
                    Select your preferred language
                  </p>
                </div>
              </div>
              <select
                value={settings.language}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, language: e.target.value }))
                }
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="en">English</option>
                <option value="ha">Hausa</option>
                <option value="yo">Yoruba</option>
                <option value="ig">Igbo</option>
                <option value="pcm">Pidgin</option>
              </select>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Account Settings
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Change Password</p>
                <p className="text-sm text-gray-500">
                  Update your password regularly
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => navigate("/account/change-password")}
              >
                Change Password
              </Button>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div>
                <p className="font-medium text-gray-800">Delete Account</p>
                <p className="text-sm text-gray-500">
                  Permanently delete your account
                </p>
              </div>
              <Button variant="danger">Delete Account</Button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button variant="primary" onClick={handleSave} isLoading={isSaving}>
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
