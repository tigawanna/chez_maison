import { PageProps } from "rakkasjs"
import PrintBills from "./Print"
export default function Page({}:PageProps) {
return (
<div className="w-full h-full min-h-screen flex items-center justify-center">
    <PrintBills/>
</div>
)}
