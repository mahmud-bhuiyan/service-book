import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-[#DFF2EB]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
