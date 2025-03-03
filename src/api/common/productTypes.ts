import { FeatureImage } from "@/components/merchant/types";
import { ICategoryWithSub, IReview } from "./types";
import { IColorItem } from "@/components/merchant/Products/addProduct/ColorAttribute";
import { IDealPrice } from "../user/types";

export interface IProductBySlugResponse {
  status: boolean;
  message: string;
  data: ISingleProductResponse;
}

export interface ISingleProductResponse {
  id: number;
  product_code: string;
  category_ids: string[];
  sub_category_ids: string[];
  product_name: string;
  short_description: string;
  long_description: string;
  store_id: number;
  feature_image: FeatureImage;
  merchant_id: number;
  status: number;
  is_active: number;
  product_type: number;
  which_policies: number;
  is_wishlist: null | number;
  action_by: number;
  last_updated_by?: null;
  created_at?: Date;
  updated_at?: Date;
  slug: string;
  category: Category[];
  attributes: Attribute[];
  variations: Variation[];
  price: Price;
  shipping: Shipping;
  inventory: Inventory;
  gallery: FeatureImage[];
  merchant: Merchant;
  linked_product: {
    up_sells: ILinkedProduct[];
    cross_sells: ILinkedProduct[];
  };
  is_stock_status: number | string;
  reviews: IReview[];
  donation_amount: number;
  subcategory: Category[];
}
export interface ISingleProduct
  extends Omit<ISingleProductResponse, "variations"> {
  variations: VariationFinal;
}

export interface Category {
  id: number;
  name: string;
  image: null;
}

export interface ILinkedProduct {
  product_name: string;
  id: number;
}

export interface Attribute {
  id?: number | null;
  product_id?: number | null;
  name: string;
  created_at?: Date;
  updated_at?: Date;
  values: (IAtrrValues | IColorAtrrValues)[];
}

// for color attribute
export interface IColorAtrrValues {
  id?: number;
  parent_attribute_id?: number;
  name: "Color";
  values: string;
  created_at?: Date;
  updated_at?: Date;
}
// end

export interface IAtrrValues {
  id?: number;
  parent_attribute_id?: number;
  name: string;
  values: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IValObj {
  name: string;
  value: string;
}

export interface Category {
  id: number;
  name: string;
  image: null;
  is_active: number;
  action_by: number;
  last_updated_by: null;
  created_at?: Date;
  updated_at?: Date;
  slug: string;
}

export interface Pivot {
  product_id: number;
  media_id: number;
  created_at?: string;
  updated_at?: string;
  id?: number;
}

export interface Inventory {
  id: number;
  product_id: number;
  variation_id: number | null;
  sku: string;
  stock_quantity: number;
  low_stock_threshold: number;
  stock_status: number;
  backorders_status: number;
  is_active: number;
  is_stock_management: number;
  action_by: number;
  last_updated_by: null;
  created_at?: Date;
  updated_at?: Date;
}

export interface Merchant {
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
  created_at?: Date;
  updated_at?: Date;
}

export interface Price {
  id: number;
  product_id: number;
  variation_id: number | null;
  regular_price: number;
  sale_price: number;
  donation_percentage: number;
  discount_percentage: number;
  is_active: number;
  is_manage_stock_enabled: number;
  action_by: number;
  last_updated_by: null;
  created_at?: Date;
  updated_at?: Date;
  donation_amount: number;
}

export interface Shipping {
  id: number;
  product_id: number;
  variation_id: number | null;
  weight: number;
  length: number;
  width: number;
  height: number;
  shipping_class: string;
  is_active: number;
  is_manage_stock_enabled: number;
  action_by: number;
  last_updated_by: null;
  created_at?: Date;
  updated_at?: Date;
}
export interface VariationFinal {
  [key: string]: Variation;
}
export interface Variation {
  id: number;
  product_id: number;
  variation_combination: string[];
  description: string;
  image: FeatureImage;
  hashcode: string;
  is_active: number;
  is_manage_stock_enabled: number;
  action_by: number;
  last_updated_by?: null;
  created_at?: Date;
  updated_at?: Date;
  shipping: Shipping;
  price: Price;
  inventory: Inventory;
  is_valid: boolean;
  is_stock_status: number;
}

export interface ISingleDealResponse {
  status: boolean;
  message: string;
  data: IDealData;
}

export interface IDealData {
  deal: IDeal;
  product: Product;
  user: User;
}

export interface IDeal {
  id: number;
  title: string;
  short_description: string | null;
  long_description: string | null;
  deals_expiry_on: number;
  qty: number;
  start_date: Date;
  end_date: Date;
  is_active: number;
  product_id: number;
  slug: string;
  discount: number;
  status: number | null;
  price: IDealPrice;
  sale_price: number | string;
  feature_image: FeatureImage | null;
  product_variation_id: null | number;
  variation_product_id: null | number;
  regular_price: number;
  gallery: FeatureImage[];
  donation_amount: number;
  reviews: IReview[];
}

export interface Product {
  id: number;
  product_name: null | string;
  status: null | number;
  is_active: number;
  feature_image: FeatureImage | null;
  variation: DealVariation;
}

export interface DealVariation {
  id: null | number;
  variation_combination: null | string[];
  product_id: null | number;
  is_valid: null | boolean;
  is_active: number;
  is_manage_stock_enabled: null | number;
  variation_product_id: null | number;
}

export interface User {
  first_name: string;
  last_name: string;
  avg_rating: number;
  total_reviews: number;
  about: null;
  postal_code: string;
}

export interface ICartProductWithAttribute extends ISingleProduct {
  item_attributes: string;
}
