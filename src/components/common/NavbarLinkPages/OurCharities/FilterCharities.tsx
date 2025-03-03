"use client";
import React from "react";
import SelectCategories from "@/components/merchant/Custom/SelectCategories";
import Image from "next/image";
import menu from "@images/svg/menu.svg";
import { ICharityType, ICountries } from "@/api/common/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const FilterCharities = ({
  types,
  locations,
  typeQuerParam,
  locationQueryParam,
  placeholder,
}: {
  types: ICharityType[];
  locations: ICountries[];
  typeQuerParam: string;
  locationQueryParam: string;
  placeholder?: string;
}) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="mt-5 flex flex-wrap items-center justify-between">
      <div className="flex flex-grow flex-wrap gap-4">
        <SelectCategories
          placeholder={placeholder}
          className="text-md max-w-fit rounded-full border-[1px] !px-4 !py-6 font-semibold text-merchant_sidebar_text"
          productCategories={types}
          labelKey="title"
          handleSelectChange={(val) => {
            params.set(typeQuerParam, val);
            if (val === "0") params.delete(typeQuerParam);
            router.push(pathname + "?" + params.toString());
          }}
        />
        <SelectCategories
          placeholder="Locations"
          className="text-md w-[200px] max-w-fit rounded-full border-[1px] !px-4 !py-6 font-semibold text-merchant_sidebar_text"
          productCategories={locations}
          handleSelectChange={(val) => {
            params.set(locationQueryParam, val);
            if (val === "0") params.delete(locationQueryParam);
            router.push(pathname + "?" + params.toString());
          }}
        />
      </div>
      {/* <div className="block h-[34px] w-[34px] rounded-full border border-[#d9e2f9] pt-[2px] md:hidden">
        <Image src={menu} alt="" className="h-[34px] w-[34px]" />
      </div> */}
      <div className="pt-4 xs:pt-0">
        <SelectCategories
          placeholder="Sort By"
          className="text-md !h-[34px] w-[120px] rounded-full border-[1px] !px-4 py-6 font-semibold text-merchant_sidebar_text"
          productCategories={[
            { name: "Newest", id: "1" },
            { name: "Oldest", id: "2" },
          ]}
          handleSelectChange={(val) => {
            params.set("sort_by", val);
            if (val === "0") params.delete("sort_by");
            router.push(pathname + "?" + params.toString());
          }}
        />
      </div>
    </div>
  );
};

export default FilterCharities;
