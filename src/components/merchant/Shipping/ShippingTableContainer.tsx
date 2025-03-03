"use client";
import React, { useState } from "react";
import CustomTable from "../Custom/Tables/CustomTable";
import TablePagination from "../Custom/Tables/TablePagination";
import { ShippingColumnDef } from "./ShippingColumnDef";
import {
  IMerchantShipping,
  IMerchantShippingZoneResponse,
} from "@/api/merchant/types";
import { deleteShippingZone } from "@/api/merchant/merchantShipping";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

const ShippingTableContainer = ({
  _shipping,
}: {
  _shipping: IMerchantShipping[];
}) => {
  const [shipping, setShipping] = useState(_shipping);
  const ShippingColumnDef: ColumnDef<IMerchantShipping>[] = [
    {
      accessorKey: "name",
      header: "Zone Name",
    },
    {
      accessorKey: "regions",
      header: "Region(S)",
    },
    {
      header: "Shipping Method(S)",
      cell: ({ cell }) => {
        return (
          <div className="flex gap-[10px]">
            {cell.row.original.is_shipping_free_shipping === 1 && (
              <div className="rounded-sm bg-merchant_Shipping_bg px-3 py-2">
                <span className="text-[11px] text-merchat_icon2">
                  {cell.row.original.is_shipping_free_shipping === 1
                    ? "Free Shipping"
                    : ""}
                </span>
              </div>
            )}
            {cell.row.original.is_shipping_flat_rate === 1 && (
              <div className="rounded-sm bg-merchant_Shipping_bg px-3 py-2">
                <span className="text-[11px] text-merchat_icon2">
                  {cell.row.original.is_shipping_flat_rate === 1
                    ? "Flate Rate"
                    : ""}
                </span>
              </div>
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ cell }) => {
        const handelDelete = async (id: string) => {
          await deleteShippingZone(id);
        };

        return (
          <div className="flex gap-1">
            <Link
              href={`shipping/manage-zone?zoneId=${cell.row.original.id}`}
              className="text-merchant_text_color_blue"
              type="button"
            >
              Edit /
            </Link>
            <button
              className="text-merchant_notification"
              type="button"
              onClick={() => handelDelete(cell.row.original.id.toString())}
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
      <div className="mt-[10px] flex flex-wrap items-center justify-end pt-[10px] md:pt-0">
        {/* <TableFilters
filterSelections={[
{
queryParam: "Zone Names",
selectItems: [{ name: "India", value: "india" }],
triggerName: "Zone Names",
},
]}
/> */}
        <TablePagination
          className="flex items-center gap-[5px] text-[12px]"
          itemsPerPage={10}
          totalItems={10}
        />
      </div>

      <CustomTable columns={ShippingColumnDef} data={shipping} />
      <TablePagination
        className="flex items-center justify-end gap-[5px] pt-[10px] text-[12px] "
        itemsPerPage={10}
        totalItems={10}
      />
    </div>
  );
};

export default ShippingTableContainer;
