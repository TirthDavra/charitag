import {
  IListResponse,
  ISinglePreviousCampaignResponse,
  ListCampaignsParams,
} from "@/components/common/NavbarLinkPages/OurCharities/Campaign/PreviousSingleCampaign/types";
import { customFetch } from "../apiConfig";
import { ICharityCampaignBySlugResponse } from "./types";
import { buildQueryString } from "@/utils/basicfunctions";

export const getCampaigns = async (props: {
  per_page: number;
  is_previous?: boolean;
  sort_field?: string;
  charity_id?: string;
  country_id?: string;
  page?: number;
}) => {
  const response = await customFetch<ICharityCampaignBySlugResponse>({
    url: `/campaigns?${buildQueryString(props)}`,
  });

  return response.data;
};

export const getSinglePreviousCampaign = async (slug: string) => {
  const response = await customFetch<ISinglePreviousCampaignResponse>({
    url: `/previous/campaign/${slug}`,
  });
  return response.data;
};

export const getListCampaigns = async ({
  is_previous = false,
  is_active = false,
}: ListCampaignsParams) => {
  const response = await customFetch<IListResponse>({
    // url: `/list/campaigns`,
    url: `/list/campaigns?is_previous=${is_previous}&is_active=${is_active}`,
  });
  return response;
};
