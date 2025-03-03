"use client";
import React, { useEffect, useState } from "react";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import productImg from "@images/productDefault.jpg";
import ArrowUpDown from "@images/svg/ArrowUpDown.svg";
import {
  ColumnDef,
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { IMerchantDeals } from "./types";
import Link from "next/link";
import { colorsForDealsStatus } from "../constants";
import { Switch } from "@/components/ui/switch";
import CustomRowRender from "../Custom/Tables/CustomRowRender";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { produce } from "immer";
import {
  deleteMerchantDeals,
  merchantDealsStatusUpdate,
} from "@/api/merchant/merchantDeals";
import { useModal } from "@/components/context/ModalContext";
import ActionContent from "@/components/common/Modals/actionModal/ActionContent";
import {
  convertUTCtoLocalISO,
  formatDate,
  formatDateAndTime,
  formatDateTime,
} from "@/utils/basicfunctions";
import { DateTime } from "luxon";
import { Skeleton } from "@/components/ui/skeleton";

interface DataTableProps {
  data: IMerchantDeals[];
  className?: string;
  tableHeaders?: boolean;
}

const DealsTable = React.memo(
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

    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
      setHydrated(true);
    }, []);

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

    const DealsColumn: ColumnDef<IMerchantDeals>[] = [
      {
        accessorKey: "feature_image",
        header: () => {
          return (
            <div className="ml-8">
              <FontAwesomeIcon icon={faImage} />
            </div>
          );
        },
        cell: ({ cell }) => {
          return (
            <div className="ml-4 min-w-[50px]">
              <Image
                src={
                  cell.row.original.feature_image
                    ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                      cell.row.original.feature_image.thumbnail_path
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
        accessorKey: "title",
        header: ({ column }) => {
          return (
            <div className="flex min-w-[200px] max-w-[200px]">
              <span className="font-normal text-merchant_text_color_blue">
                Title of Deal
              </span>
              <span className="text-merchant_text_color_blue">
                <Image
                  alt=""
                  src={ArrowUpDown}
                  className="ml-2 h-4 w-4 cursor-pointer"
                  onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                  }
                />
              </span>
            </div>
          );
        },
        cell: ({ cell }) => {
          return (
            <Link
              href={`/deal/`}
              className="text-sm text-merchant_text_color_blue"
            >
              {cell.row.original.title}
            </Link>
          );
        },
      },
      {
        header: "Expiry",
        cell: ({ cell }) => {
          return cell.row.original.start_date ? (
            <div className="min-w-[200px]">
              {hydrated ? (
                <>
                  <span>
                    {new Date(cell.row.original.start_date).toLocaleString()}
                  </span>{" "}
                  To{" "}
                  <span>
                    {new Date(cell.row.original.end_date).toLocaleString()}
                  </span>
                </>
              ) : (
                <div>
                  <Skeleton className="h-4 bg-gray-200" />
                  <Skeleton className="mt-2 h-4 w-[150px] bg-gray-200" />
                </div>
              )}
            </div>
          ) : (
            <div>
              This deal expires after{" "}
              <span className="text-merchant_text_color_blue">
                {cell.row.original.qty}
              </span>{" "}
              items are sold
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ cell }) => {
          if (cell.row.original && cell.row.original.status !== undefined) {
            const color = colorsForDealsStatus[cell.row.original.status].color;
            return (
              <div
                className={`min-w-[121px] max-w-[121px] rounded-sm py-[7.5px] text-center text-[11px] font-normal`}
                style={{ color: color, backgroundColor: `${color}10` }}
              >
                {colorsForDealsStatus[cell.row.original.status].value}
              </div>
            );
          } else {
            return null;
          }
        },
      },
      {
        accessorKey: "created_at",
        header: "Date",
        cell: ({ cell }) => {
          return (
            <div className="min-w-[170px]" suppressHydrationWarning>
              {formatDateTime(cell.row.original.created_at || "")}
            </div>
          );
        },
      },
      {
        id: "action",
        cell: ({ cell, row }) => {
          return (
            <div className="flex min-w-[100px]">
              <Link
                href={`deals/add-deals?dealId=${cell.row.original.id}`}
                className="text-merchant_text_color_blue"
                type="button"
              >
                Edit /
              </Link>

              <button
                className="text-red-500"
                onClick={async () => {
                  openModal({
                    content: (
                      <ActionContent
                        type="info"
                        message="Are you sure you want to delete this deal? Once it's gone, all associated data will be lost forever."
                        confirmLabel="Confirm"
                        cancelLabel="Cancel"
                        onCancel={closeModal}
                        onOk={async () => {
                          const response = await deleteMerchantDeals(
                            cell.row.original.id?.toString() ?? "",
                          );
                          if (!response.error) {
                            setNewData(
                              produce((draft) => {
                                draft.splice(row.index, 1);
                              }),
                            );
                            toast.success("deal deleted successfully.");
                            router.refresh();
                          } else {
                            toast.error("deal deleted failed.");
                          }
                          closeModal();
                        }}
                      />
                    ),
                  });
                }}
              >
                {" "}
                Delete
              </button>
            </div>
          );
        },
      },
      {
        accessorKey: "is_active",
        header: "",
        cell: ({ row, cell }) => {
          return (
            <div>
              <Switch
                id={cell.id}
                checked={cell.row.original.is_active === 1}
                onCheckedChange={async () => {
                  openModal({
                    content: (
                      <ActionContent
                        type="question"
                        message="Are you sure you want to update this deal? Once it's gone, deal status will be updated."
                        confirmLabel="Confirm"
                        cancelLabel="Cancel"
                        onCancel={closeModal}
                        onOk={async () => {
                          const response = await merchantDealsStatusUpdate(
                            cell.row.original.id ?? "",
                            cell.row.original.is_active === 1 ? 2 : 1,
                          );
                          if (!response.error) {
                            setNewData(
                              produce((draft) => {
                                draft[row.index] = {
                                  ...draft[row.index],
                                  is_active:
                                    cell.row.original.is_active === 1 ? 2 : 1,
                                };
                              }),
                            );
                            toast.success("Successfully updated the status");
                          } else {
                            toast.error(
                              "Failed to update the status. Please try again later!",
                            );
                          }
                          closeModal();
                        }}
                      />
                    ),
                  });
                }}
                disabled={!row.getCanSelect()}
              />
            </div>
          );
        },
      },
    ];
    const table = useReactTable({
      data: newData,
      columns: DealsColumn,
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
          columns={DealsColumn}
          table={table}
          className={className}
          tableHeaders={tableHeaders}
        />
      </div>
    );
  },
);
DealsTable.displayName = "DealsTable";
export default DealsTable;
