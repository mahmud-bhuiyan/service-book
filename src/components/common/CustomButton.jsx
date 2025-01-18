import { ThreeDots } from "react-loader-spinner";

const CustomButton = ({
  type = "button",
  onClick,
  className = "",
  loading = false,
  loadingText = "Submitting",
  buttonText = "Submit",
  dotsColor = "#ffffff",
  disabled = false,
}) => {
  const baseClassName =
    "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4A628A] hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClassName} ${className}`}
      disabled={disabled || loading}
    >
      {loading ? (
        <span className="flex gap-2 justify-center items-center">
          {loadingText}{" "}
          <ThreeDots
            visible={true}
            height="25"
            width="25"
            color={dotsColor}
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </span>
      ) : (
        <>{buttonText}</>
      )}
    </button>
  );
};

export default CustomButton;
