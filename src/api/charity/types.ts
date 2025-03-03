import { IAddMerchantCampaigns } from "@/app/merchant/my-campaigns/types";
import {
  IMerchantProfile,
  IMerchantProfileResponse,
} from "@/components/merchant/MyAccount/types";
import { FeatureImage } from "@/components/merchant/types";
import { ICorporateCampaignDetail } from "../corporation/types";
import { IDocument } from "../auth/types";
import { ICharityInformationInitialState } from "@/components/charity/MyProfile.tsx/ManageCharityInformation";
import { IMainCharityLocation } from "@/components/charity/MyProfile.tsx/ManageCharityLocations";
import { Option } from "@/components/ui/multiple-selector";

export interface ICharityProfileResponse {
  status: boolean;
  message: string;
  user: ICharityProfile;
}

export interface ICharityProfile {
  id: number;
  type: string;
  email: string;
  first_name: string;
  last_name: string;
  about: null;
  city: null;
  postal_code: null;
  website: string;
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
  pref_charity_ids: any[];
  is_profile_completed: number;
  charity: Icharity;
}

export interface Icharity extends Charity {
  organisation_name: string;
  organisation_logo: FeatureImage | null;
}

export interface ICharityProfileData {
  first_name: string;
  last_name: string;
  phone: string;
  website: string;
  organisation_name: string;
  organisation_logo: FeatureImage | number | null;
  profile_image: File | string | null;
}

