"use client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { IOrderDetail, IOrderItem } from "./types";
import productImg from "@images/pexels-vinta-supply-co-_-nyc-842959 2.png";
import { colorsForOrderStatus } from "../../constants";

export const SingleOrderColumnDef: ColumnDef<IOrderItem>[] = [
  {
    accessorKey: "item",
    header: () => {
      return <div className="text-sm font-semibold">Item</div>;
    },
    cell: ({ cell }) => {
      return (
        <div className="flex items-center gap-[14px]">
          <div>
            <Image
              alt=""
              src={
                cell.row.original.image
                  ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                    encodeURIComponent(cell.row.original.image)
                  : productImg
              }
              className="h-[50px] w-[50px]"
              width={60}
              height={60}
            />
          </div>
          <div>
            <span className="cursor-pointer text-merchant_text_color_blue underline">
              {cell.row.original.name || ""}
              {/* {cell.row.original.deal?.title || ""} */}
            </span>
            <div>
              <span className="text-[13px] font-normal">
                {/* {cell.row.original.product?.inventory?.sku || ""} */}
              </span>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    header: "Status",
    cell: ({ cell }) => {
      const color =
        colorsForOrderStatus[Number(cell.row.original.status)].color;
      return (
        <div
          className="max-w-[121px] rounded-sm  py-[7.5px] text-center text-[11px] font-normal "
          style={{ backgroundColor: `${color}26`, color: `${color}` }}
        >
          {colorsForOrderStatus[Number(cell.row.original.status)].value}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => {
      return <div className="text-sm font-semibold">Cost</div>;
    },
    cell: ({ cell }) => {
      return (
        <div>
          <span className="text-[13px] font-medium">
            ${cell.row.original.cost || ""}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: () => {
      return <div className="text-sm font-semibold">Qty</div>;
    },
    cell: ({ cell }) => {
      return (
        <div>
          <span className="text-[13px] font-medium">
            * {cell.row.original.qty || ""}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "item_total",
    header: () => {
      return <div className="text-sm font-semibold">Total</div>;
    },
    cell: ({ cell }) => {
      return (
        <div>
          <span className="text-[13px] font-medium">
            ${cell.row.original.item_total || ""}
          </span>
        </div>
      );
    },
  },
];
