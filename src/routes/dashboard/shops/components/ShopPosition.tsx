import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { PbTheTextInput } from "@/lib/pb/components/form/PBTheTextInput";
import { UtilityShopsCreate, UtilityShopsResponse } from "@/lib/pb/db-types";
import { tryCatchWrapper } from "@/utils/async";
import { addZeroToSingleNumber, ensureNumber } from "@/utils/helpers/string";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Home, Loader, ScanSearch } from "lucide-react";
import { usePageContext } from "rakkasjs";
import { useEffect, useState } from "react";
import { expand, fields } from "typed-pocketbase";
import { CreateShopFormFields } from "./ShopForm";
interface ShopPositionProps {
  shop?: UtilityShopsResponse;
  updating?: boolean;
  input: CreateShopFormFields;
  setInput: React.Dispatch<React.SetStateAction<CreateShopFormFields>>;

  field_error?: any;
}

export function ShopPosition({
  input,
  setInput,
  shop,
  updating,
  field_error,
}: ShopPositionProps) {
  const page_ctx = usePageContext();
 
const [floor,setFloor]=useState(input.shop_number.split("-")[0]??"")
  const query = useQuery({
    queryKey: ["shop", floor],
    queryFn: () => {
      return tryCatchWrapper(
        page_ctx.locals.pb?.collection("utility_shops").getList(1, 10, {
          sort: "-created",
          filter: `shop_number~"${floor}"`,
          fields:fields("shop_number","order"),
          // expand:expand({"tenant":true}),
        }),
      );
    },
    enabled: (!updating&&floor.length > 0) ? true : false,
    select: (data) => {
      if (data.data) {
        const shops = data.data?.items;

        const sorted_shops_summary = shops.sort((a, b) => {
        const num_a = parseInt(a.shop_number.split("-")[1]);
        const num_b = parseInt(b.shop_number.split("-")[1]);
        return num_b - num_a
        })

        const new_shop_number = addZeroToSingleNumber(
          parseInt(sorted_shops_summary[0]?.shop_number?.split("-")[1]) + 1,
        );
        const new_order= sorted_shops_summary[0]?.order
        const new_shop_order = new_order?new_order+1:0
        console.log({new_shop_number,new_order});
        return {new_shop_number,new_shop_order}
      }else{
        return {new_shop_number:"",new_shop_order:""}
      }
    },
  });

useEffect(()=>{
if(query?.data && query.data.new_shop_number){
  setInput({ ...input, 
    order:ensureNumber(query.data.new_shop_order),
    shop_number: 
    `${floor}${query.data.new_shop_number}` });

}
},[query.data])
// console.log({query})
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full h-full gap-2 flex items-center justify-center">
        <Select value={floor} onValueChange={(value) => setFloor(value)}>
          <SelectTrigger className="max-w-fit min-w-[20%] py-1">
            <SelectValue placeholder="Shop floor" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Floor</SelectLabel>
              <SelectItem value="Basement">Basement</SelectItem>
              <SelectItem value="G-">G-</SelectItem>
              <SelectItem value="M1-">M1-</SelectItem>
              <SelectItem value="M2-">M2-</SelectItem>
              <SelectItem value="M3-">M3-</SelectItem>
              <SelectItem value="NIBS">NIBS</SelectItem>
              <SelectItem value="M4-">M4-</SelectItem>
              <SelectItem value="M5-">M5-</SelectItem>
              <SelectItem value="M6-">M6-</SelectItem>
              <SelectItem value="M7-">M7-</SelectItem>
              <SelectItem value="M8-">M8-</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <PbTheTextInput<UtilityShopsResponse>
          field_key={"shop_number"}
          field_name={"Shop No"}
          //   defaultValue={query.data?.new_shop_number??input.shop_number}
          required={!updating}
          pattern={
            "^(G-[0-9][1-9]|G-[1-9][0-9]|M[1-9]-[0-9][1-9]|M[1-9]-[1-9][0-9]|BASEMENT|NIBS)$"
          }
          val={input.shop_number}
          label_classname="text-xs text-accent hidden"
          className="p-5"
          onChange={(e) => {
            setInput({ ...input, shop_number: e.target.value });
          }}
          pb_error={field_error}
        />
        {query.isLoading && !query.isPaused ? (
          <Loader className="animate-spin" />
        ) : (
          <ScanSearch />
        )}
      </div>
    </div>
  );
}
