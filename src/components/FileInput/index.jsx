import { InformationCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

const FileInput = ({
  label = "",
  required = false,
  id = "",
  helperText = "",
}) => {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className={`block mb-2 text-sm font-medium text-black select-none hover:text-blue-700 hover:cursor-pointer active:text-blue-800 transition-all ${
          required ? " required" : ""
        }`}
      >
        {label}
      </label>
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-neutral-500 hover:border-blue-700 hover:text-blue-700 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-white transition-all"
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
              <p className="text-xs">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>
      </div>
      {!!helperText && (
        <p className="py-[0.25rem] text-xs text-neutral-400 select-none flex flex-row gap-[.25rem] items-center">
          <InformationCircleIcon width={12} />
          {helperText}
        </p>
      )}
    </div>
  );
};

export default FileInput;
