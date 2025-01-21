import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

import { AuthContext } from "../context/AuthContextProvider";
import { signInWithGoogle, userLogout } from "../services/apis/User";
import { AUTH_MESSAGES } from "../constants/appConstants";

import CustomButton from "./Custom/CustomButton";
import handleApiError from "../utils/handleApiError";

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
        userName: loggedInUser.email,
        email: loggedInUser.email,
        photoURL: loggedInUser.photoURL,
      };

      const { success, message, data } = await signInWithGoogle(userData);

      if (success && data?.user) {
        if (data.user.email !== loggedInUser.email) {
          await userLogout();
          toast.error(AUTH_MESSAGES.EMAIL_MISMATCH);
          navigate("/auth/login");
          return;
        }

        toast.success(message);
        navigate(from, { replace: true });
      } else {
        toast.error(message);
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <CustomButton
        type="button"
        onClick={handleGoogleSignIn}
        loading={loading}
        buttonText="Sign In with Google"
        loadingText="Signing In..."
        icon={FcGoogle}
      />
    </div>
  );
};

export default SocialLogin;
