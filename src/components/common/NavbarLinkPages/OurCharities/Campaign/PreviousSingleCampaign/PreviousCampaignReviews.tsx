import Reviews from "@/components/common/product/Reviews";
import React from "react";
import { ISinglePreviousCampaignResponse } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const PreviousCampaignReviews = ({
  campaignDetails,
}: {
  campaignDetails: ISinglePreviousCampaignResponse;
}) => {
  return (
    <div className="grid grid-cols-3 gap-x-[76px] border-b border-merchant_border pb-[30px] lg:pb-[65px]">
      <div className="col-span-3 lg:col-span-1"></div>
      <div className="col-span-3 lg:col-span-2 pb-6 pt-[20px]">
        <div className="mt-11 flex flex-wrap items-center gap-[10px]">
          <FontAwesomeIcon
            icon={faStar}
            className="mr-1 text-[20px] text-sidebar_icon_color"
          />
          <span className="text-[22px] font-bold text-sidebar_icon_color">
            {" "}
            {campaignDetails?.data?.campaign.rating || 4.95}
          </span>
          <span className="relative text-[22px] font-bold text-sidebar_icon_color underline">
            {`${campaignDetails?.data?.campaign.reviews_count || 828} Reviews`}
          </span>
        </div>
        <Reviews review={campaignDetails.data.campaign?.reviews || []} />
      </div>
    </div>
  );
};

export default PreviousCampaignReviews;
