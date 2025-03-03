"use client";
import React from "react";
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
import Image from "next/image";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  orderMeta?: string;
  orderSubTotal?: string;
}
const OrdersTable = <TData, TValue>({
  columns,
  data,
  orderMeta,
  orderSubTotal,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="mt-4 rounded-lg border-[1.5px] border-merchant_blue/15">
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
                    className="h-[46px] font-medium text-merchant_sidebar_text"
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
        <TableBody className="-stripped ">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, index) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={`${index % 2 === 0 ? "" : "bg-[#F3F3F3]"} border-b-[1.5px] border-merchant_blue/15`}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell key={cell.id}>
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
          <TableRow className="border-b-[1.5px] border-merchant_blue/15">
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>
              <div className="text-[13px] font-normal">Item Subtotal</div>
              <div className="text-[13px] font-normal">Order Total</div>
            </TableCell>
            <TableCell>
              <div>
                <span className="text-[13px] font-medium text-merchant_gray">
                  {orderSubTotal && `$${orderSubTotal}`}
                </span>
              </div>
              <div>
                <span className="text-[13px] font-medium text-merchant_gray">
                  {orderMeta && `$${orderMeta}`}
                </span>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="max-w-[69px] rounded-md border border-merchant_blue/15 py-2 text-center font-normal text-merchant_text_color_blue">
                <button>Refund</button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTable;
