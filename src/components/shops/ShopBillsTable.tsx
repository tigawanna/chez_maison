import { Table } from "@mantine/core";
import { BillResponse } from "../../state/api/bills";
import { ShopResponse } from "../../state/api/shops";
import { ShopBillsTableRow } from "./ShopBillsTableRow";

interface ShopBillsTableProps {
    bills: Omit<BillResponse, "expand">[]
    updating: boolean
    printing: boolean
    shop:ShopResponse

}

export function ShopBillsTable({bills,printing,updating,shop}:ShopBillsTableProps){
return (
    <div className='w-full h-full flex items-center justify-center'>
        <Table highlightOnHover withBorder withColumnBorders >
            <thead className={updating ? 'sticky top-[25%] bg-slate-900' : ''}>
                <tr>
                    <th>Created</th>
              

                    <th>Shop Number</th>
                    <th>Shop Number</th>

                    <th>Month</th>
                    <th>Year</th>

                    <th>Electricity</th>
                    <th>Water</th>

                </tr>
            </thead>
            <tbody>
                {

                    bills.map((bill) => {
                        return <ShopBillsTableRow
                        shop={shop}
                        printing={printing} 
                        key={bill.id} 
                        bill={bill} 
                        updating={updating} />
                    })
                }
            </tbody>
            {!printing && <tfoot>
                <tr>
                    {!printing && <th>--</th>}
                    <th>--</th>
                    <th>--</th>

                    <th>--</th>
                    <th>--</th>
                    {!printing && <th>--</th>}

                    <th>--</th>
                    <th>--</th>
                    {!printing && <th>--</th>}

                </tr>
            </tfoot>}
        </Table>
    </div>
);
}
