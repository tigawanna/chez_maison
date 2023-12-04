import { useQuery } from "@tanstack/react-query";
import {  useState } from "react";
import { FaPrint, FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { RqError } from "../../shared/wrappers/RqError";
import { RqLoading } from "../../shared/wrappers/RqLoading";
import { TheIcon } from "../../shared/wrappers/TheIcon";
import {getMonthlyBills } from "../../state/api/bills";
import { getMonthName } from "../../utils/date-helpers";
import { BillsTable } from "./BillsTable";
import { BillsPeriod, PeriodPicker } from "./PeriodPicker";

interface BillsViewProps {
    period: BillsPeriod;
    setPeriod: React.Dispatch<React.SetStateAction<BillsPeriod>>;
}

export function BillsView({period,setPeriod}:BillsViewProps){
    const navigate = useNavigate();
    const [updating, setUpdating] = useState(true);
    
    const query = useQuery({
        queryKey:['monthly-bills',period],
        queryFn:()=>getMonthlyBills(period),
    })

    if (query.isLoading) {
        return <RqLoading />
    }
    if (query.isError) {
        return <RqError error={query.error} />
    }
    if (!query.data) {
        return <div className="w-full h-full flex items-center justify-center">No shops</div>
    }

const bills = query.data;

return (
 <div className='w-full h-full flex flex-col items-center justify-center gap-2 '>
    
    <div className=" w-fit px-2 py-1  border-2  flex gap-5 
        left-[45%] right-[45%] rounded-xl sticky top-2 z-40">
            <TheIcon
                Icon={FaPrint}
                size="20"
                iconAction={() => {
                    navigate("/print", {
                        state: {
                          bills,
                          title: `Bills for ${bills && getMonthName(parseFloat(bills[0]?.curr_month))}`,
                        },
                    });
                }}
            />
            
            <TheIcon
                Icon={FaRegEdit}
                size="20"
                iconAction={() =>
                    setUpdating((prev) => !prev)
                }
            />

            <div className="border border-accent rounded p-1 ">{bills.length}</div>

        </div>
        <div className="sticky top-[10%]  bg-slate-200 dark:bg-slate-900 w-full flex items-center justify-center">
            <PeriodPicker period={period} setPeriod={setPeriod} />
        </div>  

        <BillsTable bills={bills} updating={updating} printing={false} />
      
 </div>
);
}
