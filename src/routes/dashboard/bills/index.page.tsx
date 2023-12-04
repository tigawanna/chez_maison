import { PageProps } from "rakkasjs"
import { Bills } from "./components/Bills";

export default function Page({}:PageProps) {
return (
  <div className="w-full h-full min-h-screen flex flex-col items-center ">
    <Bills/>
  </div>
);}
