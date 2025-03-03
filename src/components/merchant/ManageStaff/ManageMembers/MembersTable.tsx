"use client";
import { IMerchantMembers } from "@/api/merchant/types";
import {
  ColumnDef,
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import ArrowUpDown from "@images/svg/ArrowUpDown.svg";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import CustomTable from "../../Custom/Tables/CustomTable";
import { Switch } from "@/components/ui/switch";
import {
  deleteMerchantMembers,
  updateMerchantMemberStatus,
} from "@/api/merchant/merchantManageStaff";
import { useModal } from "@/components/context/ModalContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ActionContent from "@/components/common/Modals/actionModal/ActionContent";
import { produce } from "immer";
import { toast } from "react-toastify";
import CustomRowRender from "../../Custom/Tables/CustomRowRender";

interface DataTableProps {
  members: IMerchantMembers[];
  className?: string;
  tableHeaders?: boolean;
}

const MembersTable = React.memo(
  ({ members, className, tableHeaders = true }: DataTableProps) => {
    const [sorting, setSorting] = React.useState<SortingState>([]);

    const [pagination, setPagination] = React.useState({
      pageSize: 5,
      pageIndex: 0,
    });
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
    const [newData, setNewData] = useState(members);

    useEffect(() => {
      setNewData(members);
    }, [members]);

    const handleDelete = async (id: string, index: number) => {
      openModal({
        content: (
          <ActionContent
            cancelLabel="cancel"
            confirmLabel="confirm"
            message="Are you sure you want to delete this member? Once it's gone, all associated data will be lost forever."
            type="question"
            onCancel={closeModal}
            onOk={async () => {
              const response = await deleteMerchantMembers(id);
              if (!response.error) {
                setNewData(
                  produce((draft) => {
                    draft.splice(index, 1);
                  }),
                );
                toast.success("member deleted successfully.");
                router.refresh();
              } else {
                toast.error("member deleted failed.");
              }
              closeModal();
            }}
          />
        ),
      });
    };

    const MembersColumnDef: ColumnDef<IMerchantMembers>[] = [
      {
        accessorKey: "first_name",
        header: ({ column }) => {
          return (
            <div className="ml-4 flex items-center text-merchant_text_color_blue">
              Users
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
            <div className="ml-4 text-sm text-merchant_sidebar_text">
              <span>{cell.row.original.first_name}</span>{" "}
              <span>{cell.row.original.last_name}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "roles",
        header: "Role",
        cell: ({ cell }) => {
          return (
            <div>
              {cell.row.original.roles && (
                <>{cell.row.original.roles.map((role) => role.name)}</>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "is_active",
        header: "Status",
        cell: ({ cell, row }) => {
          return (
            <div>
              <Switch
                id={cell.id}
                checked={
                  cell.row.original.is_active === 1
                    ? !row.getIsSelected()
                    : row.getIsSelected()
                }
                onCheckedChange={async () =>
                  openModal({
                    content: (
                      <ActionContent
                        cancelLabel="cancel"
                        confirmLabel="confirm"
                        message="Are you sure you want to change the status"
                        type="question"
                        onCancel={closeModal}
                        onOk={async () => {
                          const response = await updateMerchantMemberStatus({
                            member_id: cell.row.original.id,
                            status: cell.row.original.is_active === 1 ? 2 : 1,
                          });
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
                            toast.success("Status updated successfully.");
                          } else {
                            toast.error("Status updated failed.");
                          }
                          closeModal();
                        }}
                      />
                    ),
                  })
                }
                disabled={!row.getCanSelect()}
              />
            </div>
          );
        },
      },
      {
        id: "action",
        cell: ({ cell }) => {
          return (
            <div className="flex min-w-[100px]">
              <Link
                href={`manage-staff/add-members?membersId=${cell.row.original.id}`}
                className="text-merchant_text_color_blue"
                type="button"
              >
                Edit /
              </Link>
              <button
                className="text-merchant_notification"
                type="button"
                onClick={() =>
                  handleDelete(cell.row.original.id.toString(), cell.row.index)
                }
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
      columns: MembersColumnDef,
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
        {/* <CustomTable columns={MembersColumnDef} data={members} /> */}
        <div>
          <CustomRowRender
            columns={MembersColumnDef}
            table={table}
            className={className}
            tableHeaders={tableHeaders}
          />
        </div>
      </div>
    );
  },
);

MembersTable.displayName = "MembersTable";
export default MembersTable;
