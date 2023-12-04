import { PageProps } from "rakkasjs";
import { Tenants } from "./components/Tenants";

export default function TenantsPage({}: PageProps) {
return (
    <div className="w-full h-full min-h-screen ">
        <Tenants/>
    </div>
  );
}
