import { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import {
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

const TextInput = ({
  id = "",
  name = "",
  placeholder = "",
  label = "",
  required = false,
  secure = false,
  helperText = "",
  isEmail = false,
  loading = false,
  disabled = false,
  valid = false,
  error = "",
}) => {
  const [shown, setShown] = useState(false);

  const toggleShown = () => setShown((shown) => !shown);

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between items-center w-full">
        <label
          for={id}
          className={`block mb-2 text-sm font-medium text-black select-none ${
            required ? " required" : ""
          }`}
        >
          {label}
        </label>
        {loading ? (
          <LoadingSpinner />
        ) : valid ? (
          <CheckCircleIcon height={16} className="text-green-500" />
        ) : (
          !!error && <XCircleIcon height={16} className="text-coral-500" />
        )}
      </div>
      <div className="relative">
        <input
          id={id}
          name={name}
          className={`border-[0.75px] border-neutral-500 text-neutral-900 text-sm rounded-md outline-transparent focus:outline-blue-700 block w-full p-2.5 placeholder:text-neutral-400 placeholder:select-none transition-all disabled:bg-neutral-100 ${
            valid ? "border-green-500" : !!error && "border-coral-500"
          } ${secure && "pr-[2rem]"}`}
          placeholder={placeholder}
          required={required}
          type={
            secure ? (shown ? "text" : "password") : isEmail ? "email" : "text"
          }
          disabled={disabled || loading}
        />
        {secure && (
          <span
            className="select-none absolute p-2.5 right-0 top-[50%] translate-y-[-50%] cursor-pointer"
            onClick={toggleShown}
          >
            {shown ? (
              <EyeSlashIcon height={16} className="text-blue-700" />
            ) : (
              <EyeIcon height={16} className="text-blue-700" />
            )}
          </span>
        )}
      </div>
      {!!helperText && (
        <p className="py-[0.25rem] text-xs font-light text-neutral-400 select-none">
          {helperText}
        </p>
      )}
      {!!error && (
        <p className="py-[0.25rem] text-xs text-coral-400 select-none">
          {error}
        </p>
      )}
    </div>
  );
};

export default TextInput;
