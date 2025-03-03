import Heading from "@/components/common/Heading";
import React from "react";
import { ISinglePreviousCampaignResponse } from "./types";
import PreviousCampaignCard from "./PreviousCampaignCard";
import Link from "next/link";
import ButtonPrimary from "@/components/common/ButtonPrimary";

const PreviousCampaignCardConatiner = ({
  campaignDetails,
}: {
  campaignDetails: ISinglePreviousCampaignResponse;
}) => {
  const campaignCardData = campaignDetails.data.previous;

  return (
    <div>
      <Heading
        content={`Charity previous campaigns`}
        className="!text-[34px] leading-[43px] text-merchant_sidebar_text lg:!text-[45px] lg:leading-[56px]"
      />
      <div className="lg:mt-9 grid grid-cols-1 gap-[20px] py-8 md:grid-cols-2 lg:grid-cols-3">
        {campaignCardData &&
          campaignCardData.map((campaign, index) => (
            <PreviousCampaignCard
              key={campaign.id}
              campaign={campaign}
              index={index}
              fundPercentage={true}
              classNameShadow="shadow-[#e4eafa]"
              redirectUrl={`/campaigns/${campaign.slug}?prev_campaign=true`}
            />
          ))}
      </div>
      <div className="mt-4 justify-center sm:flex">
        <Link href={"/our-charities"}>
          <ButtonPrimary
            label={"View All Our Charities"}
            className="flex justify-center rounded-full max-sm:w-full !h-[50px]"
          />
        </Link>
      </div>
    </div>
  );
};

export default PreviousCampaignCardConatiner;
