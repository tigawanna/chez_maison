import { UtilityTenantsCreate, UtilityTenantsUpdate } from "@/lib/pb/db-types";
import { tryCatchWrapper } from "@/utils/async";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePageContext } from "rakkasjs";
import { toast } from "react-toastify";

export function useMutateTenant() {
  const page_ctx = usePageContext();
  const qc=useQueryClient()
  const create_mutation = useMutation({
    mutationFn: (tenant: UtilityTenantsCreate) => {
      return tryCatchWrapper(
        page_ctx.locals.pb?.collection("utility_tenants").create(tenant),
      );
    },
    onSuccess(data) {
      if (data.data) {
        // const navigate_to = `/dashboard/scribble/${data.data.id!}`;
        // navigate(navigate_to);
        qc.invalidateQueries({queryKey:["utility_tenants"]})
        toast("Tenant Created", { type: "success"});
      }
      if (data.error) {
        toast(data.error.message, { type: "error", autoClose: false });
      }
    },
    onError(error: any) {
      toast(error.message, { type: "error", autoClose: false });
    },
    
  },
  );

   

  const update_mutation = useMutation({
      mutationFn: (vars: { id: string; tenant: UtilityTenantsUpdate }) => {
        return tryCatchWrapper(
          page_ctx.locals.pb
            ?.collection("utility_tenants")
            .update(vars.id, vars.tenant),
        );
      },
      onSuccess(data) {
        if (data.data) {
          // const navigate_to = `/dashboard/scribble/${data.data.id!}`;
          // navigate(navigate_to);
          qc.invalidateQueries({ queryKey: ["utility_tenants"] })
          toast("Tenant Updated", { type: "success" });
        }
        if (data.error) {
          toast(data.error.message, { type: "error", autoClose: false });
        }
      },
      onError(error: any) {
        toast(error.message, { type: "error", autoClose: false });
      },
    },
  );

  return {
    create_mutation,
    update_mutation,
  };
}
