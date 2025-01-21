import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { AuthContext } from "../../context/AuthContextProvider";
import { AUTH_FIELDS, REGISTER_FIELDS } from "../../constants/authFields";
import { registerUser } from "../../services/apis/User";

import DynamicHelmet from "../../components/Custom/DynamicHelmet";
import CustomForm from "../../components/Custom/CustomForm";
import SocialLogin from "../../components/SocialLogin";
import handleApiError from "../../utils/handleApiError";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formReset, setFormReset] = useState(false);

  const handleRegister = async (data) => {
    const userData = {
      name: data.name,
      userName: data.userName,
      email: data.email,
      password: data.password,
    };

    try {
      setLoading(true);

      // Step 1: Register user data to MongoDB
      const mongoResponse = await registerUserToMongoDB(userData);

      if (mongoResponse.success && mongoResponse.data?.user?.email) {
        // Step 2: Register user to Firebase authentication
        const firebaseResponse = await registerUserToFirebase(
          userData.email,
          userData.password
        );

        // Step 3: Update user profile
        if (firebaseResponse.user.email) {
          await updateUserProfileInFirebase(userData.name, data?.photo);
        }

        navigate("/profile");
        toast.success(mongoResponse.message);
        setFormReset(true);
      } else {
        toast.error(mongoResponse.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const registerUserToMongoDB = async (userData) => {
    const response = await registerUser(userData);
    if (!response.success) {
      throw new Error(response.message);
    }
    return response;
  };

  const registerUserToFirebase = async (email, password) => {
    try {
      const result = await createUser(email, password);
      return result;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  };

  const updateUserProfileInFirebase = async (name, photo) => {
    try {
      await updateUserProfile(name, photo);
    } catch (error) {
      console.error(
        `Firebase user profile update error: ${handleApiError(error)}`
      );
    }
  };

  const fields = REGISTER_FIELDS.map((fieldName) => AUTH_FIELDS[fieldName]);

  return (
    <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
      <DynamicHelmet title="Create Account | ServiceBook" />

      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create account
        </h2>
      </div>

      <CustomForm
        fields={fields}
        onSubmit={handleRegister}
        submitButtonText="Sign Up"
        formReset={formReset}
        loading={loading}
        loadingText="Registering"
        dotsColor="#ffffff"
      />

      <div className="flex justify-center">
        <button
          onClick={() => navigate("/auth/login")}
          className="text-sm font-medium text-[#4A628A] hover:text-slate-500"
        >
          Already have an account? Sign in
        </button>
      </div>
      <hr />
      <SocialLogin />
    </div>
  );
};

export default Register;
