import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { Edit, Edit2, Plus } from "lucide-react";
import { UtilityTenantsResponse } from "@/lib/pb/db-types";
import { TenantForm } from "./TenatForm";

interface MutateTenantModalProps {
  updating: boolean;
  icon?: React.ReactNode;
  tenant?: UtilityTenantsResponse;
}

export function MutateTenantModal({
  icon,
  updating,
  tenant,
}: MutateTenantModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {icon ? (
          icon
        ) : (
          <button className="btn btn-sm flex gap-2 hover:text-accent">
            {" "}
            {updating ? "Update" : "New Tenant"}
            {updating ? (
              <Edit2 className="h-3.5 w-3.5" />
            ) : (
              <Plus className="h-3.5 w-3.5" />
            )}
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="w-fit max-w-lg">
        <DialogHeader>
          <DialogTitle>
            <span className="text-2xl">{updating ? "Update" : "New Tenant"}</span>
          </DialogTitle>
        </DialogHeader>

        <TenantForm updating={updating} tenant={tenant} />
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
