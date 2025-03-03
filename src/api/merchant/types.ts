import { FeatureImage } from "@/components/merchant/types";

export interface IProductsCount {
  status: boolean;
  data: IData;
}

export interface IData {
  published_count: number;
  in_review_count: number;
  approved_count: number;
  declined_count: number;
  on_deal_count: number;
  draft_count: number;
  all_count: number;
}

export interface IProductGallery {
  id: number;
  filename: string;
  path: string;
  thumbnail_path: string;
  medium_path: string;
  reference_id: number | null;
  type: number;
  action_by: number;
  created_at: string;
  updated_at: string;
}

// Product Category
export interface IProductCategoryResponse {
  status: boolean;
  message: string;
  data: IProductCategory[];
}

// Product Sub Category
export interface IProductSubCategory {
  status: boolean;
  message: string;
  data: IProductCategory[];
}

export interface IProductCategory {
  id: number;
  name: string;
  image?: null;
  type: number;
  slug?: null;
  parent_id: number;
  is_active: number;
  action_by?: number;
  last_updated_by: number;
  created_at?: Date;
  updated_at?: Date;
  products_count: number;
}

// Product Attributes

export interface IProductAttributes {
  status: boolean;
  message: string;
  data: IAttribute[];
}

export interface IAttribute {
  id: number;
  name: string;
  values: string[];
  action_by?: number;
  last_updated_by?: number | null;
  created_at?: Date;
  updated_at?: Date;
}

export interface IAddProductResponse {
  status: boolean;
  message: any;
  product_id: number;
  product_slug: string;
}

