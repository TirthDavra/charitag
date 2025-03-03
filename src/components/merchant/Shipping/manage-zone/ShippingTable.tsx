"use client";

import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IShippingMethod } from ".";
interface IShippingMethodChange {
  is_shipping_free_shipping?: boolean;
  is_shipping_flat_rate?: boolean;
}
interface DataTableProps<TData extends IShippingMethod, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  className?: string;
  tableHeaders?: boolean;
  handleShippingMethodChange: (values: IShippingMethodChange) => void;
}

const ShippingTable = <TData extends IShippingMethod, TValue>({
  columns,
  data,
  className,
  tableHeaders = true,
  handleShippingMethodChange,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageSize: 5,
    pageIndex: 0,
  });
  const [rowSelection, setRowSelection] = useState<{
    is_shipping_free_shipping?: boolean;
    is_shipping_flat_rate?: boolean;
  }>({
    is_shipping_free_shipping: data[0].enabled === 1,
    is_shipping_flat_rate: data[1].enabled === 1,
  });
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    handleShippingMethodChange(rowSelection);
  }, [rowSelection]);
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
    getRowId: (row) => row.fieldName,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    manualPagination: true,
    manualSorting: true,
    state: {
      sorting,
      pagination,
      rowSelection,
    },
  });

  return (
    <div
      className={`mt-4 rounded-lg  border-[1.5px] border-merchant_blue/15 ${className}`}
    >
      <Table className="min-w-[700px]">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="!h-[46px] border-b-[1.5px] border-merchant_blue/15 p-0"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="h-[46px] font-normal text-merchant_sidebar_text"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="-stripped">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, index) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={`${index % 2 === 0 ? "bg-[#F3F3F3]" : ""} border-b-[1.5px] border-merchant_blue/15`}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell key={cell.id} className="text-xs">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {tableHeaders && (
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="!h-[46px] !border-b-0 border-t-[1.5px] border-merchant_blue/15 p-0"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="h-[46px] font-normal text-merchant_sidebar_text"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
        )}
      </Table>
    </div>
  );
};

export default ShippingTable;
