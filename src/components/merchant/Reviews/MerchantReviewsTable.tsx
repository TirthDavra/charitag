"use client";
import { IMReviews } from "@/api/merchant/types";
import {
  ColumnDef,
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ArrowUpDown from "@images/svg/ArrowUpDown.svg";
import authorImg from "@images/user_default_img.jpg";
import ReactStars from "@stack-pulse/react-star-rating";
import { IconReview } from "@/components/svgIcons";
import CustomRowRender from "../Custom/Tables/CustomRowRender";
import Link from "next/link";
import { convertUTCtoLocalISO } from "@/utils/basicfunctions";

interface DataTableProps {
  data: IMReviews[];
  className?: string;
  tableHeaders?: boolean;
}

const MerchantReviewsTable = React.memo(
  ({ data, className, tableHeaders = true }: DataTableProps) => {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [pagination, setPagination] = React.useState({
      pageSize: 5,
      pageIndex: 0,
    });

    const [newData, setNewData] = useState(data);
    useEffect(() => {
      setNewData(data);
    }, [data]);

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    useEffect(() => {
      if (sorting.length > 0) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("sort_field", sorting[0].id);
        params.set("sort_order", sorting[0].desc ? "desc" : "asc");
        router.push(pathname + "?" + params.toString());
      }
    }, [sorting]);

    const ReviewsColumnDef: ColumnDef<IMReviews>[] = [
      {
        id: "first_name",
        header: ({ column }) => {
          return (
            <div className="flex">
              <span className="font-normal text-merchant_text_color_blue">
                Author
              </span>

              <Image
                alt=""
                src={ArrowUpDown}
                className="blue-class ml-2 h-4 w-4 cursor-pointer fill-red-900"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
              />
            </div>
          );
        },
        cell: ({ cell }) => {
          return (
            <div className="flex items-center gap-[14px]">
              <div>
                <Image
                  alt=""
                  src={
                    cell.row.original.filename
                      ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                        encodeURIComponent(
                          "product/small/" + cell.row.original.filename,
                        )
                      : authorImg
                  }
                  className="min-h-10 min-w-10"
                  width={60}
                  height={60}
                />
              </div>
              <div>
                <span className="font-medium text-merchant_sidebar_text">
                  <span>{cell.row.original.first_name}</span>{" "}
                  <span>{cell.row.original.last_name}</span>
                </span>
                <div>
                  <span className="cursor-pointer text-merchant_text_color_blue underline">
                    {cell.row.original.email}
                  </span>
                </div>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "rating",
        header: ({ column }) => {
          return (
            <div className="flex">
              <span className="font-normal text-merchant_text_color_blue">
                Rating
              </span>

              <Image
                alt=""
                src={ArrowUpDown}
                className="blue-class ml-2 h-4 w-4 cursor-pointer fill-red-900"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
              />
            </div>
          );
        },
        cell: ({ cell }) => {
          return (
            <div>
              <ReactStars
                count={5}
                value={cell.row.original.rating}
                size={30}
                isHalf
                edit={false}
                emptyIcon={<IconReview />}
                filledIcon={<IconReview fill="#ffd700" />}
                halfIcon={<IconReview />}
                classNames="flex gap-2"
              />
            </div>
          );
        },
      },
      {
        accessorKey: "description",
        header: "Review",
      },
      {
        accessorKey: "product_name", // Match the key in IOrder interface
        header: ({ column }) => {
          return (
            <div className="flex min-w-[200px] max-w-[200px] items-center text-merchant_text_color_blue">
              Product
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
            <div className="min-w-[200px] max-w-[200px]">
              <Link
                href={`/shop/${cell.row.original?.slug}?preview=true`}
                className="flex font-normal text-merchant_text_color_blue underline"
              >
                {cell.row.original?.product_name ?? ""}
                {/* {cell.row.original?.variations && (
                <>
                  {" - "}
                  {cell.row.original.variations
                    .map((combination, index) => {
                      return index ===
                        combination.variation_combination.length - 1
                        ? combination.variation_combination.length - 1
                        : `${combination.variation_combination.length - 1} | `;
                    })
                    .join("")}
                </>
              )} */}
              </Link>
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
                className="blue-class ml-2 h-4 w-4 cursor-pointer fill-red-900"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
              />
            </div>
          );
        },
        cell: ({ cell }) => {
          const newDate = convertUTCtoLocalISO(cell.row.original.created_at);
          return (
            <div className="gap-1 2xl:flex">
              <div className="w=[max-content]">{newDate.slice(0, 10)}</div>{" "}
              <div>{newDate.slice(11, 19)}</div>
            </div>
          );
        },
      },
    ];

    const table = useReactTable({
      data: newData,
      columns: ReviewsColumnDef,
      getCoreRowModel: getCoreRowModel(),
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      onPaginationChange: setPagination,
      manualPagination: true,
      manualSorting: true,
      enableRowSelection: true,
      state: {
        sorting,
        pagination,
      },
    });

    return (
      <div>
        <CustomRowRender
          columns={ReviewsColumnDef}
          table={table}
          className={className}
          tableHeaders={tableHeaders}
        />
      </div>
    );
  },
);

MerchantReviewsTable.displayName = "MerchantReviewsTable";
export default MerchantReviewsTable;
