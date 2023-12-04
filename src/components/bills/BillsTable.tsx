import { Table } from '@mantine/core';
import { MonthlyBills } from '../../state/api/bills';
import { BillsTableRow } from './BillsTabkeRow';
interface BillsTableProps {
    bills: MonthlyBills[]
    updating: boolean
    printing: boolean
 
}

export function BillsTable({bills,updating,printing}:BillsTableProps){
   
return (
 <div className='w-full h-full flex items-center justify-center'>
        <Table  highlightOnHover withBorder withColumnBorders >
            <thead className={updating ?'sticky top-[18%]  bg-slate-200 dark:bg-transparent':''}>
                <tr>
                 {!printing &&<th>Order</th>}
                    <th>Shop No</th>
                    <th>Shop Name</th>

                    <th>PrevElec</th>
                    <th>CurrElec</th>
                   {!printing &&<th>Diff</th>}

                    <th>PrevWater</th>
                    <th>CurrWater</th>
                    {!printing &&<th>Diff</th>}
        
                </tr>
            </thead>
            <tbody>
                {

                    bills.map((bill)=>{
                        return <BillsTableRow printing={printing} key={bill.shop_id} one_bill={bill} updating={updating}/>
                    })
                }
            </tbody>
            {!printing&&<tfoot>
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

