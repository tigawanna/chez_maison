import { ClientSuspense, Link } from "rakkasjs";
import { TheTextInput } from "@/components/form/inputs/TheTextInput";
import {Search, User } from "lucide-react";

import { useShopsQuery } from "../utils/useShopsQuery";
import { MutateShopModal } from "./MutateShopModal";
import { TypedRecord, expand, fields, sort,like } from "typed-pocketbase";
import { UtilityShopsCollection, } from "@/lib/pb/db-types";
import { TypedRecordListQueryParams } from "@/lib/pb/typed-pocketbase";
import { useState } from "react";



interface ShopsProps {}
type ShopsListOptions = TypedRecordListQueryParams<UtilityShopsCollection, any, any>;


interface SortFilters{
  sort_direction:"-"|"+";
  sort_by:"created"|"shop_number"|"order";

}

export function Shops({}: ShopsProps) {
  
const [sorters,SetSorters] =useState<SortFilters>({
  sort_by:"order",
  sort_direction:"-"
})
 
  // sort<>("")
  const { query, page_number, goToPage, handleChange, pages_arr, searchQuery } =
    useShopsQuery({
      pb_query_params: {
        sort: sort(`${sorters.sort_direction}${sorters.sort_by}`),
        // expand: expand({ "utility_bills(shop)": true }),
        // fields: fields("shop_number", "created"),
        // filter: `shop_number~"${searchQuery.debouncedValue}"`,
        expand: expand({ tenant: true }),
     
      },
    });
  const data = query?.data?.data?.items;
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center gap-5 p-3">
      {/* utilities search box */}
      <div className="sticky top-[10%]   flex w-full flex-wrap items-center justify-center gap-3 p-2">
        {/* <h3 className="text-2xl font-bold hidden md:flex">Education</h3> */}
        <div className=" relative flex min-w-[70%] items-center  justify-center gap-1 md:min-w-[50%]">
          <TheTextInput
            label_classname="p-2"
            container_classname="flex-row justify-center items-center rounded-lg"
            className=" "
            val={searchQuery.keyword}
            field_key={"keyword"}
            placeholder="Search"
            field_name={<Search />}
            onChange={handleChange}
          />
          <ClientSuspense
            fallback={
              <div className="absolute  flex w-full items-center justify-center gap-3 p-2">
                <span className="loading loading-infinity loading-lg text-warning"></span>
              </div>
            }
          >
            {(query.isRefetching || searchQuery.isDebouncing) && (
              <div className="absolute  flex w-full items-center justify-center gap-3 p-2">
                <span className="loading loading-infinity loading-lg text-warning"></span>
              </div>
            )}
          </ClientSuspense>
        </div>
        <MutateShopModal updating={false} />
      </div>
      <div className="w-full h-full flex flex-wrap gap-3 items-center justify-center">
        {data &&
          data.map((shop) => {
            return (
              <div
                key={shop.id}
                style={{
                  // filter: shop.is_vacant ? 'blur(1px)' : '',
                  backgroundColor: shop.is_vacant ? "#3A0806" : "",
                }}
                className="border  border-accent rounded-lg 
                w-full p-5 md:w-[45%] lg:w-[30%] md:h-[200px] 
                flex flex-col gap-2 shadow-lg @container hover:brightness-95"
              >
                <Link
                  href={`${shop.id}`}
                  className="w-full h-full flex flex-col items-center 
                   "
                >
                  {/*top  */}
                  <div className="w-full flex flex-col items-end gap-1 ">
                    <h2 className="font-bold text-6xl overflow-hidden overflow-elipsis w-full text-end">
                      {shop.shop_number}
                    </h2>
                    <div className="flex flex-col items-end gap-0">
                      {shop.is_vacant && (
                        <h2 className="text-accent font-bold">VACANT</h2>
                      )}
                    </div>
                  </div>

                  {/*bottom */}
                </Link>
                <div className={"w-full flex gap-2 justify-end "}>
                  <Link
                    href={`/dashboard/tenants/${shop.tenant}`}
                    className="text-2xl text-accent-content font-extralight overflow-hidden break-words hover:text-sky-400
                   "
                  >
                    {shop?.expand?.tenant?.username}
                  </Link>
                </div>

                <div className="w-full flex  justify-between items-center px-2 ">
                  {/* <UtilIcons utils={shop.utils} /> */}
                  <h4 className="border  rounded-full p-1 aspect-square">
                    {shop.order}
                  </h4>
                  {shop && <MutateShopModal updating shop={shop} />}
                  {/* <MutateShop
                user={user}
                shop={shop}
                updating
                custom_icon={{
                  Icon: FaRegEdit,
                  size: "20",
                }}
              /> */}
                </div>
              </div>
            );
          })}
      </div>
      <div className="join ">
        {pages_arr.map((item) => {
          return (
            <button
              key={item}
              onClick={() => goToPage(item)}
              className={
                item === page_number
                  ? "join-item btn btn-sm btn-active bg-accent"
                  : "join-item btn btn-sm"
              }
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}
