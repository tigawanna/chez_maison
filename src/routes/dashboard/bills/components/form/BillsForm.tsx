import { useMutation } from "@tanstack/react-query";
import {
  BillMutationFields,
  BillUpdateFields,
  MonthlyBills,
  addBill,
  updateBill,
} from "../../api/bills";
import { useFormHook } from "@/components/form/useForm";
import { isBillingNewMonth } from "../../utils/bill_utils";
import { concatErrors } from "@/utils/helpers/concaterrors";
import { useState } from "react";
import { useBillsPeriod } from "@/utils/hooks/useBillsPeriod";
import { usePageContext } from "rakkasjs";
import { ErrorWrapper } from "@/components/wrappers/ErrorWrapper";
import { Button } from "@/components/shadcn/ui/button";
import { Loader } from "lucide-react";
import { PbTheTextInput } from "@/lib/pb/components/form/PBTheTextInput";

interface BillsFormProps {
  bill: MonthlyBills;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  next?:() => void;
}

export function BillsForm({ bill, setOpen,next }: BillsFormProps) {
  console.log("====== BILLS IN FORM ========== ",bill)
  const page_ctx = usePageContext();
  const pb = page_ctx.locals.pb;
  const is_new_bill = isBillingNewMonth(bill);
  const { period } = useBillsPeriod();

  function genInitValues() {
    if (is_new_bill === "prev_no_curr" || is_new_bill === "no_prev_no_curr") {
      return {
        curr_elec: bill.previous_elec,
        curr_water: bill.previous_water,
        prev_elec: bill.previous_elec,
        prev_water: bill.previous_water,
      };
    }
    return {
      curr_elec: bill.current_elec,
      curr_water: bill.current_water,
      prev_elec: bill.previous_elec,
      prev_water: bill.previous_water,
    };
  }
  const [initBill, setInitBill] = useState(genInitValues());
  const { input, setInput, handleChange, setError } = useFormHook({
    initialValues: genInitValues(),
  });
  // console.log({input})

  const new_bill_mutation = useMutation({
    mutationFn: (input: BillMutationFields) => addBill(pb, input),
    meta: { invalidates: [["monthly-bills"]] },
    onError(error, variables, context) {
      setError({ name: "main", message: concatErrors(error) });
    },
    onSuccess(data, variables, context) {
      setInput({
        curr_elec: bill.current_elec,
        curr_water: bill.current_water,
        prev_elec: bill.previous_elec,
        prev_water: bill.previous_water,
      });
      next?.();
      setOpen(false);
    },
  });
  const update_bill_mutation = useMutation({
    mutationFn: (input: BillUpdateFields) => updateBill(pb, input),
    meta: { invalidates: [["monthly-bills"]] },
    onError(error, variables, context) {
      setError({ name: "main", message: concatErrors(error) });
    },
    onSuccess(data, variables, context) {
      setInput({
        curr_elec: bill.current_elec,
        curr_water: bill.current_water,
        prev_elec: bill.previous_elec,
        prev_water: bill.previous_water,
      });
      next?.()
      setOpen(false);
    },
  });

  function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    if (is_new_bill === "prev_no_curr" || is_new_bill === "no_prev_no_curr") {
      const new_bill: BillMutationFields = {
        elec_readings: parseFloat(parseFloat(input.curr_elec).toFixed(2)),
        water_readings: parseFloat(parseFloat(input.curr_water).toFixed(2)),
        shop: bill.shop_id,
        month: period.curr_month,
        year: period.curr_year,
      };
      new_bill_mutation.mutate(new_bill);
      return;
    }

    if (
      initBill.curr_elec !== input.curr_elec ||
      initBill.curr_water !== input.curr_water
    ) {
      const new_bill: BillUpdateFields = {
        elec_readings: parseFloat(parseFloat(input.curr_elec).toFixed(2)),
        water_readings: parseFloat(parseFloat(input.curr_water).toFixed(2)),
        shop: bill.shop_id,
        month: parseInt(bill.curr_month),
        year: parseInt(bill.curr_year),
        id: bill.curr_bill_id,
      };
      // console.log("update bill", bill)
      // console.log("update prev new_bill", new_bill)
      update_bill_mutation.mutate(new_bill);
    }

    if (
      initBill.prev_elec !== input.prev_elec ||
      initBill.prev_water !== input.prev_water
    ) {
      const new_bill: BillUpdateFields = {
        elec_readings: parseFloat(parseFloat(input.prev_elec).toFixed(2)),
        water_readings: parseFloat(parseFloat(input.prev_water).toFixed(2)),
        shop: bill.shop_id,
        month: parseInt(bill.prev_month),
        year: parseInt(bill.prev_year),
        id: bill.prev_bill_id,
      };
      // console.log("update bill", bill)
      // console.log("update prev new_bill", new_bill)
      update_bill_mutation.mutate(new_bill);
    }
    // setInput(genInitValues())
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-wrap justify-center items-center gap-8"
      >
        <div className="w-full flex flex-wrap items-center justify-center gap-5">
          <div className="min-w-[40%] flex flex-col justify-center items-center gap-3">
            <PbTheTextInput
              onChange={handleChange}
              field_name="Prev Elec"
              field_key="prev_elec"
              value={input.prev_elec}
            />
            <PbTheTextInput
              onChange={handleChange}
              field_name="Curr Elec"
              field_key="curr_elec"
              value={input.curr_elec}
            />
            <div className="flex gap-3 text-base w-full justify-start">
              {" "}
              diff:{" "}
              <div className="text-accent w-full">
                {(
                  parseFloat(input.curr_elec) - parseFloat(input.prev_elec)
                ).toFixed(2)}
              </div>
            </div>
          </div>

          <div className="min-w-[40%] flex flex-col  justify-center items-center gap-3">
            <PbTheTextInput
              onChange={handleChange}
              field_name="Prev Water"
              field_key="prev_water"
              value={input.prev_water}
            />
            <PbTheTextInput
              onChange={handleChange}
              field_name="Curr Water"
              field_key="curr_water"
              value={input.curr_water}
            />
            <div className="flex gap-3 text-base w-full justify-start">
              {" "}
              diff:{" "}
              <div className="text-accent w-full">
                {parseFloat(parseInt(input.curr_water).toFixed(2)) -
                  parseFloat(parseInt(input.prev_water).toFixed(2))}
              </div>
            </div>
          </div>
        </div>

        {new_bill_mutation.isError && (
          <ErrorWrapper err={new_bill_mutation.error} />
        )}
        {update_bill_mutation.isError && (
          <ErrorWrapper err={update_bill_mutation.error} />
        )}

        {is_new_bill === "prev_no_curr" || is_new_bill === "no_prev_no_curr" ? (
          <Button disabled={new_bill_mutation.isPending}>
            Create{" "}
            {new_bill_mutation.isPending && (
              <Loader className="w-4 h-4 animate-spin" />
            )}
          </Button>
        ) : (
          <Button disabled={update_bill_mutation.isPending}>
            Update{" "}
            {update_bill_mutation.isPending && (
              <Loader className="w-4 h-4 animate-spin" />
            )}
          </Button>
        )}
      </form>
    </div>
  );
}
