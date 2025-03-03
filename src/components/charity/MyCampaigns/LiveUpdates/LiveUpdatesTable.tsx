"use client";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import productImg from "@images/productDefault.jpg";
import { ColumnDef } from "@tanstack/react-table";
import { ILiveupdates } from "@/api/charity/types";
import CustomTable from "@/components/merchant/Custom/Tables/CustomTable";
import ArrowUpDown from "@images/svg/ArrowUpDown.svg";
import { formatDateAndTime } from "@/utils/basicfunctions";
import { DateTime } from "luxon";

export const LiveUpdateTable = ({
  updateData,
}: {
  updateData: ILiveupdates[];
}) => {
  const updatesColumnsdef: ColumnDef<ILiveupdates>[] = [
    {
      accessorKey: "thumbnail_path",
      header: () => {
        return (
          <div>
            <FontAwesomeIcon icon={faImage} />
          </div>
        );
      },
      cell: ({ cell }) => {
        return (
          <div className="min-w-[50px]">
            <Image
              src={
                cell.row.original.thumbnail_path
                  ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                    cell.row.original.thumbnail_path
                  : productImg
              }
              alt=""
              className="h-[50px] w-[50px]"
              width={500}
              height={500}
            />
          </div>
        );
      },
    },

    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <div className="flex items-center text-merchant_text_color_blue">
            Product / Deal
            <Image
              alt=""
              src={ArrowUpDown}
              className="ml-2 h-4 w-4 cursor-pointer"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            />
          </div>
        );
      },
      cell: ({ cell }) => {
        return (
          <div className="flex min-w-[300px] items-center gap-2">
            <div>{cell.row.original.name}</div>
            {cell.row.original.type === "deal" && (
              <div className="bg-blue-400 px-1 py-[2px] text-xs text-white">
                Deal
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: "Date",
      cell: ({ cell }) => {
        return (
          <div className="min-w-[200px]">
            {cell.row.original?.created_at &&
              formatDateAndTime(
                DateTime.fromISO(cell.row.original.created_at)
                  .toLocal()
                  .toISO() || "",
              )}
          </div>
        );
      },
    },
    {
      accessorKey: "total_donation",
      header: "Amount",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "donor_name",
      header: "Donor Name",
      cell: ({ cell }) => {
        return (
          <div className="min-w-[100px]">{cell.row.original.donor_name}</div>
        );
      },
    },
    {
      accessorKey: "merchant_name",
      header: "Merchant Name",
      cell: ({ cell }) => {
        return (
          <div className="min-w-[150px]">{cell.row.original.merchant_name}</div>
        );
      },
    },
  ];

  return (
    <div>
      <CustomTable columns={updatesColumnsdef} data={updateData} />
    </div>
  );
};
