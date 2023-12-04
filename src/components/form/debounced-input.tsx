import React from "react";
import { Input } from "@/components/shadcn/ui/input";
import { Loader, Search } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);
  const [debouncing, setDebouncing] = React.useState(false);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
      setDebouncing(false); // Set debouncing status to false after the debounce timeout
    }, debounce);

    setDebouncing(true); // Set debouncing status to true when the debounce timeout starts

    return () => {
      clearTimeout(timeout);
      setDebouncing(false); // Set debouncing status to false when the component unmounts or when the debounce timeout is cleared
    };
  }, [value, debounce]);

  return (
    <div className="w-full flex gap-6 items-center justify-center">
      <div
        className={twMerge(`w-full flex items-center  rounded-lg border border-input px-1 
        focus-visible:outline-none focus-visible:ring-2 active:ring-ring 
        focus-visible:ring-offset-2 
        ring-offset-background 
      `,props.className)}>
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input
          {...props}
          placeholder="search"
          className=" border-none h-auto
          focus-visible:outline-none focus-visible:ring-0 
          focus-visible:ring-offset-0
          
          "
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      {debouncing && <Loader className="animate-spin h-5 w-5" />}
    </div>
  );
}
