import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaShoppingBag,
  FaUser,
  FaAddressBook,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaHeart,
  FaKey,
} from "react-icons/fa";
import Navbar from "../../../Components/layout/Navbar/Navbar";
import { useAuth } from "../../../Hooks/useAuth";

const CustomerLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { logout, user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const navItems = [
    { to: "/account/dashboard", icon: FaHome, label: "Dashboard" },
    { to: "/account/orders", icon: FaShoppingBag, label: "Orders" },
    { to: "/account/addresses", icon: FaAddressBook, label: "Addresses" },
    { to: "/account/profile", icon: FaUser, label: "Profile" },
    { to: "/account/notifications", icon: FaBell, label: "Notifications" },
    { to: "/account/settings", icon: FaCog, label: "Settings" },
    { to: "/account/change-password", icon: FaKey, label: "Change Password" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar - Fixed at top */}
      <Navbar />

      <div className="flex flex-1 pt-16">
        {/* Mobile Sidebar Toggle Button */}
        {isMobile && (
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="fixed bottom-4 right-4 z-50 bg-primary-800 text-white p-3 rounded-full shadow-lg lg:hidden"
          >
            {isSidebarOpen ? (
              <FaTimes className="w-5 h-5" />
            ) : (
              <FaBars className="w-5 h-5" />
            )}
          </button>
        )}

        {/* Sidebar - Fixed */}
        <aside
          className={`
            fixed left-0 top-16 bottom-0 z-40
            w-64 bg-white shadow-lg
            transform transition-transform duration-300
            overflow-y-auto
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0
          `}
        >
          <div className="h-full px-4 py-4 overflow-y-auto">
            {/* ✅ User Info - Compact Version */}
            <div className="mb-4 p-3 bg-primary-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-800 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {user?.firstName?.charAt(0) || "U"}
                  {user?.lastName?.charAt(0) || ""}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-800 text-sm truncate">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-0.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm
                      ${
                        isActive
                          ? "bg-primary-50 text-primary-800 font-medium"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Logout */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={logout}
                className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-red-600 hover:bg-red-50 transition-colors text-sm"
              >
                <FaSignOutAlt className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main
          className={`
          flex-1 min-h-screen w-full
          lg:ml-64
          transition-all duration-300
        `}
        >
          <div className="w-[95%] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CustomerLayout;