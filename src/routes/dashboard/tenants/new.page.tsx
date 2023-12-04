import { PageProps } from "rakkasjs"
import { TenantForm } from "./components/TenatForm"
export default function Page({}:PageProps) {
return (
<div className="w-full h-full min-h-screen flex items-center justify-center">
    <TenantForm/>
</div>
)}
