import { IMerchantFinalStep } from "@/app/(auth)/register/merchant/MerchantForm";
import {
  customFetch,
  axiosClientCustom,
  clientCustomFetch,
} from "../apiConfig";
import {
  ICharitySignUpData,
  ICorporateSignUpData,
  ICorporteSignUpData,
  IFinalStepInformationDataResponse,
  ILoginPayload,
  ILoginResponse,
  IMerchantFormData,
  IMerchantSignUpData,
  IResponseWithoutToken,
  ISignUpData,
  ISignUpResponse,
} from "./types";

export const userProfileApi = async () => {
  const response = await customFetch({ url: "/profile" });
  return response;
};

export const userSignInGoogle = async (data: any) => {
  const response = await customFetch<ILoginResponse>({
    url: "/auth/callback/google",
    method: "POST",
    data,
  });
  return response;
};
export const userSignInFacebook = async (data: any) => {
  const response = await customFetch<ILoginResponse>({
    url: "/auth/callback/facebook",
    method: "POST",
    data,
  });
  return response;
};
export const setUserProfileApi = async (data: any) => {
  const response = await customFetch({
    url: "/profile/update",
    method: "PUT",
    data,
  });
  return response;
};

export const setUserPasswordApi = async (data: any) => {
  const response = await customFetch({
    url: "/profile/update_password",
    method: "POST",
    data,
  });
  return response;
};

export const login = async (data: ILoginPayload) => {
  const response = await customFetch<ILoginResponse>({
    url: "/login",
    data,
    method: "POST",
    customHeaders: {
      Accept: "application/json",
    },
  });
  return response;
};

// TODO: Type defination for data.
export const register = async (data: any) => {

  const response = await axiosClientCustom<{ message: string }>({
    url: "/register",
    data: JSON.stringify(data),
    method: "POST",
  });

  return response;
};

// TODO: Type defination for data.

export const SignUp = async (data: ISignUpData) => {
  const response = await axiosClientCustom<ISignUpResponse>({
    url: `/signup`,
    method: "POST",
    data: JSON.stringify(data),
  });
  return response;
};

// TODO: Type defination for data.
export const merchantCompleteSignUp = async (data: IMerchantFormData) => {
  const response = await axiosClientCustom<ISignUpResponse>({
    url: `/merchant/signup/complete`,
    method: "POST",
    data: data,
    customHeaders: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

// TODO: Type defination for data.
export const charityCompleteSignUp = async (data: any) => {
  const response = await axiosClientCustom<ISignUpResponse>({
    url: "/charity/signup/complete",
    method: "POST",
    data: data,
    customHeaders: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

// TODO: Type defination for data.
export const corporateCompleteSignUp = async (data: ICorporteSignUpData) => {
  const response = await axiosClientCustom<ISignUpResponse>({
    url: "/corporate/signup/complete",
    method: "POST",
    data: JSON.stringify(data),
  });
  return response;
};

export const tokenVerification = async (token: string) => {
  const response = await customFetch<IResponseWithoutToken>({
    url: `/email_verification/${token}`,
  });
  return response;
};
export const resendVerificationEmail = async (email: string) => {
  const response = await customFetch<IResponseWithoutToken>({
    url: `/resendVerificationEmail`,
    method: "POST",
    data: JSON.stringify({ email }),
  });
  return response;
};

export const verifyCaptcha = async ({ token }: { token: any }) => {
  const response = await fetch("/api/verify-captcha", {
    method: "POST",
    body: JSON.stringify(token),
  });

  return await response.json();
};

export const getUserDetails = async () => {
  const response = await clientCustomFetch<IResponseWithoutToken>({
    url: "/details",
  });
  return response;
};
export const resendEmail = async (email: string) => {
  const response = await clientCustomFetch<{
    status: boolean;
    message: string;
  }>({
    url: "/email/resend/verify",
    method: "POST",
    data: email,
    customHeaders: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const getFinalStepInformation = async () => {
  const response = await customFetch<IFinalStepInformationDataResponse>({
    url: `/details`,
  });
  return response;
};
