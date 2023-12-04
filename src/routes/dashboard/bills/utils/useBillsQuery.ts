import { tryCatchWrapper } from "@/utils/async";
import { usePageContext } from "rakkasjs";
import { getMonthlyBills, getOneMonthlyBill } from "../api/bills";
import { useQuery } from "@tanstack/react-query";
import { BillsPeriod } from "../components/parts/PeriodPicker";

export function useBillsQuery(period: BillsPeriod) {
  const page_ctx = usePageContext();
  const pb = page_ctx.locals.pb;

  const query = useQuery({
    queryKey: ["monthly-bills", period],
    queryFn: () => tryCatchWrapper(getMonthlyBills(pb, period)),
  });
  // console.log("bills query", query);
  return query;
}
export function useOneBillQuery(params:{curr_bill:string,prev_bill:string}) {
  const page_ctx = usePageContext();
  const pb = page_ctx.locals.pb;

  const query = useQuery({
    queryKey: ["monthly-bills", params],
    queryFn: () => tryCatchWrapper(getOneMonthlyBill(pb, params)),
  });
  // console.log("bills query", query);
  return query;
}
