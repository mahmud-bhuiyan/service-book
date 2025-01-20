import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContextProvider";
import { signInWithGoogle } from "../services/apis/User";
import handleError from "../utils/handleError";

const SocialLogin = () => {
  const { googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await googleSignIn();
      const loggedInUser = result.user;

      const userData = {
        name: loggedInUser.displayName,
        email: loggedInUser.email,
        photoURL: loggedInUser.photoURL,
      };

      const response = await signInWithGoogle(userData);

      if (response?.user?.email) {
        toast.success(response.message);
      }
      navigate(from, { replace: true });
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition duration-150 ease-in-out"
        type="button"
      >
        <FcGoogle className="w-5 h-5 mr-2" />
        <span>{loading ? "Signing In..." : "Sign In with Google"}</span>
      </button>
    </div>
  );
};

export default SocialLogin;
