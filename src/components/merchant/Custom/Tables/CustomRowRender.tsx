import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";

const CustomRowRender = ({
  table,
  className,
  classNameBody,
  columns,
  tableHeaders = true,
}: {
  table: any;
  className?: string;
  classNameBody?: string;
  columns: any[];
  tableHeaders?: boolean;
}) => {
  return (
    <div
      className={`mt-4 rounded-lg  border-[1.5px] border-merchant_blue/15 ${className}`}
    >
      <Table className="min-w-[743px]">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup: any) => (
            <TableRow
              key={headerGroup.id}
              className="!h-[46px] border-b-[1.5px] border-merchant_blue/15 p-0"
            >
              {headerGroup.headers.map((header: any) => {
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
          {table && table?.getRowModel()?.rows?.length ? (
            table.getRowModel().rows.map((row: any, index: number) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={`${index % 2 === 0 ? "bg-[#F3F3F3]" : ""} border-b-[1.5px] border-merchant_blue/15 ${classNameBody}`}
              >
                {row.getVisibleCells().map((cell: any) => {
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
                No data found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {tableHeaders && (
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <TableRow
                key={headerGroup.id}
                className="!h-[46px] !border-b-0 border-t-[1.5px] border-merchant_blue/15 p-0"
              >
                {headerGroup.headers.map((header: any) => {
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

export default CustomRowRender;
