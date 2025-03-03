import { buildQueryString } from "@/utils/basicfunctions";
import { clientCustomFetch, customFetch } from "../apiConfig";
import {
  IAddOrEditShippingZone,
  IMerchantShipping,
  IMerchantShippingZoneResponse,
  IShippingByIdResponse,
  IShppingZone,
} from "./types";

export const getMerchantShipping = async (props: {
  search?: string;
  page?: number | string;
  per_page?: number;
}) => {
  const response = await customFetch<IMerchantShippingZoneResponse>({
    url: `/shipping?${buildQueryString(props)}`,
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
export const addShippingZone = async (data: IShppingZone) => {
  const response = await clientCustomFetch<IAddOrEditShippingZone>({
    url: "/shipping/add",
    method: "POST",
    data: JSON.stringify(data),
    customHeaders: {
      "Content-type": "application/json",
    },
  });
  return response;
};

export const updateShippingZone = async ({
  data,
  id,
}: {
  data: IShppingZone;
  id: string;
}) => {
  const response = await clientCustomFetch<IAddOrEditShippingZone>({
    url: `/shipping/${id}`,
    data: JSON.stringify(data),
    method: "PUT",
  });
  return response;
};

export const deleteShippingZone = async (id: string) => {
  const response = await clientCustomFetch({
    url: `/shipping/${id}`,
    method: "DELETE",
  });
  return response;
};

export const getMerchantShippingZoneById = async (id: string) => {
  const response = await customFetch<IShippingByIdResponse>({
    url: `/shipping/${id}`,
  });
  return response;
};
