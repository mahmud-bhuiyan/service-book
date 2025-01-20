import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { AUTH_FIELDS, LOGIN_FIELDS } from "../../constants/authFields";
import { userLogin, userLogout } from "../../services/apis/User";
import { AuthContext } from "../../context/AuthContextProvider";

import handleError from "../../utils/handleError";
import DynamicHelmet from "../../components/Custom/DynamicHelmet";
import CustomForm from "../../components/Custom/CustomForm";
import SocialLogin from "../../components/SocialLogin";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [loading, setLoading] = useState(false);
  const [formReset, setFormReset] = useState(false);

  const handleLogin = async (data) => {
    const userData = {
      loginCred: data.loginCred,
      password: data.password,
    };

    try {
      setLoading(true);

      // Step 1: Login user to MongoDB
      const response = await loginUserUsingMongoDB(userData);
      if (response?.data?.user?.email) {
        // Step 2: login user to Firebase authentication
        const firebaseResponse = await loginUserUsingFirebase(
          response?.data?.user?.email,
          userData?.password
        );

        // Error handling if user does not match between MongoDB and Firebase
        if (response?.data?.user?.email !== firebaseResponse?.data?.user?.email) {
          await userLogout();
          navigate("/auth/login");
        }

        navigate(from, { replace: true });
        toast.success(response.message);
        setFormReset(true);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to login user to MongoDB
  const loginUserUsingMongoDB = async (userData) => {
    try {
      const response = await userLogin(userData);
      return response;
    } catch (error) {
      throw new Error(`${handleError(error)}`);
    }
  };

  // Function to login user to Firebase authentication
  const loginUserUsingFirebase = async (email, password) => {
    try {
      const result = await loginUser(email, password);
      return result;
    } catch (error) {
      throw new Error(`${handleError(error)}`);
    }
  };

  const fields = LOGIN_FIELDS.map((fieldName) => AUTH_FIELDS[fieldName]);

  return (
    <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
      <DynamicHelmet title="Sign In | ServiceBook" />

      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in
        </h2>
      </div>

      <CustomForm
        fields={fields}
        onSubmit={handleLogin}
        submitButtonText="Sign In"
        formReset={formReset}
        loading={loading}
        loadingText="Logging in"
        dotsColor="#ffffff"
      />

      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/auth/register")}
          className="text-sm font-medium text-[#4A628A] hover:text-slate-500"
        >
          Create an account
        </button>
        <button
          onClick={() => navigate("/auth/forgot-password")}
          className="text-sm font-medium text-[#4A628A] hover:text-slate-500"
        >
          Forgot your password?
        </button>
      </div>
      <hr />
      <SocialLogin />
    </div>
  );
};

export default Login;
