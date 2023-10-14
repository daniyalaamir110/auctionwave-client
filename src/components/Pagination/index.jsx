import React from "react";

const Pagination = () => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-sm text-blue-700">
        Showing <span className="font-semibold text-blue-900">1</span> to{" "}
        <span className="font-semibold text-blue-900">10</span> of{" "}
        <span className="font-semibold text-blue-900">100</span> Entries
      </span>
      <div className="inline-flex mt-2 xs:mt-0">
        <button className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-blue-700 rounded-l hover:bg-blue-900">
          <svg
            className="w-3.5 h-3.5 mr-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
          Prev
        </button>
        <button className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-blue-700 border-0 border-l border-blue-700 rounded-r hover:bg-blue-900 transition-all">
          Next
          <svg
            className="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
