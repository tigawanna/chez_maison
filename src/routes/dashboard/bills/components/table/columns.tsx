import { createColumnHelper } from "@tanstack/react-table";
import { ArrowDown, ArrowUp,Edit2 } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import BillsJson from "../dummy.json";
import {  MutateBill } from "../form/MutateBill";
import { isBillingNewMonth } from "../../utils/bill_utils";


export interface BillsRow {
  shop_id: string;
  prev_bill_id: string;
  shop_name: string;
  current_water: string;
  water_diff: string;
  curr_year: string;
  current_elec: string;
  elec_diff: string;
  curr_bill_id: string;
  previous_water: string;
  prev_month: string;
  list_order: string;
  previous_elec: string;
  shop_number: string;
  curr_month: string;
  prev_year: string;
}

const columnHelper = createColumnHelper<(typeof BillsJson)[number]>();

export function billsTableColumn(editing = false) {

  return [
    // shop order
    columnHelper.accessor((row) => row.list_order, {
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
    columnHelper.accessor((row) => row.shop_name, {
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
    // previous water
    columnHelper.accessor((row) => row.previous_water, {
      id: "previous_water",
      cell: (info) => <i>{info.getValue()}</i>,
      header: ({ column }) => {
        if (!editing) {
          return "Prev Water";
        }
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Prev Water
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
    columnHelper.accessor((row) => row.current_water, {
      id: "current_water",
      cell: (info) => <i>{info.getValue()}</i>,
      header: ({ column }) => {
        if (!editing) {
          return "Curr Water";
        }
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Curr Water
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
    // water diff
    columnHelper.accessor((row) => row.water_diff, {
      id: "water_diff",
      cell: (info) => <i>{parseInt(info.getValue()).toFixed(3)}</i>,
      header: ({ column }) => {
        if (!editing) {
          return "Water Diff";
        }
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Diff
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

    // previous elec
    columnHelper.accessor((row) => row.previous_elec, {
      id: "previous_elec",
      cell: (info) => <i>{info.getValue()}</i>,
      header: ({ column }) => {
        if (!editing) {
          return "Prev elec";
        }
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Prev elec
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
    // current elec
    columnHelper.accessor((row) => row.current_elec, {
      id: "current_elec",
      cell: (info) => <i>{info.getValue()}</i>,
      header: ({ column }) => {
        if (!editing) {
          return "Curr elec";
        }
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Curr elec
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
    // elec diff
    columnHelper.accessor((row) => row.elec_diff, {
      id: "elec_diff",
      // limit decimal to 3 digits
      cell: (info) => <i>{parseInt(info.getValue()).toFixed(3)}</i>,
      header: ({ column }) => {
        if (!editing) {
          return "Elec Diff";
        }
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Diff
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
      cell: (info) => <MutateBill bill={info.row.original} />,
      header: ({ column }) => {
        return "Edit";
      },
      footer: (info) => info.column.id,
    }),
  ];
}
