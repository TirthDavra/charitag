import { customFetch } from "../apiConfig";
import {
  ICorporateFundraiserResponse,
  IICorporateFundraiserBySlugResponse,
} from "./types";

export const getCorporateFundraisers = async ({
  search,
  per_page,
  page,
  is_only_name = false,
}: {
  search?: string;
  per_page?: number;
  page?: number;
  is_only_name?: boolean;
}) => {
  const response = await customFetch<ICorporateFundraiserResponse>({
    url: `/corporates?search=${search}&per_page=${per_page}&page=${page}&is_only_name=${is_only_name}`,
  });
  if (response.error) {
    return {
      current_page: 0,
      data: [],
      first_page_url: "",
      from: 0,
      last_page: 0,
      last_page_url: "",
      links: [],
      next_page_url: null,
      path: "",
      per_page: 0,
      prev_page_url: null,
      to: 0,
      total: 0,
    };
  }
  return response.data;
};

export const getCorporateFundraisersBySlug = async (slug: string) => {
  const response = await customFetch<IICorporateFundraiserBySlugResponse>({
    url: `/corporate/${slug}`,
  });
  return response.data;
};
