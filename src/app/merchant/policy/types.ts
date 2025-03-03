export interface IGetOrdelist {
  draw: number;
  recordsTotal: number;
  recordsFiltered: number;
  data: IProdutsList[];
  order_counts: OrderCounts;
  disableOrdering: boolean;
  queries: Query[];
  input: Input;
}

export interface IProdutsList {
  id: number;
  order_code: string;
  merchant_id: number;
  consumer_id: number;
  total: string;
  date: Date;
  total_donation: string;
  total_discount: string;
  shipped_on: Date;
  schedule_delivery_from: null;
  deliver_at: null;
  status: number;
  created_at: Date;
  updated_at: Date;
  order_detail: OrderDetail[];
  billing_information: IngInformation;
  shipping_information: IngInformation;
  merchant: Consumer;
  consumer: Consumer;
  DT_RowIndex: number;
}

export interface IngInformation {
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

export interface Consumer {
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

export interface OrderDetail {
  id: number;
  order_id: number;
  product_id: number;
  variation_id: number;
  consumer_id: number;
  price: string;
  quantity: number;
  total: string;
  donation: string;
  discount: string;
  created_at: Date;
  updated_at: Date;
  product: Product;
  variation: Variation | null;
}

export interface Product {
  id: number;
  product_code: string;
  product_category_id: number;
  product_name: string;
  short_description: string;
  long_description: string;
  store_id: number;
  feature_image: number;
  photo_gallery: string;
  merchant_id: number;
  status: number;
  is_active: number;
  product_type: number;
  which_policies: number;
  action_by: null;
  last_updated_by: null;
  created_at: Date;
  updated_at: Date;
  inventory: Inventory;
}

export interface Inventory {
  id: number;
  product_id: number;
  variation_id: number;
  sku: string;
  stock_quantity: number;
  low_stock_threshold: string;
  stock_status: number;
  action_by: null;
  backorders_status: number;
  last_updated_by: null;
  is_active: number;
  is_stock_management: number;
  created_at: Date;
  updated_at: Date;
}

export interface Variation {
  id: number;
  attribute_id: number;
  product_id: number;
  description: string;
  image: number;
  action_by: null;
  last_updated_by: null;
  is_active: number;
  is_manage_stock_enabled: number;
  created_at: Date;
  updated_at: Date;
  shipping: Shipping;
  price: Price;
  inventory: Inventory;
}

export interface Price {
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

export interface Shipping {
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

export interface Input {
  consumer_id: string;
}

export interface OrderCounts {
  completed: number;
  processing: number;
  pending_payment: number;
  on_hold: number;
  refunded: number;
  failed: number;
}

export interface Query {
  query: string;
  bindings: Array<number | string>;
  time: number;
}
