import { IProductGallery } from "@/api/merchant/types";
import { FeatureImage } from "../types";
import { IDocument } from "@/api/auth/types";
import { ICategory } from "@/components/consumer/SavedDeals/types";
import { IMerchantInitState } from "./ManageBusinessInfo";

export interface IMerchantProfileResponse {
  status: boolean;
  message: string;
  user: IMerchantProfile;
}

export interface IMerchantProfile {
  id?: number;
  type?: string;
  email: string;
  first_name: string;
  last_name: string;
  about?: null;
  businessName?: string;
  city?: string;
  country?: null;
  postal_code?: string;
  website?: string;
  phone: string;
  dob?: null;
  account_status?: string;
  email_verified_at?: null;
  created_at?: string;
  updated_at?: string;
  merchant_id?: null;
  profile_image: FeatureImage;
  organisation_name?: string;
  organisation_logo?: FeatureImage | number | null;
}

export interface IBankDetailsResponse {
  status: boolean;
  message: string;
  data: IBankDetails;
}

export interface IBankDetails {
  bank_name: string;
  ifsc_code: string;
  account_number: string;
  account_name: string;
  branch_address: string;
  confirm_account_number: string;
}

export interface IStripeDetails {
  account_id: string;
  account_name: string;
  id: number | null;
}

export interface IUpdateBankDetailsResponse {
  status: boolean;
  message: string;
  data: IBankDetails;
}

export interface IUpdatePasswordResponse extends IUpdateBankDetailsResponse {}

export interface IMearchantStoreProfileResponse {
  status: boolean;
  message: string;
  data: IMearchantStoreProfile;
}

export interface IMearchantStoreProfile {
  id?: number;
  merchant_id?: number;
  name: string;
  description: string;
  email?: string;
  phone?: null | string;
  website?: null | string;
  social_media_website?: null | string;
  twitter: string;
  instagram?: null | string;
  linkedin: string;
  facebook: string;
  status?: string;
  about_store: string;
  feature_image: FeatureImage | null;
  address?: null | string;
  action_by?: null | string;
  last_updated_by?: null | string;
  created_at?: string;
  updated_at?: string;
  gallery: FeatureImage[];
  logo: FeatureImage | null;
}

export interface IStorePivot {
  store_id: number;
  media_id: number;
  created_at: string;
  updated_at: string;
}

export interface IUpdateStoreProfileResponse {
  status: boolean;
  message: string;
}

export interface IUpdateStoreProfile {
  name: string;
  description: string;
  about_store: string;
  // email?: string;
  twitter: string;
  // instagram?: string;
  facebook: string;
  linkedin: string;
  feature_image: FeatureImage | number | null;
  gallery: number[];
  logo: FeatureImage | number | null;
}

export interface IMerchantPersonalProfile {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  profile_image: File | null | string;
}

export interface IMerchantBusinessInfoResponse {
  status: boolean;
  user: IMerchantBusinessInfo;
}

export interface IMerchantBusinessInfo {
  id: number;
  status: string;
  user_id: number;
  business_number: string;
  selling_duration: number;
  yearly_revenue: number;
  sku_count: number;
  type: number;
  created_at: string;
  updated_at: string;
  email: string;
  country: ICountryAndState;
  state: ICountryAndState;
  phone: null;
  website: null;
  charity_support: string;
  address_line_1: string;
  address_line_2: string | null;
  postal_code: string;
  city: string;
  category_ids: string;
  businessName: string;
  document: IDocument[];
  categories: ICategory[];
}

export interface ICountryAndState {
  id: number;
  name: string;
}

export interface IMerchantBusniessData
  extends Omit<
    IMerchantInitState,
    "category_ids" | "categories" | "initialFiles" | "country_id" | "state_id"
  > {
  category_ids: number[];
  state_id: number;
  country_id: number;
}

export interface IUpdateMerchantBusinessInfoResponse {
  status: boolean;
  message: string;
  data: IMerchantBusinessInfo;
}
