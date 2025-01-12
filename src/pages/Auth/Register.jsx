import { useNavigate } from "react-router-dom";
import CustomForm from "../../components/common/CustomForm";
import { AUTH_FIELDS, REGISTER_FIELDS } from "../../constants/authFields";
import DynamicHelmet from "../../components/common/DynamicHelmet";

const Register = () => {
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    localStorage.setItem("userData", JSON.stringify(data));
    navigate("/profile");
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
        onSubmit={onSubmit}
        submitButtonText="Sign Up"
      />

      <div className="flex justify-center">
        <button
          onClick={() => navigate("/login")}
          className="text-sm font-medium text-[#4A628A] hover:text-slate-500"
        >
          Already have an account? Sign in
        </button>
      </div>
    </div>
  );
};

export default Register;
