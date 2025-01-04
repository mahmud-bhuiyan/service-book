import { useNavigate } from "react-router-dom";
import CustomForm from "../../components/common/CustomForm";
import {
  AUTH_FIELDS,
  LOGIN_FIELDS,
  REGISTER_FIELDS,
  FORGOT_PASSWORD_FIELDS,
} from "../../constants/authFields";

const AuthPage = ({ formType }) => {
  const navigate = useNavigate();

  const handleFormTypeChange = (newFormType) => {
    const routes = {
      login: "/login",
      register: "/register",
      forgotPassword: "/forgot-password",
    };
    navigate(routes[newFormType] || "/login");
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const getFields = () => {
    const fieldMaps = {
      login: LOGIN_FIELDS,
      register: REGISTER_FIELDS,
      forgotPassword: FORGOT_PASSWORD_FIELDS,
    };
    return (fieldMaps[formType] || LOGIN_FIELDS).map(
      (fieldName) => AUTH_FIELDS[fieldName]
    );
  };

  const fields = getFields();
  const submitButtonText =
    formType === "login"
      ? "Sign In"
      : formType === "register"
      ? "Sign Up"
      : "Reset Password";

  return (
    <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {formType === "login"
            ? "Sign in to your account"
            : formType === "register"
            ? "Create your account"
            : "Reset your password"}
        </h2>
      </div>

      <CustomForm
        fields={fields}
        onSubmit={onSubmit}
        submitButtonText={submitButtonText}
      />
      
      <div className="flex items-center justify-between">
        {formType !== "login" ? (
          <button
            onClick={() => handleFormTypeChange("login")}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Back to Sign In
          </button>
        ) : (
          <>
            <button
              onClick={() => handleFormTypeChange("register")}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Create an account
            </button>
            <button
              onClick={() => handleFormTypeChange("forgotPassword")}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
