import { PageProps } from "rakkasjs"
import { ShopForm } from "./components/ShopForm"
export default function Page({}:PageProps) {
return (
<div className="w-full h-full min-h-screen flex items-center justify-center">
<ShopForm updating={false}/>
</div>
)}
