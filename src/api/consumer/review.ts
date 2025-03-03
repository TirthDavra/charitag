import {
  IGerReviewRespone,
  IReview,
  IReviewRespone,
} from "@/components/consumer/Orders/types";
import { clientCustomFetch, customFetch } from "../apiConfig";

export const addReviewData = async ({ data }: { data: IReview }) => {
  const response = await clientCustomFetch<IReviewRespone>({
    url: `/reviews/product`,
    method: "POST",
    data: JSON.stringify(data),
  });

  return response;
};

export const getReviewData = async ({ slug }: { slug: string }) => {
  const response = await customFetch<IGerReviewRespone>({
    url: `/review-products/${slug}`,
  });

  return response.data;
};
