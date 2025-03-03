import React from "react";
import PreviousCampaignBanner from "./PreviousCampaignBanner";
import AboutPrevCampaign from "./AboutPrevCampaign";
import { ISinglePreviousCampaignResponse } from "./types";
import MoneyRaisedDetails from "./MoneyRaisedDetails";
import PreviousCampaignReviews from "./PreviousCampaignReviews";
import PreviousCampaignCardConatiner from "./PreviousCampaignCardConatiner";

const PreviousSingleCampaign = ({
  campaignDetails,
}: {
  campaignDetails: ISinglePreviousCampaignResponse;
}) => {
  return (
    <div>
      <div className="absolute left-0 right-0 top-0 z-[-10] h-[650px] w-full bg-[#f9fafe] md:h-[670px] lg:h-[545px]"></div>
      <PreviousCampaignBanner campaignDetails={campaignDetails} />
      <div className="container">
        <div className="mt-10 lg:mt-16">
          <AboutPrevCampaign campaignDetails={campaignDetails} />
        </div>
        <div className="mt-10 lg:mt-16">
          <MoneyRaisedDetails campaignDetails={campaignDetails} />
        </div>
        <div className="mt-16">
          <PreviousCampaignReviews campaignDetails={campaignDetails} />
        </div>
        <div className="mt-10 lg:mt-16">
          <PreviousCampaignCardConatiner campaignDetails={campaignDetails} />
        </div>
      </div>
    </div>
  );
};

export default PreviousSingleCampaign;
