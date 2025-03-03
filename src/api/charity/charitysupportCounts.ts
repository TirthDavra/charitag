import { clientCustomFetch, customFetch } from "../apiConfig";
import {
  IAddNewMeassageResponse,
  ICharitySupportCountResponse,
  ICharitySupportResponse,
  IGetSupportMessagesResponse,
} from "./types";

export const getCharitySupportCount = async () => {
  const response = await customFetch<ICharitySupportCountResponse>({
    url: `/charity/support/counts`,
  });
  return response.data;
};

export const getCharitySupport = async ({
  search,
  sort_field,
  sort_order,
  page,
  per_page,
}: {
  search?: string;
  sort_field?: string;
  sort_order?: string;
  page?: number;
  per_page?: number;
}) => {
  const response = await customFetch<ICharitySupportResponse>({
    url: `/charity/supports?search=${search}&sort_field=${sort_field}&sort_order=${sort_order}&page=${page}&per_page=${per_page}`,
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

export const getSupportMessages = async (id: string) => {
  const response = await customFetch<IGetSupportMessagesResponse>({
    url: `/charity/support/${id}`,
    fetchInit: {
      next: {
        tags: ["chat-support-charity"],
      },
    },
  });
  return response.data;
};

export const createNewSupport = async ({
  data,
}: {
  data: { title: string; description: string };
}) => {
  const response = await clientCustomFetch<{ status: boolean; message: any }>({
    url: "/admin/supports",
    method: "POST",
    data: JSON.stringify(data),
  });
  return response;
};
export const _createNewCharitySupport = async ({
  data,
}: {
  data: { title: string; description: string };
}) => {
  const response = await clientCustomFetch<{ status: boolean; message: any }>({
    url: "/charity/supports",
    method: "POST",
    data: JSON.stringify(data),
  });
  return response;
};

export const addNewSupportMessage = async ({
  data,
}: {
  data: { message: string; support_id: string };
}) => {
  const response = await clientCustomFetch<IAddNewMeassageResponse>({
    url: `/charity/support/message/send`,
    method: "POST",
    data: JSON.stringify(data),
  });
  return response;
};
