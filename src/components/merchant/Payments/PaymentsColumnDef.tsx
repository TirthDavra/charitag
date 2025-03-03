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

export const PaymentsColumnDef: ColumnDef<ITansactions>[] = [
  {
    accessorKey: "reference_id",
    header: () => {
      return <div className="ml-8 flex items-center">Id</div>;
    },
    cell: ({ cell }) => {
      return (
        <Link
          href={`payments/${cell.row.original.id}`}
          className="ml-8 flex items-center text-merchant_text_color_blue"
        >
          #{cell.row.original.reference_id}
        </Link>
      );
    },
  },
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
        <div className="ml-4 flex items-center gap-[15px]">
          <div className="w-[80px]">
            <span>{cell.row.original.total ?? 0}</span>
          </div>
          <div>USD</div>
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
    accessorKey: "description",
    header: "Description",
  },
  // {
  //   id: "action",
  //   header: "Action",
  //   cell: ({ cell }) => {
  //     return (
  //       <Link href={"transactions/" + cell.row.original.id + ""}>
  //         <div className="!flex w-[30%] !justify-center">
  //           <FontAwesomeIcon icon={faEllipsis} className="cursor-pointer" />
  //         </div>
  //       </Link>
  //     );
  //   },
  // },
];
