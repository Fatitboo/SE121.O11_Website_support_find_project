import React from "react";

const TextInput = React.forwardRef(
  ({ type, placeholder, styles, label, register, name, error }, ref) => {
    return (
      <div className='flex flex-col'>
        <p className='block leading-8 text-gray-900 font-medium'>{label}</p>
        <div className="relative mt-2 rounded-md shadow-sm ">
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            ref={ref}
            className={`block bg-[#f0f5f7] focus:bg-white text-base w-full rounded-md border-0 py-2.5 pl-5 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-base sm:leading-8 ${styles}`}
            {...register}
            aria-invalid={error ? "true" : "false"}
          />
          {error && <span className='text-xs text-red-500 mt-0.5 '>{error}</span>}
        </div>
      </div>
    );
  }
);

export default TextInput;