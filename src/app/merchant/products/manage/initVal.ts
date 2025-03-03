import { Attribute } from "@/api/common/productTypes";
import { IAttributeValues } from "@/components/merchant/Products/addProduct/Attributes";
import { ISubCatOptions } from "@/components/merchant/Products/addProduct/ProductCategories";
import { FeatureImage } from "@/components/merchant/types";
import { Option } from "@/components/ui/multiple-selector";

export interface ProductPrice {
  regular_price: string;
  sale_price: string;
}

export interface ProductInventory {
  sku: string;
  stock_quantity: string;
  stock_status: number;
  is_stock_management: number;
  low_stock_threshold: string;
  backorders_status: number;
}

export interface ProductShipping {
  weight: string;
  length: string;
  width: string;
  height: string;
  shipping_class: string;
}

export interface ProductAttribute {
  name: string;
  values: string;
}

export interface IVariationFinal {
  [key: string]: ProductVariation;
}
export interface ProductVariation {
  id: null | number;
  product_id: null | number;
  variation_combination: string[];
  description: string;
  image: string;
  hashcode: string;
  init_image?: FeatureImage;
  is_manage_stock_enabled: number;
  sku: string;
  stock_quantity: number;
  stock_status: number;
  is_stock_management: number;
  low_stock_threshold: number;
  backorders_status: number;
  weight: string;
  length: string;
  width: string;
  height: string;
  shipping_class: string;
  regular_price: string;
  sale_price: string;
}

export interface LinkedProducts {
  up_sells: {
    label: string;
    value: string;
  }[];
  cross_sells: {
    label: string;
    value: string;
  }[];
}
export interface IProduct {
  product_name: string;
  is_draft: boolean;
  is_active: number;
  short_description: string;
  long_description: string;
  store_id: number;
  product_category_ids: Option[];
  product_sub_category_ids: ISubCatOptions[];
  feature_image: number | null;
  main_image?: FeatureImage | null;
  product_type: number;
  which_policies: number;
  price: ProductPrice;
  inventory: ProductInventory;
  shipping: ProductShipping;
  remove_attributes: number[];
  remove_variations: number[];
  attributes: IAttributeValues[];
  variations: IVariationFinal;
  photo_gallery: number[];
  init_Image_gallery?: FeatureImage[];
  linked_products: LinkedProducts;
  product_id: number | null;
  product_slug: string;
}

export const initialProduct: IProduct = {
  product_name: "",
  is_draft: true,
  is_active: 0,
  short_description: "",
  long_description: "",
  store_id: 0,
  product_category_ids: [],
  product_sub_category_ids: [],
  feature_image: null,
  product_type: 1,
  which_policies: 2,
  photo_gallery: [],
  product_id: null,
  product_slug: "",
  remove_attributes: [],
  remove_variations: [],
  price: {
    regular_price: "",
    sale_price: "",
  },
  inventory: {
    sku: "",
    stock_quantity: "",
    stock_status: 0,
    is_stock_management: 0,
    low_stock_threshold: "",
    backorders_status: 1,
  },
  shipping: {
    weight: "",
    length: "",
    width: "",
    height: "",
    shipping_class: "medium",
  },
  attributes: [],
  variations: {},
  linked_products: {
    up_sells: [],
    cross_sells: [],
  },
};
