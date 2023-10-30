import React, { memo } from "react";
import LoadingSpinner from "../LoadingSpinner";

const LoadingItems = memo(({ text = "" }) => {
  return (
    <div className="flex flex-row gap-[0.5rem] items-center text-blue-800">
      <LoadingSpinner />
      <p className="text-md">{text}</p>
    </div>
  );
});

export default LoadingItems;
