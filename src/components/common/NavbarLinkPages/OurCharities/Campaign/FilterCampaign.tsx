"use client";
import React from "react";
import SelectCategories from "@/components/merchant/Custom/SelectCategories";
import Image from "next/image";
import menu from "@images/svg/menu.svg";
import { ICharityType, ICountries } from "@/api/common/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ICategories } from "@/api/auth/types";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const FilterCampaign = ({
  types,
  locations,
  typeQuerParam,
  locationQueryParam,
  placeholder,
  campaignTypes,
  campaignplaceholder,
  campaigntypeQuerParam,
  typesValue,
}: {
  types: ICharityType[];
  locations: ICountries[];
  typeQuerParam: string;
  campaigntypeQuerParam?: string | undefined;
  locationQueryParam: string;
  placeholder: string;
  campaignplaceholder?: string;
  campaignTypes?: ICategories[];
  typesValue: string;
}) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="mt-5 flex flex-wrap items-center justify-between">
      <div className="flex flex-grow flex-wrap gap-4">
        <Select
          onValueChange={(val) => {
            params.set(typeQuerParam, val);
            router.push(pathname + "?" + params.toString());
          }}
          value={typesValue}
        >
          <SelectTrigger
            classNameIcon="!text-black font-bold"
            className={`text-md h-[34px] w-[200px] max-w-fit rounded-full border-[1px] border-merchant_border !px-4 !py-6 font-semibold text-merchant_sidebar_text outline-none`}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">All</SelectItem>
            {types &&
              types.map((category) => (
                <SelectItem
                  key={category.id}
                  value={category.id.toString()}
                  className="text-merchant_gray"
                >
                  {category.title}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        {/* <SelectCategories
          placeholder={campaignplaceholder}
          className="text-md w-[200px] max-w-fit rounded-full border-[1px] !px-4 !py-6 font-semibold text-merchant_sidebar_text"
          productCategories={campaignTypes}
          labelKey="title"
          handleSelectChange={(val) => {
            params.set(campaigntypeQuerParam || "", val);
            router.push(pathname + "?" + params.toString());
          }}
        /> */}
        <SelectCategories
          placeholder="Locations"
          className="text-md w-[200px] max-w-fit rounded-full border-[1px] !px-4 !py-6 font-semibold text-merchant_sidebar_text"
          productCategories={locations}
          handleSelectChange={(val) => {
            params.set(locationQueryParam, val);
            router.push(pathname + "?" + params.toString());
          }}
        />
      </div>
      {/* <div className="block h-[34px] w-[34px] rounded-full border border-[#d9e2f9] pt-[2px] md:hidden">
        <Image src={menu} alt="" className="" />
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
            router.push(pathname + "?" + params.toString());
          }}
        />
      </div>
    </div>
  );
};

export default FilterCampaign;
