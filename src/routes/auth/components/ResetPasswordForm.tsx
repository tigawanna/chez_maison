import { Button } from "@/components/shadcn/ui/button";
import { Link, navigate, usePageContext } from "rakkasjs";
import { TheTextInput } from "@/components/form/inputs/TheTextInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormHook } from "@/components/form/useForm";
import { useState } from "react";
import { toast } from "react-toastify";
import { tryCatchWrapper } from "@/utils/async";
import { Loader } from "lucide-react";

interface PasswordResetFormProps {}

export function PasswordResetForm({}: PasswordResetFormProps) {
  const show_form = true;
  const [show, setShow] = useState(false);
  const [requested, setRequested] = useState(false);
  const page_ctx = usePageContext();
  const requesting_email = page_ctx.url.searchParams.get("email");
  const qc = useQueryClient();

  const { handleChange, input, setError, setInput, validateInputs } =
    useFormHook({
      initialValues: {
        email: requesting_email ?? "",
        token: "",
        password: "",
        passwordConfirm: "",
      },
    });
  const pw_reset_request_mutation = useMutation({
    mutationFn: (vars: { email: string }) => {
      return tryCatchWrapper(
        page_ctx.locals.pb
          ?.collection("utility_staff")
          .requestPasswordReset(vars.email),
      );
    },
    onError(error: any) {
      toast(error.message, { type: "error", autoClose: false });
    },
    onSuccess(data) {
      if (data && data?.data) {
        toast("Password reset request sent, check your email", {
          type: "success",
        });
        setRequested(true);
      }
      if (data && data?.error) {
        toast(data.error.message, { type: "error", autoClose: false });
      }
    },
  });
  const pw_reset_confirm_mutation = useMutation({
    mutationFn: (vars: typeof input) => {
      return tryCatchWrapper(
        page_ctx.locals.pb
          ?.collection("utility_staff")
          .confirmPasswordReset(
            vars.token,
            vars.password,
            vars.passwordConfirm,
          ),
      );
    },
    onSuccess(data) {
      if (data && data?.data) {
        qc.invalidateQueries({ queryKey: ["sherpa_user"] });
        toast("Password reset successfully", {
          type: "success",
        });
        setRequested(false);
        // navigate("/dashboard");
      }
      if (data && data?.error) {
        toast(data.error.message, { type: "error", autoClose: false });
      }
    },
    onError(error: any) {
      toast(error.message, { type: "error", autoClose: false });
    },
  });

  function handleRequestPasswordChange(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    pw_reset_request_mutation.mutate({ email: input.email });
  }

  function handleConfirmPasswordChange(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    pw_reset_confirm_mutation.mutate(input);
  }
  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center justify-center p-5 gap-5">
      <div className="w-full h-full md:w-[60%] lg:w-[40%] flex flex-col gap-4">
        {!requested && (
          <form
            className="w-full h-full  flex flex-col items-center justify-center gap-4"
            // method="POST"
            onSubmit={handleRequestPasswordChange}
          >
            <h1 className="text-2xl font-bold">Request Password Reset</h1>
            <TheTextInput
              field_key={"email"}
              field_name="Email"
              required
              val={input.email}
              onChange={handleChange}
            />
            <Button
              type="submit"
              disabled={pw_reset_request_mutation.isPending}
              className="btn btn-sm btn-outline min-w-[50%]"
              variant={"ghost"}
              size={"sm"}
            >
              {" "}
              Submit{" "}
              {pw_reset_request_mutation.isPending && (
                <Loader className="animate-spin" />
              )}
            </Button>
          </form>
        )}
        {requested && (
          <form
            className="w-full h-full  flex flex-col items-center justify-center gap-4"
            // method="POST"
            onSubmit={handleConfirmPasswordChange}
          >
            <h1 className="text-2xl font-bold">Confirm Password Reset</h1>

            <TheTextInput
              field_key={"token"}
              field_name="Toekn"
              required
              val={input.token}
              onChange={handleChange}
            />

            <TheTextInput
              field_key={"password"}
              field_name="password"
              type={show ? "text" : "password"}
              required
              min={8}
              onChange={handleChange}
              val={input.password}
            />

            <TheTextInput
              field_key={"passwordConfirm"}
              field_name="passwordConfirm"
              type={show ? "text" : "password"}
              required
              min={8}
              onChange={handleChange}
              val={input.passwordConfirm}
            />
            <TheTextInput
              field_key={"show"}
              field_name={"show password"}
              onChange={(e) => setShow(e.target.checked)}
              type="checkbox"
              className="h-5 border-none w-5"
              container_classname="border-none flex flex-row gap-3"
              label_classname="min-w-fit "
            />

            <Button
              type="submit"
              disabled={pw_reset_confirm_mutation.isPending}
              className="btn btn-sm btn-outline min-w-[50%]"
              variant={"ghost"}
              size={"sm"}
            >
              {" "}
              Submit{" "}
              {pw_reset_confirm_mutation.isPending && (
                <Loader className="animate-spin" />
              )}
            </Button>
          </form>
        )}
      </div>
      {show_form && (
        <p className=" text-sm">
          Already have an account ?{" "}
          <Link href="/auth" className="text-accent">
            Log in
          </Link>
        </p>
      )}
    </div>
  );
}
