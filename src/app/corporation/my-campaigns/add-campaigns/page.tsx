import { getCorporationCampaignsDetails } from "@/api/corporation/compaigns";
import { getCharities } from "@/api/merchant/merchantCampaigns";
import AddOrEditCorporateCampaign, { initialState } from "@/components/corporate/MyCampaigns/AddOrEditCorporateCampaign";

const page = async ({
  searchParams,
}: {
  searchParams: { campaignId: string };
}) => {
  let initialState: initialState = {
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

  const campaignDetails = await getCorporationCampaignsDetails(
    Number(searchParams.campaignId),
  );
  if (!campaignDetails.error) {
    initialState = {...campaignDetails.data.data,
      total_fund_target:Number(campaignDetails.data.data.total_fund_target)
    };
  }
  return (
    <div>
      <AddOrEditCorporateCampaign
        initialState={initialState}
        charities={charities.data.data}
      />
    </div>
  );
};

export default page;
