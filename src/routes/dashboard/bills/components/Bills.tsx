import { useBillsPeriod } from "@/utils/hooks/useBillsPeriod";
import { BillsTable } from "./BillsTable";
import { PeriodPicker } from "./parts/PeriodPicker";
import { useBillsQuery } from "../utils/useBillsQuery";
import { Printer } from "lucide-react";
import { Link, useLocation } from "rakkasjs";
import { BillsCaroussel } from "./form/BillsCaroussel";

interface BillsProps {}

export function Bills({}: BillsProps) {
  const { period, setPeriod } = useBillsPeriod();
  const location = useLocation()
  const query = useBillsQuery(period);
  const bills = query?.data?.data?.result;
  // const columns = billsTableColumn(true);

 const print_url = new URL(location.current)
 print_url.pathname="/dashboard/bills/print"
 print_url.searchParams.set("cm",period.curr_month.toString())
 print_url.searchParams.set("cy",period.curr_year.toString())
 print_url.searchParams.set("pm",period.prev_month.toString())
 print_url.searchParams.set("py",period.prev_year.toString())


  return (
    <div className="w-full h-full min-h-screen flex flex-col  gap-2">
      <PeriodPicker period={period} setPeriod={setPeriod} />
      <div className="h-full  flex flex-col justify-center items-center  p-3">
        {bills && (
          <div className="h-full  flex flex-col justify-center items-center  p-3">
            <div className="w-full flex gap-2">
              <Link
                className="hover:text-accent flex gap-4 btn btn-sm text-lg"
                href={print_url.toString()}
              >
                <Printer />
                print
              </Link>
              <BillsCaroussel bills={bills}/>
            </div>

            <BillsTable bills={bills} editing={true} />
          </div>
        )}
        <div className=" min-h-[60vh] w-full flex items-center justify-center ">
          {query.isLoading && (
            <div className=" h-full w-full flex flex-col gap-2 items-center justify-center p-3">
              {Array(20)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="h-5 skeleton bg-base-300 w-full"
                  />
                ))}
            </div>
          )}
          {!query.isLoading && !bills && (
            <div className="min-h-[70vh] flex flex-col  justify-center items-center">
              {query.data?.error && (
                <div className="min-h-[70vh] flex text-error flex-coll justify-center items-center">
                  {query.data?.error?.message}
                </div>
              )}
            </div>
          )}
          {query.isError && (
            <div className="min-h-[70vh] flex flex-coll text-error justify-center items-center">
              {query.error.message}
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
