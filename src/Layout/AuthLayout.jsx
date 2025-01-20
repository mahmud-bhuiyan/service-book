import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const AuthLayout = () => {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-[#DFF2EB]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
