import { Button } from "@/components/shadcn/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/shadcn/ui/dialog";
import { MonthlyBills } from "../../api/bills";
import { useState } from "react";
import { Edit2 } from "lucide-react";
import { BillsForm } from "./BillsForm";




interface MutateBillProps {
  bill: MonthlyBills;

}

export function MutateBill({bill}:MutateBillProps){
    const [open,setOpen]=useState(false)
return (
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <Edit2 className="h-5 w-5 hover:text-accent" />
    </DialogTrigger>
    <DialogContent className="min-w-[60%]">
      <DialogHeader>
        <DialogTitle className="gap-1 flex flex-col">
          <div className="text-accent font-bold">{bill.shop_number}</div>
          {bill.shop_name}
        </DialogTitle>
        <DialogDescription>
          {/* Make changes to your profile here. Click save when you're done. */}
        </DialogDescription>
      </DialogHeader>
      <BillsForm bill={bill} setOpen={setOpen} />
      <DialogFooter>
        {/* <Button type="submit">Save changes</Button> */}
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
}
