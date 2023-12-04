
import { FaRegEdit } from "react-icons/fa";
import { MonthlyBills } from "../../state/api/bills";
import { isBillingNewMonth } from "./bill_utils";
import { MutateBill } from "./MutateBill";

interface BillsTableRowProps {
    one_bill: MonthlyBills
    updating: boolean
    printing: boolean
}



export function BillsTableRow({ one_bill, updating, printing }: BillsTableRowProps) {
    const bill = one_bill
    const is_new_bill = isBillingNewMonth(bill)
    
    function rowColor(mode: "no_prev_no_curr" | "prev_no_curr" | "prev_curr"){
        if(mode === "prev_no_curr"){
            return '#43360C'
        }
        if(mode === "no_prev_no_curr"){
            return '#3A0806'
        }
        return ''
    }

    return (
        <tr key={bill.shop_id} style={{
            backgroundColor:rowColor(is_new_bill),
        }}>

            {!printing && <td>{bill.list_order}</td>}
            <td>{bill.shop_number}</td>
            <td>{bill.shop_name}</td>

            <td>{bill.previous_elec}</td>
            <td>{bill.current_elec}</td>
            {!printing && <td>{parseFloat(parseFloat(bill.elec_diff).toFixed(2))}</td>}

            <td>{bill.previous_water}</td>
            <td>{bill.current_water}</td>
            {!printing && <td>{parseFloat(parseFloat(bill.water_diff).toFixed(2))}</td>}

            {updating &&<td><MutateBill
                bill={bill}

                custom_icon={{
                    Icon: FaRegEdit,
                    size: '15'
                }}
            /></td>}

        </tr>
    );
}
