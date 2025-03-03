import {
  IAddMerchantCampaigns,
  IAddMerchantCampaignsResponse,
  ICampaignsTypeResponse,
  IMerchantCampaignDetailsResponse,
  IMerchantCampaignsCountResponse,
  IMerchantCampaignsResponse,
  IMerchantCharitiesResponse,
} from "@/app/merchant/my-campaigns/types";
import { clientCustomFetch, customFetch } from "../apiConfig";

export const getMerchantCampaignsCount = async () => {
  const response = await customFetch<IMerchantCampaignsCountResponse>({
    url: "/merchant/campaigns/counts",
  });
  return response.data.data;
};

export const getMerchantCampaigns = async ({
  charity_id,
  campaign_type,
  search,
  sort_field,
  sort_order,
  per_page,
  page,
}: {
  charity_id: string | number;
  campaign_type: string | number;
  search: string;
  sort_field: string;
  sort_order: string;
  per_page: number;
  page: number;
}) => {
  const response = await customFetch<IMerchantCampaignsResponse>({
    url: `/merchant/campaigns?charity_id=${charity_id}&campaign_type=${campaign_type}&search=${search}&sort_field=${sort_field}&sort_order=${sort_order}&per_page=${per_page}&page=${page}`,
  });
  if (response.error) {
    return {
      current_page: 0,
      data: [],
      first_page_url: "",
      from: 0,
      last_page: 0,
      last_page_url: "",
      links: [],
      next_page_url: null,
      path: "",
      per_page: 0,
      prev_page_url: null,
      to: 0,
      total: 0,
    };
  }
  return response.data;
};

export const deleteMerchantCampaigns = async (id: string) => {
  const response = await clientCustomFetch({
    url: `/merchant/campaigns/${id}`,
    method: "DELETE",
  });
  return response;
};

export const getCharities = async () => {
  const response = await customFetch<IMerchantCharitiesResponse>({
    url: "/charities",
  });
  return response;
};

export const getCampaignsTypes = async () => {
  const response = await customFetch<ICampaignsTypeResponse>({
    url: "/types/campaign",
  });
  return response;
};

export const getCampaignsDetails = async (id: number) => {
  const response = await customFetch<IMerchantCampaignDetailsResponse>({
    url: `/merchant/campaigns/${id}`,
  });

  return response;
};

export const addOrUpdateMerchantCampaigns = async ({
  data,
  id,
}: {
  data: IAddMerchantCampaigns;
  id?: string;
}) => {
  const url = id ? `/merchant/campaigns/${id}` : `/merchant/campaigns`;
  const response = await clientCustomFetch<IAddMerchantCampaignsResponse>({
    url: url,
    data: JSON.stringify(data),
    method: "POST",
  });
  return response;
};
