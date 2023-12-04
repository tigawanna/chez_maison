import { BillResponse } from "../../state/api/bills";

interface BillRowProps {
    bill: BillResponse
}

export function BillRow({bill}:BillRowProps){
return (
 <div className='w-full flex  justify-center border p-[2px] m-1'>

 <div className="w-full flex flex-col justify-center  gap-1 p-1">
    <h2 className="font-bold">{bill.expand.shop.shop_number}</h2>
    <h2 className="">{bill.expand.shop.expand.tenant.name}</h2>
 </div>

<div className="w-full flex flex-col justify-center items-center gap-1 p-1">
    <h2 className="">Elec: {bill.elec_readings}</h2>
    <h2 className="">Water: {bill.water_readings}</h2>
    <h2 className="text-accent text-xs"> {bill.month}/{bill.year}</h2>
            

</div>

 </div>
);
}
