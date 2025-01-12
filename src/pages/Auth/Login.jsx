import { useNavigate } from "react-router-dom";
import CustomForm from "../../components/common/CustomForm";
import { AUTH_FIELDS, LOGIN_FIELDS } from "../../constants/authFields";
import DynamicHelmet from "../../components/common/DynamicHelmet";

const Login = () => {
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    localStorage.setItem("userData", JSON.stringify(data));
    navigate("/profile");
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
        onSubmit={onSubmit}
        submitButtonText="Sign In"
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
