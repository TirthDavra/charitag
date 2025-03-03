import { FeatureImage } from "@/components/merchant/types";

export interface ITopProducts {
  status: boolean;
  message: string;
  data: _IProductNew[];
}

export interface IDataData {
  id: number;
  product_code?: string;
  product_category_id?: number;
  product_name?: null | string;
  short_description?: null | string;
  long_description?: null | string;
  store_id?: number;
  feature_image?: FeatureImage | null;
  merchant_id?: number;
  status?: number;
  is_active?: number;
  product_type?: number;
  which_policies?: number | null;
  action_by?: number;
  // last_updated_by?: null;
  created_at?: Date;
  updated_at?: Date;
  inventory?: Inventory | null;
  price?: Price | null;
  shipping?: Shipping | null;
  category?: Category;
  slug?: string;
  is_wishlist?: number | null;
  merchant: IMerchant;
}

export interface IMerchant {
  id?: number;
  type?: string;
  email: string;
  first_name: string;
  last_name: string;
  about?: null | string;
  businessName: string;
  city?: string;
  country?: string;
  postal_code?: string;
  website?: string;
  phone?: string;
  dob?: null | Date;
  account_status: string;
  email_verified_at?: null;
  created_at?: Date;
  updated_at?: Date;
  is_active: number;
  merchant_id: null | number;
  profile_image: string;
}

export interface Category {
  id: number;
  name: Name;
  image: null;
  is_active: number;
  action_by: number;
  last_updated_by: null;
  created_at: Date;
  updated_at: Date;
  slug: string;
}

export enum Name {
  TestCategory = "test-category",
}

export interface Inventory {
  id: number;
  product_id: number;
  variation_id: number;
  sku: null | string;
  stock_quantity: number;
  low_stock_threshold: null | string;
  stock_status: number;
  backorders_status: number;
  is_active: number;
  is_stock_management: number;
  action_by: number;
  last_updated_by: null;
  created_at: Date;
  updated_at: Date;
}

export interface Shipping {
  id: number;
  product_id: number;
  variation_id: number;
  weight: null | string;
  length: null | string;
  width: null | string;
  height: null | string;
  shipping_class: null | string;
  is_active: number;
  is_manage_stock_enabled: number;
  action_by: number;
  last_updated_by: null;
  created_at: Date;
  updated_at: Date;
}

export interface IMerchantProductCategories {
  status: boolean;
  message: string;
  data: IProductCategories[];
}

export interface IProductCategories {
  id?: number;
  name?: string;
  image?: null;
  is_active?: number;
  action_by?: number;
  last_updated_by?: null;
  created_at?: Date;
  updated_at?: Date;
  products_count?: number | string;
  deals_count?: number | string;
}

export interface IWishList {
  status: boolean;
  message: string;
  data: IDatum[];
}

export interface IDatum {
  id: number;
  consumer_id?: number;
  name: string;
  created_at?: Date | null;
  updated_at?: Date;
  wishlist_count: number;
}

export interface IAddToWishlistCategory {
  consumer_id: number;
  name: string;
  updated_at: string;
  created_at: string;
  id: number;
}

export interface IAddToProductWishlist extends IAddToWishlistCategory {
  wishlist_category_id: string;
}
export interface IAddToWishlistCategoryResponse {
  status: boolean;
  message: string;
  data: IAddToWishlistCategory;
}

export interface IAddProductToWishlistResponse
  extends IAddToWishlistCategoryResponse {
  data: IAddToProductWishlist;
}

export interface IAllCategoryResponse {
  status: boolean;
  message: string;
  data: ICategoryWithSub[];
}

export interface ICategoryWithSub {
  id: number;
  name: string;
  image: null;
  type: number;
  slug: null;
  parent_id: number;
  is_active: number;
  action_by: number;
  last_updated_by: number;
  created_at: Date;
  updated_at: Date;
  products_count?: number;
  children_count?: number;
  children: ICategoryWithSub[];
}

