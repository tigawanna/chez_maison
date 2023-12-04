import { useRef } from "react";
import { MonthlyBills } from "../api/bills";
import ReactToPrint from "react-to-print";
import { PrintThis } from "./components/PrinThis";
import { PrinterIcon } from "lucide-react";
import { useBillsQuery } from "../utils/useBillsQuery";
import { getMonthName } from "@/utils/date-helpers";
import { useBillsPeriod } from "@/utils/hooks/useBillsPeriod";


interface PrintProps {

}
interface TheTableState {
  title: string
  bills: MonthlyBills[]
}
export default function PrintBills({}:PrintProps){
  const componentRef = useRef(null);
const {period} = useBillsPeriod()
const query = useBillsQuery(period)
const bills = query.data?.data?.result
  
  return (
    <div className="w-full p-5">
      <ReactToPrint
        trigger={() => (
          <button className="p-2 fixed top-[12%] left-[50%] z-50">
            <PrinterIcon />
          </button>
        )}
        content={() => componentRef.current}
      />
      {query.isLoading && (
        <div className=" h-full w-full flex flex-col gap-2 items-center justify-center p-3">
          {Array(20)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="h-5 skeleton bg-base-300 w-full" />
            ))}
        </div>
      )}
      {bills && (
        <PrintThis
          title={`Bills for ${
            bills && getMonthName(parseFloat(bills[0]?.curr_month))
          } ${bills[0]?.curr_year}`}
          bills={bills}
          ref={componentRef}
        />
      )}
    </div>
  );
};


