import {
  axiosClientCustom,
  clientCustomFetch,
  customFetch,
} from "../apiConfig";
import {
  IAddAddressResponse,
  IAddressByIdResponse,
  IBillingAddress,
  ISavedAddress,
  ISavedAddressesResponse,
} from "./types";

export const getMySavedAddress = async () => {
  const response = await clientCustomFetch<ISavedAddressesResponse>({
    url: `/address`,
  });
  return response;
};

export const addAddress = async (data: IBillingAddress) => {
  const response = await axiosClientCustom<{
    status: boolean;
    message: string;
    data: ISavedAddress;
  }>({
    url: `/address/add`,
    method: "POST",
    data: data,
  });
  return response;
};

export const getAddressById = async (id: number) => {
  const response = await customFetch<IAddressByIdResponse>({
    url: `/address/${id}`,
  });
  return response;
};

export const updateAddress = async (id: number, data: IBillingAddress) => {
  const response = await axiosClientCustom<IAddAddressResponse>({
    url: `/address/update/${id}`,
    method: "PUT",
    data: data,
  });
  return response;
};

export const deleteAddress = async (id: number) => {
  const response = await axiosClientCustom<{
    status: boolean;
    message: string | Record<string, string[]>;
  }>({
    url: `/address/${id}`,
    method: "DELETE",
  });
  return response;
};
