import { buildQueryString } from "@/utils/basicfunctions";
import { customFetch } from "../apiConfig";
import { IAllCharitiesResponse } from "./types";

export const getCharities = async (props: {
  charity_id?: string | number;
  campaign_type?: string | number;
  search?: string;
  sort_field?: string;
  sort_order?: string;
  per_page?: string;
  page?: string;
  is_only_name?: boolean;
}) => {
  const queryString = buildQueryString(props);
  const url = `/charities?${queryString}`;
  const response = await customFetch<IAllCharitiesResponse>({
    url,
  });
  return response;
};
