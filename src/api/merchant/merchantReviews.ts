import { buildQueryString } from "@/utils/basicfunctions";
import { customFetch } from "../apiConfig";
import {
  IMerchantReviewCountResponse,
  IMerchantReviewsResponse,
} from "./types";

export const getMerchantReviewsCounts = async () => {
  const response = await customFetch<IMerchantReviewCountResponse>({
    url: "/merchant/reviews/counts",
  });
  return response.data;
};

export const getMerchantReviews = async (props: {
  rating?: string;
  search?: string;
  sort_field?: string;
  sort_order?: string;
  per_page?: number;
  product_category_id?: string;
  page?: number;
}) => {
  const response = await customFetch<IMerchantReviewsResponse>({
    url: `/merchant/reviews?${buildQueryString(props)}`,
  });
  if (response.error) {
    return {
      current_page: 0,
      data: [],
      first_page_url: "",
      from: 0,
      last_page: "",
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
