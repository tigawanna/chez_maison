import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { Input } from "@/components/shadcn/ui/input";
import { Search, X } from "lucide-react";
import { useSearchTenants } from "../../tenants/utils/useSearchTenants";
import { TheTextInput } from "@/components/form/inputs/TheTextInput";
import { ClientSuspense } from "rakkasjs";
import { useEffect, useState } from "react";
import { CreateShopFormFields } from "./ShopForm";

interface SearchTenantProps {
  tenant: string;
  setInput: React.Dispatch<React.SetStateAction<CreateShopFormFields>>;
}

export function SearchTenant({ tenant, setInput }: SearchTenantProps) {
  //   const { input, setInput } = useFormHook({
  //     initialValues: {
  //       keyword: "",
  //     },
  //   });
  console.log({tenant})
  const [open, setOpen] = useState(false);
  const { handleChange, pages_arr, query, searchQuery } =
    useSearchTenants(tenant);

    useEffect(()=>{
      if(tenant && tenant.length > 0){
        handleChange({target:{value:tenant}})
      }
    },[tenant])
  return (
    <div className="w-full h-full flex flex-col items-center justify-center ">
      <div className="w-full">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <div
              className="w-full flex items-center  rounded-lg border border-input px-1 
        focus-visible:outline-none focus-visible:ring-2 active:ring-ring 
        focus-visible:ring-offset-2 
        ring-offset-background 
      "
            >
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input
                placeholder={tenant ?? "search tenant"}
                defaultValue={tenant}
                className=" border-none h-auto
          focus-visible:outline-none focus-visible:ring-0 
          focus-visible:ring-offset-0"/>
            </div>
          </DialogTrigger>
          <DialogContent className="flex flex-col sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Search for Tenants</DialogTitle>
              {/* <DialogDescription>
               Search for tenants by name or email
              </DialogDescription> */}
            </DialogHeader>
            <div className="w-full flex flex-col gap-5">
              <div className=" relative flex min-w-[70%] items-center  justify-center gap-1 md:min-w-[50%]">
                <TheTextInput
                  label_classname="p-2"
                  container_classname="flex-row justify-center items-center rounded-lg"
                  className=" "
                  val={searchQuery.keyword}
                  field_key={"keyword"}
                  placeholder="Search for tenants by name or email"
                  field_name={<Search />}
                  onChange={handleChange}
                />
                <X
                  className="absolute right-3 h-5 w-5"
                  onClick={() => searchQuery.setKeyword("")}
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
              <div className="w-full flex flex-wrap gap-3">
                {query.data?.data?.items?.map((page) => (
                  <button
                    key={page.id}
                    className="w-fit btn btn-sm hover:bg-accent border rounded-lg"
                    onClick={() => {
                      // searchQuery.setKeyword(page.username)
                      setInput((prev) => {
                        return {
                          ...prev,
                          tenant_id: page.id,
                          tenant: page.username,
                        };
                      });
                      setOpen(false);
                    }}
                  >
                    {page.username}
                  </button>
                ))}
              </div>
              {/* <DebouncedInput
              className="w-full"
                value={input.keyword}
                debounce={1000}
                onChange={(val) => {
                  if (typeof val === "string") {
                    setInput((prev) => {
                      return {
                        ...prev,
                        keyword: val,
                      };
                    });
                  }
                }}
              /> */}
            </div>
            <DialogFooter></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
