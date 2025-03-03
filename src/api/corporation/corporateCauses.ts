import { customFetch } from "../apiConfig";
import { ICorporateCausesResponse } from "../merchant/types";

export const getCorporateCauses = async () => {
  const response = await customFetch<ICorporateCausesResponse>({
    url: `/corporate/causes`,
  });
  return response.data;
};
