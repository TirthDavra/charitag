import {
  ICartProductWithAttribute,
  ISingleProduct,
} from "@/api/common/productTypes";
import { FeatureImage } from "@/components/merchant/types";

export interface ICartResponse {
  status: boolean;
  message: string;
  consumer_id?: number | null;
  data: ICartData;
}

export interface ICartData {
  id: number | null;
  sub_total: number;
  total: number;
  cart_items: ICartItem[];
  charity: {
    id: number;
    charity_name: string;
  }[];
}

export interface Price {
  regular_price: string | number;
  sale_price: string | number;
  donation_amount: number;
  donation_percentage: number;
  discount_percentage: number;
}

export interface ICartItemProduct {
  id: number | null;
  cart_id: number | null;
  product_id: number;
  quantity: number;
  created_at?: Date;
  updated_at?: Date;
  deal_id: null;
  item_attributes: null | string;
  price: Price;
  product_name: string;
  product_slug: string;
  feature_image: FeatureImage | null;
}

export interface ICartItemDeal {
  id: number | null;
  cart_id: number | null;
  product_id: null;
  quantity: number;
  created_at?: Date;
  updated_at?: Date;
  deal_id: number;
  item_attributes: null | string;
  price: Price;
  product_name: string;
  product_slug: string;
  feature_image: FeatureImage | null;
}

export type ICartItem = ICartItemProduct | ICartItemDeal;

export interface ICartDealItem {
  id: number;
  title: string;
  short_description: string | null;
  long_description: string | null;
  deals_expiry_on: number;
  qty: number;
  start_date: Date;
  end_date: Date;
  is_active: number;
  status: number | null;
  product_id: number;
  slug: string;
  discount: number;
  deal_price: number | string;
  sale_price: number | string;
  feature_image: FeatureImage | null;
  action_by?: number;
  merchant_id?: number;
  last_updated_by?: number;
  created_at?: Date;
  updated_at?: Date;
  category_ids?: string[];
  sub_category_ids?: string[];
  donation_amount: number;
  price: IDealPrice;
}

export interface IDealPrice {
  regular_price: number;
  sale_price: number;
  donation_amount: number;
  donation_percentage: number;
  discount_percentage: number;
}
export interface ICartItemWithProduct {
  id: number;
  cart_id?: number | null;
  product_id: number;
  amount: string;
  quantity: number;
  created_at?: Date;
  updated_at?: Date;
  variation_product_id?: null;
  deal_id: null;
  product: ICartProductWithAttribute;
  deal: null;
  item_attributes: string | null;
}

export interface ICartItemWithDeal {
  id: number;
  cart_id?: number | null;
  product_id: null;
  amount: string;
  quantity: number;
  created_at?: Date;
  updated_at?: Date;
  variation_product_id?: null;
  deal_id: number;
  product: null;
  deal: ICartDealItem;
  item_attributes: string | null;
}

export type ICartItemResponse = ICartItemWithProduct | ICartItemWithDeal;
export interface IaddOrUpdateCartItemsResponse {
  status: boolean;
  message: string;
  data: ICartData;
}
