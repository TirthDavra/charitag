export interface IMerchantOrderResponse {
  current_page: number;
  data: IMerchantOrders[];
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

export interface IMerchantOrders {
  id: number;
  order_code: string;
  merchant_id: number;
  consumer_id: number;
  total: string;
  date: string;
  total_donation: string;
  total_discount: string;
  shipped_on: string;
  schedule_delivery_from: null;
  deliver_at: null;
  status: number;
  created_at: string;
  updated_at: string;
  order_details: OrderDetail[];
  billing_information: IngInformation;
  shipping_information: IngInformation;
  merchant: Consumer;
  consumer: Consumer;
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
  created_at: string;
  updated_at: string;
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
  created_at: string;
  updated_at: string;
}

export interface OrderDetail {
  id: number;
  order_id: number;
  product_id: number;
  variation_id: number;
  consumer_id: number;
  price: string;
  donation: string;
  discount: string;
  quantity: number;
  total: string;
  created_at: string;
  updated_at: string;
  product: Product;
  variation: null;
}

export interface Product {
  id: number;
  product_code: string;
  product_category_id: number;
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
  action_by: number;
  last_updated_by: null;
  created_at: string;
  updated_at: string;
  inventory: Inventory;
}

export interface FeatureImage {
  id: number;
  filename: string;
  path: string;
  thumbnail_path: string;
  medium_path: string;
  reference_id: null;
  type: number;
  action_by: number;
  created_at: string;
  updated_at: string;
}

export interface Inventory {
  id: number;
  product_id: number;
  variation_id: null;
  sku: string;
  stock_quantity: number;
  low_stock_threshold: string;
  stock_status: number;
  backorders_status: number;
  is_active: number;
  is_stock_management: number;
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

export interface IUpdateOrderStatusResponse {
  status: boolean;
  message: string;
  data: IUpdateOrderStatusData;
}

export interface IUpdateOrderStatusData {
  id: number;
  order_code: string;
  consumer_id: number;
  total: string;
  date: string;
  total_donation: string;
  total_discount: string;
  shipped_on: string | null;
  schedule_delivery_from: string | null;
  deliver_at: string | null;
  status: number;
  created_at: string;
  updated_at: string;
  payment_intent_id: string;
  payment_method_id: number;
  invoice_pdf: string | null;
}

export interface IOrderCountResponse {
  status: boolean;
  data: IOrderCountData;
}

export interface IOrderCountData {
  completed: number;
  processing: number;
  pending_payment: number;
  on_hold: number;
  refunded: number;
  failed: number;
  product: null;
  variation: null;
  deal: null;
}
