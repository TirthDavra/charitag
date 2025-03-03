import {
  getCampaignsDetails,
  getCampaignsTypes,
  getCharities,
} from "@/api/merchant/merchantCampaigns";
import AddOrEditCampaigns, {
  IInitState,
} from "@/components/merchant/my-campaigns/AddOrEditCampaigns";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: { campaignId: string };
}) => {
  let initialState: IInitState = {
    title: "",
    description: "",
    short_description: "",
    feature_image: null,
    charity_id: "",
    campaign_type: "",
    gallery: [],
    total_fund_target: "",
    start_date: "",
    end_date: "",
  };

  const charities = await getCharities();
  // const campaignType = await getCampaignsTypes();
  const campaignDetails = await getCampaignsDetails(
    Number(searchParams.campaignId),
  );
  if (!campaignDetails.error) {
    initialState = {...campaignDetails.data.data,
      total_fund_target:Number(campaignDetails.data.data.total_fund_target)
    };
  }

  return (
    <div>
      <AddOrEditCampaigns
        charities={charities.data.data}
        initialState={initialState}
      />
    </div>
  );
};

export default page;
