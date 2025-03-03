import {
  IPaymentsMethods,
  IPaymentsMethodsResponse,
} from "@/components/consumer/PaymentMethods/types";
import {
  axiosClientCustom,
  clientCustomFetch,
  customFetch,
} from "../apiConfig";
import { IGetClientSecretResponse } from "./types";

export const getPaymentsMethods = async () => {
  const response = await customFetch<IPaymentsMethodsResponse>({
    url: `/paymentmethod`,
  });

  return response;
};

export const getPaymentsMethodsClient = async () => {
  const response = await clientCustomFetch<IPaymentsMethodsResponse>({
    url: `/paymentmethod`,
  });

  return response;
};
export const deletePaymentsMethods = async (id: string | number) => {
  const response = await clientCustomFetch({
    url: `/paymentmethod/${id}`,
    method: "DELETE",
  });
  return response;
};

export const getClientSecret = async () => {
  const response = await clientCustomFetch<IGetClientSecretResponse>({
    url: `/get_client_secret`,
  });

  return response;
};

export const chargePayement = async (data: any) => {
  const response = await axiosClientCustom<any>({
    url: `/charge`,
    method: "POST",
    data: JSON.stringify(data),
  });
  return response;
};

export const addPaymentMethod = async (data: any) => {
  const response = await axiosClientCustom<{
    data: IPaymentsMethods;
    message: string;
    status: boolean;
  }>({
    url: `/paymentmethod/create`,
    method: "POST",
    data: JSON.stringify(data),
  });
  return response;
};
