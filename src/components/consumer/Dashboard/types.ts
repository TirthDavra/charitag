import { ICharitiesForHome, IDataData } from "@/api/common/types";

export interface IConsumerDashboardResponse {
  status: boolean;
  data: IConsumerDashboardData;
  message: string;
}

export interface IConsumerDashboardData {
  consumer: IConsumerDetails;
  days_remaining: string;
  order: IConsumerOrder;
  review: IConsumerReview;
  charity: ICharitiesForHome;
  donation: IConsumerDonation;
}

export interface IConsumerDetails {
  id: number;
  type: string;
  email: string;
  first_name: string;
  last_name: string;
  about: null;
  city: null;
  postal_code: null;
  website: null;
  phone: string;
  dob: string;
  account_status: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  is_active: number;
  merchant_id: null;
  profile_image: string;
  slug: string;
  merchant_type_id: number;
  city_id: null;
  country_id: null;
  main_address: string;
  category_ids: string;
  pref_charity_ids: string[];
  is_profile_completed: number;
}

export interface IConsumerDonation {
  number_of_donations: number;
  total_donations: number;
}

export interface IConsumerOrder {
  id: number;
  order_code: string;
  consumer_id: number;
  total: string;
  date: string;
  total_donation: null;
  total_discount: null;
  shipped_on: null;
  schedule_delivery_from: null;
  deliver_at: null;
  status: number;
  created_at: null;
  updated_at: null;
  payment_intent_id: null;
}

export interface IConsumerReview {
  id: number;
  product_id: number;
  customer_id: number;
  rating: number;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
  product: IDataData;
}
