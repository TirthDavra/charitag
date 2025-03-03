import { FeatureImage } from "../../types";

export interface IMerchantOrder {
  status: boolean;
  message: string;
  data: ISOrder;
}

export interface ISOrder {
  order_code: string;
  paid_date: string;
  email: string;
  status: null;
  billing_information: IIngInformation;
  shipping_information: IIngInformation;
  order_items: IOrderItem[];
  subtotal: string;
  total: string;
}

export interface IIngInformation {
  title:        string;
  first_name:   string;
  last_name:    string;
  phone_number: string;
  address:      string;
  address2:     string;
  city:         string;
  state:        string;
  postal_code:  string;
  country:      string;
}

export interface IOrderItem {
  name:       string;
  slug:       string;
  status:     string;
  cost:       string;
  qty:        number;
  item_total: string;
  image:      string;
}

export interface IInformation {
  id: number;
  order_id: number;
  address_line_1: string;
  address_line_2: null | string;
  state: string;
  country: string;
  city: string;
  postal_code: string;
  created_at: Date;
  updated_at: Date;
}

export interface IConsumer {
  id: number;
  type: string;
  email: string;
  first_name: string;
  last_name: string;
  about: null;
  businessName: string;
  city: string;
  country: null;
  postal_code: string;
  website: string;
  phone: string;
  dob: null;
  account_status: string;
  email_verified_at: null;
  created_at: Date;
  updated_at: Date;
}

export interface IOrderDetail {
  id: number;
  order_id: number;
  product_id: number;
  consumer_id: number;
  price: string;
  quantity: number;
  total: string;
  donation: string;
  discount: string;
  created_at: string;
  updated_at: string;
  product: IProduct | null;
  variation: IVariation | null;
  deal: IDeal | null;
  status: string;
  feature_image: FeatureImage;
}

export interface IProduct {
  id: number;
  product_code: string;
  product_category_id: number;
  product_name: string;
  short_description: string;
  long_description: string;
  store_id: number;
  feature_image: FeatureImage;
  photo_gallery: string;
  merchant_id: number;
  status: number;
  is_active: number;
  product_type: number;
  which_policies: number;
  action_by: number;
  last_updated_by: string | null;
  created_at: string;
  updated_at: string;
  inventory: IInventory;
}

export interface IDeal {
  id: number;
  title: string;
  short_description: string;
  long_description: string;
  deals_expiry_on: number;
  qty: number;
  start_date: null;
  end_date: null;
  feature_image: FeatureImage;
  merchant_id: number;
  is_active: number;
  status: number;
  product_id: number;
  action_by: number;
  last_updated_by: number;
  discount: number;
  created_at: Date;
  updated_at: Date;
  category_ids: string[];
  sub_category_ids: any[];
  slug: string;
  deal_price: string;
  sale_price: string;
  is_wishlist: null;
}

export interface IInventory {
  id: number;
  product_id: number;
  variation_id: number;
  sku: string;
  stock_quantity: number;
  low_stock_threshold: string;
  stock_status: number;
  action_by: null | number;
  backorders_status: number;
  last_updated_by: null | string;
  is_active: number;
  is_stock_management: number;
  created_at: string;
  updated_at: string;
}

export interface IVariation {
  id: number;
  attribute_id: number;
  product_id: number;
  description: string;
  image: number;
  action_by: null | number;
  last_updated_by: null | number;
  is_active: number;
  is_manage_stock_enabled: number;
  created_at: string;
  updated_at: string;
  shipping: IShipping;
  price: IPrice;
  inventory: IInventory;
}

export interface IPrice {
  id: number;
  product_id: number;
  variation_id: number;
  regular_price: string;
  sale_price: string;
  donation_percentage: null;
  discount_percentage: null;
  action_by: number;
  last_updated_by: null;
  is_active: number;
  is_manage_stock_enabled: number;
  created_at: Date;
  updated_at: Date;
}

export interface IShipping {
  id: number;
  product_id: number;
  variation_id: number;
  weight: string;
  length: string;
  width: string;
  height: string;
  shipping_class: string;
  action_by: null;
  last_updated_by: null;
  is_active: number;
  is_manage_stock_enabled: number;
  created_at: Date;
  updated_at: Date;
}
