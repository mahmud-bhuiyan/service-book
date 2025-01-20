import { useForm } from "react-hook-form";
import * as FaIcons from "react-icons/fa";
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

  const getIcon = (iconName) => {
    if (!iconName) return null;
    const IconComponent = FaIcons[iconName];
    return IconComponent ? <IconComponent className="text-gray-400" /> : null;
  };

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
      {fields.map((field) => {
        const icon = getIcon(field.icon);
        return (
          <div key={field.id}>
            <div className={`relative ${icon ? "flex items-center" : ""}`}>
              {icon && (
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  {icon}
                </div>
              )}
              <input
                {...register(field.name, field.validation)}
                type={field.type}
                id={field.name}
                className={`block w-full ${
                  icon ? "pl-10" : "pl-3"
                } pr-3 py-2 text-gray-900 placeholder-gray-500 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white sm:text-sm`}
                placeholder={field.placeholder}
              />
            </div>
            {errors[field.name] && (
              <p className="mt-2 text-sm text-red-600">
                {errors[field.name].message}
              </p>
            )}
          </div>
        );
      })}

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
