import {
  IBankDetails,
  IBankDetailsResponse,
  IMearchantStoreProfileResponse,
  IMerchantBusinessInfoResponse,
  IMerchantBusniessData,
  IMerchantPersonalProfile,
  IMerchantProfile,
  IMerchantProfileResponse,
  IStripeDetails,
  IUpdateBankDetailsResponse,
  IUpdateMerchantBusinessInfoResponse,
  IUpdatePasswordResponse,
  IUpdateStoreProfile,
  IUpdateStoreProfileResponse,
} from "@/components/merchant/MyAccount/types";
import {
  ApiResponse,
  axiosClientCustom,
  clientCustomFetch,
  customFetch,
} from "../apiConfig";
import { IUploadPhotoApi } from "../common/imageUpload";
import { getSession } from "next-auth/react";
import axios from "axios";

export const getPersonalProfile = async () => {
  const response = await clientCustomFetch<IMerchantProfileResponse>({
    url: `/profile`,
  });
  return response;
};
export const getMerchantProfile = async () => {
  const response = await customFetch<IMerchantProfileResponse>({
    url: `/profile`,
  });
  return response;
};

export const getMerhantProfile = async () => {
  const response = await customFetch<IMerchantProfileResponse>({
    url: "/profile",
  });
  return response;
};

export const updatePersonalProfile = async (data: IMerchantPersonalProfile) => {
  const response = await axiosClientCustom<IMerchantProfileResponse>({
    url: "/merchant/profile/update",
    data: data,
    method: "POST",
    customHeaders: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const getBankDetails = async () => {
  const response = await customFetch<IBankDetailsResponse>({
    url: "/store/bank-account",
  });
  return response;
};

export const updateBankDetails = async (data: IBankDetails) => {
  const response = await axiosClientCustom<IUpdateBankDetailsResponse>({
    url: "/store/bank-account",
    method: "POST",
    data: JSON.stringify(data),
  });
  return response;
};

export const updateStripeDetailsMerchant = async (data: IStripeDetails) => {
  const response = await axiosClientCustom<IUpdateBankDetailsResponse>({
    url: "/merchant/stripe",
    method: "POST",
    data: JSON.stringify(data),
  });
  return response;
};
export const getStripeDetailsMerchant = async () => {
  const response = await customFetch<{
    status: boolean;
    data: IStripeDetails;
    message: string;
  }>({
    url: "/merchant/stripe",
  });
  return response;
};

export const getStoreProfile = async () => {
  const response = await customFetch<IMearchantStoreProfileResponse>({
    url: "/store/profile",
  });
  return response;
};

export const updateStoreProfile = async (data: IUpdateStoreProfile) => {
  const response = await axiosClientCustom<IUpdateStoreProfileResponse>({
    url: "/store/profile",
    data: JSON.stringify(data),
    method: "POST",
  });
  return response;
};

export const uploadProfilePhoto = async (
  data: File,
): Promise<ApiResponse<IUploadPhotoApi>> => {
  const session = await getSession();
  const formData = new FormData();
  formData.append("file", data);
  const response: ApiResponse<IUploadPhotoApi> = {
    error: false,
    data: {} as IUploadPhotoApi,
    statusCode: -1,
  };

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/profile/update_image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/formdata",
          Authorization: `Bearer ${session?.user.token}`,
        },
      },
    );
    if (res.data) {
      response.data = res.data.data;
      response.statusCode = res.status;
      return response;
    }
    response.error = true;
    return response;
  } catch (error) {
    response.error = true;
    response.data = {
      message: "Network error or invalid JSON response.",
    } as IUploadPhotoApi;
    return response;
  }
};

export const getMerchantBusinessInfo = async () => {
  const response = await customFetch<IMerchantBusinessInfoResponse>({
    url: "/business-info",
  });
  return response;
};

export const updateMerchantBusinessInfo = async (
  data: IMerchantBusniessData,
) => {
  const response = await axiosClientCustom<IUpdateMerchantBusinessInfoResponse>(
    {
      url: `/store/business-details`,
      method: "POST",
      data: data,
      customHeaders: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response;
};
