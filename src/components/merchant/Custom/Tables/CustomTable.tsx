"use client";

import React, { useEffect } from "react";
import {
  ColumnDef,
  SortingState,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CustomRowRender from "./CustomRowRender";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  className?: string;
  classNameBody?: string;
  tableHeaders?: boolean;
}
const CustomTable = <TData, TValue>({
  columns,
  data,
  className,
  classNameBody,
  tableHeaders = true,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageSize: 5,
    pageIndex: 0,
  });
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

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
    manualSorting: true,
    state: {
      sorting,
      pagination,
    },
  });

  return (
    <CustomRowRender
      columns={columns}
      table={table}
      className={className}
      tableHeaders={tableHeaders}
      classNameBody={classNameBody}
    />
  );
};

export default CustomTable;
