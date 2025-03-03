import { customFetch } from "../apiConfig";
import { ICategoriesResponse } from "./types";

export const getCategories = async (type: string) => {
  const response = await customFetch<ICategoriesResponse>({
    url: `/account-categories/${type}`,
  });
  return response.data;
};
