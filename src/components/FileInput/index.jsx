import {
  CheckCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import LoadingSpinner from "../LoadingSpinner";

const FileInput = ({
  label = "",
  required = false,
  id = "",
  helperText = "",
  name = "",
  value = null,
  touched = false,
  loading = false,
  error = "",
  onChange = () => {},
}) => {
  const errorToShow = !loading ? error : "";

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
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor={id}
            className={`flex flex-col items-center justify-center w-full h-64 border-2 ${
              valid
                ? "border-green-500"
                : !!errorToShow
                ? "border-coral-500"
                : "border-neutral-500"
            } hover:border-blue-700 hover:text-blue-700 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-white transition-all`}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
            </div>
            <input
              id={id}
              name={name}
              type="file"
              className="hidden"
              onChange={onChange}
            />
          </label>
        </div>
      </div>
      {!!helperText && (
        <p className="py-[0.25rem] text-xs text-neutral-400 select-none flex flex-row gap-[.25rem] items-center">
          <InformationCircleIcon width={12} />
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

export default FileInput;
