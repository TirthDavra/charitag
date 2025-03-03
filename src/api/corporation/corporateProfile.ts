import { CorporateProfileState } from "@/components/corporate/MyProfile/ManageCorporateProfile";
import { axiosClientCustom, customFetch } from "../apiConfig";
import { ICorporateProfileResponse } from "./types";

export const getCorporateProfile = async () => {
  const response = await customFetch<ICorporateProfileResponse>({
    url: "/profile",
  });
  return response;
};

export const updateCorporateProfile = async (data: CorporateProfileState) => {
  const response = await axiosClientCustom<ICorporateProfileResponse>({
    url: `/corporate/profile/update`,
    data: data,
    method: "POST",
    customHeaders: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};
