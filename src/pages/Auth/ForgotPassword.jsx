import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { AUTH_FIELDS, FORGOT_PASS_FIELDS } from "../../constants/authFields";
import { resetPassword } from "../../services/apis/User";

import DynamicHelmet from "../../components/Custom/DynamicHelmet";
import CustomForm from "../../components/Custom/CustomForm";
import handleApiError from "../../utils/handleApiError";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formReset, setFormReset] = useState(false);

  const handleResetPassword = async (data) => {
    try {
      setLoading(true);

      const response = await resetPassword(data.email);

      if (response?.success) {
        toast.success(response.message);
        navigate("/auth/login");
        setFormReset(true);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(handleApiError(error));
    } finally {
      setLoading(false);
    }
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
        loading={loading}
        loadingText="Sending"
        dotsColor="#ffffff"
      />

      <div className="flex justify-center">
        <button
          onClick={() => navigate("/auth/login")}
          className="text-sm font-medium text-[#4A628A] hover:text-slate-500"
          disabled={loading}
        >
          Back to Sign In
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
