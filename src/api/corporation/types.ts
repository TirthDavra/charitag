import { FeatureImage } from "@/components/merchant/types";

export interface ICorporateAddOrEdit {
  title: string;
  description: string;
  short_description: string;
  charity_id: string | number;
  total_fund_target: number | string;
  feature_image: FeatureImage | number | null;
  campaign_type: number | string;
  gallery: FeatureImage[] | number[];
  start_date: string;
  end_date: string;
}

export interface IAddCorporateCampaignsResponse {
  status: boolean;
  message: string;
  campaign_id: number | string;
}

export interface ICorporateCampaignResponse {
  current_page: number;
  data: ICorporateCampaign[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface ICorporateCampaign {
  id: number;
  title: string;
  description: string;
  total_fund_target: string;
  feature_image: FeatureImage;
  status: number;
  merchant_id: null;
  action_by: number;
  last_updated_by: number;
  created_at: string;
  updated_at: string;
  short_description: string;
  charity_id: number;
  start_date: string;
  end_date: string;
  gallery: FeatureImage[];
  slug: null;
  country_id: null;
  corporate_user_id: number;
  total_fung: number;
  corporate: null;
  total_raised: number;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}

export interface ICorporateCampaignDetailResponse {
  status: boolean;
  data: ICorporateCampaignDetail;
}

export interface ICorporateCampaignDetail {
  id: number;
  title: string;
  description: string;
  total_fund_target: string;
  feature_image: FeatureImage;
  status: number;
  merchant_id: null;
  action_by: number;
  last_updated_by: number;
  created_at: string;
  updated_at: string;
  short_description: string;
  charity_id: number;
  start_date: string;
  end_date: string;
  slug: null;
  country_id: null;
  corporate_user_id: number;
  gallery: FeatureImage[];
  campaign_type: string | number;
}

export interface Pivot {
  campaign_id: number;
  media_id: number;
}

export interface ICorporateProfileResponse {
  status: boolean;
  message: string;
  user: ICorporateProfile;
}

export interface ICorporateProfile {
  id: number;
  type: string;
  email: string;
  first_name: string;
  last_name: string;
  corporate_name: string;
  about: null;
  city: null;
  postal_code: string;
  website: null;
  phone: string;
  dob: null;
  account_status: string;
  email_verified_at: Date;
  created_at: Date;
  updated_at: Date;
  is_active: number;
  merchant_id: null;
  profile_image: FeatureImage;
  slug: string;
  merchant_type_id: number;
  city_id: null;
  country_id: null;
  main_address: string;
  category_ids: string;
  pref_charity_ids: number[];
  is_profile_completed: number;
  charity: null;
}

export interface IUniqueCodeResponse {
  status: boolean;
  data: IUniqueCode;
}

export interface IUniqueCode {
  unique_code: string;
}

export interface ICorporateOrganizationResponse {
  status: boolean;
  message: string;
  data: ICorporateOrganizationData;
}

export interface ICorporateOrganizationData {
  id: number;
  name: string;
  description: string;
  short_description: string;
  total_member: number;
  country_id: number;
  feature_image: number;
  user_id: number;
  type_id: number;
  slug: string;
  logo: number;
  status: number;
  action_by: number;
  last_updated_by: number;
  created_at: Date;
  updated_at: Date;
  fundraising_goal: string;
  date_to_achieve_goal: Date;
  number_of_employees: number;
  account_type: number;
  cause: string;
  category_ids: null;
  supporting_charities: string;
  state_id: null;
  address_line_1: null;
  address_line_2: null;
  postal_code: null;
  city: null;
  locations: null;
  phone: string;
  website: string;
  email: string;
}
