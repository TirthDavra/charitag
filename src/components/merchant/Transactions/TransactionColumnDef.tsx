"use client";
import { ITansactions } from "@/api/merchant/types";
import { ColumnDef } from "@tanstack/react-table";
import ArrowUpDown from "@images/svg/ArrowUpDown.svg";
import Image from "next/image";
import { colorsForTransactionStatus } from "../constants";
import { IconVisa } from "@/components/svgIcons/build/icon-Visa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { formatDateTime } from "@/utils/basicfunctions";

export const TransactionColumnDef: ColumnDef<ITansactions>[] = [
  {
    accessorKey: "total",
    header: ({ column }) => {
      return (
        <div className="ml-4 flex items-center text-merchant_text_color_blue">
          Amount
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
      const backgroundColor =
        colorsForTransactionStatus[cell.row.original.transaction_type].color;
      return (
        <div className="ml-4 flex items-center gap-[11px]">
          <div className="w-[87px]">
            <span>{cell.row.original.total ?? 0} USD</span>
          </div>
          <div
            className={`min-w-[120px] max-w-[120px] flex-grow rounded-sm py-[7.5px] text-center text-[11px] font-normal text-white`}
            style={{
              backgroundColor: `${backgroundColor}26`,
              color: `${backgroundColor}`,
            }}
          >
            {
              colorsForTransactionStatus[cell.row.original.transaction_type]
                .value
            }
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "payment_method",
    header: ({ column }) => {
      return (
        <div className="flex min-w-[150px] items-center text-merchant_text_color_blue">
          Payment Method
          <Image
            alt=""
            src={ArrowUpDown}
            className="ml-2 h-4 w-4 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      );
    },
    cell: () => {
      return (
        <div className="flex min-w-[150px] gap-1">
          <IconVisa color="#172B85" />
          <span>****6651</span>
        </div>
      );
    },
  },
  {
    accessorKey: "from_name",
    header: "From",
    cell: ({ cell }) => {
      return <div className="min-w-[100px]">{cell.row.original.from_name}</div>;
    },
  },
  {
    accessorKey: "to_name",
    header: ({ column }) => {
      return (
        <div className="flex items-center text-merchant_text_color_blue">
          To
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
      return <div className="min-w-[100px]">{cell.row.original.to_name}</div>;
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <div className="flex items-center text-merchant_text_color_blue">
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
    cell: ({ cell }) => {
      return (
        <div className="min-w-[100px]">
          {formatDateTime(cell.row.original.created_at)}
        </div>
      );
    },
  },
  {
    id: "action",
    header: "Action",
    cell: ({ cell }) => {
      return (
        <Link href={"transactions/" + cell.row.original.id + ""}>
          <div className="!flex w-[30%] !justify-center">
            <FontAwesomeIcon icon={faEllipsis} className="cursor-pointer" />
          </div>
        </Link>
      );
    },
  },
];
