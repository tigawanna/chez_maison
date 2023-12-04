import { tryCatchWrapper } from "@/utils/async";
import { useQuery } from "@tanstack/react-query";
import { Link, PageProps, usePageContext } from "rakkasjs";
import { sort, expand } from "typed-pocketbase";
import { TenantForm } from "./components/TenatForm";
import { Loader } from "lucide-react";
export default function TenantPage({ params }: PageProps) {
  const page_ctx = usePageContext();
  const query = useQuery({
    queryKey: ["utility_tenants", params.id],
    queryFn: () =>
      tryCatchWrapper(
        page_ctx.locals.pb?.collection("utility_tenants").getOne(params.id, {
          expand: expand({ "utility_shops(tenant)": true }),
        }),
      ),
  });
  const data = query.data?.data;
  if (query.isPending) {
    return (
      <div className="w-full h-full min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }
  if (!data) {
    return (
      <div className="w-full h-full min-h-screen flex items-center justify-center">
        <div>
          <div>No such tenant exists</div>
          <Link href="/dashboard/tenants" className="btn">
            Back
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center">
      <TenantForm updating={true} tenant={data} />
    </div>
  );
}
