import { ILink } from "@/api/merchant/types";
import { FeatureImage } from "@/components/merchant/types";

export interface _IGetOrdersRespone {
  current_page: number;
  data: IOrder[];
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

export interface IProduct {
  id: number;
  store_id: number;
  product_code: string;
  product_category: number;
  product_name: string;
  product_description: string;
  feature_image: FeatureImage;
  photo_gallery: string;
  amount: string;
  quantity: number;
  merchant_id: number;
  merchant_name?: string;
  status: number;
  donation_percentage: number;
  discount_percentage: number;
  created_at: string;
  updated_at: string;
  short_description: string;
  is_wishlist: any; // Update the type as per requirement
  slug: string;
}

export interface IOrderDetails {
  id: number;
  order_id: number;
  product_id: number | null;
  merchant_id: number;
  price: string;
  consumer_id: number;
  total: string;
  donation: string;
  discount: string;
  created_at: string;
  updated_at: string;
  product: IProduct;
  quantity: number;
  deal_id: number | null;
  variation: null;
  deal: IDeal | null;
  regular_price: number;
  sale_price: number;
  item_type: number;
}

export interface IDeal {
  id: number;
  title: string;
  short_description: string;
  feature_image: FeatureImage;
  slug: string;
}
interface IAddress {
  id: number;
  order_id: number;
  address_line_1: string;
  address_line_2: string | null;
  state: string;
  country: string;
  city: string;
  postal_code: string;
  created_at: string;
  updated_at: string;
}

export interface _IOrder {
  id?: number;
  order_code?: string;
  consumer_id?: number;
  total?: string;
  date: string;
  total_donation?: string;
  total_discount?: string;
  shipped_on?: string;
  schedule_delivery_from?: string | null;
  deliver_at?: string | null;
  status?: number;
  created_at?: string;
  updated_at?: string;
  order_details?: IOrderDetails[];
  billing_information?: IAddress;
  shipping_information?: IAddress;
}

// new order type

export interface IGetOrder {
  status: boolean;
  data: IGetOrdersRespone[];
}

export interface IGetOrdersRespone {
  is_archived: boolean;
  order_code: string;
  total: number;
  date: Date;
  id: number;
  order_details: IOrder[];
}

export interface IOrder {
  id: number;
  order_id: number;
  merchant_id: number;
  product_id: number;
  quantity: number;
  total: string;
  status: string;
  delivered_on: null;
  support_exist: SupportExist;
  store_name: string;
  feature_image: OrderDetailFeatureImage;
  product: Product;
}

export interface SupportExist {
  id: number;
  request_id: string;
  status: string;
}

export interface OrderDetailFeatureImage {
  id: number;
  filename: string;
  reference_id: number;
  gallery_type: number;
  medium_path: string;
  path: string;
  thumbnail_path: string;
}

export interface Product {
  id: number;
  product_name: string;
  merchant_id: number;
  is_wishlist: null;
  slug: string;
  feature_image: number;
  status: number;
  stock_status: number;
  category: any[];
  subcategory: any[];
  merchant_name: string;
}

export interface IReviewRespone {
  status: boolean;
  message: string;
  review: IReview;
}

export interface IReview {
  model?: string;
  model_id?: number;
  user_id?: number;
  rating: string;
  description: string;
  updated_at?: Date;
  created_at?: Date;
  id?: number;
  product_id: number;
}

export interface IOrderDetailRespone {
  status: boolean;
  data: IOrderDetailData;
}

export interface IOrderDetailData {
  order_id: string;
  total: string;
  date: Date;
  id: number;
  is_archived: boolean;
  payment_method_id: string;
  delivery: number;
  total_discount: string;
  address: ISingleOrderAddress;
  payment_method: PaymentMethod;
  tax: number;
  shipping_charge: number;
  discount_pr: number;
  estimated_delivery_date: Date;
  sub_total: number;
  order_details: ISingleOrderDetailData[];
}

export interface ISingleOrderAddress {
  id: number;
  address: string;
  address2: null;
  city: string;
  postal_code: string;
  state_id: number;
  country_id: number;
  state: string;
  country: string;
}

export interface PaymentMethod {
  id: number;
  brand: string;
  last4: string;
  card_type: string;
}

export interface ISingleOrderDetailData {
  id: number;
  order_id: number;
  merchant_id: number;
  product_id: number;
  quantity: number;
  total: string;
  status: string;
  delivered_on: Date;
  store_name: string;
  feature_image: OrderDetailFeatureImage;
  product_detail: Product;
}

export interface IGerReviewRespone {
  status: boolean;
  data: IGerReviewData;
}

export interface IGerReviewData {
  product_name: string;
  product_id: number;
  product_slug: string;
  product_image: string;
  merchant_name: string;
  rating: string | number;
  description: string;
}

export interface IChatHistoryRespone {
  status: boolean;
  data: IChatHistoryData[];
}

export interface IChatMessageAddRespone {
  status: boolean;
  data: IChatHistoryData;
}

export interface IChatHistoryData {
  id: number;
  sender_image: string;
  sender_name: string;
  receiver_image: string;
  receiver_name: string;
  created_at: string;
  message: string;
  receiver_id: number;
  sender_id: number;
  cmSupportId?: string;
}

export interface ISupportOrderRespone {
  status: boolean;
  data: ISupportOrderData;
}

export interface ISupportOrderData {
  id: number;
  status: string;
  title: string;
  request_id: string;
  description: string;
  created_on: Date;
  product_detail: ProductDetail;
}

export interface ProductDetail {
  product_image: ProductImage;
  product_name: string;
  slug: string;
  merchant_name: string;
  product_attributes: ProductAttribute[];
}

export interface ProductImage {
  medium_path: string;
  path: string;
  thumbnail_path: string;
}

export interface ProductAttribute {
  parent_name: string;
  child: ChildAttribute;
}

export interface ChildAttribute {
  name: string;
  values: string;
}