export interface ICharityCampaignResponse {
  current_page: number;
  data: ICharityCampaign[];
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

export interface ICharityCampaign {
  id: number;
  title: string;
  description: string;
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
  charity_id: number;
  from: null;
  to: null;
  charity: ICharity;
  type: IType;
  total_fund?: number;
  total_raised: number;
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
  user_id: number;
}
export interface IType {
  id: number;
  flag: string;
  title: string;
  type_id: number;
  created_at: string;
  updated_at: string;
}

export interface ILink {
  url: null | string;
  label: string;
  active: boolean;
}

export interface ICharitySupportCountResponse {
  status: boolean;
  data: ICharitySupportCount;
}

export interface ICharitySupportCount {
  open_count: number;
  closed_count: number;
  all_count: number;
}

export interface ICharitySupportResponse {
  current_page: number;
  data: ICharitySupportData[];
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

export interface ICharitySupportData {
  id: number;
  request_id: number;
  user_id: number;
  admin_id: number;
  title: string;
  status: string;
  media: number;
  action_by: number;
  last_updated_by: null;
  created_at: string;
  updated_at: string;
}
export interface ILink {
  url: null | string;
  label: string;
  active: boolean;
}

export interface ICharitySupport {
  messages: IMessage[];
}

export interface IMessage {
  id: number;
  store_support_id: number;
  customer_id: number;
  merchant_id: number;
  message: string;
  is_read: number;
  action_by: number;
  last_updated_by: null;
  created_at: string;
  updated_at: string;
  sender_id: number;
  is_sender: boolean;
  customer: ICustomer;
}

export interface ICustomer {
  id: number;
  type: string;
  email: string;
  first_name: string;
  last_name: string;
  about: null;
  businessName: null;
  city: null;
  country: null;
  postal_code: null;
  website: null;
  phone: string;
  dob: string;
  account_status: string;
  email_verified_at: null;
  created_at: string;
  updated_at: string;
  is_active: number;
  merchant_id: null;
  profile_image: null;
}

export interface IAllCharitiesResponse {
  status: boolean;
  message: string;
  data: ICharity[] | ICharityOnlyName[];
}

export interface ICharityOnlyName {
  charity_name: string;
  charity_profile_image: string;
  id: number;
}
export interface ICompaignByCharityResponse {
  status: boolean;
  data: ICompaign[];
}

export interface ICompaign {
  id: number;
  title: string;
  description: string;
  total_fund_target: string;
  feature_image: number;
  status: number;
  merchant_id: number;
  action_by: number;
  last_updated_by: number;
  created_at: Date;
  updated_at: Date;
  short_description: string;
  charity_id: number;
  start_date: Date;
  end_date: Date;
}

export interface ISingleCompaignResponse {
  status: boolean;
  message: string;
  data: Data;
}

export interface Data {
  id: number;
  title: string;
  description: string;
  total_fund_target: number;
  feature_image: FeatureImage;
  status: number;
  merchant_id: number;
  action_by?: number;
  last_updated_by?: number;
  created_at?: Date;
  updated_at?: Date;
  short_description: string;
  charity_id: number;
  start_date: Date;
  end_date: Date;
  slug: string;
  country_id: number;
  days_remaining: string;
  raised_amount: number;
  last_donation: string;
  total_raised: number;
  total_donation: string;
  gallery: FeatureImage[];
  charity: Charity;
  country: Country;
  progress_percentage: string;
}

export interface Charity {
  id: number;
  charity_id: number;
  charity_name: string;
  charity_short_description: string;
  about: string;
  contact_email: string;
  contact_phone: string;
  contact_website: string;
  blog_url: string;
  contact_facebook: string;
  contact_insta: string;
  contact_twitter: string;
  status: string;
  date_created: Date;
  date_updated: Date;
  chairty_banner: string;
  charity_logo: string;
  charity_profile_image: string;
  charity_category: string;
  charity_subcategory: string;
  user_id: null;
  charity_type_id: number;
  feature_image: FeatureImage;
  logo: FeatureImage;
  updated_by: null;
  action_by: null;
  created_at: Date;
  updated_at: Date;
  slug: string;
  country_id: number;
  type: Type;
}

export interface Type {
  id: number;
  flag: string;
  title: string;
  created_at: null;
  updated_at: null;
}

export interface Country {
  name: string;
  id: number;
}

export interface IAddCharityCampaignsResponse {
  status: boolean;
  message: string;
  campaign_id: number | string;
}

export interface IAddCharityCampaigns
  extends Omit<IAddMerchantCampaigns, "charity_id" | "campaign_type"> {}

export interface ICharityCampaignDetailResponse {
  status: boolean;
  data: ICorporateCampaignDetail;
}

export interface ICharityCampaignDetail
  extends Omit<ICorporateCampaignDetail, "campaign_type"> {}

export interface ILiveupdatesRespones {
  status: boolean;
  message: string;
  data: ILiveupdatesData;
}

export interface ILiveupdatesData {
  current_page: number;
  data: ILiveupdates[];
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

export interface ILiveupdates {
  type: string;
  reference_id: number;
  deal_id: number | null;
  consumer_id: number;
  total_percentage: string;
  total_donation: string;
  created_at: string;
  product_id: number;
  name: string;
  merchant_id: number;
  email: string;
  donor_name: string;
  thumbnail_path: string;
  feature_image: string;
  filename: string;
  media_type: number;
  merchant_name: string;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}

export interface IGetSupportMessagesResponse {
  status: boolean;
  data: IGetSupportMessages[];
}

export interface IGetSupportMessages {
  message: string;
  created_at: string;
  sender_id: number;
  id: number;
  sender: IReceiver;
  receiver: IReceiver;
  sender_profile_image: string;
  receiver_profile_image: string;
}

export interface IReceiver {
  id: number;
  first_name: string;
  last_name: string;
  profile_image: string;
  role: null;
  category: any[];
  type: null;
}

export interface IAddNewMeassageResponse {
  status: boolean;
  message: string;
  data: IAddNewMeassage;
}

export interface IAddNewMeassage {
  admin_support_id: string;
  receiver_id: number;
  message: string;
  sender_id: number;
  updated_at: string;
  created_at: string;
  id: number;
  received_id: number;
  sender: IReceiver;
  receiver: IReceiver;
  sender_profile_image: string;
  receiver_profile_image: string;
}

export interface ICharityInfoResponse {
  status: boolean;
  message: string;
  data: ICharityInfoData;
}

export interface ICharityInfoData {
  charity: ICharityData;
  document: IDocument[];
}

export interface ICharityData {
  id: number;
  charity_id: number;
  charity_name: string;
  charity_short_description: string;
  about: string;
  contact_email: string;
  contact_phone: string;
  contact_website: string;
  blog_url: string;
  contact_facebook: string;
  contact_insta: string;
  contact_twitter: string;
  status: string;
  date_created: Date;
  date_updated: Date;
  chairty_banner: string;
  charity_logo: string;
  charity_profile_image: string;
  charity_category: string;
  charity_subcategory: string;
  user_id: null;
  charity_type_id: number;
  feature_image: number;
  logo: number;
  updated_by: null;
  action_by: null;
  created_at: Date;
  updated_at: Date;
  slug: string;
  country_id: number;
  registration_number: string;
  number_of_employees: number;
  total_donor_base: number;
  corporate_ids: null;
  category_ids: string;
  area_id: number;
  organisation_name: null;
  organisation_logo: null;
  total_fund_target: string;
  company_support: string;
  website: string;
  email: string;
  phone: null;
  address_line_2: null;
  address_line_1: null;
  state_id: null;
  locations: null;
  city: null;
  postal_code: null;
  last_donation: null;
  total_raised: number;
}

export interface ICarityInfoUpdateData
  extends Omit<
    ICharityInformationInitialState,
    "initialFiles" | "remove_doc"
  > {}

export interface ICharityInfoUpdateResponse {
  status: boolean;
  message: string;
  data: ICharityData;
}

export interface ICharityAllAddressesResponse {
  success: boolean;
  data: ICharityAddresses[];
}

export interface ICharityAddresses {
  id?: number;
  address: string;
  address2?: string;
  city: string;
  state_id?: number;
  country_id?: number;
  postal_code: string;
  is_default?: boolean;
  user_id?: number;
  state?: string;
  country?: string;
}

export interface IAddOrUpdateCharityAddressData
  extends Omit<IMainCharityLocation, "state_id" | "country_id"> {
  state_id: number;
  country_id: number;
}

export interface IAddOrUpdateCharityAddressResponse {
  status: boolean;
  message: string;
  data: ICharityAddresses;
}

export interface IAddressResponseById {
  status: boolean;
  data: ICharityAddressesById;
}

export interface ICharityAddressesById
  extends Omit<ICharityAddresses, "state" | "country"> {
  state: {
    id: number;
    name: string;
  };
  countries: {
    id: number;
    name: string;
  };
}

export interface ICharityAddressByIdData
  extends Omit<ICharityAddresses, "state_id" | "country_id" | "address2"> {
  state_id: Option | null;
  country_id: Option | null;
  address2: string;
}
