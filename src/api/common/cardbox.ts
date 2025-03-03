import { clientCustomFetch, customFetch } from "../apiConfig";
import { ICardData, ICardDataResponse, ICartRelatedProducts } from "./types";

export const getCharityCardBox = async () => {
  const response = await customFetch<ICardData>({
    url: `/banner/charity`,
  });

  return response.data;
};
export const getCampaignCardBox = async () => {
  const response = await customFetch<ICardData>({
    url: `/banner/campaign`,
  });

  return response.data;
};
export const getMerchantCardBox = async () => {
  const response = await customFetch<ICardData>({
    url: `/banner/merchant`,
  });

  return response.data;
};
export const getCorporateCardBox = async () => {
  const response = await customFetch<ICardData>({
    url: `/banner/corporate`,
  });

  return response.data;
};
