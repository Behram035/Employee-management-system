import React from "react";
import { useFormContext } from "react-hook-form";

const SelectInput = ({ name, placeholder }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={name}
      >
        {placeholder}:
      </label>
      {errors[name] && (
        <p className="text-red-500 text-sm">{errors[name].message}</p>
      )}
      <div className="flex items-center">
        <select
          name={name}
          id={name}
          className="px-6 py-2 border border-gray-300 rounded w-full"
          {...register(name, { required: `${placeholder} is required` })}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
  );
};

export default SelectInput;
