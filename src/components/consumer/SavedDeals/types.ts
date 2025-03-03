import { _IProductNew } from "@/api/common/types";

export interface IGetWishlist {
  status: boolean;
  data: _IProductNew[];
}
export interface IProductData {
  id: number;
  wishlist_category_id: number;
  consumer_id: number;
  product_id: number;
  created_at: Date;
  updated_at: Date;
  category: ICategory | null;
  product: IWishlistProduct[];
}

export interface ICategory {
  id: number;
  consumer_id: number;
  title: string;
  created_at: Date;
  updated_at: Date;
  name: string
}

export interface IWishlistProduct {
  id: number;
  store_id: number;
  product_code: null | string;
  product_category: number;
  product_name: string;
  product_description: string;
  feature_image: number;
  photo_gallery: string;
  amount: string;
  quantity: number;
  merchant_id: number;
  status: number;
  donation_percentage: number;
  discount_percentage: number;
  created_at: Date;
  updated_at: Date;
  is_wishlist: number;
}
