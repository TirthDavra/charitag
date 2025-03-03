"use client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import ArrowUpDown from "@images/svg/ArrowUpDown.svg";

import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { IMerchantOrders } from "@/app/merchant/orders/types";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { colorsForOrderStatus } from "../../constants";
export type IOrder = {
  order: string;
  date: number;
  status: "pending" | "processing" | "success" | "failed";
  total: string;
};

export const columns: ColumnDef<IMerchantOrders>[] = [
  {
    accessorKey: "order_code", // Match the key in IOrder interface
    header: ({ column }) => {
      return (
        <div className="flex text-merchant_text_color_blue">
          Order
          <Image
            alt=""
            src={ArrowUpDown}
            className="ml-2 h-4 w-4 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      );
    },
    cell: ({ cell }) => {
      return (
        <Link
          href={"orders/" + cell.row.original.id + ""}
          className="cursor-pointer"
        >
          <div className="flex items-center justify-between font-normal text-merchant_text_color_blue">
            {cell.row.original.order_code}
            <FontAwesomeIcon icon={faEye} />
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "date",
    id: "created_at",
    header: ({ column }) => {
      return (
        <div className="flex">
          Date
          <Image
            alt=""
            src={ArrowUpDown}
            className="ml-2 h-4 w-4 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      );
    },
  },
  // {
  //   accessorKey: "status",
  //   header: "Status",
  //   cell: ({ cell }) => {
  //     const color = colorsForOrderStatus[cell.row.original.status].color;

  //     return (
  //       <div
  //         className="max-w-[121px] rounded-sm  py-[7.5px] text-center text-[11px] font-normal "
  //         style={{ backgroundColor: `${color}26`, color: `${color}` }}
  //       >
  //         {colorsForOrderStatus[cell.row.original.status].value}
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return (
        <div className="flex text-merchant_text_color_blue">
          Total
          <Image
            alt=""
            src={ArrowUpDown}
            className="ml-2 h-4 w-4 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      );
    },
    cell: ({ cell }) => {
      return (
        <div className="font-normal text-merchant_text_color_blue">
          {cell.row.original.total}
        </div>
      );
    },
  },
];
