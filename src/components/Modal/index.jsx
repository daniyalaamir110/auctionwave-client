import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { memo } from "react";

const Modal = memo(
  ({ shown = false, hide = () => {}, title = "", children }) => {
    if (shown) {
      return (
        <div
          className="p-[1rem] fixed top-0 left-0 w-[100svw] h-[100svh] bg-black bg-opacity-50 flex flex-col justify-center items-center"
          onClick={hide}
        >
          <div
            className="w-full p-[2rem] bg-white max-w-[32rem] rounded-lg flex flex-col gap-[1rem] shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-row items-center justify-between">
              <h2 className="text-2xl text-blue-700">{title}</h2>
              <button
                className="hover:text-blue-700 transition-all"
                onClick={hide}
              >
                <XMarkIcon width={24} />
              </button>
            </div>
            <div>{children}</div>
          </div>
        </div>
      );
    }
    return null;
  }
);

export default Modal;
