import { CorporateProfileState } from "@/components/corporate/MyProfile/ManageCorporateProfile";
import { axiosClientCustom, customFetch } from "../apiConfig";
import {
  ICorporateOrganizationResponse,
  ICorporateProfileResponse,
} from "./types";
import { ICorporateOrganization } from "@/components/corporate/MyProfile/ManageCorporateOrganization";

export const getCorporateOrganization = async () => {
  const response = await customFetch<ICorporateOrganizationResponse>({
    url: "/corporate/org_loc/get",
    fetchInit: {
      next: {
        tags: ["corporate-organization"],
      }
    }
  });
  console.log("first response", response);
  return response;
};

export const updateCorporateOrganization = async (
  data: ICorporateOrganization,
) => {
  const response = await axiosClientCustom<ICorporateOrganizationResponse>({
    url: `/corporate/organization/update`,
    method: "PUT",
    data: JSON.stringify(data),
  });
  return response;
};
