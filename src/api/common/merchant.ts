import { clientCustomFetch, customFetch } from "../apiConfig";
import {
  ICharityTypeResponse,
  IMerchantsListsResponse,
  IPromotionNotifyData,
  IPromotionNotifyResponse,
  ISingleMerhantResponse,
  ITopDealsResponse,
} from "./types";

export const getMerchantTypes = async () => {
  const response = await customFetch<ICharityTypeResponse>({
    url: `/types/merchant`,
  });
  return response.data;
};

export const getMerchantsList = async ({
  sort_by,
  page,
  per_page,
  merchant_type_id,
  country_id,
}: {
  sort_by?: string;
  page?: number;
  per_page?: number;
  merchant_type_id?: string;
  country_id?: string;
}) => {
  const response = await customFetch<IMerchantsListsResponse>({
    url: `/merchants?sort_by=${sort_by}&page=${page}&per_page=${per_page}&merchant_type_id=${merchant_type_id}&country_id=${country_id}`,
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

export const getSingleMerchant = async (slug: string) => {
  const response = await customFetch<ISingleMerhantResponse>({
    url: `/merchant/${slug}`,
  });
  return response.data;
};

export const getMerchantDealsBySlug = async (slug: string) => {
  const response = await customFetch<ITopDealsResponse>({
    url: `/merchant/deal/${slug}`,
  });
  return response.data;
};

export const addPromotionNotify = async (data: IPromotionNotifyData) => {
  const response = await clientCustomFetch<IPromotionNotifyResponse>({
    url: "/promotion-notify",
    method: "POST",
    data: JSON.stringify(data),
  });
  return response;
};
