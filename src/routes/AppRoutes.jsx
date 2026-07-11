import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { useAuth } from "../Hooks/useAuth";
import Loader from "../Components/Common/Loader/Loader";

// Layouts
import MainLayout from "../Components/layouts/MainLayout/MainLayout";
import CustomerLayout from "../Components/layouts/CustomerLayout/CustomerLayout";
import AdminLayout from "../Components/layouts/AdminLayout/AdminLayout";

// Lazy load pages for better performance
const Home = lazy(() => import("../Pages/Public/Home/Home"));
const Shop = lazy(() => import("../Pages/Public/Shop/Shop"));
const Categories = lazy(() => import("../Pages/Public/Categories/Categories"));
const ProductDetails = lazy(
  () => import("../Pages/Public/ProductDetails/ProductDetails"),
);
const Search = lazy(() => import("../Pages/Public/Search/Search"));
const About = lazy(() => import("../Pages/Public/About/About"));
const Contact = lazy(() => import("../Pages/Public/Contact/Contact"));
const FAQ = lazy(() => import("../Pages/Public/FAQ/FAQ"));
const PrivacyPolicy = lazy(
  () => import("../Pages/Public/PrivacyPolicy/PrivacyPolicy"),
);
const TermsConditions = lazy(
  () => import("../Pages/Public/TermsConditions/TermsConditions"),
);

// Auth Pages
const Login = lazy(() => import("../Pages/Auth/Login"));
const Register = lazy(() => import("../Pages/Auth/Register"));
const ForgotPassword = lazy(() => import("../Pages/Auth/ForgotPassword"));
const ResetPassword = lazy(() => import("../Pages/Auth/ResetPassword"));
const OTPVerification = lazy(() => import("../Pages/Auth/OTPVerification"));

// Customer Pages
const CustomerDashboard = lazy(
  () => import("../Pages/Customer/Dashboard/Dashboard"),
);
const Cart = lazy(() => import("../Pages/Customer/Cart/Cart"));
const Checkout = lazy(() => import("../Pages/Customer/Checkout/Checkout"));
const Payment = lazy(() => import("../Pages/Customer/Payment/Payment"));
const Orders = lazy(() => import("../Pages/Customer/Orders/Orders"));
const CustomerOrderDetails = lazy(
  () => import("../Pages/Customer/OrderDetails/OrderDetails"),
);
const AddressBook = lazy(
  () => import("../Pages/Customer/AddressBook/AddressBook"),
);
const CustomerNotifications = lazy(
  () => import("../Pages/Customer/Notifications/Notifications"),
);
const Profile = lazy(() => import("../Pages/Customer/Profile/Profile"));
const Settings = lazy(() => import("../Pages/Customer/Settings/Settings"));
const ChangePassword = lazy(
  () => import("../Pages/Customer/ChangePassword/ChangePassword"),
);

// Admin Pages
const AdminDashboard = lazy(() => import("../Pages/Admin/Dashboard/Dashboard"));
const AdminProducts = lazy(() => import("../Pages/Admin/Products/Products"));
const AddProduct = lazy(() => import("../Pages/Admin/AddProduct/AddProduct"));
const EditProduct = lazy(
  () => import("../Pages/Admin/EditProduct/EditProduct"),
);
const AdminCategories = lazy(
  () => import("../Pages/Admin/Categories/Categories"),
);
const AdminOrders = lazy(() => import("../Pages/Admin/Orders/Orders"));
const AdminOrderDetails = lazy(
  () => import("../Pages/Admin/Orders/OrderDetails"),
);
const AdminCustomers = lazy(() => import("../Pages/Admin/Customers/Customers"));
const Inventory = lazy(() => import("../Pages/Admin/Inventory/Inventory"));
const Sales = lazy(() => import("../Pages/Admin/Sales/Sales"));
const AdminNotifications = lazy(
  () => import("../Pages/Admin/Notifications/Notifications"),
);
const StoreSettings = lazy(
  () => import("../Pages/Admin/StoreSettings/StoreSettings"),
);
const AdminProfile = lazy(() => import("../Pages/Admin/Profile/Profile"));
const AdminChangePassword = lazy(
  () => import("../Pages/Admin/ChangePassword/ChangePassword"),
);

// Error Pages
const NotFound = lazy(() => import("../Pages/NotFound/NotFound"));
const Unauthorized = lazy(() => import("../Pages/Unauthorized/Unauthorized"));

// ============================================================
// 🔒 PROTECTED ROUTE COMPONENT (ENABLED)
// ============================================================
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

// ============================================================
// 🔓 PUBLIC ROUTE COMPONENT (ENABLED)
// ============================================================
const PublicRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/account/dashboard" replace />;
  }

  return children;
};

function AppRoutes() {
  return (
    <Suspense fallback={<Loader fullScreen />}>
      <Routes>
        {/* ========== PUBLIC ROUTES ========== */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
        </Route>

        {/* ========== AUTH ROUTES ========== */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/verify-otp"
          element={
            <PublicRoute>
              <OTPVerification />
            </PublicRoute>
          }
        />

        {/* ========== CUSTOMER ROUTES ========== */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <CustomerLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/account/dashboard" element={<CustomerDashboard />} />
          <Route path="/account/cart" element={<Cart />} />
          <Route path="/account/checkout" element={<Checkout />} />
          <Route path="/account/payment" element={<Payment />} />
          <Route path="/account/orders" element={<Orders />} />
          <Route
            path="/account/orders/:id"
            element={<CustomerOrderDetails />}
          />
          <Route path="/account/addresses" element={<AddressBook />} />
          <Route
            path="/account/notifications"
            element={<CustomerNotifications />}
          />
          <Route path="/account/profile" element={<Profile />} />
          <Route path="/account/settings" element={<Settings />} />
          <Route path="/account/change-password" element={<ChangePassword />} />
        </Route>

        {/* ========== ADMIN ROUTES ========== */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/products/add" element={<AddProduct />} />
          <Route path="/admin/products/edit/:id" element={<EditProduct />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/orders/:id" element={<AdminOrderDetails />} />
          <Route path="/admin/customers" element={<AdminCustomers />} />
          <Route path="/admin/inventory" element={<Inventory />} />
          <Route path="/admin/sales" element={<Sales />} />
          <Route path="/admin/notifications" element={<AdminNotifications />} />
          <Route path="/admin/settings" element={<StoreSettings />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route
            path="/admin/change-password"
            element={<AdminChangePassword />}
          />
        </Route>

        {/* ========== ERROR ROUTES ========== */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
