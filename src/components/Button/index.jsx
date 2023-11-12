import { memo } from "react";
import LoadingSpinner from "../LoadingSpinner";

const Button = memo(
  ({
    text = "",
    onClick = () => {},
    badgeCount = 0,
    leftIcon = null,
    rightIcon = null,
    loading = false,
    variant = "primary",
    disabled = false,
    large = false,
  }) => {
    return (
      <button
        type="button"
        className={`flex min-w-fit items-center justify-center gap-[0.25rem] px-3.5 py-2.5 font-medium text-center rounded-md disabled:cursor-not-allowed transition-all select-none ${
          variant === "secondary"
            ? "text-blue-900 bg-white rounded-lg border border-blue-200 hover:bg-blue-100 hover:text-blue-700 disabled:text-blue-400"
            : variant === "danger"
            ? "text-white bg-cerise-600 hover:bg-cerise-700 active:bg-cerise-800 disabled:bg-cerise-400"
            : "text-white bg-blue-700 hover:bg-blue-800 active:bg-blue-900 disabled:bg-blue-400"
        } ${large ? "text-lg" : "text-sm"}`}
        onClick={onClick}
        disabled={loading || disabled}
      >
        {loading ? <LoadingSpinner /> : leftIcon}
        {text}
        {badgeCount ? (
          <span className="inline-flex items-center justify-center w-[1rem] h-[1rem] ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
            {badgeCount}
          </span>
        ) : (
          rightIcon
        )}
      </button>
    );
  }
);

export default Button;
