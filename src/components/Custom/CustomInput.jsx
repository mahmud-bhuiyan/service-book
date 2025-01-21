import { useState } from "react";
import * as FaIcons from "react-icons/fa";

const CustomInput = ({ field, register, errors }) => {
  const [showPassword, setShowPassword] = useState(false);

  const getIcon = (iconName) => {
    if (!iconName) return null;
    const IconComponent = FaIcons[iconName];
    return IconComponent ? <IconComponent /> : null;
  };

  const renderIcon = (icon) => {
    return (
      icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
          {icon}
        </div>
      )
    );
  };

  const renderPasswordToggle = () => {
    return (
      field.type === "password" && (
        <button
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaIcons.FaEyeSlash /> : <FaIcons.FaEye />}
        </button>
      )
    );
  };

  const renderError = () => {
    return (
      errors[field.name] && (
        <p className="mt-2 text-sm text-red-600">
          {errors[field.name].message}
        </p>
      )
    );
  };

  const icon = getIcon(field.icon);
  const inputType =
    field.type === "password" && showPassword ? "text" : field.type;

  return (
    <div>
      <div className="relative">
        {renderIcon(icon)}
        <input
          {...register(field.name, field.validation)}
          type={inputType}
          id={field.name}
          className={`
            block w-full py-2 text-gray-900 placeholder-gray-500 bg-gray-100 rounded-md 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white sm:text-sm
            ${icon ? "pl-10" : "pl-3"} pr-10
          `}
          placeholder={field.placeholder}
        />
        {renderPasswordToggle()}
      </div>
      {renderError()}
    </div>
  );
};

export default CustomInput;
