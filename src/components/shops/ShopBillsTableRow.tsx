import { FaRegEdit } from "react-icons/fa";
import { DateOutput } from "../../shared/extra/DateOutput";
import { BillResponse } from "../../state/api/bills";
import { ShopResponse } from "../../state/api/shops";
import { MutateShopBill } from "./MutateShopBill";


interface ShopBillsTableRowProps {
    bill: Omit<BillResponse, "expand">
    updating: boolean
    printing: boolean
    shop: ShopResponse
  
}

export function ShopBillsTableRow({bill,shop,updating}:ShopBillsTableRowProps){
return (
    <tr key={bill.id}>

        <td><DateOutput the_date={bill.created}/></td>
        
        <td>{shop.shop_number}</td>
        <td>{shop.expand.tenant.name}</td>

        <td>{bill.month}</td>
        <td>{bill.year}</td>

        <td>{bill.elec_readings}</td>
        <td>{bill.water_readings}</td>
        
      
        {updating && <td>
            <MutateShopBill
            bill={bill}
            custom_icon={{
                Icon: FaRegEdit,
                size: '15'
            }}
        /></td>}

    </tr>
);
}
