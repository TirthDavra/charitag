"use client";
import { ColumnDef } from "@tanstack/react-table";
import Image, { StaticImageData } from "next/image";

interface CharityMerchantData {
  id: string;
  image: StaticImageData;
  first_name: string;
  last_name: string;
  email: string;
}

export const CharityMerchantColumn: ColumnDef<CharityMerchantData>[] = [
  {
    header: "Name",
    cell: ({ cell }) => {
      return (
        <div className="flex items-center gap-[14px]">
          <div>
            <Image alt="" src={cell.row.original.image} className="h-10 w-10" />
          </div>
          <div>
            <span className="font-medium text-merchant_sidebar_text">
              <span>{cell.row.original.first_name}</span>{" "}
              <span>{cell.row.original.last_name}</span>
            </span>
            <div>
              <span className="cursor-pointer text-merchant_text_color_blue underline">
                {cell.row.original.email}
              </span>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    header: "Action",
    cell: ({ cell }) => {
      return (
        <div>
          <span className="cursor-pointer text-merchant_text_color_blue">
            refer
          </span>
        </div>
      );
    },
  },
];
