import { getCharityCampaignsDetails } from "@/api/charity/charityCampaign";
import AddOrEditCharityCampaign, {
  IInitialState,
} from "@/components/charity/MyCampaigns/ManageActiveCampaigns/AddOrEditCharityCampaign";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: { campaignId?: string; prev_campaign?: string };
}) => {
  let initialState: IInitialState = {
    title: "",
    description: "",
    short_description: "",
    feature_image: null,

    gallery: [],
    total_fund_target: "",
    start_date: "",
    end_date: "",
  };
  if (searchParams?.campaignId) {
    const campaignDetails = await getCharityCampaignsDetails(
      Number(searchParams.campaignId),
    );
    if (!campaignDetails.error) {
      initialState = {
        ...campaignDetails.data.data,
        start_date:
          searchParams?.prev_campaign === "true"
            ? ""
            : campaignDetails.data.data.start_date,
        end_date:
          searchParams?.prev_campaign === "true"
            ? ""
            : campaignDetails.data.data.end_date,
        total_fund_target: Number(campaignDetails.data.data.total_fund_target),
      };
    }
  }

  return (
    <div>
      <AddOrEditCharityCampaign initialState={initialState} />
    </div>
  );
};

export default page;
