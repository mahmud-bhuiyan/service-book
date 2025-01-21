import { useForm } from "react-hook-form";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";

const CustomForm = ({
  fields,
  onSubmit,
  submitButtonText,
  formReset,
  loading,
  loadingText,
  dotsColor,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleFormSubmit = (data) => {
    if (onSubmit) {
      onSubmit(data);
    }

    if (formReset) {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {fields.map((field) => (
        <CustomInput
          key={field.id}
          field={field}
          register={register}
          errors={errors}
        />
      ))}

      <div>
        <CustomButton
          type="submit"
          loading={loading}
          buttonText={submitButtonText}
          loadingText={loadingText}
          dotsColor={dotsColor}
        />
      </div>
    </form>
  );
};

export default CustomForm;
