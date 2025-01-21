import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContextProvider";
import { signInWithGoogle } from "../services/apis/User";
import handleError from "../utils/handleError";
import CustomButton from "./Custom/CustomButton";

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
