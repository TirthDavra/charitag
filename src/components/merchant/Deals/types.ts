import {
  ICampaignsType,
  ICampaignsTypeResponse,
} from "@/app/merchant/my-campaigns/types";
import { FeatureImage, MultiSelectValuetypes } from "../types";
import { Option } from "@/components/ui/multiple-selector";

export interface IMerchantDealsCountsResponse {
  status: boolean;
  data: IMerchantDealsCounts;
}

export interface IMerchantDealsCounts {
  in_review_count: number;
  approved_count: number;
  declined_count: number;
  published_count: number;
  all_count: number;
}

export interface IMerchantDealsResponse {
  current_page: number;
  data: IMerchantDeals[];
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
export interface IMerchantDeals {
  id?: number | null;
  title: string;
  short_description: string;
  long_description: string;
  deals_expiry_on: string | number;
  qty: string | number;
  start_date: string;
  end_date: string;
  feature_image: FeatureImage | null;
  merchant_id?: number;
  is_active?: number;
  status?: number;
  product_id: string | number;
  product_variation_id?: string | number;
  action_by?: number;
  last_updated_by?: number;
  deal_type: string | number;
  discount: string | number;
  created_at?: string;
  updated_at?: string;
  deal_category_ids: Option[];
  deal_sub_category_ids: Option[];
}

export interface ILink {
  url: null | string;
  label: string;
  active: boolean;
}

export interface IProductsForDealsResponse {
  status: boolean;
  message: string;
  data: IProductsForDeals[];
}

export interface IProductsForDeals {
  product_name: string;
  id: number;
  is_wishlist: null;
  price: IProductsForDealsPrice | null;
  product_type: number;
}

export interface IProductsForDealsPrice {
  id: number;
  product_id: number;
  variation_id: number;
  regular_price: string;
  sale_price: string;
  donation_percentage: null;
  discount_percentage: null;
  action_by: number;
  last_updated_by: null;
  created_at: string;
  updated_at: string;
}

export interface IDealsTypeResponse extends ICampaignsTypeResponse {}

export interface IDealsType extends ICampaignsType {}

export interface IAddMerchantDealsResponse {
  status: boolean;
  message: string;
  deal_id: number;
}

export interface IAddMerchantDeals {
  id: null | number;
  title: string;
  short_description: string;
  long_description: string;
  deals_expiry_on: 1 | 2;
  qty: number;
  start_date: string | null;
  end_date: string | null;
  feature_image: number | null;
  product_id: number;
  // product_variation_id?: string | number;
  // deal_type: string | number;
  discount: number;
  gallery: number[];
  deal_category_ids: number[];
  deal_sub_category_ids: number[];
}

export interface IMerchantDealDetailsResponse {
  status: boolean;
  data: IMerchantDealDetailsData;
}

export interface IMerchantDealDetailsData {
  id: number;
  title: string;
  short_description: string;
  long_description: string;
  deals_expiry_on: 1 | 2;
  qty: number;
  start_date: string | null;
  end_date: string | null;
  feature_image: FeatureImage;
  gallery: FeatureImage[];
  status: number;
  product_id: number;
  discount: number;
  slug: string;
  deal_price: string;
  sale_price: string;
  product: IMerchantDealDataProduct;
  category: IMerchantDealCategory[];
  subcategory: IMerchantDealCategory[];
}

export interface IMerchantDealCategory {
  id: number;
  name: string;
  image: null;
}

export interface IMerchantDealDataProduct {
  id: number;
  product_name: string;
  feature_image: FeatureImage;
  product_type: 1 | 2;
  price: IMerchantDealProductPrice;
  variations: Variation[];
}

export interface IMerchantDealProductPrice {
  id: number;
  product_id: number;
  sale_price: string;
  regular_price: string;
}

export interface Variation {
  id: number;
  product_id: number;
  parent_product_id: number;
  product: IMerchantDealVariationProduct;
  price: IMerchantDealProductPrice;
}

export interface IMerchantDealVariationProduct {
  id: number;
  product_name: string;
  is_wishlist: null;
  stock_status: string;
  is_stock_status: number;
  category: any[];
  subcategory: any[];
  merchant_name: null;
}

// new productVariations

export interface IProductVariationsResponse {
  status: boolean;
  data: IProductVariationsDataReduced[];
}

export interface IProductVariationsDataReduced {
  id: number;
  product_name: string;
  feature_image: FeatureImage;
  variations: IProductVariationSingle[];
  product_type: 1 | 2;
  price: IProductVariationPrice;
}

export interface IProductVariationPrice {
  id: number;
  product_id: number;
  sale_price: string;
}

export interface IProductVariationSingle {
  id: number;
  product_name: string;
  price: VariationPrice;
}

export interface VariationPrice {
  id: number;
  product_id: number;
  regular_price: string;
  sale_price: string;
  action_by?: null;
  last_updated_by?: null;
  created_at?: Date;
  updated_at?: Date;
  donation_percentage?: string;
  discount_percentage?: string;
}
