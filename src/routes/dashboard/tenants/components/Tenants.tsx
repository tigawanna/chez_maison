import { ClientSuspense } from "rakkasjs";
import { useTenantsQuery } from "../utils/useTenants";
import { TheTextInput } from "@/components/form/inputs/TheTextInput";
import { Edit2, Mail, Phone, Search} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/ui/avatar";
import { MutateTenantModal } from "./MutateTenantModal";
import { wordToNumber } from "@/utils/helpers/string";



interface TenantsProps {}

export function Tenants({}: TenantsProps) {
  const { query, page_number, goToPage, handleChange, pages_arr, searchQuery } =
    useTenantsQuery({});
  const tenants = query.data?.data;


  return (
    <div className="w-full h-full flex flex-col items-center gap-5">
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
        <MutateTenantModal updating={false} />
      </div>
      {/* utilities list */}
      {tenants && (
        <ul className="w-[90%] flex flex-wrap gap-2 justify-center">
          {tenants.items.map((item) => {
            return (
              <li
                key={item.id}
                className="flex items-center w-[95%] sm:w-[45%] lg:w-[30%]  p-2 gap-3 bg-base-200 rounded-lg relative"
              >
                <Avatar>
                  <AvatarImage
                    src={`https://picsum.photos/id/${wordToNumber(
                      item.username,
                    )}/30/30`}
                  />
                  <AvatarFallback>{item.username.slice(0, 1)}</AvatarFallback>
                </Avatar>

                <div className="w-full  ">
                  <div className="max-w-[80%]  ">
                    <h1 className="w-full font-bold overflow-hidden overflow-ellipsis">
                      {item.username}
                    </h1>
                    <div className=" flex gap-1 items-center">
                      <Mail className="w-4 h-4" />
                      <h4 className="overflow-hidden overflow-ellipsis ">
                        {item.email}
                      </h4>
                    </div>
                    <div className=" flex gap-2 items-center">
                      <Phone className="w-3 h-3" />
                      <h4 className="overflow-hidden overflow-ellipsis text-accent">
                        {item.phone}
                      </h4>
                    </div>
                  </div>
                  {item.expand["utility_shops(tenant)"].length > 0 && (
                    <div className="flex gap-2 items-center justify-start">
                      {item.expand["utility_shops(tenant)"].map((shop) => (
                        <div
                          className="flex gap-2 items-center justify-start"
                          key={shop.id}
                        >
                          {/* <User className="w-3 h-3" /> */}
                          <h4 className="text-xs bg-accent border border-accent px-1 rounded">
                            {shop.shop_number}
                          </h4>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="absolute top-[5%] right-[2%]">
                  <MutateTenantModal
                    tenant={item}
                    updating={true}
                    icon={
                      <Edit2
                        className="h-3.5 w-3.5 
                  duration-200 transition-transform 
                  hover:text-accent hover:scale-[200%] hover:w-5 hover:h-5"
                      />
                    }
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}

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
