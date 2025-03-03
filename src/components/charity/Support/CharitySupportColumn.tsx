"use client";
import { ICharitySupportData } from "@/api/charity/types";
import { ColumnDef } from "@tanstack/react-table";
import { colorsForStoreStatus } from "../constant";
import Image from "next/image";
import ArrowUpDown from "@images/svg/ArrowUpDown.svg";
import { convertUTCtoLocalISO, formatDate } from "@/utils/basicfunctions";
import Link from "next/link";

export const CharitySupportColumn: ColumnDef<ICharitySupportData>[] = [
  {
    accessorKey: "request_id",
    header: "Request ID",
    cell: ({ cell }) => {
      return (
        <Link
          href={`/charity/support/${cell.row.original.request_id}?status=${cell.row.original.status}`}
        >
          {cell.row.original.request_id}
        </Link>
      );
    },
  },
  { accessorKey: "title", header: "Request title" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ cell }) => {
      return (
        <div
          className={`w-[121px] rounded-sm py-[7.5px] text-center text-[11px] font-normal ${cell.row.original.status === "Closed" ? "bg-[#FD3939]/25 text-[#FD3939]" : "bg-[#6DE263]/25 text-[#6DE263]"}`}
        >
          {cell.row.original.status}
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <div className="flex">
          <span className="font-normal text-merchant_text_color_blue">
            Submitted On
          </span>
          <Image
            alt=""
            src={ArrowUpDown}
            className="ml-2 h-4 w-4 cursor-pointer"
            onClick={() => column.toggleSorting()}
          />
        </div>
      );
    },
    cell: ({ cell }) => {
      return (
        <div>
          {formatDate(convertUTCtoLocalISO(cell.row.original.created_at))}
        </div>
      );
    },
  },
];
