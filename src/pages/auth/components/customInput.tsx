import React from "react";

interface ICustomInput {
  label: string;
  placeHolder: string;
  value: string;
  type: React.HTMLInputTypeAttribute;
  require?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const CustomInput = ({
  label,
  placeHolder,
  value,
  type,
  require = true,
  onChange,
}: ICustomInput) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 ">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      required={require}
      placeholder={placeHolder}
      className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2
       focus:ring-indigo-500 placeholder-gray-500
        dark:placeholder-gray-400 text-gray-900 dark:text-black"
    />
  </div>
);
