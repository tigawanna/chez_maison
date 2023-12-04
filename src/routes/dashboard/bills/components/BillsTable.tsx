import { MonthlyBills } from "../api/bills";
import { billsTableColumn } from "./table/columns";
import { DataTable } from "./table/data-table";

interface BillTableProps {
  bills: MonthlyBills[];
  editing: boolean;
}

export function BillsTable({bills,editing=true}: BillTableProps) {
const columns = billsTableColumn(editing);
  return (
    <div className="w-full h-full flex  ">
      <DataTable columns={columns} data={bills} editing={editing}/>
    </div>
  );
}
