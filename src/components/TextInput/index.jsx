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
  error = "",
  value = "",
  touched = false,
  onChange = () => {},
  onBlur = () => {},
}) => {
  const [shown, setShown] = useState(false);

  const toggleShown = () => setShown((shown) => !shown);

  const errorToShow = touched && !loading ? error : "";

  const valid = !loading && !error && !!value;

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between items-center w-full">
        <label
          htmlFor={id}
          className={`block mb-2 text-sm font-medium text-black select-none hover:text-blue-700 hover:cursor-pointer active:text-blue-800 transition-all ${
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
          !!errorToShow && (
            <XCircleIcon height={16} className="text-coral-500" />
          )
        )}
      </div>
      <div className="relative">
        <input
          id={id}
          name={name}
          className={`border-[1px] text-neutral-900 text-sm rounded-md outline-transparent focus:outline-blue-700 block w-full p-2.5 placeholder:text-neutral-400 placeholder:select-none transition-all disabled:bg-neutral-100 ${
            valid
              ? "border-green-500"
              : !!errorToShow
              ? "border-coral-500"
              : "border-neutral-500"
          } ${secure && "pr-[2rem]"}`}
          placeholder={placeholder}
          required={required}
          type={
            secure ? (shown ? "text" : "password") : isEmail ? "email" : "text"
          }
          disabled={disabled || loading}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete="off"
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
      {!!errorToShow && (
        <p className="py-[0.25rem] text-xs text-coral-400 select-none">
          {errorToShow}
        </p>
      )}
    </div>
  );
};

export default TextInput;
