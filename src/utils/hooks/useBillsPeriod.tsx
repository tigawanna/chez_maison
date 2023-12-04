import { MonthlyBills } from "@/routes/dashboard/bills/api/bills";
import { getPrevMonthandYear } from "../date-helpers";
import { useState, useEffect } from "react";
import { navigate, usePageContext } from "rakkasjs";
import { BillsPeriod } from "@/routes/dashboard/bills/components/parts/PeriodPicker";

export function isBillingNewMonth(bill: MonthlyBills) {
  if (bill.prev_bill_id === "blank" && bill.curr_bill_id === "blank") {
    return "no_prev_no_curr";
  }

  const prev_month = parseInt(bill.prev_month);
  const prev_year = parseInt(bill.prev_year);
  if (
    bill.prev_bill_id !== "blank" &&
    bill.curr_bill_id === "blank" &&
    prev_month === getPrevMonthandYear().month &&
    prev_year === getPrevMonthandYear().year
  ) {
    return "prev_no_curr";
  }

  return "prev_curr";
}

export function caclulatePeriod(month: number, year: number): BillsPeriod {
  return {
    curr_month: month,
    curr_year: year,
    prev_month: getPrevMonthandYear(month).month,
    prev_year: getPrevMonthandYear(month).year,
  };
}

// export function useBillsPeriodSearchParams() {
//    const page_ctx = usePageContext()
//    const month =
//      page_ctx.url.searchParams.get("month") ?? (new Date().getMonth() + 1).toString();
//    const year =
//      page_ctx.url.searchParams.get("year") ?? new Date().getFullYear().toString();
//    const period = caclulatePeriod(parseInt(month), parseInt(year))
// }

export function useBillsPeriod() {
  const page_ctx = usePageContext();
  const search_params_curr_month = page_ctx.url.searchParams.get("cm");
  const search_params_curr_year = page_ctx.url.searchParams.get("cy");
  const search_params_prev_month = page_ctx.url.searchParams.get("pm");
  const search_params_prev_year = page_ctx.url.searchParams.get("py");

   const curr_month = search_params_curr_month?parseInt(search_params_curr_month): (new Date().getMonth() + 1)
   const curr_year = search_params_curr_year?parseInt(search_params_curr_year):new Date().getFullYear()
   const prev_month = search_params_prev_month?parseInt(search_params_prev_month): getPrevMonthandYear(curr_month).month;
   const prev_year = search_params_prev_year?parseInt(search_params_prev_year): getPrevMonthandYear(curr_month).year;

  const [period, setPeriod] = useState({
    curr_month,
    curr_year,
    prev_month,
    prev_year}
  );

  useEffect(() => {
  if(period.curr_month !== curr_month || period.curr_year !== curr_year || period.prev_month !== prev_month || period.prev_year !== prev_year) {
    const url = new URL(page_ctx.url);
    url.searchParams.set("cm", period.curr_month.toString());
    url.searchParams.set("cy", period.curr_year.toString());
    url.searchParams.set("pm", period.curr_month.toString());
    url.searchParams.set("py", period.curr_year.toString());
    navigate(url);
  }
}, [period]);

  return {
    period,
    setPeriod,
  };
}
