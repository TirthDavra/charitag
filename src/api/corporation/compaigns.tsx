import { clientCustomFetch, customFetch } from "../apiConfig";
import {
  IAddCorporateCampaignsResponse,
  ICorporateAddOrEdit,
  ICorporateCampaignDetailResponse,
  ICorporateCampaignResponse,
} from "./types";

export const getCorporationCampaigns = async ({
  charity_id,
  campaign_type,
  search,
  sort_field,
  sort_order,
  per_page,
  page,
}: {
  charity_id?: string | number;
  campaign_type?: string | number;
  search?: string;
  sort_field?: string;
  sort_order?: string;
  per_page?: number;
  page?: number;
}) => {
  const response = await customFetch<ICorporateCampaignResponse>({
    url: `/corporate/campaigns?charity_id=${charity_id}&campaign_type=${campaign_type}&search=${search}&sort_field=${sort_field}&sort_order=${sort_order}&per_page=${per_page}&page=${page}`,
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

export const getCorporationCampaignsDetails = async (id: number) => {
  const response = await customFetch<ICorporateCampaignDetailResponse>({
    url: `/corporate/campaigns/${id}`,
  });

  return response;
};

export const addOrUpdateCorporateCampaigns = async ({
  data,
  id,
}: {
  data: ICorporateAddOrEdit;
  id?: string;
}) => {
  const url = id ? `/corporate/campaigns/${id}` : `/corporate/campaigns`;
  const response = await clientCustomFetch<IAddCorporateCampaignsResponse>({
    url: url,
    data: JSON.stringify(data),
    method: "POST",
  });
  return response;
};

export const deleteCorporateCampaigns = async (id: string) => {
  const response = await clientCustomFetch({
    url: `/corporate/campaigns/${id}`,
    method: "DELETE",
  });
  return response;
};
