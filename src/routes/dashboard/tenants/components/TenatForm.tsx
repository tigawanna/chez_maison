import { useFormHook } from "@/components/form/useForm";
import { PbTheTextInput } from "@/lib/pb/components/form/PBTheTextInput";
import { PbTheImagePicker } from "@/lib/pb/components/form/PbTheImagePicker";
import {
  UtilityTenantsCreate,
  UtilityTenantsResponse,
} from "@/lib/pb/db-types";
import { isString } from "@/utils/helpers/string";
import { useMutateTenant } from "../utils/useMutatetenant";
import { Loader } from "lucide-react";

interface TenantFormProps {
  tenant?: UtilityTenantsResponse;
  updating?: boolean;
}
export type CreateTenantFormFields = {
  username: string;
  email: string;
  emailVisibility: boolean;
  password: string;
  passwordConfirm: string;
} & UtilityTenantsCreate;

export function TenantForm({ tenant, updating = false }: TenantFormProps) {
  const { create_mutation, update_mutation } = useMutateTenant();
  const { error, handleChange, input, setInput, setError, validateInputs } =
    useFormHook<CreateTenantFormFields>({
      initialValues: {
        avatar: tenant?.avatar,
        phone: tenant?.phone ?? "",
        username: tenant?.username ?? "",
        email: tenant?.email ?? "",
        emailVisibility: true,
        password: "",
        passwordConfirm: "",
      },
    });
  const checker = (vars: typeof input) => {
    return true;
  };
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (validateInputs(checker)) {
      if (updating) {
        update_mutation.mutate({ id: tenant?.id!, tenant: input });
      } else {
        create_mutation.mutate(input);
      }
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <form
        className="min-w-fit h-full flex flex-col gap-3 items-center justify-center 
      bg-base-200 rounded-xl p-8"
      onSubmit={handleSubmit}
      >
        <PbTheImagePicker
          collection_id_or_name="utility_tenants"
          file_name={tenant?.avatar}
          record_id={tenant?.id}
          label="Avatar"
          label_classname="text-xs text-accent"
          show_preview
          setFileImage={(file) => {
            if (file) {
              setInput((prev) => {
                return { ...prev, avatar: file };
              });
            }
          }}
        />
        <PbTheTextInput
          field_key={"username"}
          field_name={"Usename"}
          required={!updating}
          val={input.username}
          label_classname="text-xs text-accent"
          onChange={handleChange}
          pb_error={
            create_mutation.error ||
            create_mutation.data?.error ||
            update_mutation.error ||
            update_mutation.data?.error
          }
        />
        {!updating && (
          <PbTheTextInput<CreateTenantFormFields>
            field_key={"email"}
            field_name={"Email"}
            type="email"
            label_classname="text-xs text-accent"
            required={!updating}
            val={
              isString(input.email)
                ? input.email
                : isString(input.username)
                  ? `${input?.username.split(" ")[0]}@email.com`
                  : ""
            }
            onChange={handleChange}
            pb_error={
              create_mutation.error ||
              create_mutation.data?.error ||
              update_mutation.error ||
              update_mutation.data?.error
            }
          />
        )}

        <PbTheTextInput<CreateTenantFormFields>
          field_key={"phone"}
          field_name={"Phone"}
          val={input.phone}
          type="tel"
          required={!updating}
          label_classname="text-xs text-accent"
          onChange={handleChange}
          pb_error={
            create_mutation.error ||
            create_mutation.data?.error ||
            update_mutation.error ||
            update_mutation.data?.error
          }
        />
        {!updating && (
          <PbTheTextInput<CreateTenantFormFields>
            field_key={"password"}
            field_name={"Password"}
            required={!updating}
            type="password"
            val={input.password}
            label_classname="text-xs text-accent"
            onChange={handleChange}
            pb_error={
              create_mutation.error ||
              create_mutation.data?.error ||
              update_mutation.error ||
              update_mutation.data?.error
            }
          />
        )}
        {!updating && (
          <PbTheTextInput<CreateTenantFormFields>
            field_key={"passwordConfirm"}
            field_name={"Confirm Password"}
            type="password"
            required={!updating}
            val={input.passwordConfirm}
            label_classname="text-xs text-accent"
            onChange={handleChange}
            pb_error={
              create_mutation.error ||
              create_mutation.data?.error ||
              update_mutation.error ||
              update_mutation.data?.error
            }
          />
        )}
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
