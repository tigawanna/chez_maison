import { UtilityShopsCreate, UtilityShopsUpdate } from "@/lib/pb/db-types";
import { tryCatchWrapper } from "@/utils/async";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePageContext } from "rakkasjs";
import { toast } from "react-toastify";

export function useShopMutation() {
  const page_ctx = usePageContext();
const qc = useQueryClient()
  const create_mutation = useMutation({
    mutationFn: (shop: UtilityShopsCreate) => {
      return tryCatchWrapper(
        page_ctx.locals.pb?.collection("utility_shops").create(shop),
      );
    },
    onSuccess(data) {
      if (data.data) {
        // const navigate_to = `/dashboard/scribble/${data.data.id!}`;
        // navigate(navigate_to);
        qc.invalidateQueries({ queryKey: ["utility_shops"] });
        toast("shop created", { type: "success"});
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
      mutationFn: (vars: { id: string; shop: UtilityShopsUpdate }) => {
        return tryCatchWrapper(
          page_ctx.locals.pb
            ?.collection("utility_shops")
            .update(vars.id, vars.shop),
        );
      },
      onSuccess(data) {
        if (data.data) {
          // const navigate_to = `/dashboard/scribble/${data.data.id!}`;
          // navigate(navigate_to);
          qc.invalidateQueries({ queryKey: ["utility_shops"] });
          toast("shop updated", { type: "success" });
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
