import { ICharityCampaignBySlug, IReview } from "@/api/common/types";
import { FeatureImage } from "@/components/merchant/types";

export interface ISinglePreviousCampaignResponse {
  status: boolean;
  message: string;
  data: ISinglePreviousCampaignData;
}

export interface ISinglePreviousCampaignData {
  campaign: ISinglePreviousCampaign;
  previous: ICharityCampaignBySlug[];
}

export interface ISinglePreviousCampaign {
  id: number;
  title: string;
  description: string;
  total_fund_target: number;
  feature_image: number;
  status: number;
  merchant_id: null;
  action_by: number;
  last_updated_by: number;
  created_at: Date;
  updated_at: Date;
  short_description: string;
  charity_id: number;
  start_date: string;
  end_date: string;
  slug: string;
  country_id: number;
  corporate_user_id: null;
  days_remaining: string;
  raised_amount: number;
  last_donation: string;
  total_raised: number;
  total_donation: string;
  reviews: IReview[];
  gallery: FeatureImage[];
  reviews_count: number;
  rating: number;
}

export interface IListResponse {
  status: boolean;
  data: IListData[];
}

export interface IListData {
  title: string;
  id: number;
}

export interface ListCampaignsParams {
  is_previous: boolean;
  is_active: boolean;
}