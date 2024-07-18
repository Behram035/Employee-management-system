import React from "react";
import { useFormContext } from "react-hook-form";

const TextInput = ({ type, name, placeholder, autoComplete, readOnly = false }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4">
      <div className="grid grid-cols-2 ">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor={name}
        >
          {placeholder}:
        </label>
        {errors[name] && (
          <p className="text-red-500 text-sm">{errors[name].message}</p>
        )}
      </div>
      <input
        type={type}
        id={name}
        {...register(name, { required: `${placeholder} is required` })}
        className="border border-gray-300 rounded px-3 py-2 w-full"
        placeholder={placeholder}
        readOnly={readOnly}
        autoComplete={autoComplete}
      />
    </div>
  );
};

export default TextInput;
