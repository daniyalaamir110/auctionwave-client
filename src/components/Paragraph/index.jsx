import React, { useState } from "react";

const ControlButton = ({ text = "", onClick = () => {} }) => {
  return (
    <span
      onClick={onClick}
      className="text-blue-700 underline cursor-pointer hover:text-blue-500"
    >
      {text}
    </span>
  );
};

const Paragraph = ({ className = "", text = "" }) => {
  const [collapsed, setCollapsed] = useState(true);

  let newClassName = className;

  if (collapsed) {
    newClassName += " line-clamp-2";
  }

  const collapse = () => setCollapsed(true);

  const expand = () => setCollapsed(false);

  return (
    <>
      <p className={newClassName}>{text}</p>
      {collapsed ? (
        <ControlButton text="See more" onClick={expand} />
      ) : (
        <ControlButton text="See less" onClick={collapse} />
      )}
    </>
  );
};

export default Paragraph;
