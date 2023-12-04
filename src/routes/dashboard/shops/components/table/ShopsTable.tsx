import { shopsTableColumn } from "./columns";
import { DataTable } from "./data-table";
import { ShopRecord } from "../../utils/types";


interface BillTableProps {
 shops: ShopRecord[];
  editing: boolean;
}

export function ShopsTable({shops,editing=true}: BillTableProps) {
const columns = shopsTableColumn(editing);
  return (
    <div className="w-full h-full flex  justify-center">
      {/* @ts-expect-error */}
      <DataTable columns={columns} data={shops} editing={editing}/>
    </div>
  );
}
