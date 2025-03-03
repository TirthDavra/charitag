import { IMainCharityLocation } from "@/components/charity/MyProfile.tsx/ManageCharityLocations";
import {
  axiosClientCustom,
  clientCustomFetch,
  customFetch,
} from "../apiConfig";
import {
  IAddOrUpdateCharityAddressData,
  IAddOrUpdateCharityAddressResponse,
  IAddressResponseById,
  ICarityInfoUpdateData,
  ICharityAddresses,
  ICharityAllAddressesResponse,
  ICharityInfoResponse,
  ICharityInfoUpdateResponse,
  ICharityProfileData,
  ICharityProfileResponse,
} from "./types";
import {
  IBankDetails,
  IBankDetailsResponse,
  IStripeDetails,
  IUpdateBankDetailsResponse,
} from "@/components/merchant/MyAccount/types";

export const getCharityProfile = async () => {
  const response = await customFetch<ICharityProfileResponse>({
    url: "/profile",
  });
  return response;
};

export const updateCharityProfile = async (data: ICharityProfileData) => {
  const response = await axiosClientCustom<ICharityProfileResponse>({
    url: "/charity/profile/update",
    data: data,
    method: "POST",
    customHeaders: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const getCharityBankDetails = async () => {
  const response = await customFetch<IBankDetailsResponse>({
    url: "/charity/bank-details",
  });
  return response;
};

export const updateStripeDetailsCharity = async (data: IStripeDetails) => {
  const response = await axiosClientCustom<IUpdateBankDetailsResponse>({
    url: "/charity/stripe",
    method: "POST",
    data: JSON.stringify(data),
  });
  return response;
};
export const getStripeDetailsCharity = async () => {
  const response = await customFetch<{
    status: boolean;
    data: IStripeDetails;
    message: string;
  }>({
    url: "/charity/stripe",
  });
  return response;
};

export const updateCharityBankDetails = async (data: IBankDetails) => {
  const response = await axiosClientCustom<IUpdateBankDetailsResponse>({
    url: "/charity/bank-details",
    method: "POST",
    data: JSON.stringify(data),
  });
  return response;
};

export const chanrityInfo = async () => {
  const response = await customFetch<ICharityInfoResponse>({
    url: `/get/charity/info`,
  });
  return response;
};

export const updateCharityInfo = async (data: ICarityInfoUpdateData) => {
  const response = await axiosClientCustom<ICharityInfoUpdateResponse>({
    url: "/charity/info",
    method: "POST",
    data: data,
    customHeaders: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const getCharityAllAdresses = async () => {
  const response = await customFetch<ICharityAllAddressesResponse>({
    url: `/charity/address`,
  });
  return response.data;
};

export const addOrUpdateCharityAddress = async ({
  data,
  id,
}: {
  data: IAddOrUpdateCharityAddressData;
  id?: number;
}) => {
  const url = id ? `/charity/address/${id}` : `/charity/address`;

  const response = await axiosClientCustom<IAddOrUpdateCharityAddressResponse>({
    url: url,
    method: "POST",
    data: JSON.stringify(data),
  });
  return response;
};

export const getCharityAddressById = async (id: number) => {
  const response = await clientCustomFetch<IAddressResponseById>({
    url: `/charity/address/${id}`,
  });
  return response;
};

export const deleteCharityAddress = async (id: number) => {
  const response = await clientCustomFetch<{
    status: boolean;
    message: string;
  }>({
    url: `/charity/address/${id}`,
    method: "DELETE",
  });
  return response;
};

export const makeDefaultCharityAddress = async (id: number) => {
  const response = await clientCustomFetch<{
    status: boolean;
    message: string;
    address: ICharityAddresses;
  }>({
    url: `/charity/address/default/${id}`,
  });
  return response;
};
