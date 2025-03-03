"use client";
import Image from "next/image";
import ArrowUpDown from "@images/svg/ArrowUpDown.svg";
import { ColumnDef } from "@tanstack/react-table";
import { IMInventory, IMerchantInventoryData } from "@/api/merchant/types";
import { colorsForInventoryStatus } from "../constants";
import { boolean } from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import defaultImg from "@images/productDefault.jpg";

export const InventoryTable: ColumnDef<IMerchantInventoryData>[] = [
  {
    accessorKey: "feature_image",
    header: () => {
      return (
        <div>
          <FontAwesomeIcon icon={faImage} />
        </div>
      );
    },
    cell: ({ cell }) => {
      return (
        <div className="min-w-[50px]">
          <Image
            src={
              cell.row.original.feature_image
                ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                  cell.row.original.feature_image.thumbnail_path
                : defaultImg
            }
            alt=""
            className="h-[50px] w-[50px]"
            width={500}
            height={500}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "product_name",
    header: ({ column }) => {
      return (
        <div className="flex items-center text-merchant_text_color_blue">
          Product / Variation
          <Image
            alt=""
            src={ArrowUpDown}
            className="ml-2 h-4 w-4 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      );
    },
    cell: ({ cell }) => {
      return (
        <div className="flex font-normal">
          {cell.row.original.product_name ?? ""}
          {/* {cell.row.original.variation?.variation_combination && (
            <>
              {" - "}
              {cell.row.original.variation.variation_combination
                .map((combination, index) => {
                  return index ===
                    cell.row.original.variation.variation_combination.length - 1
                    ? combination
                    : `${combination} | `;
                })
                .join("")}
            </>
          )} */}
        </div>
      );
    },
  },
  {
    accessorKey: "sku", // Match the key in IOrder interface
    header: ({ column }) => {
      return (
        <div className="flex items-center text-merchant_text_color_blue">
          SKU
          <Image
            alt=""
            src={ArrowUpDown}
            className="ml-2 h-4 w-4 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "stock_status",
    header: "Status",
    cell: ({ cell }) => {
      const color =
        colorsForInventoryStatus[cell.row.original.stock_status].color;

      return (
        <div
          className={`w-[121px] rounded-sm py-[7.5px] text-center text-[11px] font-normal`}
          style={{ backgroundColor: `${color}26`, color: `${color}` }}
        >
          {colorsForInventoryStatus[cell.row.original.stock_status].value}
        </div>
      );
    },
  },

  {
    accessorKey: "stock_quantity",
    header: "Stock",
    cell: ({ cell }) => {
      return (
        <div>
          {cell.row.original.stock_quantity === null
            ? "-"
            : cell.row.original.stock_quantity}
        </div>
      );
    },
  },
];
