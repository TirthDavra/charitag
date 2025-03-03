"use client";
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { ISupportRequestsList } from "@/api/common/types";
import formatDate, { convertUTCtoLocalISO } from "@/utils/basicfunctions";
import Link from "next/link";
import CustomRowRender from "@/components/merchant/Custom/Tables/CustomRowRender";

interface DataTableProps {
  data: ISupportRequestsList[];
  className?: string;
  tableHeaders?: boolean;
  userType?: string;
}

const AdminSupportTable = React.memo(
  ({ data, className, tableHeaders = true, userType }: DataTableProps) => {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [pagination, setPagination] = React.useState({
      pageSize: 5,
      pageIndex: 0,
    });

    const [newData, setNewData] = useState(data);
    useEffect(() => {
      setNewData(data);
    }, [data]);

    const SupportColumn: ColumnDef<ISupportRequestsList>[] = [
      {
        accessorKey: "request_id",
        header: "Request ID",
        cell: ({ cell }) => {
          return (
            <Link
              href={`/${userType}/admin-support/${cell.row.original.request_id}`}
            >
              {cell.row.original.request_id}
            </Link>
          );
        },
      },
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ cell }) => {
          return (
            <div
              className={`w-[121px] rounded-sm py-[7.5px] text-center text-[11px] font-normal ${cell.row.original.status === "Closed" ? "bg-[#FD3939]/25 text-[#FD3939]" : "bg-[#6DE263]/25 text-[#6DE263]"}`}
            >
              {cell.row.original.status}
            </div>
          );
        },
      },
      {
        accessorKey: "created_at",
        header: "Submitted On",
        cell: ({ cell }) => {
          return (
            <div>
              {formatDate(convertUTCtoLocalISO(cell.row.original.created_at))}
            </div>
          );
        },
      },
    ];

    const table = useReactTable({
      data: newData,
      columns: SupportColumn,
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
          columns={SupportColumn}
          table={table}
          className={className}
          tableHeaders={tableHeaders}
        />
      </div>
    );
  },
);

AdminSupportTable.displayName = "AdminSupportTable";
export default AdminSupportTable;
