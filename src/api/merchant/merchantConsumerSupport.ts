import { buildQueryString } from "@/utils/basicfunctions";
import { clientCustomFetch, customFetch } from "../apiConfig";
import {
  IAddsupportMessageConsumerResponse,
  IConsumerChatistoryResponse,
  IConsumerSupportListResponse,
  IGetOrderSupportDetailsResponse,
} from "./types";

export const getConsumerSupportList = async (props: {
  search?: string;
  status?: string;
  page?: number;
  per_page?: number;
}) => {
  const response = await customFetch<IConsumerSupportListResponse>({
    url: `/merchant/order/support/?${buildQueryString(props)}`,
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

export const getConsumerChatHistory = async (support_id: string) => {
  const response = await customFetch<IConsumerChatistoryResponse>({
    url: `/merchant/order/support/chat-history/${support_id}`,
  });
  return response;
};

export const addNewSupportMessageForConsumer = async (data: {
  support_id: string;
  message: string;
}) => {
  const response = await clientCustomFetch<IAddsupportMessageConsumerResponse>({
    url: `/merchant/order/support/send-message`,
    method: "POST",
    data: JSON.stringify(data),
  });

  return response;
};

export const getOrderSupportDetails = async (support_id: string) => {
  const respose = await customFetch<IGetOrderSupportDetailsResponse>({
    url: `/merchant/order/support/detail/${support_id}`,
  });
  return respose.data;
};

export const supportMarkAsResolved = async (support_id: string) => {
  const response = await clientCustomFetch({
    url: `/merchant/order/support/mark-resloved/${support_id}`,
  });
  return response;
};
