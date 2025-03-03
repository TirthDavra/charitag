"use client";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ColumnDef,
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Image, { StaticImageData } from "next/image";
import ArrowUpDown from "@images/svg/ArrowUpDown.svg";
import Link from "next/link";
import CustomTable from "@/components/merchant/Custom/Tables/CustomTable";
import { ICorporateCampaign } from "@/api/corporation/types";
import ActionContent from "@/components/common/Modals/actionModal/ActionContent";
import { deleteCorporateCampaigns } from "@/api/corporation/compaigns";
import { useModal } from "@/components/context/ModalContext";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { produce } from "immer";
import { toast } from "react-toastify";
import CustomRowRender from "@/components/merchant/Custom/Tables/CustomRowRender";

interface DataTableProps {
  campaign: ICorporateCampaign[];
  className?: string;
  tableHeaders?: boolean;
}

const CorporateCampaignsTable = React.memo(
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

    const campaignColumsDef: ColumnDef<ICorporateCampaign>[] = [
      {
        accessorKey: "image",
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
                  cell.row.original?.feature_image?.thumbnail_path
                    ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                      cell.row.original?.feature_image?.thumbnail_path
                    : ""
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
            <div className="text-sm text-merchant_text_color_blue">
              {cell.row.original.title}
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
            <div className="min-w-[100px]">
              {cell.row.original?.total_raised || 0}
            </div>
          );
        },
      },

      {
        header: "Action",
        cell: ({ cell, row }) => {
          return (
            <div className="flex ">
              <Link
                href={`my-campaigns/live-updates?progressId=${cell.row.original.id}`}
                className="text-merchant_text_color_blue"
                type="button"
              >
                View Live Updates /
              </Link>

              <Link
                href={`my-campaigns/add-campaigns?campaignId=${cell.row.original.id}`}
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
                          const response = await deleteCorporateCampaigns(
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
      columns: campaignColumsDef,
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
          columns={campaignColumsDef}
          table={table}
          className={className}
          tableHeaders={tableHeaders}
        />
      </div>
    );
  },
);

CorporateCampaignsTable.displayName = "CampaignTable";

export default CorporateCampaignsTable;
