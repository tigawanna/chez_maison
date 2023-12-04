import { ClientSuspense, Link } from "rakkasjs";
import { TheTextInput } from "@/components/form/inputs/TheTextInput";
import {Search, User } from "lucide-react";

import { useShopsQuery } from "../utils/useShopsQuery";
import { MutateShopModal } from "./MutateShopModal";
import { TypedRecord, expand, fields, sort,like } from "typed-pocketbase";
import { UtilityShopsCollection, } from "@/lib/pb/db-types";
import { TypedRecordListQueryParams } from "@/lib/pb/typed-pocketbase";
import { useState } from "react";
import { ShopsTable } from "./table/ShopsTable";



interface ShopsProps {}


export function ShopsTableView({}: ShopsProps) {
  const { query, page_number, goToPage, handleChange, pages_arr, searchQuery } =
    useShopsQuery({});
    console.log({query})
  const data = query?.data?.data?.items;
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center  gap-5 p-3">
      {data && <ShopsTable shops={data} editing={true} />}
      <div className=" min-h-[60vh] w-full flex items-center justify-center ">
        {query.isLoading && (
          <div className=" h-full w-full flex flex-col gap-2 items-center justify-center p-3">
            {Array(20)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="h-5 skeleton bg-base-300 w-full" />
              ))}
          </div>
        )}
        {!query.isLoading && !data && (
          <div className="min-h-[70vh] flex flex-col  justify-center items-center">
            {query.data?.error && (
              <div className="min-h-[70vh] flex text-error flex-coll justify-center items-center">
                {query.data?.error?.message}
              </div>
            )}
          </div>
        )}
        {query.isError && (
          <div className="min-h-[70vh] flex flex-coll text-error justify-center items-center">
            {query.error.message}
          </div>
        )}
      </div>
    </div>
  );
}
