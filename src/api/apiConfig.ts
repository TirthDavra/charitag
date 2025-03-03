import { logout } from "@/lib/utils";
import { auth, signOut } from "auth";
import axios from "axios";
import { getSession } from "next-auth/react";

export const API_BASE_URL = process.env.NEXT_PUBLIC_APP_API_ENDPOINT;

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface ApiResponse<T> {
  error: boolean;
  data: T;
  statusCode: number;
}

const handleErrorResponse = async <TResponse>(
  response: Response | undefined,
  responseBody: any,
  isError: boolean,
  signOutCallback: () => void,
): Promise<ApiResponse<TResponse>> => {
  const apiResponse: ApiResponse<TResponse> = {
    error: isError,
    data: responseBody,
    statusCode: response ? response.status : 0,
  };

  if (response && response.status === 401) {
    signOutCallback();
  }

  return apiResponse;
};

const fetchWrapper = async <TResponse>(
  url: string,
  options: RequestInit,
  signOutCallback: () => void,
): Promise<ApiResponse<TResponse>> => {
  try {
    const response = await fetch(url, options);
    const responseBody = await response.json();

    const isError = Object.hasOwn(responseBody, "status")
      ? !responseBody.status
      : response.status >= 400 || false;

    return handleErrorResponse(
      response,
      responseBody,
      isError,
      signOutCallback,
    );
  } catch (error) {
    console.error("Error in fetching", error);

    // Log additional information if needed
    if (error instanceof Error) {
      console.error("Error message:", error.message);
    }

    return handleErrorResponse(
      undefined,
      {
        message:
          "We're experiencing technical difficulties. Please try again later.",
      } as TResponse,
      true,
      signOutCallback,
    );
  }
};

export const customFetch = async <TResponse>({
  url,
  method = "GET",
  data,
  customHeaders = {},
  fetchInit = {},
}: {
  url: string;
  method?: HttpMethod;
  data?: any;
  customHeaders?: Record<string, string>;
  fetchInit?: RequestInit;
}): Promise<ApiResponse<TResponse>> => {
  const session = await auth();
  const token = session ? session.user?.token : "";

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    accept: "application/json",
    ...customHeaders,
  };

  return fetchWrapper(
    API_BASE_URL + url,
    {
      method,
      headers,
      body: data ? JSON.stringify(data) : null,
      ...fetchInit,
    },
    signOut,
  );
};

export const clientCustomFetch = async <TResponse>({
  url,
  method = "GET",
  data,
  customHeaders = {},
  withApi = true,
}: {
  url: string;
  method?: HttpMethod;
  data?: any;
  customHeaders?: Record<string, string>;
  withApi?: boolean;
}): Promise<ApiResponse<TResponse>> => {
  const session = await getSession();
  const token = session?.user?.token || "";

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    ...customHeaders,
  };

  const apiUrl = withApi
    ? API_BASE_URL
    : process.env.NEXT_PUBLIC_SERVER_API_ENDPOINT;

  return fetchWrapper(
    apiUrl + url,
    {
      method,
      headers,
      body: data,
    },
    () => logout({ redirect: true, callbackUrl: "/login" }),
  );
};

export const axiosClientCustom = async <TResponse>({
  url,
  method = "GET",
  data,
  customHeaders = {},
}: {
  url: string;
  method?: HttpMethod;
  data?: any;
  customHeaders?: Record<string, string>;
}): Promise<ApiResponse<TResponse>> => {
  const session = await getSession();
  const token = session?.user?.token || "";

  try {
    const res = await axios({
      url: API_BASE_URL + url,
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        accept: "application/json",
        ...customHeaders,
      },
      data,
    });

    const isError = Object.hasOwn(res.data, "status")
      ? !res.data.status
      : false;

    if (res.status === 401) {
      logout({ callbackUrl: "/login", redirect: true });
    }

    return {
      error: isError,
      data: res.data,
      statusCode: res.status,
    };
  } catch (error) {
    console.error("Error in axios fetch", error);

    const response: ApiResponse<TResponse> = {
      error: true,
      data: {
        message:
          "We're experiencing technical difficulties. Please try again later.",
      } as TResponse,
      statusCode: 0,
    };

    if (axios.isAxiosError(error) && error.response) {
      response.data = error.response.data;
      response.statusCode = error.response.status;

      if (response.statusCode === 401) {
        logout({ callbackUrl: "/login", redirect: true });
      }
    }

    return response;
  }
};
