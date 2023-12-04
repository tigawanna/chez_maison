import React from "react";

interface FormInputProps<T> {
  label: string;
  prop: keyof T;
  error: { name: string; message: string };
  handleChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  input: T;
  type?: React.HTMLInputTypeAttribute;
  input_props?:React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
}

export const FormInput = <T,>({
  error,
  handleChange,
  prop,
  input,
  label,
  input_props,
  type = "text",
}: FormInputProps<T>) => {
  
  const isError = (err: typeof error, prop: keyof T) => {
    if (err.name === prop && err.message !== "") {
      return true;
    }
    return false;
  };
  return (
    <div 
      style={input_props?.style }
      className="flex flex-col items-center justify-center w-full md:w-[40%] ">
      <label className="text-md capitalize  w-[90%] flex items-start">
        {label}
      </label>

      <input
       {...input_props}
        data-testid={prop}
        style={{ borderColor: isError(error, prop) ? "red" : "" }}
        className="w-[90%] p-[6px] m-1 
        border border-black dark:border-white h-10 rounded-sm dark:bg-slate-700
        focus:border-2 dark:focus:border-4  "
        id={prop as string}
        type={type}
        placeholder={prop as string}
        onChange={handleChange}
    
        value={input[prop] as string}
      />

      {isError(error, prop) ? (
        <div className="text-base  text-red-600">{error.message}</div>
      ) : null}
    </div>
  );
};
