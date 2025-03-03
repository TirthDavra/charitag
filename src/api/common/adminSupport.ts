import { buildQueryString } from "@/utils/basicfunctions";
import { clientCustomFetch, customFetch } from "../apiConfig";
import {
  IAdminChatistoryResponse,
  ISendMessageAdminResponse,
  ISupportRequestsListResponse,
} from "./types";

export const getSupportRequestsLists = async (props: {
  per_page: number;
  search?: string;
  page?: number;
}) => {
  const response = await customFetch<ISupportRequestsListResponse>({
    url: `/admin/supports?${buildQueryString(props)}`,
  });

  return response.data;
};

export const adminChatHistory = async (support_id: string) => {
  const response = await customFetch<IAdminChatistoryResponse>({
    url: `/admin/support/${support_id}`,
  });
  return response;
};

export const sendMessageToAdmin = async (data: {
  support_id: string;
  message: string;
}) => {
  const response = await clientCustomFetch<ISendMessageAdminResponse>({
    url: "/admin/support/message/send",
    method: "POST",
    data: JSON.stringify(data),
  });
  return response;
};
