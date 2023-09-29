import React from "react";

const CustomButton = ({ title, containerStyles, iconRight, type, onClick, isLeft }) => {
    if(isLeft){
        return (
            <button
              onClick={onClick}
              type={type || "button"}
              className={`inline-flex items-center ${containerStyles}`}
            >
              {iconRight && <div className="mr-2">{iconRight}</div>}
              {title}
            </button>
          );
    }
    return (
        <button
          onClick={onClick}
          type={type || "button"}
          className={`inline-flex items-center ${containerStyles}`}
        >
          {title}
          {iconRight && <div className="ml-2">{iconRight}</div>}
        </button>
      );
};

export default CustomButton;

