import {
  ArrowRightOnRectangleIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const Item = ({ text = "", onClick = () => {}, leftIcon = null }) => {
  return (
    <button
      className="border-t-[1px] border-t-blue-200 p-[0.75rem] text-sm text-neutral-900 hover:bg-blue-700 text:sm hover:text-white transition-all flex flex-row items-center justify-center gap-[0.5rem]"
      onClick={onClick}
    >
      {leftIcon}
      {text}
    </button>
  );
};

const AccountPopover = ({ shown = false }) => {
  if (shown) {
    return (
      <div className="absolute right-0 shadow-md rounded-md w-[14rem] bg-white flex flex-col overflow-hidden border border-blue-100">
        <div className="p-[1rem] flex flex-col">
          <h3 className="text-blue-700">Daniyal Aamir</h3>
          <p className="text-xs text-neutral-600">daniyalaamir110</p>
        </div>
        <Item text="Settings" leftIcon={<Cog8ToothIcon width={16} />} />
        <Item
          text="Sign out"
          leftIcon={<ArrowRightOnRectangleIcon width={16} />}
        />
      </div>
    );
  }
  return null;
};

export default AccountPopover;