import { ThreeDots } from "react-loader-spinner";

const CustomButton = ({
  type = "button",
  onClick,
  className = "",
  loading = false,
  loadingText = "Submitting",
  buttonText = "Submit",
  dotsColor = "#ffffff",
  dotsSize = "25",
  disabled = false,
  icon: Icon = null,
  iconSize = "w-5 h-5",
  bgColor = "bg-[#4A628A]",
  hoverColor = "hover:bg-slate-500",
  textColor = "text-white",
  buttonWidth = "w-full",
  rounded = "rounded-md",
  fontSize = "text-sm",
}) => {
  const baseClassName = `flex justify-center items-center py-1.5 px-2 border border-transparent ${rounded} shadow-sm ${fontSize} ${textColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out ${bgColor} ${hoverColor} ${buttonWidth}`;

  const renderContent = () => {
    if (loading) {
      return (
        <span className="flex items-center justify-center">
          {Icon && <Icon className={`${iconSize} mr-2`} />}
          {loadingText}
          <ThreeDots
            visible={true}
            height={dotsSize}
            width={dotsSize}
            color={dotsColor}
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass="ml-2"
          />
        </span>
      );
    }

    return (
      <span className="flex items-center justify-center">
        {Icon && <Icon className={`${iconSize} mr-2`} />}
        {buttonText}
      </span>
    );
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClassName} ${className}`}
      disabled={disabled || loading}
    >
      {renderContent()}
    </button>
  );
};

export default CustomButton;
