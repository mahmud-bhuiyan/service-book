import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto min-h-screen flex items-center justify-center bg-[#DFF2EB]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
