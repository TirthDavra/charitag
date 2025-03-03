"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

import CustomTable from "../../Custom/Tables/CustomTable";
import Link from "next/link";
import { toast } from "react-toastify";
import Image from "next/image";
import { IPolicyData } from "@/api/merchant/types";
import ArrowUpDown from "@images/svg/ArrowUpDown.svg";
import { useModal } from "@/components/context/ModalContext";
import ActionContent from "@/components/common/Modals/actionModal/ActionContent";
import { deletePolicy } from "@/api/merchant/merchantPolicy";
import { produce } from "immer";
import { useRouter } from "next/navigation";

interface DataTableProps<TData, TValue> {
  data: IPolicyData[];
}
const PolicyTable = <TData, TValue>({
  data,
}: DataTableProps<TData, TValue>) => {
  const { openModal, closeModal } = useModal();
  const router = useRouter();

  const [newData, setNewData] = useState(data);

  useEffect(() => {
    setNewData(data);
  }, [data]);

  const columns: ColumnDef<IPolicyData>[] = [
    {
      accessorKey: "name",
      header: ({ column }: any) => {
        return (
          <div className="ml-4 flex">
            Label
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
        return <div className="ml-4">{cell.row.original.name}</div>;
      },
    },
    {
      accessorKey: "created_at",
      header: ({ column }: any) => {
        return (
          <div className="flex">
            Created On
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
      cell: (row: {
        row: { original: { created_at: string | number | Date } };
      }) => {
        const createdDate = new Date(row.row.original.created_at);
        const year = createdDate.getFullYear();
        const month = (createdDate.getMonth() + 1).toString().padStart(2, "0");
        const day = createdDate.getDate().toString().padStart(2, "0");
        const hours = createdDate.getHours();
        const minutes = createdDate.getMinutes().toString().padStart(2, "0");
        const period = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

        // Construct formatted date string
        const formattedDate = `${year}/${month}/${day} ${formattedHours}:${minutes} ${period}`;
        return formattedDate;
      },
    },
    {
      accessorKey: "action",
      header: () => {
        return <div>Action</div>;
      },
      cell: ({ cell, row }) => {
        return (
          <div>
            <Link
              href={`policy/${row.original.id}`}
              className="text-merchant_text_color_blue"
              type="button"
            >
              Edit /
            </Link>
            <button
              className="ml-2 text-red-500"
              onClick={() => {
                openModal({
                  content: (
                    <ActionContent
                      type="info"
                      message="Are you sure you want to delete this policy? Once it's gone, all associated data will be lost forever."
                      confirmLabel="Confirm"
                      cancelLabel="Cancel"
                      onCancel={closeModal}
                      onOk={async () => {
                        const response = await deletePolicy(
                          cell.row.original.id,
                        );
                        if (!response.error) {
                          setNewData(
                            produce((draft) => {
                              draft.splice(row.index, 1);
                            }),
                          );
                          toast.success("Policy deleted successfully.");
                          router.refresh();
                        } else {
                          toast.error("Policy deleted failed.");
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

  return (
    <div>
      <CustomTable columns={columns} data={newData} />
    </div>
  );
};

export default PolicyTable;
