import React from "react";

interface FormCheckBoxPropsProps<T> {
  label: string;
  prop: keyof T;
  error: { name: string; message: string };
 input: T;
 setInput: React.Dispatch<React.SetStateAction<T>>;
  input_props?:React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
}

export const FormCheckBox = <T,>({
  error,
  setInput,
  prop,
  input,
  label,
  input_props,

}: FormCheckBoxPropsProps<T>) => {


  
  const isError = (err: typeof error, prop: keyof T) => {
    if (err.name === prop && err.message !== "") {
      return true;
    }
    return false;
  };
  const handleChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
  setInput({ ...input, [prop]: e.target.checked });
  // console.log("checkbox event  =======",e.target.checked)
  }
  // console.log("checkbox   ====== ", input)
  return (
    <div 
    style={input_props?.style}
    className="flex items-center justify-center gap-2">
      <label className="text-md capitalize  w-fit">
        {label}
      </label>

      <input
       {...input_props}
        data-testid={prop}
        style={{ borderColor: isError(error, prop) ? "red" : "" }}
        className="w-5 p-2 m-1 border border-black 
                dark:border-white h-10 rounded-sm   dark:bg-slate-700
                focus:border-2 dark:focus:border-4 focus:border-purple-700 dark:focus:border-purple-600 "
        id={prop as string}
        type="checkbox"
        onChange={handleChangeCheckBox}
        checked={input[prop] as boolean}
      />

      {isError(error, prop) ? (
        <div className="text-base  text-red-600">{error.message}</div>
      ) : null}
    </div>
  );
};
