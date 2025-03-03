export interface IMerchantProduct {
  current_page: number;
  data: IProductslist[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface IProductslist {
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
  is_visible: 0 | 1; // 1 = visible 0 = not visible
  product_type: number;
  which_policies: number;
  action_by: null;
  last_updated_by: null;
  created_at: Date;
  updated_at: Date;
  inventory: Inventory;
  is_stock_status: number;
  stock_status: number;
  price: Price;
  shipping: Shipping;
  category: ICategory;
  DT_RowIndex: number;
  is_stock_management: number;
  slug: string;
}

export interface ICategory {
  id: number;
  name: string;
  image: null;
  is_active: number;
  action_by: number;
  last_updated_by: null;
  created_at: Date;
  updated_at: Date;
}

export interface FeatureImage {
  id: number;
  filename: string;
  path: string;
  thumbnail_path: string;
  medium_path: string;
  reference_type: string;
  reference_id: number;
  type: number;
  action_by: number;
  created_at: Date;
  updated_at: Date;
}

export interface Inventory {
  id: number;
  product_id: number;
  variation_id: null;
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

export interface Price {
  id: number;
  product_id: number;
  variation_id: null;
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
  variation_id: null;
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
  length: string;
}

export interface ProductCounts {
  in_review_count: number;
  approved_count: number;
  declined_count: number;
  on_deal_count: number;
  draft_count: number;
  all_count: number;
  published_count: number;
}

export interface Query {
  query: string;
  bindings: any[];
  time: number;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}
