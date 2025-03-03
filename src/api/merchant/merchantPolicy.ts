import { clientCustomFetch, customFetch } from "../apiConfig";
import {
  IAddPolicyResponse,
  IAllPolicyResponse,
  ISinglePolicyResponse,
} from "./types";

export const addPolicyApi = async (data: any) => {
  data.policy_type = data.policies_type; //backend column name change issue
  const response = await clientCustomFetch<IAddPolicyResponse>({
    url: "/policy/add",
    method: "POST",
    data: JSON.stringify(data),
  });
  return response;
};

export const getPolicyApi = async (policyId: number) => {
  const response = await customFetch<ISinglePolicyResponse>({
    url: "/policy/" + policyId,
    method: "GET",
  });
  return response;
};

export const updatePolicyApi = async (policyId: number, data: any) => {
  const response = await clientCustomFetch<{
    status: boolean;
    message: any;
  }>({
    url: "/policy/" + policyId,
    method: "PUT",
    data: JSON.stringify(data),
  });
  return response;
};

export const getPolicyList = async ({
  search,
  page,
  per_page,
  sort_field,
  sort_order,
  policy_type,
}: {
  search: string;
  page: string;
  per_page: string;
  sort_field: string;
  sort_order: string;
  policy_type: string;
}) => {
  const queryParams = new URLSearchParams({
    search,
    page,
    per_page,
    sort_field,
    sort_order,
    policy_type,
  });

  const response = await customFetch<IAllPolicyResponse>({
    url: `/policies?${queryParams.toString()}`,
  });

  return response.data.data;
};

export const getPolicyCount = async () => {
  const response = await customFetch<any>({ url: `/policy/counts` });
  return response.data.data;
};

export const deletePolicy = async (policyId: number) => {
  const response = await clientCustomFetch({
    url: `/policy/${policyId}`,
    method: "DELETE",
  });
  return response;
};
