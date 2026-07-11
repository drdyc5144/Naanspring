import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaBell, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../../Hooks/useAuth";
import logo from "../../../assets/logo.png";

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-2"
          : "bg-white/95 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/admin/dashboard" className="flex items-center space-x-2">
            <img src={logo} alt="Naanspring" className="h-10 w-auto" />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary-800 leading-tight">
                Naanspring
              </span>
              <span className="text-[10px] text-secondary-500 font-semibold tracking-wider uppercase">
                Admin Panel
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Admin Only */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/admin/dashboard"
              className="text-gray-600 hover:text-primary-800 transition-colors font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/admin/orders"
              className="text-gray-600 hover:text-primary-800 transition-colors font-medium"
            >
              Orders
            </Link>
            <Link
              to="/admin/products"
              className="text-gray-600 hover:text-primary-800 transition-colors font-medium"
            >
              Products
            </Link>
            <Link
              to="/admin/customers"
              className="text-gray-600 hover:text-primary-800 transition-colors font-medium"
            >
              Customers
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Notifications */}
            <Link
              to="/admin/notifications"
              className="relative p-2 text-gray-600 hover:text-primary-800 transition-colors"
            >
              <FaBell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Link>

            {/* Admin Profile */}
            <div className="flex items-center space-x-3">
              <Link
                to="/admin/profile"
                className="flex items-center space-x-2 text-gray-600 hover:text-primary-800 transition-colors"
              >
                <FaUser className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {user?.firstName || "Admin"}
                </span>
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium"
              >
                <FaSignOutAlt className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-primary-800 transition-colors"
          >
            {isOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            {/* Admin Links */}
            <div className="mt-4 space-y-2">
              <Link
                to="/admin/dashboard"
                className="block py-2 text-gray-600 hover:text-primary-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/admin/orders"
                className="block py-2 text-gray-600 hover:text-primary-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Orders
              </Link>
              <Link
                to="/admin/products"
                className="block py-2 text-gray-600 hover:text-primary-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/admin/customers"
                className="block py-2 text-gray-600 hover:text-primary-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Customers
              </Link>
              <Link
                to="/admin/notifications"
                className="block py-2 text-gray-600 hover:text-primary-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Notifications
              </Link>
              <Link
                to="/admin/profile"
                className="block py-2 text-gray-600 hover:text-primary-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/admin/settings"
                className="block py-2 text-gray-600 hover:text-primary-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Store Settings
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="block w-full text-left py-2 text-red-600 hover:text-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
