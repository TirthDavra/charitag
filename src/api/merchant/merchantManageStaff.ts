import { clientCustomFetch, customFetch } from "../apiConfig";
import {
  IAddMerchantMembers,
  IAddMerchantMembersResponse,
  IAddmerchantRoles,
  IAddmerchantRolesResponse,
  IAddmerchantRolesResponseById,
  IMerchantMembersByIdResponse,
  IMerchantMembersResponse,
  IMerchantRolesReponse,
  IUpdateMerchantMembersResponse,
  IUpdateMerchantmembers,
  IUpdatemerchantRoles,
  IUpdatemerchantRolesResponse,
} from "./types";

export const getMerchantRoles = async ({
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
  const response = await customFetch<IMerchantRolesReponse>({
    url: `/roles?search=${search}&sort_field=${sort_field}&sort_order=${sort_order}&page=${page}&per_page=${per_page}`,
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

export const addMerchantRoles = async (data: IAddmerchantRoles) => {
  const response = await clientCustomFetch<IAddmerchantRolesResponse>({
    url: `/roles`,
    data: JSON.stringify(data),
    method: "POST",
  });
  return response;
};

export const getMerchantRolesById = async (id: string) => {
  const response = await customFetch<IAddmerchantRolesResponseById>({
    url: `/roles/${id}`,
  });
  return response;
};

export const updateMerchantRoles = async ({
  data,
  id,
}: {
  data: IUpdatemerchantRoles;
  id: string;
}) => {
  const response = await clientCustomFetch<IUpdatemerchantRolesResponse>({
    url: `/roles/${id}`,
    data: JSON.stringify(data),
    method: "PUT",
  });
  return response;
};

export const deleteMerchantRole = async (id: string) => {
  const response = await clientCustomFetch({
    url: `/roles/${id}`,
    method: "DELETE",
  });
  return response;
};

export const getMerchantMembers = async ({
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
  const response = await customFetch<IMerchantMembersResponse>({
    url: `/members?search=${search}&sort_field=${sort_field}&sort_order=${sort_order}&page=${page}&per_page=${per_page}`,
  });
  return response.data;
};

export const getMerchantMembersById = async (id: string) => {
  const response = await customFetch<IMerchantMembersByIdResponse>({
    url: `/members/${id}`,
  });
  return response;
};

export const addMerchantMembers = async (data: IAddMerchantMembers) => {
  const response = await clientCustomFetch<IAddMerchantMembersResponse>({
    url: `/members`,
    data: JSON.stringify(data),
    method: "POST",
  });
  return response;
};

export const updateMerchantMembers = async ({
  data,
  id,
}: {
  id: string;
  data: IUpdateMerchantmembers;
}) => {
  const response = await clientCustomFetch<IUpdateMerchantMembersResponse>({
    url: `/members/${id}`,
    data: JSON.stringify(data),
    method: "PUT",
  });
  return response;
};

export const updateMerchantMemberStatus = async (data: {
  member_id: string | number;
  status: string | number;
}) => {
  const response = await clientCustomFetch({
    url: "/members/status/update",
    data: JSON.stringify(data),
    method: "PUT",
  });
  return response;
};

export const deleteMerchantMembers = async (id: string) => {
  const response = await clientCustomFetch({
    url: `/members/${id}`,
    method: "DELETE",
  });
  return response;
};
