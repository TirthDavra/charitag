"use client";
import { IMerchantCampaigns } from "@/app/merchant/my-campaigns/types";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ColumnDef,
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";
import productImg from "@images/productDefault.jpg";
import ArrowUpDown from "@images/svg/ArrowUpDown.svg";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useModal } from "@/components/context/ModalContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CustomRowRender from "../Custom/Tables/CustomRowRender";
import ActionContent from "@/components/common/Modals/actionModal/ActionContent";
import { produce } from "immer";
import { toast } from "react-toastify";
import { deleteMerchantCampaigns } from "@/api/merchant/merchantCampaigns";

interface DataTableProps {
  campaign: IMerchantCampaigns[];
  className?: string;
  tableHeaders?: boolean;
}
const CampaignTable = React.memo(
  ({ campaign, className, tableHeaders = true }: DataTableProps) => {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [pagination, setPagination] = React.useState({
      pageSize: 5,
      pageIndex: 0,
    });

    const [newData, setNewData] = useState(campaign);
    useEffect(() => {
      setNewData(campaign);
    }, [campaign]);

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

    const CampaignColumndef: ColumnDef<IMerchantCampaigns>[] = [
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
                  // productImg
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
            <div className="flex ">
              <span className="font-normal text-merchant_text_color_blue">
                Title
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
            <div className="min-w-[200px] text-sm text-merchant_text_color_blue">
              {cell.row.original.title}
            </div>
          );
        },
      },
      {
        accessorKey: "charity",
        header: "Charity",
        cell: ({ cell }) => {
          return (
            <div className="min-w-[200px]">
              {cell.row.original?.charity?.charity_name ?? "Test"}
            </div>
          );
        },
      },
      {
        accessorKey: "total_fund_target",
        header: "Target",
      },
      {
        accessorKey: "total_raised",
        header: "Total Fund",
        cell: ({ cell }) => {
          return (
            <div className="min-w-[100px] text-merchant_sidebar_text">
              {cell.row.original.total_raised}
            </div>
          );
        },
      },

      {
        header: "Action",
        cell: ({ cell, row }) => {
          return (
            <div className="flex min-w-[200px] items-center gap-1">
              <Link
                href={`my-campaigns/live-updates?progressId=${cell.row.original.id}`}
                className="text-merchant_text_color_blue"
                type="button"
              >
                View Updates /
              </Link>
              <Link
                href={`my-campaigns/add-campaign?campaignId=${cell.row.original.id}`}
                className="text-merchant_text_color_blue"
                type="button"
              >
                Edit /
              </Link>
              <button
                className="text-merchant_notification"
                type="button"
                onClick={async () => {
                  openModal({
                    content: (
                      <ActionContent
                        type="info"
                        message="Are you sure you want to delete this campaign? Once it's gone, all associated data will be lost forever."
                        confirmLabel="Confirm"
                        cancelLabel="Cancel"
                        onCancel={closeModal}
                        onOk={async () => {
                          const response = await deleteMerchantCampaigns(
                            cell.row.original.id?.toString() ?? "",
                          );
                          if (!response.error) {
                            setNewData(
                              produce((draft) => {
                                draft.splice(row.index, 1);
                              }),
                            );
                            toast.success("campaign deleted successfully.");
                            router.refresh();
                          } else {
                            toast.error("campaign deleted failed.");
                          }
                          closeModal();
                        }}
                      />
                    ),
                  });
                }}
              >
                Delete
              </button>
            </div>
          );
        },
      },
    ];

    const table = useReactTable({
      data: newData,
      columns: CampaignColumndef,
      getCoreRowModel: getCoreRowModel(),
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      onPaginationChange: setPagination,
      manualPagination: true,
      manualSorting: true,
      enableRowSelection: true,
      // sortDescFirst: true,
      enableSortingRemoval: false,
      state: {
        sorting,
        pagination,
      },
    });

    return (
      <div>
        <CustomRowRender
          columns={CampaignColumndef}
          table={table}
          className={className}
          tableHeaders={tableHeaders}
        />
      </div>
    );
  },
);

CampaignTable.displayName = "CampaignTable";
export default CampaignTable;
