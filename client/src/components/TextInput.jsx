import React from "react";
import {AiFillExclamationCircle} from "react-icons/ai";

// eslint-disable-next-line react/display-name
const TextInput = React.forwardRef(
  ({ type, placeholder, styles, label, register, name, error, onblur, oninput, onChange, rules, value}, ref) => {
    return (
      <div className='flex flex-col'>
        <p className='block leading-8 text-gray-900 text-base font-semibold' style={{color: `${error ? "#a9252b": ""}`}}>{label}</p>
        <div className="relative rounded-md">
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            onInput={oninput}
            onChange={onChange}
            rules={rules}
            onBlur={onblur}
            ref={ref}
            defaultValue={value}
            className={`block bg-[#f9fbfc] focus:bg-white text-base outline-1 shadow-sm w-full rounded-md py-2.5 pl-5 pr-5 text-gray-900 border-[1px] border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8 ${styles}`}
            {...register}
            style={{borderColor: `${error ? "#a9252b": ""}`, outlineColor: `${error ? "#a9252b": ""}`}}
            aria-invalid={error ? "true" : "false"}
          />
          {error && <span className='flex flex-row items-center text-sm text-[#a9252b] mt-2'><AiFillExclamationCircle className="mr-1"/>{error}</span>}
        </div>
      </div>
    );
  }
);

export default TextInput;