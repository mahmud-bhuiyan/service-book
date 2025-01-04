import { useForm } from "react-hook-form";
import * as FaIcons from "react-icons/fa";

const CustomForm = ({ fields, onSubmit, submitButtonText }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getIcon = (iconName) => {
    if (!iconName) return null;
    const IconComponent = FaIcons[iconName];
    return IconComponent ? <IconComponent className="text-gray-400" /> : null;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {submitButtonText}
        </button>
      </div>
    </form>
  );
};

export default CustomForm;
