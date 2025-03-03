import { FeatureImage } from "@/components/merchant/types";

export interface IMerchantCampaignsCountResponse {
  status: boolean;
  data: IMerchantCampaignsCount;
}

export interface IMerchantCampaignsCount {
  in_review_count: number;
  published_count: number;
  all_count: number;
}

export interface IMerchantCampaignsResponse {
  current_page: number;
  data: IMerchantCampaigns[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: ILink[];
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface IMerchantCampaigns {
  id?: number;
  title: string;
  description: string;
  short_description: string;
  charity_id: string | number;
  total_fund_target: string | number;
  feature_image: FeatureImage | null;
  campaign_type: string | number;
  status?: number;
  merchant_id?: number;
  action_by?: number;
  last_updated_by?: number;
  created_at?: string;
  updated_at?: string;
  gallery: FeatureImage[];
  charity?: ICharity;
  type?: IType | null;
  start_date: string;
  end_date: string;
  total_raised?: number
}

export interface IType {
  id: number;
  flag: string;
  title: string;
  type_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface ICharity {
  id: number;
  charity_id: number;
  charity_name: string;
  charity_short_description: string;
  charity_type: string;
  about: string;
  contact_email: string;
  contact_phone: string;
  contact_website: string;
  blog_url: string;
  contact_facebook: string;
  contact_insta: string;
  contact_twitter: string;
  status: string;
  date_created: string;
  date_updated: string;
  chairty_banner: string;
  charity_logo: string;
  charity_profile_image: string;
  charity_category: string;
  charity_subcategory: string;
}

export interface ILink {
  url: null | string;
  label: string;
  active: boolean;
}

export interface IMerchantCharitiesResponse {
  status: boolean;
  message: string;
  data: IMerchantCharities[];
}

export interface IMerchantCharities {
  charity_name: string;
  charity_profile_image: string;
  id: number;
}

export interface ICampaignsTypeResponse {
  status: boolean;
  data: ICampaignsType[];
}

export interface ICampaignsType {
  id: number;
  flag: string;
  title: string;
  type_id: number;
  created_at: string;
  updated_at: string;
}

export interface IAddMerchantCampaignsResponse {
  status: boolean;
  message: string;
  campaign_id: number | string;
}

export interface IAddMerchantCampaigns {
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

export interface IMerchantCampaignDetailsResponse {
  status: boolean;
  data: IMerchantCampaignDetails;
}

export interface IMerchantCampaignDetails {
  id: number;
  title: string;
  description: string;
  charity_id: number;
  total_fund_target: string;
  feature_image: FeatureImage;
  campaign_type: number;
  status: number;
  merchant_id: number;
  action_by: number;
  last_updated_by: number;
  created_at: string;
  updated_at: string;
  short_description: string;
  gallery: FeatureImage[];
  start_date: string;
  end_date: string;
}
