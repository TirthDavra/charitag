import { buildQueryString } from "@/utils/basicfunctions";
import { clientCustomFetch, customFetch } from "../apiConfig";
import {
  IAddCharityCampaigns,
  IAddCharityCampaignsResponse,
  ICharityCampaignDetailResponse,
  ICharityCampaignResponse,
  ICompaignByCharityResponse,
  ILiveupdatesRespones,
  ISingleCompaignResponse,
} from "./types";

export const getCharityCampaign = async (props: {
  charity_id: string | number;
  campaign_type: string | number;
  search: string;
  sort_field: string;
  sort_order: string;
  per_page: number;
  page: number;
}) => {
  const response = await customFetch<ICharityCampaignResponse>({
    url: `/charity/campaigns?${buildQueryString(props)}`,
  });
  return response;
};

export const deleteCharityCampaigns = async (id: string) => {
  const response = await clientCustomFetch({
    url: `/charity/campaigns/${id}`,
    method: "DELETE",
  });
  return response;
};

export const addOrUpdateCharityCampaigns = async ({
  data,
  id,
}: {
  data: IAddCharityCampaigns;
  id?: string;
}) => {
  const url = id ? `/charity/campaigns/${id}` : `/charity/campaigns`;
  const response = await clientCustomFetch<IAddCharityCampaignsResponse>({
    url: url,
    data: JSON.stringify(data),
    method: "POST",
  });
  return response;
};

export const getCharityCampaignsDetails = async (id: number) => {
  const response = await customFetch<ICharityCampaignDetailResponse>({
    url: `/charity/campaigns/${id}`,
  });

  return response;
};

export const getCharityPreviousCampaign = async (props: {
  charity_id: string | number;
  campaign_type: string | number;
  search: string;
  sort_field: string;
  sort_order: string;
  per_page: number;
  page: number;
}) => {
  const response = await customFetch<ICharityCampaignResponse>({
    url: `/charity/campaigns/previous?${buildQueryString(props)}`,
  });
  return response.data;
};

export const getLiveUpdates = async (id: string) => {
  const response = await customFetch<ILiveupdatesRespones>({
    url: `/doners/${id}`,
  });
  return response.data;
};

export const getCampaignByCharity = async ({
  charity_ids,
}: {
  charity_ids: (string | number)[];
}) => {
  let url = "/charities/campaigns?";
  charity_ids.forEach((charity_id, index) => {
    url += `charity_ids[]=${charity_id}`;
    if (index !== charity_ids.length - 1) {
      url += "&";
    }
  });
  const response = await clientCustomFetch<ICompaignByCharityResponse>({
    url,
  });

  return response;
};

export const getCampaignBySlug = async ({ slug }: { slug: string }) => {
  let url = "/campaign/" + slug;
  const response = await customFetch<ISingleCompaignResponse>({
    url,
  });

  return response;
};
