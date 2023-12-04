import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/shadcn/ui/alert-dialog";
import { ChevronLeft, ChevronRight, Loader, Plus, X } from "lucide-react";
import { MonthlyBills } from "../../api/bills";
import { useState } from "react";
import { navigate, useLocation } from "rakkasjs";
import { BillsForm } from "./BillsForm";


interface BillsCarousselProps {
  bills: MonthlyBills[];
}

export function BillsCaroussel({ bills }: BillsCarousselProps) {
  const url = new URL(useLocation().current);
  const currentIdxSearchParam = url.searchParams.get("bill");
  const bill_idx = currentIdxSearchParam ? parseInt(currentIdxSearchParam) : 0;
  const [currentBill, setCurrentBill] = useState(bill_idx);
  // const one_bill = bills[currentBill];
//  const query = useOneBillQuery({
//    curr_bill: one_bill.curr_bill_id,
//    prev_bill: one_bill.prev_bill_id,
//  });
  function nextBill() {
    if (currentBill < bills.length - 1) {
      setCurrentBill((prev) => {
        return prev + 1;
      });
      url.searchParams.set("bill", (currentBill + 1).toString());
      navigate(url.toString());
    }
  }
  function prevBill() {
    if (currentBill > 0) {
      setCurrentBill((prev) => {
        return prev - 1;
      });
      url.searchParams.set("bill", (currentBill - 1).toString());
      navigate(url.toString());
    }
  }

const bill = bills[currentBill]
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="hover:text-accent flex gap-2 btn btn-sm text-lg">
          <Plus />
          carrousel form
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent
        className="min-w-[60%] min-h-[70vh]"
        onKeyDown={(e) => {
          if (e.ctrlKey && e.key === "ArrowRight") {
            nextBill();
          }
          if (e.ctrlKey && e.key === "ArrowLeft") {
            prevBill();
          }
        }}
      >

        {bill && (
          <div className="w-full h-full">
            <AlertDialogHeader>
              <AlertDialogTitle>
                {" "}
                <div className="flex flex-col">
                  <div className="text-accent font-bold">
                    {bill.shop_number}
                  </div>
                  {bill.shop_name}
                  <div className="flex gap-0.5">
                    <div className="flex text-accent">{currentBill}</div>/
                    <div className="flex">{bills.length}</div>
                  </div>
                </div>
              </AlertDialogTitle>
            </AlertDialogHeader>
            <div className="h-full flex justify-center items-center">
              <button
                className="hover:text-accent flex gap-2 btn btn-sm text-lg"
                onClick={() => prevBill()}
              >
                <ChevronLeft />
              </button>
              <div className="">
                <BillsForm
                  bill={bill}
                  setOpen={() => {}}
                  key={currentBill}
                  next={nextBill}
                />
              </div>
              <button
                className="hover:text-accent flex gap-2 btn btn-sm text-lg"
                onClick={() => nextBill()}
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel>
            <X className="" />
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