export interface IMerchantInventory {
  current_page: number;
  data: IMInventory[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: ILink[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface IMInventory {
  id: number;
  product_id: number;
  variation_id: number | null;
  sku: Sku;
  stock_quantity: number;
  low_stock_threshold: string;
  stock_status: number;
  backorders_status: number;
  is_active: number;
  is_stock_management: number;
  action_by: number;
  last_updated_by: null;
  created_at: Date;
  updated_at: Date;
  product: IInventoryProduct;
  variation: IInventoryVariation;
}

export interface IInventoryProduct {
  id: number;
  product_code: string;
  product_category_id: number;
  product_name: IProductName;
  short_description: IDescription;
  long_description: IDescription;
  store_id: number;
  feature_image: number;
  merchant_id: number;
  status: number;
  is_active: number;
  product_type: number;
  which_policies: number;
  action_by: number;
  last_updated_by: null;
  is_stock_status: number;
}

export enum IDescription {
  DescriptionForTestProduct01 = "description for test product 01",
}

export enum IProductName {
  Sasas = "sasas",
  Tessaxast = "tessaxast",
  Test = "test",
}

export enum Sku {
  Sasa = "sasa",
}

export interface IInventoryVariation {
  id: number;
  variation_combination: string[];
  product_id: number;
  description: string;
  image: number;
  is_active: number;
  is_manage_stock_enabled: number;
  action_by: number;
  last_updated_by: null;
}

export interface ILink {
  url: null | string;
  label: string;
  active: boolean;
}

export interface IMInventoryCounts {
  status: boolean;
  data: IInventoryCounts;
}

export interface IInventoryCounts {
  all_count: number;
  in_stock: string;
  out_of_stock: string;
  low_stock: string;
  on_backorder: number;
}

export interface IMerchantShippingZoneResponse {
  current_page: number;
  data: IMerchantShipping[];
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

export interface IMerchantShipping {
  id: number;
  name: string;
  regions: string;
  description: null;
  is_shipping_flat_rate: number;
  is_shipping_free_shipping: number;
  merchant_id: number;
  action_by: number;
  last_updated_by: number;
  created_at: string;
  updated_at: string;
}

export interface ILink {
  url: null | string;
  label: string;
  active: boolean;
}

// export interface IQuery {
//   query: string;
//   bindings: string[];
//   time: number;
// }

export interface IInventoryProducts {
  status: boolean;
  message: string;
  data: IMProducts[];
}

export interface IMProducts {
  product_name: string;
  id: number;
}

export interface IAddOrEditShippingZone {
  status: boolean;
  message: any;
}

export interface IShppingZone {
  name: string;
  regions: string;
  is_shipping_flat_rate: number;
  is_shipping_free_shipping: number;
}

export interface IAddTaxResponse {
  status: boolean;
  message: string;
}

export interface ITax {
  automated_tax: number;
  price_with_tax: number;
  tax_based_on: number | string;
  shipping_tax_class: number | string;
  tax_round_at_subtotal: number | string;
  tax_classes: string;
  tax_display_shop: number | string;
  tax_display_cart: number | string;
  tax_total_display: number | string;
}
export interface IAddDutyResponse {
  status: boolean;
  message: string;
}
export interface IDuty {
  automated_duty: number;
  price_with_duty: number;
  duty_based_on: number | string;
  shipping_duty_class: number | string;
  duty_round_at_subtotal: number | string;
  duty_classes: string;
  duty_display_shop: number | string;
  duty_display_cart: number | string;
  duty_total_display: number | string;
}

export interface IMerchantSettings {
  status: boolean;
  data: ISettings;
}
export interface ISettings {
  tax?: ITax;
  duty?: IDuty;
}
export interface IMerchantTransactionsCount {
  status: boolean;
  data: ITransactoinCount;
}

export interface ITransactoinCount {
  Withdraw_count: number;
  payment_count: number;
  refund_count: number;
  escrow_count: number;
  succeeded_count: number;
  all_count: number;
}

export interface IMerchantTransactions {
  current_page: number;
  data: ITansactions[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: ITLink[];
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface ITansactions {
  id: number;
  reference_id: string;
  order_id: number;
  from_user_id: number;
  to_user_id: number;
  payment_method: number;
  total: string;
  transaction_type: number;
  status: number;
  created_at: Date;
  updated_at: Date;
  merchant_id: number;
  payment_method_id: number;
  invoice_pdf: null;
  from_name: string;
  to_name: string;
}

export interface ITLink {
  url: null | string;
  label: string;
  active: boolean;
}

export interface ITransactionDetails {
  status: boolean;
  data: ITransaction;
}

export interface ITransaction {
  id: number | string;
  product_id: number | string;
  product_variation_id: number | string;
  customer_id: number | string;
  transaction_type: number | string;
  from: string;
  to: string;
  payment_method: number | string;
  account_number: number | string;
  reference_id: string;
  net: string;
  fees: string;
  total: string;
  status: number | string;
  action_by: number | string;
  last_updated_by: null;
  created_at: string;
  updated_at: string;
}

export interface IShippingByIdResponse {
  status: boolean;
  data: IShippingById;
}

export interface IShippingById {
  id: number;
  name: string;
  regions: string;
  description: null;
  is_shipping_flat_rate: number;
  is_shipping_free_shipping: number;
  merchant_id: number;
  action_by: number;
  last_updated_by: number;
  created_at: Date;
  updated_at: Date;
}

export interface IMerchantReviewCountResponse {
  status: boolean;
  data: IMReviewsCount;
}

export interface IMReviewsCount {
  pending_count: number;
  approved_count: number;
  spam_count: number;
  trash_count: number;
  all_count: number;
}

export interface IMerchantReviewsResponse {
  current_page: number;
  data: IMReviews[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: IMRLink[];
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface IMReviews {
  email: string;
  first_name: string;
  last_name: string;
  filename: string;
  rating: number;
  description: null | string;
  status: string;
  product_name: string;
  created_at: string;
  slug: string;
}

export interface IMRCustomer {
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

export interface IMRProduct {
  id: number;
  product_code: string;
  product_category_id: number;
  product_name: string;
  short_description: string;
  long_description: string;
  store_id: number;
  feature_image: number;
  merchant_id: number;
  status: number;
  is_active: number;
  product_type: number;
  which_policies: number;
  action_by: number;
  last_updated_by: null;
  created_at: string;
  updated_at: string;
  slug: null | string;
}

export interface IMRVariation {
  id: number;
  product_id: number;
  variation_combination: string[];
}

export interface IMRLink {
  url: null | string;
  label: string;
  active: boolean;
}

export interface IMerchantRolesReponse {
  current_page: number;
  data: IMercahntRoles[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: IMerchantLink[];
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface IMercahntRoles {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
}

export interface IMerchantLink {
  url: null | string;
  label: string;
  active: boolean;
}

export interface IAddmerchantRolesResponse {
  status: boolean;
  message: string;
}
export interface IAddmerchantRoles {
  name: string;
}

export interface IUpdatemerchantRolesResponse {
  status: boolean;
  message: string;
}
export interface IUpdatemerchantRoles {
  name: string;
}

export interface IAddmerchantRolesResponseById {
  status: boolean;
  data: IAddmerchantRolesById;
}

export interface IAddmerchantRolesById {
  id: number;
  name: string;
  guard_name: string;
  created_at: Date;
  updated_at: Date;
}

export interface IMerchantMembersResponse {
  current_page: number;
  data: IMerchantMembers[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: IMemberLink[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface IMerchantMembers {
  id: number;
  type: IType;
  email: string;
  first_name: string;
  last_name: string;
  about: null;
  businessName: IBusinessName;
  city: IBusinessName;
  country: null;
  postal_code: string;
  website: IWebsite;
  phone: string;
  dob: null;
  account_status: IAccountStatus;
  email_verified_at: null;
  created_at: string;
  updated_at: string;
  roles: IRole[];
  is_active: number | string;
}

export interface IRole {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: IPivot;
}

export interface IPivot {
  model_type: string;
  model_id: number;
  role_id: number;
}

export enum IAccountStatus {
  AccountStatusApproved = "approved",
  Approved = "Approved",
}

export enum IBusinessName {
  Empty = "",
  Test = "test",
}

export enum IType {
  Consumer = "consumer",
  Merchant = "merchant",
}

export enum IWebsite {
  Empty = "",
  TestCOM = "test.com",
}

export interface IMemberLink {
  url: null | string;
  label: string;
  active: boolean;
}

export interface IAddMerchantMembersResponse {
  status: boolean;
  message: string;
  errors: string;
}

export interface IAddMerchantMembers {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role_id: number | string;
  password: string;
}

export interface IUpdateMerchantMembersResponse
  extends IAddMerchantMembersResponse {}

export interface IUpdateMerchantmembers extends IAddMerchantMembers {}

export interface IMerchantMembersByIdResponse {
  status: boolean;
  data: IMerchantMembersById;
}

export interface IMerchantMembersById {
  id: number;
  type: string;
  email: string;
  first_name: string;
  last_name: string;
  about: null;
  businessName: null;
  city: null;
  country: null;
  postal_code: null;
  website: null;
  phone: string;
  dob: null;
  account_status: null;
  email_verified_at: null;
  created_at: Date;
  updated_at: Date;
  merchant_id: string;
  roles: IRole[];
}

export interface IRole {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: IPivot;
}

export interface IPivot {
  model_type: string;
  model_id: number;
  role_id: number;
}
// linked products
export interface ILinkedProductResponse {
  status: boolean;
  message: string;
  data: ILinkedProduct[];
}

export interface ILinkedProduct {
  product_name: string;
  id: number;
  is_wishlist: number | null;
}

// policy
export interface IAddPolicyResponse {
  status: boolean;
  message: any;
}

export interface IAllPolicyResponse {
  current_page: number;
  data: IPolicyData[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface IPolicyData {
  id: number;
  name: string;
  description: string;
  policy_type: number;
  status: 2 | 1;
  action_by: number;
  last_updated_by: number;
  created_at: Date;
  updated_at: Date;
  merchant_id: number;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}

export interface ISinglePolicyResponse {
  status: boolean;
  data: IPolicyData;
}

export interface ICorporateCausesResponse {
  status: boolean;
  message: string;
  data: ICorporateCauses[];
}

export interface ICorporateCauses {
  id: number;
  name: string;
  created_at: null;
  updated_at: null;
}

export interface IMerchantInventoryResponse {
  current_page: number;
  data: IMerchantInventoryData[];
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

export interface IMerchantInventoryData {
  product_name: string;
  sku: string;
  stock_status: number;
  stock_quantity: number | null;
  feature_image: FeatureImage;
}

export interface IConsumerSupportListResponse {
  current_page: number;
  data: IConsumerSupportListData[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface IConsumerSupportListData {
  id: number;
  title: string;
  status: string;
  product_name: string;
  product_image: string;
  request_id: string;
  consumer_name: string;
  consumer_email: string;
}

export interface IConsumerChatistoryResponse {
  status: boolean;
  data: IConsumerChatistoryData[];
}

export interface IConsumerChatistoryData {
  id: number;
  sender_image: string;
  receiver_image: string;
  sender_name: string;
  receiver_name: string;
  created_at: string;
  message: string;
  receiver_id: number;
  sender_id: number;
  cmSupportId?: string;
  user_type?: number
}
export interface ICMChatistoryData {
  id: number;
  sender_image: string;
  receiver_image: string;
  sender_name: string;
  receiver_name: string;
  created_at: string;
  message: string;
  receiver_id: number;
  sender_id: number;
  cmSupportId?: string;
}

export interface IAddsupportMessageConsumerResponse {
  status: boolean;
  data: IConsumerChatistoryData;
}

export interface IGetOrderSupportDetailsResponse {
  status: boolean;
  data: IGetOrderSupportDetailsData;
}

export interface IGetOrderSupportDetailsData {
  id: number;
  title: string;
  description: string;
  status: string;
  product_id: number;
  first_name: string;
  last_name: string;
  email: string;
  product: IGetOrderSupportProduct;
  request_id: string;
}

export interface IGetOrderSupportProduct {
  id: number;
  product_name: string;
  slug: string;
  feature_image: FeatureImage;
  is_wishlist: null;
  stock_status: number;
  category: any[];
  subcategory: any[];
  merchant_name: null;
  product_attributes: {
    name: string;
    value: string;
  };
}
