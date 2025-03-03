import { customFetch } from "../apiConfig";
import { ReviewData } from "./types";

export const getReview = async ({
  page,
  per_page,
}: {
  page: number;
  per_page: number;
}) => {
  const queryParams: string[] = [];

  // Add parameters to the array if they have values

  if (page) queryParams.push(`page=${page}`);
  if (per_page) queryParams.push(`per_page=${per_page}`);

  // Join the parameters with '&' to form the query string
  const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";

  const response = await customFetch<ReviewData>({
    url: `/reviews${queryString}`,
  });
  return response.data;
};
