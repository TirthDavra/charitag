import { url } from "inspector";
import { clientCustomFetch, customFetch } from "../apiConfig";
import {
  IAllCharitiesResponse,
  ICharitiesForHomeResponse,
  ICharityCampaignBySlugResponse,
  ICharityTypeResponse,
  ICitiesByIdResponse,
  ICountriesResponse,
  ISingleCharityResponse,
  IStatesByCountryIdResponse,
} from "./types";
import { buildQueryString } from "@/utils/basicfunctions";

export const getCharitiesForHome = async ({
  is_only_name,
}: {
  is_only_name: false;
}) => {
  const response = await customFetch<ICharitiesForHomeResponse>({
    url: `/charities?is_only_name=${is_only_name}`,
  });
  return response.data;
};

export const getAllCharities = async (props: {
  charity_type?: string;
  sort_by?: string;
  per_page?: number;
  page?: number;
  charity_location?: string;
}) => {
  const response = await customFetch<IAllCharitiesResponse>({
    url: `/all-charities?${buildQueryString(props)}`,
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

export const getCharityTypes = async () => {
  const response = await customFetch<ICharityTypeResponse>({
    url: "/types/charity",
  });
  // if (response.error) {
  //   return {
  //     status: false,
  //     data: [],
  //   };
  // }
  return response.data;
};

export const getCountries = async () => {
  const response = await customFetch<ICountriesResponse>({ url: "/countries" });
  return response.data;
};

export const getCitiesByCountyId = async (id: string) => {
  const response = await clientCustomFetch<ICitiesByIdResponse>({
    url: `/cities/country/${id}`,
  });
  return response.data;
};

export const getStatesByCountryId = async (id: string) => {
  const response = await clientCustomFetch<IStatesByCountryIdResponse>({
    url: `/states?country_id=${id}`,
  });
  return response.data;
};

export const getsingleCharity = async (slug: string) => {
  const response = await customFetch<ISingleCharityResponse>({
    url: `/charity/${slug}`,
  });
  return response.data;
};

export const getCharityCampaignBySlug = async ({
  slug,
  per_page = 10,
}: {
  slug: string;
  per_page?: number;
}) => {
  const response = await customFetch<ICharityCampaignBySlugResponse>({
    url: `/campaigns?slug=${slug}&per_page=${per_page}`,
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
