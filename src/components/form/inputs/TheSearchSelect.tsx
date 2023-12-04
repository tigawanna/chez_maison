import { SetInput } from "../types";
import React from "react";
import { TheTextInput } from "./TheTextInput";
import { useHandRolledQuery } from "@/utils/hooks/useHandRolledQuery";

interface DefaultSearchTypes {
  label: string;
  value: string;
}

interface TheSearchSelectProps<T> {
  default_value?: string;
  setInput: (props: SetInput) => void;
  fetcherFn: (keyword: string) => Promise<T[]>;
}

export function TheSearchSelect<T>({
  default_value,
  fetcherFn,
  setInput,
}: TheSearchSelectProps<T>) {
  const [keyword, setKeyword] = React.useState((default_value as string) ?? "");

  const { data, loading, error } = useHandRolledQuery<
    Awaited<ReturnType<typeof fetcherFn>>
  >({
    queryKey: ["data", keyword],
    queryFn: () => fetcherFn(keyword),
    enabled: keyword.length > 2,
  });

  const handleChange = (e: any) => {
    const { value } = e.target;
    setKeyword(value);
  };

  function finishSearch() {}

  return (
    <div className="flex h-full w-full cursor-pointer flex-wrap items-center justify-start ">
      <div className="lex w-full flex-col items-center gap-2">
        <TheTextInput field_key={"search"} field_name={"search"} />
        {loading && (
          <div className="flex w-full items-center justify-center  text-sm text-info">
            loading...
          </div>
        )}
        {error && (
          <div className="flex w-full items-center justify-center  text-sm text-error">
            {error.message}
          </div>
        )}
        <div className="w-full flex gap-1">
          {data &&
            data.map((item) => {
              return <div></div>;
            })}
        </div>
      </div>
    </div>
  );
}
