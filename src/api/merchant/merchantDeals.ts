import {
  IAddMerchantDeals,
  IAddMerchantDealsResponse,
  IDealsTypeResponse,
  IMerchantDealDetailsResponse,
  IMerchantDealsCountsResponse,
  IMerchantDealsResponse,
  IProductVariationsResponse,
  IProductsForDealsResponse,
} from "@/components/merchant/Deals/types";
import {
  axiosClientCustom,
  clientCustomFetch,
  customFetch,
} from "../apiConfig";
import { buildQueryString } from "@/utils/basicfunctions";

export const getMerchantDealsCount = async () => {
  const response = await customFetch<IMerchantDealsCountsResponse>({
    url: "/deals/counts",
  });
  return response.data.data;
};

export const getMerchantDeals = async ({
  status,
  search,
  per_page,
  page,
  sort_field,
  sort_order,
}: {
  status: string;
  search: string;
  sort_field: string;
  sort_order: string;
  per_page: number;
  page: number;
}) => {
  const response = await customFetch<IMerchantDealsResponse>({
    url: `/deals?status=${status}&search=${search}&sort_field=${sort_field}&sort_order=${sort_order}&per_page=${per_page}&page=${page}`,
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

export const getDealDetails = async (id: number) => {
  const respose = await customFetch<IMerchantDealDetailsResponse>({
    url: `/deals/${id}`,
  });
  return respose;
};

export const getProductsForDeals = async ({
  is_only_name,
}: {
  is_only_name?: boolean;
}) => {
  const response = await customFetch<IProductsForDealsResponse>({
    url: `/products?is_only_name=${is_only_name}`,
  });
  return response.data;
};

export const getProductsVariations = async () => {
  const response = await customFetch<IProductVariationsResponse>({
    url: `/deal/products`,
  });
  return response;
};

export const getProductsVariationsClient = async (props: {
  search?: string;
}) => {
  const response = await axiosClientCustom<IProductVariationsResponse>({
    url: `/deal/products?${buildQueryString(props)}`,
  });
  return response;
};
export const getMerchantDealsType = async () => {
  const response = await clientCustomFetch<IDealsTypeResponse>({
    url: "/types/deal",
  });
  return response;
};

export const addOrUpdateMerchantDeals = async ({
  data,
}: {
  data: IAddMerchantDeals;
}) => {
  const url = data.id !== null ? `/deals/${data.id}` : `/deals`;
  const response = await clientCustomFetch<IAddMerchantDealsResponse>({
    url,
    data: JSON.stringify(data),
    method: "POST",
  });
  return response;
};

export const deleteMerchantDeals = async (id: string) => {
  const response = await clientCustomFetch({
    url: `/deals/${id}`,
    method: "DELETE",
  });
  return response;
};

export const merchantDealsStatusUpdate = async (
  deal_id: number | string,
  status: number,
) => {
  const response = await clientCustomFetch({
    url: `/deals/status/update`,
    data: JSON.stringify({ deal_id, status }),
    method: "PUT",
  });
  return response;
};
