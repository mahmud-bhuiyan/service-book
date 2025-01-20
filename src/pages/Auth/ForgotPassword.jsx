import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AUTH_FIELDS, FORGOT_PASS_FIELDS } from "../../constants/authFields";

import DynamicHelmet from "../../components/Custom/DynamicHelmet";
import CustomForm from "../../components/Custom/CustomForm";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [formReset, setFormReset] = useState(false);

  const handleResetPassword = async (data) => {
    console.log("handleResetPassword:", data);
    alert("Password reset instructions sent to your email.");
    navigate("/auth/login");
    setFormReset(true);
  };

  const fields = FORGOT_PASS_FIELDS.map((fieldName) => AUTH_FIELDS[fieldName]);

  return (
    <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
      <DynamicHelmet title="Reset Password | ServiceBook" />

      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Reset password
        </h2>
      </div>

      <CustomForm
        fields={fields}
        onSubmit={handleResetPassword}
        submitButtonText="Reset Password"
        formReset={formReset}
      />

      <div className="flex justify-center">
        <button
          onClick={() => navigate("/auth/login")}
          className="text-sm font-medium text-[#4A628A] hover:text-slate-500"
        >
          Back to Sign In
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
