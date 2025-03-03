"use client";
import { IConsumerSupportListData } from "@/api/merchant/types";
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import productImg from "@images/No-Data-Found.jpg";
import CustomRowRender from "../Custom/Tables/CustomRowRender";
import Link from "next/link";
import { useModal } from "@/components/context/ModalContext";
import ActionContent from "@/components/common/Modals/actionModal/ActionContent";
import { supportMarkAsResolved } from "@/api/merchant/merchantConsumerSupport";
import { toast } from "react-toastify";

interface DataTableProps {
  data: IConsumerSupportListData[];
  className?: string;
  tableHeaders?: boolean;
}

const ConsumerSupprtTable = React.memo(
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

    const { openModal, closeModal } = useModal();

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

    const ConsumerSupportColumnDef: ColumnDef<IConsumerSupportListData>[] = [
      {
        accessorKey: "product_image",
        header: "Image",
        cell: ({ cell }) => {
          return (
            <div>
              <Image
                src={
                  cell.row.original?.product_image
                    ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                      cell.row.original?.product_image
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
        accessorKey: "request_id",
        header: "Request Id",
        cell: ({ cell }) => {
          return (
            <Link href={`support/${cell.row.original.request_id}`}>
              {cell.row.original.request_id}
            </Link>
          );
        },
      },
      {
        accessorKey: "product_name",
        header: "Product Name",
      },
      {
        accessorKey: "status",
        header: "",
        cell: ({ cell }) => {
          return (
            <button
              className={`rounded  px-1 font-extralight text-white ${cell.row.original?.status === "Open" ? "bg-blue-500" : "cursor-not-allowed bg-violet-400 "} `}
              disabled={cell.row.original?.status === "Closed"}
              onClick={async () => {
                openModal({
                  content: (
                    <ActionContent
                      type="info"
                      message="Are you sure you want to mark this issue as resolved?"
                      confirmLabel="Confirm"
                      cancelLabel="Cancel"
                      onCancel={closeModal}
                      onOk={async () => {
                        const response = await supportMarkAsResolved(
                          cell.row.original.request_id ?? "",
                        );
                        if (!response.error) {
                          toast.success(
                            "Issue marked as resolved successfully.",
                          );
                          router.refresh();
                        } else {
                          toast.error("Issue marked as resolved failed.");
                        }
                        closeModal();
                      }}
                    />
                  ),
                });
              }}
            >
              {cell.row.original?.status === "Open"
                ? "Mark As Resolved"
                : "Resolved"}
            </button>
          );
        },
      },
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "consumer_name",
        header: "Consumer Name",
      },
      {
        accessorKey: "consumer_email",
        header: "Consumer Email",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ cell }) => {
          return (
            <div
              className={`w-[121px] rounded-sm py-[7.5px] text-center text-[11px] font-normal ${cell.row.original.status === "Closed" ? "bg-[#FD3939]/25 text-[#FD3939]" : "bg-[#6DE263]/25 text-[#6DE263]"}`}
            >
              {cell.row.original?.status}
            </div>
          );
        },
      },
    ];

    const table = useReactTable({
      data: newData,
      columns: ConsumerSupportColumnDef,
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
          columns={ConsumerSupportColumnDef}
          table={table}
          className={className}
          tableHeaders={tableHeaders}
        />
      </div>
    );
  },
);

ConsumerSupprtTable.displayName = "ConsumerSupprtTable";
export default ConsumerSupprtTable;
