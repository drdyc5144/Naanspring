import { Outlet } from "react-router-dom";
import Navbar from "../../../Components/layout/Navbar/Navbar";
import Footer from "../../../Components/layout/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        {/* ✅ Add container-custom here */}
        <div className="container-custom py-4 sm:py-6">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
