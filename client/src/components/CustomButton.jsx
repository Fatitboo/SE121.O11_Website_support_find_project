import React from "react";

const CustomButton = ({ title, containerStyles, iconRight, type, onClick, isLeft , children}) => {
    if(isLeft){
        return (
            <button
              onClick={onClick}
              type={type || "button"}
              className={`inline-flex items-center ${containerStyles}`}
            >
              {children}
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
          {children}
          {title}
          {iconRight && <div className="ml-2">{iconRight}</div>}
        </button>
      );
};

export default CustomButton;

