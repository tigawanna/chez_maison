import { createColumnHelper } from "@tanstack/react-table";
import { ArrowDown, ArrowUp,Edit2 } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import { MutateShopModal } from "../MutateShopModal";
import { ShopRecord } from "../../utils/types";




const columnHelper = createColumnHelper<ShopRecord>();

export function shopsTableColumn(editing = false) {

  return [
    // shop order
    columnHelper.accessor((row) => row.order, {
      id: "list_order",
      cell: (info) => <i>{info.getValue()}</i>,
      header: ({ column }) => {
        if (!editing) {
          return "Order";
        }
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Order
            {column.getIsSorted() === "asc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUp className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
      footer: (info) => info.column.id,
    }),
    // shop number
    columnHelper.accessor((row) => row.shop_number, {
      id: "shop_number",
      cell: (info) => <i>{info.getValue()}</i>,
      header: ({ column }) => {
        if (!editing) {
          return "Shop No";
        }
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Shop No
            {column.getIsSorted() === "asc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUp className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
      footer: (info) => info.column.id,
    }),
    // shop name
    columnHelper.accessor((row) => row.expand.tenant.username, {
      id: "shop_name",
      cell: (info) => <div className="max-w-[100px] overflow-clip text-sm line-clamp-1">{info.getValue()}</div>,
      header: ({ column }) => {
        if (!editing) {
          return "Shop Name";
        }
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Shop Name
            {column.getIsSorted() === "asc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUp className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
      footer: (info) => info.column.id,
    }),
    // is vacant
    columnHelper.accessor((row) => row.is_vacant, {
      id: "is_vacant",
      cell: (info) => <i>{info.getValue()?"Yes":"No"}</i>,
      header: ({ column }) => {
        if (!editing) {
          return "Vacaant";
        }
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Vacant
            {column.getIsSorted() === "asc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUp className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
      footer: (info) => info.column.id,
    }),

    // current water
    columnHelper.accessor((row) => row.utils, {
      id: "current_water",
      cell: (info) => <i>{info.getValue()}</i>,
      header: ({ column }) => {
        if (!editing) {
          return "Utilities";
        }
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Utilities
            {column.getIsSorted() === "asc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUp className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
      footer: (info) => info.column.id,
    }),

    // edit
    columnHelper.accessor((row) => "edit", {
      id: "edit",

      // limit decimal to 3 digits
      cell: (info) => <MutateShopModal shop={info.row.original} updating={editing} 
      icon={<Edit2 className="h-3.5 w-3.5" />}/>,
      header: ({ column }) => {
        return "Edit";
      },
      footer: (info) => info.column.id,
    }),
  ];
}
