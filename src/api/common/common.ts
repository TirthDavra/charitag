import { Option } from "@/components/ui/multiple-selector";
import {
  ApiResponse,
  axiosClientCustom,
  clientCustomFetch,
  customFetch,
} from "../apiConfig";
import { IUniqueCodeResponse } from "../corporation/types";
import {
  ICountriesResponse,
  IEmailVerifyResponse,
  INewsLetterResponse,
  IStatesByCountryIdResponse,
} from "./types";
import { buildQueryString } from "@/utils/basicfunctions";

export const addEmailToNewsLetter = ({
  email,
  reference_id,
  type,
}: {
  email: string;
  reference_id: number;
  type: number;
}) => {
  const response = clientCustomFetch<INewsLetterResponse>({
    url: "/newsletter",
    method: "POST",
    data: JSON.stringify({
      email,
      reference_id,
      type,
    }),
  });
  return response;
};

export const getUniqueCode = async () => {
  const response = await customFetch<IUniqueCodeResponse>({
    url: "/unique-code",
  });
  return response.data;
};
export const updateUniqueCode = async () => {
  const response = await clientCustomFetch<IUniqueCodeResponse>({
    url: "/unique-code",
    method: "POST",
  });
  return response;
};

export const debouncedGetCities = async (
  search: string,
  debounceTime: number = 1000,
): Promise<Option[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const response = await clientCustomFetch<{
        status: boolean;
        message: string;
        data: {
          name: string;
          id: number;
          state_code: string;
        }[];
      }>({
        url: `/citys?search=${search}`,
      });

      if (response.error) {
        resolve([]);
        return;
      }

      const options: Option[] = response.data.data.slice(0, 10).map((item) => ({
        label: item.name,
        value: item.id.toString(),
      }));

      resolve(options);
    }, debounceTime);
  });
};

export const getCountries = async () => {
  const response = await customFetch<ICountriesResponse>({ url: "/countries" });
  return response;
};

export const getStatesByCountryId = async (id: string) => {
  const response = await clientCustomFetch<IStatesByCountryIdResponse>({
    url: `/states?country_id=${id}`,
  });
  return response;
};
export const debouncedGetCountries = async (
  search: string,
  debounceTime: number = 1000,
): Promise<Option[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const response = await clientCustomFetch<{
        status: boolean;
        message: string;
        data: {
          name: string;
          id: number;
          state_code: string;
        }[];
      }>({
        url: `/countries?search=${search}`,
      });

      if (response.error) {
        resolve([]);
        return;
      }

      const options: Option[] = response.data.data.slice(0, 10).map((item) => ({
        label: item.name,
        value: item.id.toString(),
      }));

      resolve(options);
    }, debounceTime);
  });
};

export const debouncedGetStates = async ({
  search,
  debounceTime = 1000,
  country_id,
}: {
  search: string;
  debounceTime?: number;
  country_id: string | number | null;
}): Promise<Option[]> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const response = await clientCustomFetch<{
        status: boolean;
        message: string;
        data: {
          name: string;
          id: number;
          state_code: string;
        }[];
      }>({
        url: `/states?${buildQueryString({ search, country_id })} `,
      });

      if (response.error) {
        resolve([]);
        return;
      }
      const options: Option[] = response.data.data.slice(0, 10).map((item) => ({
        label: item.name,
        value: item.id.toString(),
      }));
      resolve(options);
    }, debounceTime);
  });
};

export const emailVerify = async ({
  value,
  type,
}: {
  value: string;
  type: number;
}) => {
  const response = await axiosClientCustom<IEmailVerifyResponse>({
    url: `/user/profile-verify`,
    method: "POST",
    data: { value, type },
    customHeaders: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const verifyOtp = async (code: string) => {
  const response = await clientCustomFetch<{
    status: boolean;
    message: string;
  }>({
    url: `/user/profile-verify/${code}`,
  });
  return response;
};
