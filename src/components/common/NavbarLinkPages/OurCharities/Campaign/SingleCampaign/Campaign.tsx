import { ISingleCompaignResponse } from "@/api/charity/types";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import Heading from "@/components/common/Heading";
import React from "react";

const Campaign = ({
  compaignDetails,
}: {
  compaignDetails: ISingleCompaignResponse;
}) => {
  return (
    <div className="mt-5 max-w-[609px]">
      <Heading
        content={"Campaign name Lorem ipsum dolor sit amet"}
        className="!text-4xl lg:!text-[45px] md:!leading-[56px]"
      />
      <div className="flex items-center gap-[25px] pt-4">
        <span className="relative text-lg text-[#3969E0]">
          {compaignDetails.data?.title}
          <span className="absolute right-[-15px] top-[40%] h-[5px] w-[5px] rounded-full bg-gradient_color_2"></span>
        </span>
        <span className="relative text-lg font-bold underline">
          {compaignDetails.data?.charity?.type?.title}
          <span className="absolute right-[-15px] top-[40%] h-[5px] w-[5px] rounded-full bg-gradient_color_2"></span>
        </span>
        <span className="text-lg font-bold underline">
          {compaignDetails.data?.country?.name}
        </span>
      </div>
      <div className="pt-4">
        <span className="text-lg text-[#2F2F35]">
          {compaignDetails.data?.short_description}
        </span>
      </div>
    </div>
  );
};

export default Campaign;
