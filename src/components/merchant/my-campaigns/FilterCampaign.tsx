"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ICampaignsType,
  IMerchantCharities,
} from "@/app/merchant/my-campaigns/types";
import Link from "next/link";
import ButtonPrimary from "@/components/common/ButtonPrimary";

interface IDefaultValues {
  // campaign_type?: string | null;
  charity_id: string | null;
}

interface IcampaignCategoriesProps {
  // campaignTypes?: ICampaignsType[];
  charities?: IMerchantCharities[];
  defaultValues?: IDefaultValues;
}

const FilterCampaign = ({
  // campaignTypes = [],
  charities = [],
  defaultValues = {
    // campaign_type: null,
    charity_id: null,
  },
}: IcampaignCategoriesProps) => {
  const [filterParams, setFilterParams] = useState<IDefaultValues>({
    // campaign_type: defaultValues?.campaign_type,
    charity_id: defaultValues?.charity_id,
  });

  const handleFilterParamsChange = (key: string, value: string) => {
    setFilterParams((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  return (
    <div className="flex flex-wrap gap-[5px] sm:gap-[10px]">
      <Select
        onValueChange={(id) => {
          handleFilterParamsChange("charity_id", id);
        }}
        value={filterParams.charity_id ?? ""}
      >
        <SelectTrigger
          classNameIcon="!text-black font-bold"
          className="h-[34px] w-[210px] rounded-[3px] border-[1px] border-merchant_border text-[13px] font-normal text-merchant_gray outline-none"
        >
          <SelectValue placeholder="Filter By Charity" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">All</SelectItem>
          {charities.map((charity) => (
            <SelectItem
              key={charity.id}
              value={charity.id.toString()}
              className="text-merchant_gray"
            >
              {charity.charity_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/* <Select
        onValueChange={(id) => {
          handleFilterParamsChange("campaign_type", id);
        }}
        value={filterParams.campaign_type ?? ""}
      >
        <SelectTrigger
          classNameIcon="!text-black font-bold"
          className="h-[34px] max-w-fit rounded-[3px] border-[1px] border-merchant_border text-[13px] font-normal text-merchant_gray outline-none"
        >
          <SelectValue placeholder="Filter By Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">All</SelectItem>
          {campaignTypes.map((campaign) => (
            <SelectItem
              key={campaign.id}
              value={campaign.type_id.toString()}
              className="text-merchant_gray"
            >
              {campaign.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select> */}
      <Link href={`?charity_id=${filterParams.charity_id}`}>
        <ButtonPrimary
          label="Filter"
          className="h-[34px] rounded-[3px] px-[22px] py-2 !shadow-none"
          classNameLabel="text-[13px] font-normal"
        />
      </Link>
    </div>
  );
};

export default FilterCampaign;