export interface IAllProductResponseNew {
  current_page: number;
  data: _IProductNew[];
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
export interface IProductNew {
  type: string;
  id: number;
  product_name: string;
  short_description: string;
  long_description: string;
  slug: string;
  product_type: number;
  thumbnail_path: string;
  original_path: string;
  small_path: string;
  merchant_name: string;
  review_count: number;
  rating: null;
  sale_price: null | string;
  regular_price: null | string;
  donation_amount: null | string;
  discount_percentage: null;
  donation_percentage: null;
  deal_price: string;
  deals_expiry_on: null;
  is_wishlist: number | null;
  is_stock_status: number;
  inventory: Inventory;
  feature_image: FeatureImage;
  price: Price;
  merchant: IMerchant;
  reviews: null;
}
export interface _IProductNew {
  id: number;
  status: number;
  slug: string;
  product_id: number | null;
  name: string;
  salePrice: null | string;
  regularPrice: null | string;
  discount_percentage: null | string;
  donation: null | string;
  filename: string;
  is_wishlist: number | null;
  merchant_name: string;
}

export interface Price {
  regular_price: null | string | number;
  sale_price: null | string | number;
  donation_amount: null | string;
  donation_percentage: null;
  discount_percentage: null;
  deal_price: number;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}

export interface ITopDealsResponse {
  status: boolean;
  message: string;
  data: _IProductNew[];
}

export interface ITopDeals {
  id: number;
  title: string;
  short_description: string;
  long_description: string;
  deals_expiry_on: number;
  qty: number;
  from: null;
  to: null;
  feature_image: FeatureImage;
  merchant_id: number;
  is_active: number;
  status: number;
  product_id: number;
  product_variation_id: null;
  action_by: number;
  last_updated_by: number | null;
  discount: number;
  created_at: Date;
  updated_at: Date;
  deal_category_id: null;
  category_ids: Array<number | string>;
  sub_category_ids: Array<number | string>;
  slug: string;
  variation_product_id: null;
  price: Price | null;
  donations: number;
  category: Category;
  merchant: IMerchant;
  product: ITopDealsProduct | null;
  deal_price: string;
  sale_price: string;
}

export interface ITopDealsProduct {
  id: number;
  product_code: string;
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
  slug: string;
  deleted_at: null;
  category_ids: number[];
  sub_category_ids: number[];
  parent_product_id: null;
  is_wishlist: null;
}

export interface ICharitiesForHomeResponse {
  status: boolean;
  message: string;
  data: ICharitiesForHome[];
}
export interface ICharitiesForHome {
  id: number;
  charity_id: number;
  charity_name: string;
  charity_short_description: string;
  about: string;
  contact_email: string;
  contact_phone: string;
  contact_website: string;
  blog_url: string;
  contact_facebook: string;
  contact_insta: string;
  contact_twitter: string;
  status: string;
  date_created: string;
  date_updated: string;
  chairty_banner: string;
  charity_logo: string;
  charity_profile_image: string;
  charity_category: string;
  charity_subcategory: string;
  user_id: null;
  feature_image: FeatureImage;
  logo: FeatureImage;
  updated_by: null;
  action_by: null;
  last_donation: string;
  total_fund_target: number;
  total_raised: number;
  total_raised_percentage: number;
  gallery: any[];
  slug: string;
}

export interface ICampaignAndCharityCard {
  id: number;
  charity_name: string;
  charity_short_description: string;
  feature_image: FeatureImage;
  logo: FeatureImage;
  last_donation: string;
  total_fund_target: number;
  total_raised: number;
  redirect_url?: string;
  start_date?: string | Date;
  end_date?: string | Date;
  progress_percentage?: string;
}
export interface IAllCharitiesResponse {
  current_page: number;
  data: IAllCharities[];
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

export interface IAllCharities {
  id: number;
  charity_id: number;
  charity_name: string;
  charity_short_description: string;
  about: string;
  contact_email: string;
  contact_phone: string;
  contact_website: string;
  blog_url: string;
  contact_facebook: string;
  contact_insta: string;
  contact_twitter: string;
  status: string;
  date_created: string;
  date_updated: string;
  chairty_banner: string;
  charity_logo: string;
  charity_profile_image: string;
  charity_category: string;
  charity_subcategory: string;
  user_id: number | null;
  charity_type_id: number;
  feature_image: number;
  logo: FeatureImage;
  updated_by: null;
  action_by: null;
  created_at: string;
  updated_at: string;
  total_raised: number;
  type: ICharitiesType;
  slug: string;
}

export interface ICharityCard {
  id: number;
  charity_name: string;
  slug?: string;
  logo: FeatureImage | null;
  type: ICharitiesType | null;
  total_raised: number;
  redirectUrl: string;
  deals_count?: number;
  products_count?: number;
  isCharity: boolean;
}

export interface ICharitiesType {
  id: number;
  flag: string;
  title: string;
  created_at: null;
  updated_at: null;
}

export interface ICharityTypeResponse {
  status: boolean;
  data: ICharityType[];
}

export interface ICharityType {
  id: number;
  flag?: string;
  title: string;
  created_at?: null;
  updated_at?: null;
}

export interface ICountriesResponse {
  status: boolean;
  data: ICountries[];
  message: string;
}

export interface ICountries {
  name: string;
  id: number;
}

export interface ICitiesByIdResponse {
  status: boolean;
  data: ICitiesById[];
  message: string;
}
export interface ICitiesById {
  name: string;
  id: number;
  state_code: string;
}
export interface ISingleCharityResponse {
  status: boolean;
  message: string;
  data: ISingleCharityData;
}

export interface ISingleCharityData
  extends Omit<IAllCharities, "feature_image"> {
  recommended_products: IRecommendedProduct[];
  reviews: IReview[];
  gallery: FeatureImage[];
  feature_image: FeatureImage;
  last_donation: string;
  rating: number;
  reviews_count: number;
}

export interface IAboutData {
  about: string | null;
}

export interface IRecommendedProduct {
  id: number;
  product_code: string;
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
  last_updated_by: number | null;
  created_at: string;
  updated_at: string;
  slug: string;
  deleted_at: null;
  category_ids: Array<number | string>;
  sub_category_ids: Array<number | string>;
  parent_product_id: null;
  is_wishlist: null;
  price: ICharityPrice;
  merchant: ICharityMerchant;
  merchant_type_id?: number;
}

export interface ICharityPrice {
  id: number;
  product_id: number;
  variation_id: number | null;
  regular_price: string;
  sale_price: string;
  donation_amount: null | string;
  donation_percentage: null;
  discount_percentage: null;
  action_by: number;
  last_updated_by: number | null;
  created_at: Date;
  updated_at: Date;
  variation_product_id: null;
}

export interface IReview {
  id: number;
  product_id: number;
  customer_id: number;
  rating: number;
  description: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  customer: ICharityMerchant;
}
export interface ICharityMerchant {
  id: number;
  type: string;
  email: string;
  first_name: string;
  last_name: string;
  about: null;
  businessName: null | string;
  city: null | string;
  country: null | string;
  postal_code: null | string;
  website: null | string;
  phone: string;
  dob: Date | null;
  account_status: string;
  email_verified_at: null;
  created_at?: Date;
  updated_at?: Date;
  is_active: number;
  merchant_id: null;
  profile_image: FeatureImage;
  slug: null;
}

export interface ICharityCampaignBySlugResponse {
  current_page: number;
  data: ICharityCampaignBySlug[];
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

export interface ICharityCampaignBySlug {
  id: number;
  title: string;
  description: string;
  total_fund_target: number;
  feature_image: FeatureImage;
  status: number;
  merchant_id: number;
  action_by: number;
  last_updated_by: number;
  created_at: Date;
  updated_at: Date;
  short_description: string;
  charity_id: number;
  start_date: Date;
  end_date: Date;
  slug: null | string;
  last_donation: string;
  total_raised: number;
  charity: IAllCharities;
  progress_percentage: string;
}

export interface IMerchantsListsResponse {
  current_page: number;
  data: IMerchantsLists[];
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

export interface IMerchantsLists {
  id: number;
  name: string;
  profile_image: FeatureImage | null;
  merchant_type_id: number;
  slug: string;
  deals_count: number;
  total_raised: number;
  type: ICharitiesType | null;
  products_count: number;
}

export interface ISingleMerhantResponse {
  status: boolean;
  message: string;
  data: ISingleMerhant;
}

export interface ISingleMerhant {
  id: number;
  type: ICharityType;
  email: string;
  first_name: string;
  last_name: string;
  about: null;
  businessName: null;
  city: null;
  country: ICountry;
  postal_code: null;
  website: null;
  phone: string;
  dob: null;
  account_status: null;
  email_verified_at: null;
  created_at: Date;
  updated_at: Date;
  is_active: number;
  merchant_id: number;
  profile_image: string;
  slug: string;
  merchant_type_id: number;
  raised_amount: number;
  reviews_count: number;
  rating: number;
  last_donation: string;
  featured_products: IRecommendedProduct[];
  reviews: IReview[];
  store: IStore;
}

export interface ICountry {
  id: number;
  name: string;
}
export interface IStore {
  id: number;
  merchant_id: number;
  name: string;
  description: string;
  email: string;
  phone: string;
  website: string;
  social_media_website: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  facebook: string;
  status: string;
  about_store: string;
  feature_image: FeatureImage;
  address: string;
  action_by: number;
  last_updated_by: null;
  created_at: Date;
  updated_at: Date;
  logo: FeatureImage;
  gallery: FeatureImage[];
  total_raised: number;
  last_donation: number;
}

export interface ICorporateFundraiserResponse {
  current_page: number;
  data: ICorporateFundraiser[];
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

export interface ICorporateFundraiser {
  id: number;
  name: string;
  description?: string;
  short_description?: string;
  total_member: number;
  country_id?: number;
  feature_image: FeatureImage;
  user_id?: number;
  type_id?: number;
  slug: string;
  logo: FeatureImage;
  status?: number;
  action_by?: number;
  last_updated_by?: number;
  created_at?: Date;
  updated_at: Date;
  last_donation?: string;
  total_fund_target: number;
  total_raised: number;
  type: ICharitiesType;
  country: ICountry;
  member_count: number;
}
export interface INewsLetterResponse {
  status: boolean;
  message: Message;
}

export interface Message {
  email: string[];
}

export interface IICorporateFundraiserBySlugResponse {
  status: boolean;
  message: string;
  data: ICorporateFundraiserBySlug;
}

export interface ICorporateFundraiserBySlug extends ICorporateFundraiser {
  gallery: FeatureImage[];
  total_donation: string;
}

export interface ICartRelatedProducts {
  data: {
    product: IDataData;
    up_sells: IDataData[];
    cross_sells: IDataData[];
  };
}

export interface ICardData {
  status: boolean;
  data: ICardDataResponse;
  message: string;
}

export interface ICardDataResponse {
  title: string;
  description?: string;
  total_raised: string;
}

export interface IPromotionNotifyResponse {
  status: boolean;
  message: string;
}

export interface IPromotionNotifyData {
  email: string;
  reference_id: number;
  type: number;
}

export interface IStatesByCountryIdResponse {
  status: boolean;
  message: string;
  data: IStatesById[];
}

export interface IStatesById {
  name: string;
  id: number;
}

export interface ReviewData {
  current_page: number;
  data: ReviewDataResponse[];
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

export interface ReviewDataResponse {
  id: number;
  product_id: number;
  customer_id: number;
  rating: number;
  description: null | string;
  status: string;
  created_at: string;
  updated_at: string;
  product: Product;
  customer: ICharityMerchant;
  variations: any[];
}

export interface Customer {
  id: number;
  type: number;
  email: string;
  first_name: string;
  last_name: string;
  about: null;
  postal_code: null;
  website: null;
  phone: string;
  dob: Date;
  account_status: number;
  email_verified_at: Date;
  created_at: Date;
  updated_at: Date;
  is_active: number;
  reference_id: null;
  profile_image: string;
  slug: string;
  merchant_type_id: null;
  city_id: null;
  country_id: number;
  main_address: string;
  pref_charity_ids: string[];
  is_profile_completed: number;
  role: number;
  category: any[];
}

export interface Product {
  id: number;
  product_code: string;
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
  last_updated_by: number;
  created_at: Date;
  updated_at: Date;
  slug: string;
  deleted_at: null;
  category_ids: string[];
  sub_category_ids: string[];
  parent_product_id: null;
  is_wishlist: null;
  is_stock_status: number;
  category: Category[];
  subcategory: Category[];
}

export interface Category {}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}

export interface IEmailVerifyResponse {
  status: boolean;
  message: string;
  data: IEmailVerifyData;
}

export interface IEmailVerifyData {
  user_id: number;
  type: string;
  value: string;
  id: number;
}

export interface INotificationsResponse {
  current_page: number;
  data: INotificationsData[];
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
  unread_notification: number;
}

export interface INotificationsData {
  id: number;
  updated_at: string;
  sender: INotificationSender;
  notification_type: number;
  data: INotificationData;
  mark_as_read: boolean;
}

export interface INotificationData {
  reference_id: string;
  [key: string]: any;
}

export interface INotificationSender {
  id: number;
  profile_image: FeatureImage;
  first_name: string;
  last_name: string;
  role?: null;
  category?: any[];
  type?: number;
}

export interface ITopNotificationsResponse {
  status: boolean;
  data: INotificationsData[];
}

export interface ISupportRequestsListResponse {
  current_page: number;
  data: ISupportRequestsList[];
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

export interface ISupportRequestsList {
  id: number;
  request_id: string;
  title: string;
  status: string;
  created_at: Date;
}

// admin chat history
export interface IAdminChatistoryResponse {
  status: boolean;
  data: IAdminChatistoryData[];
}

export interface IAdminChatistoryData {
  id: number;
  sender_image: string;
  receiver_image: string;
  sender_name: string;
  receiver_name: string;
  created_at: string;
  message: string;
  receiver_id: number;
  sender_id: number;
  supportId?: string;
}

export interface ISendMessageAdminResponse {
  status: boolean;
  message: string;
  data: IAdminChatistoryData;
}
