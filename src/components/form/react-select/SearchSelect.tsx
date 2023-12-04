import { GroupBase, OptionProps, components, PropsValue } from "react-select";
import AsyncSelect from "react-select/async";

interface SearchOwnerProps<T> {
  gettterFunction(keyword: string): Promise<any[]>;
  setValue: (value: any) => void;
  defaultkeyword?:string
  CustomOption?: (
    props: OptionProps<T, boolean, GroupBase<T>>
  ) => JSX.Element | null;
}

export default function SearchSelect<T,>({ gettterFunction,setValue,CustomOption,defaultkeyword}: SearchOwnerProps<T>){


  
  const loadOptions = (
    inputValue: string,
    callback: (options: any[]) => void
  ) => {
    setTimeout(async () => {
      callback(await gettterFunction(inputValue ?? " "));
    }, 200);
  };

  return (
    <AsyncSelect
     defaultInputValue={defaultkeyword}
      className="w-full md:w-[60%]"
      defaultValue={null}
      onChange={(res) => {
        // @ts-expect-error
        setValue(res.value);
      }}
      cacheOptions
      loadOptions={loadOptions}
      defaultOptions
      components={CustomOption ? { Option: CustomOption } : undefined}
    />
  );
};
