import { PageProps } from "rakkasjs";
import { Shops } from "./components/Shops";
import { ShopsTableView } from "./components/ShopsTableView";

export default function ShopsPage({}: PageProps) {
return (
<div className="w-full">
    <Shops/>
</div>
  );
}
