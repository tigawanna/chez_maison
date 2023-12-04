import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { useFormHook } from "@/components/form/useForm";
import { PbTheTextInput } from "@/lib/pb/components/form/PBTheTextInput";
import {
  UtilityShopsCreate,
  UtilityShopsResponse,
  UtilityTenantsResponse,
} from "@/lib/pb/db-types";
import { Loader } from "lucide-react";
import { useShopMutation } from "../utils/useShopMutation";
import React from "react";
import { PBFieldWrapper } from "@/lib/pb/components/form/PBFieldWrapper";
import { SearchTenant } from "./SearchTenant";
import { ShopPosition } from "./ShopPosition";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import { TypedRecord } from "typed-pocketbase";

// type ShopsRes = TypedRecord<
interface ShopFormProps {
  shop?: TypedRecord<UtilityShopsResponse, { tenant: UtilityTenantsResponse }>;
  updating?: boolean;
}
export type CreateShopFormFields = UtilityShopsCreate & { tenant_id: string };

export function ShopForm({ shop, updating = false }: ShopFormProps) {
  // console.log({shop})

  const { create_mutation, update_mutation } = useShopMutation();
  const { error, handleChange, input, setInput, setError, validateInputs } =
    useFormHook<CreateShopFormFields>({
      initialValues: {
        tenant_id: shop?.tenant ?? "",
        shop_number: shop?.shop_number ?? "",
        is_vacant: shop?.is_vacant,
        order: shop?.order ?? -1,
        tenant: shop?.expand?.tenant?.username,
        utils: shop?.utils ?? "none",
      },
    });

  const checker = (vars: typeof input) => {
    return true;
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (validateInputs(checker)) {
      if (updating) {
        update_mutation.mutate({
          id: shop?.id!,
          shop: { ...input, tenant: input.tenant_id },
        });
      } else {
        create_mutation.mutate({ ...input, tenant: input.tenant_id });
      }
    }
  }

  const field_error =
    create_mutation.error ||
    create_mutation.data?.error ||
    update_mutation.error ||
    update_mutation.data?.error;
  return (
    <div className="w-full h-full flex items-center justify-center">
      <form
        className="w-full h-full flex flex-col gap-3 items-center justify-center 
      bg-base-200 rounded-xl p-8"
        onSubmit={handleSubmit}
      >
        <PBFieldWrapper<UtilityShopsResponse>
          field_key={"tenant"}
          validation_error={error}
          pb_error={field_error}
        >
          <SearchTenant tenant={input.tenant ?? ""} setInput={setInput} />
        </PBFieldWrapper>
        <ShopPosition
          input={input}
          setInput={setInput}
          shop={shop}
          updating={updating}
          field_error={field_error}
        />

        <div className="w-full flex flex=col gap-2">
          <PBFieldWrapper<UtilityShopsResponse>
            field_key={"utils"}
            validation_error={error}
            pb_error={field_error}
          >
            <div className="w-full h-full flex items-center justify-center">
              <Select
                defaultValue="none"
                onValueChange={(e: "elec" | "water" | "both" | "none") =>
                  setInput({ ...input, utils: e })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pick Shop's utility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Utils</SelectLabel>
                    <SelectItem value="elec">Elec</SelectItem>
                    <SelectItem value="water">Water</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                    <SelectItem value="none">none</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </PBFieldWrapper>
        </div>
        <div className="w-full flex gap-2 items-center justify-center">
          <PbTheTextInput<UtilityShopsResponse>
            field_key={"order"}
            field_name={"list order"}
            type="number"
            required={!updating}
            val={input.order}
            label_classname="text-xs text-accent"
            onChange={handleChange}
            pb_error={field_error}
          />
          <PBFieldWrapper<UtilityShopsResponse>
            field_key={"utils"}
            validation_error={error}
            pb_error={field_error}
          >
            <div className="flex flex-col  gap-1">
              <label
                htmlFor="is_vacant"
                className="text-xs text-accent
                 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Vacant?
              </label>
              <Checkbox
                id="is_vacant"
                className=""
                checked={input.is_vacant}
                onCheckedChange={(e: boolean | "indeterminate") => {
                  if (typeof e === "boolean") {
                    setInput({ ...input, is_vacant: e });
                  }
                }}
              />
            </div>
          </PBFieldWrapper>
        </div>

        <div className="w-full flex items-center justify-center mt-5">
          {updating ? (
            <button className="btn btn-sm btn-primary btn-wide" type="submit">
              Update{" "}
              {update_mutation.isPending && <Loader className="animate-spin" />}
            </button>
          ) : (
            <button className="btn btn-sm btn-primary btn-wide" type="submit">
              Create{" "}
              {create_mutation.isPending && <Loader className="animate-spin" />}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
