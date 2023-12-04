import { oneClickOauthLogin } from "@/lib/pb/client";
import { tryCatchWrapper } from "@/utils/async";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GithubIcon, Loader } from "lucide-react";
import { navigate } from "rakkasjs";
import { toast } from "react-toastify";

interface OAuthprovidersProps {}

export function OAuthproviders({}: OAuthprovidersProps) {
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: (provider: "github" | "google") => {
      return tryCatchWrapper(oneClickOauthLogin(provider));
    },
    onSuccess(data, variables, context) {
      if (data && data?.data) {
        toast("Welcome" + data?.data?.username, {
          type: "success",
        });
        qc.invalidateQueries({ queryKey: ["utility_staff"] });
        navigate("/dashboard");
      }
      if (data.error) {
        toast(data.error.message, { type: "error", autoClose: false });
      }
    },
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-5">
      <div className="w-full h-full flex  items-center justify-center gap-2">
        Login with
        <button className="btn btn-sm btn-outline">
          <GithubIcon
            className="w-6 h-6"
            onClick={() => mutation.mutate("github")}
          />
          {mutation.isPending && <Loader className="animate-spin" />}
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
}
