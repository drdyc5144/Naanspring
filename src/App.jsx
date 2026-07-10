import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import ScrollToTop from "./components/Common/ScrollToTop/ScrollToTop";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ScrollToTop>
            <AppRoutes />
          </ScrollToTop>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
