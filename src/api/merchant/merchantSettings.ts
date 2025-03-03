import { clientCustomFetch, customFetch } from "../apiConfig";
import {
  IAddDutyResponse,
  IAddTaxResponse,
  IDuty,
  IMerchantSettings,
  ITax,
} from "./types";

export const getMerchantSettings = async () => {
  const response = await customFetch<IMerchantSettings>({
    url: "/settings",
  });

  return response;
};

export const addTax = async (data: ITax) => {
  const response = await clientCustomFetch<IAddTaxResponse>({
    url: "/settings/tax",
    data: JSON.stringify(data),
    method: "PUT",
  });
  return response;
};

export const addDuty = async (data: IDuty) => {
  const response = await clientCustomFetch<IAddDutyResponse>({
    url: "/settings/duty",
    data: JSON.stringify(data),
    method: "PUT",
  });
  return response;
};
