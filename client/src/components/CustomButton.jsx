import React from "react";

const CustomButton = ({ title, containerStyles, iconRight, type, onClick }) => {
  return (
    <button
      onClick={onClick}
      type={type || "button"}
      className={`inline-flex items-center ${containerStyles}`}
    >
      {iconRight && <div className='mr-2 text-base'>{iconRight}</div>}
      {title}

    </button>
  );
};

export default CustomButton;

