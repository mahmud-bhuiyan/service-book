import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import CustomForm from "../../components/common/CustomForm";
import { AUTH_FIELDS, LOGIN_FIELDS } from "../../constants/authFields";
import { AuthContext } from "../../context/AuthContextProvider";
import DynamicHelmet from "../../components/common/DynamicHelmet";
import handleError from "../../utils/handleError";
import { userLogin, userLogout } from "../../services/apis/User";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [loading, setLoading] = useState(false);
  const [formReset, setFormReset] = useState(false);

  const handleLogin = async (data) => {
    console.log("handleLogin:", data);
    const userData = {
      loginCred: data.loginCred,
      password: data.password,
    };

    try {
      setLoading(true);

      // Step 1: Login user to MongoDB
      const response = await loginUserUsingMongoDB(userData);
      console.log("response:", response);
      if (response.user.email) {
        // Step 2: login user to Firebase authentication
        const firebaseResponse = await loginUserUsingFirebase(
          response.user.email,
          userData.password
        );

        // Error handling if user does not match between MongoDB and Firebase
        if (response.user.email !== firebaseResponse.user.email) {
          await userLogout();
          navigate("/login");
        } else {
          navigate(from, { replace: true });
          toast.success(response.message);
          setFormReset(true);
        }
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
          onClick={() => navigate("/register")}
          className="text-sm font-medium text-[#4A628A] hover:text-slate-500"
        >
          Create an account
        </button>
        <button
          onClick={() => navigate("/forgot-password")}
          className="text-sm font-medium text-[#4A628A] hover:text-slate-500"
        >
          Forgot your password?
        </button>
      </div>
    </div>
  );
};

export default Login;
