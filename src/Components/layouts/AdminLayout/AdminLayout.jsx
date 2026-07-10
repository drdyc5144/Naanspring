import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaShoppingBag,
  FaUsers,
  FaWarehouse,
  FaChartLine,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUser,
  FaKey,
  FaTag,
} from "react-icons/fa";
import AdminNavbar from "../../../Components/layout/AdminNavbar/AdminNavbar";
import { useAuth } from "../../../Hooks/useAuth";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { logout } = useAuth();
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
    { to: "/admin/dashboard", icon: FaHome, label: "Dashboard" },
    { to: "/admin/products", icon: FaBox, label: "Products" },
    { to: "/admin/categories", icon: FaTag, label: "Categories" },
    { to: "/admin/orders", icon: FaShoppingBag, label: "Orders" },
    { to: "/admin/customers", icon: FaUsers, label: "Customers" },
    { to: "/admin/inventory", icon: FaWarehouse, label: "Inventory" },
    { to: "/admin/sales", icon: FaChartLine, label: "Sales" },
    { to: "/admin/notifications", icon: FaBell, label: "Notifications" },
    { to: "/admin/settings", icon: FaCog, label: "Store Settings" },
    { to: "/admin/profile", icon: FaUser, label: "Profile" },
    { to: "/admin/change-password", icon: FaKey, label: "Change Password" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar - Fixed at top */}
      <AdminNavbar /> {/* ✅ Changed from Navbar to AdminNavbar */}
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
            w-64 bg-gray-900 shadow-lg
            transform transition-transform duration-300
            overflow-y-auto
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0
          `}
        >
          <div className="h-full px-4 py-6 overflow-y-auto">
            {/* Admin Info */}
            <div className="mb-6 p-4 bg-gray-800 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {useAuth().user?.firstName?.charAt(0) || "A"}
                </div>
                <div>
                  <p className="font-semibold text-white">
                    {useAuth().user?.firstName} {useAuth().user?.lastName}
                  </p>
                  <p className="text-sm text-gray-400">Administrator</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                      ${
                        isActive
                          ? "bg-primary-600 text-white"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Logout */}
            <div className="mt-6 pt-6 border-t border-gray-800">
              <button
                onClick={logout}
                className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-400 hover:bg-gray-800 hover:text-red-300 transition-colors"
              >
                <FaSignOutAlt className="w-5 h-5" />
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
          <div className="p-4 sm:p-6">
            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
