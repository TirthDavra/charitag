"use client";
import { deleteShippingZone } from "@/api/merchant/merchantShipping";
import { IMerchantShipping } from "@/api/merchant/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const ShippingColumnDef: ColumnDef<IMerchantShipping>[] = [
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
