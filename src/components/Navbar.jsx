import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { BiLogIn } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";

import { AuthContext } from "../context/AuthContextProvider";
import { userLogout } from "../services/apis/User";
import { APP_NAME, DEFAULT_USER_PHOTO } from "../constants/appConstants";

import NavbarDropdown from "./NavbarDropdown";

const Navbar = () => {
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const firstName = user?.displayName?.split(" ")[0] || "user";

  const handleLogOut = async () => {
    try {
      await userLogout();
      await logoutUser();
      navigate("/auth/login");
      window.location.reload();
    } catch (error) {
      toast.error(error.message || "Logout failed");
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const dropdownLinks = [
    {
      to: "/profile",
      icon: <FaRegUser className="text-lg" />,
      label: "My Profile",
    },
    {
      onClick: handleLogOut,
      icon: <MdOutlineLogout className="text-lg" />,
      label: "Sign Out",
    },
  ];

  return (
    <nav className="bg-[#402F3F] shadow fixed top-0 w-full z-50">
      <div className="max-w-screen-xl p-2 mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">{APP_NAME}</h1>
          <div className="relative flex gap-4">
            {user ? (
              <button
                onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
                className="relative z-10 block p-1 sm:px-2 bg-[#241A24] border-2 hover:border-slate-500 rounded-md text-[#A99FA8] hover:text-white"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={user.photoURL || DEFAULT_USER_PHOTO}
                    className="w-8 h-8 border-2 border-gray-400 rounded-full object-cover"
                    alt="user photo"
                  />
                  <h3 className="text-sm">{firstName}</h3>
                  <svg className="w-3 h-3 mx-1" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </button>
            ) : (
              <Link
                to="/auth/login"
                className="relative z-10 block p-1 sm:px-2 bg-[#241A24] border-2 hover:border-slate-500 rounded-md text-[#A99FA8] hover:text-white"
              >
                <span className="flex items-center gap-1 sm:gap-2 font-semibold">
                  Login <BiLogIn className="text-xl" />
                </span>
              </Link>
            )}
            <NavbarDropdown
              isOpen={isProfileDropdownOpen}
              onClose={() => setProfileDropdownOpen(false)}
              links={dropdownLinks}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
