import { getCampaignBySlug } from "@/api/charity/charityCampaign";
import { getSinglePreviousCampaign } from "@/api/common/campaigns";
import FailedToLoadPage from "@/components/FailedToLoad";
import PreviousSingleCampaign from "@/components/common/NavbarLinkPages/OurCharities/Campaign/PreviousSingleCampaign";
import SingleCampaign from "@/components/common/NavbarLinkPages/OurCharities/Campaign/SingleCampaign";
import React from "react";

const SingleCompaign = async (context: {
  params: { slug: string; c_slug: string };
  searchParams: { prev_campaign: string };
}) => {
  const prevCampaignValue = context.searchParams.prev_campaign === "true";

  const response = await getCampaignBySlug({ slug: context.params.c_slug });
  if (response.error) {
    return <FailedToLoadPage />;
  }

  const singleCampaign = await getSinglePreviousCampaign(context.params.c_slug);

  return (
    <div className="pt-[102px]">
      {prevCampaignValue ? (
        <PreviousSingleCampaign campaignDetails={singleCampaign} />
      ) : (
        <SingleCampaign compaignDetails={response.data} context={context} />
      )}
    </div>
  );
};

export default SingleCompaign;
