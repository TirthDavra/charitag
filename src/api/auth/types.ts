import { IMerchantFinalStep } from "@/app/(auth)/register/merchant/MerchantForm";
import { CorporateFinalStep } from "@/components/auth/RegisterComponents/CorporateSignUpForm";
import { IOptionType } from "@/components/auth/RegisterComponents/JoiningCategorySection";

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IUserDetails {
  id: number;
  type: 1 | 2 | 3 | 4 | 5;
  email: string;
  first_name: string;
  last_name: string;
  about: string | null;
  businessName: string;
  city: string | null;
  country: string | null;
  postal_code: string;
  website: string;
  phone: string;
  dob: string | null;
  account_status: number;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  is_active: number;
  merchant_id: null;
  profile_image: null;
  slug: string;
  merchant_type_id: null;
  city_id: number;
  country_id: number;
  main_address: string;
  category_ids: string;
  is_profile_completed: number;
  roles: Role[];
  corporate_name: string;
}
export interface Role {
  id: number;
  name: string;
  user_id: number;
  guard_name: string;
  created_at: Date;
  updated_at: Date;
}
export interface ILoginResponse {
  status: boolean;
  user: IUserDetails;
  token: string;
  message: string;
}

export interface IResponseWithoutToken
  extends Omit<ILoginResponse, "token" | "user"> {
  data: IUserDetails;
}
export interface ICategoriesResponse {
  status: boolean;
  data: ICategories[];
}

export interface ICategories {
  id: number;
  title: string;
}

export interface ISignUpResponse {
  message: string;
  status: boolean;
  errors?: string;
}

export interface ICharitySignUpData {
  first_name: string;
  last_name: string;
  charity_name: string;
  email: string;
  password: string;
  confirm_password: string;
  type: number;
}

export interface ISignUpData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  type: number;
  business_name?: string;
  charity_name?: string;
  corporate_name?: string;
}

export interface IMerchantSignUpData
  extends Omit<ICharitySignUpData, "charity_name" | "area_id"> {
  business_name: string;
}

export interface ICorporateSignUpData
  extends Omit<ICharitySignUpData, "charity_name" | "area_id"> {
  corporate_name: string;
}

export interface IMerchantFormData
  extends Omit<IMerchantFinalStep, "category_ids"> {
  remember_token: string;
  category_ids: string;
}

export interface ICorporteSignUpData extends CorporateFinalStep {
  remember_token: string;
}

export interface IFinalStepInformationDataResponse {
  status: boolean;
  data:
    | IFinalStepInformationDataCharity
    | IFinalStepInformationDataMerchant
    | IFinalStepInformationDataCorporate;
}

export interface IBaseFinalStepInformationData {
  id: number;
  type: number;
  email: string;
  first_name: string;
  last_name: string;
  about: string;
  postal_code: string;
  website: string;
  phone: string;
  dob: Date;
  account_status: string;
  email_verified_at: Date;
  created_at: Date;
  updated_at: Date;
  is_active: number;
  reference_id: null;
  profile_image: string;
  slug: string;
  merchant_type_id: null;
  city_id: null;
  country_id: null;
  main_address: string;
  pref_charity_ids: any[];
  is_profile_completed: number;
  document: IDocument[];
  category: IFinalStepCategory[];
}

export interface IFinalStepInformationDataMerchant
  extends IBaseFinalStepInformationData {
  role: 2;
  merchant: IFinalStepMerchant;
}
export interface IFinalStepInformationDataCharity
  extends IBaseFinalStepInformationData {
  role: 3;
  charity: IFinalStepCharity;
}
export interface IFinalStepInformationDataCorporate
  extends IBaseFinalStepInformationData {
  role: 4;
  corpora: IFinalStepCorporation;
}

export interface IFinalStepMerchant {
  id: number;
  status: string;
  user_id: number;
  business_number: string;
  selling_duration: number;
  yearly_revenue: number;
  sku_count: number;
  type: number;
  created_at: Date;
  updated_at: Date;
  email: string;
  country_id: number;
  state_id: number;
  phone: string;
  website: string;
  charity_support: string;
  address_line_1: string;
  address_line_2: string;
  postal_code: string;
  city: string;
  category_ids: string;
}

export interface IDocument {
  id: number;
  file_name: string;
  file_type: string;
  reference_type: string;
  path: string;
  size: number;
  reference_id: number;
  action_by: number;
  last_updated_by: number;
  created_at: Date;
  updated_at: Date;
}

export interface IFinalStepCategory {
  id: number;
  name: string;
  image: null;
  type: number;
  slug: null;
  parent_id: null;
  is_active: number;
  action_by: number;
  last_updated_by: number;
  created_at: Date;
  updated_at: Date;
}

export interface IFinalStepCharity {
  id: number;
  charity_code: null;
  user_id: number;
  charity_name: null;
  charity_short_description: null;
  about: null;
  contact_email: null;
  contact_phone: null;
  contact_website: null;
  blog_url: null;
  contact_facebook: null;
  contact_insta: null;
  contact_twitter: null;
  status: string;
  chairty_banner: null;
  total_fund_target: string;
  charity_profile_image: null;
  charity_category: null;
  charity_subcategory: null;
  charity_type_id: null;
  created_at: Date;
  updated_at: Date;
  feature_image: null;
  logo: null;
  updated_by: number;
  action_by: number;
  slug: string;
  country_id: number;
  registration_number: string;
  number_of_employees: number;
  total_donor_base: number;
  corporate_ids: string;
  organisation_name: null;
  organisation_logo: null;
  category_ids: string;
  area_id: number;
  postal_code: string;
  city: string;
  locations: string;
  state_id: number;
  address_line_1: string;
  address_line_2: string;
  phone: string;
  email: string;
  website: string;
  company_support: string;
}

export interface IFinalStepCorporation {
  id: number;
  name: string;
  description: string;
  short_description: string;
  total_member: null;
  country_id: number;
  feature_image: null;
  user_id: number;
  type_id: number;
  slug: string;
  logo: null;
  status: number;
  action_by: number;
  last_updated_by: number;
  created_at: Date;
  updated_at: Date;
  fundraising_goal: string;
  date_to_achieve_goal: Date;
  number_of_employees: number;
  account_type: null;
  cause: string;
  category_ids: string;
  supporting_charities: string;
  state_id: string;
  address_line_1: string;
  address_line_2: string;
  postal_code: string;
  city: string;
  locations: string;
  phone: string;
  website: string;
  email: string;
}
