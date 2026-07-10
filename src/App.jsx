import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { DarkModeProvider } from "./Contexts/DarkModeContext";
import ScrollToTop from "./components/Common/ScrollToTop/ScrollToTop";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <DarkModeProvider>
            <ScrollToTop>
              <AppRoutes />
            </ScrollToTop>
          </DarkModeProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
