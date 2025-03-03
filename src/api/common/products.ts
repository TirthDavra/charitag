import products from "@/app/shop/page";
import { customFetch } from "../apiConfig";
import {
  IProductBySlugResponse,
  ISingleDealResponse,
  ISingleProduct,
} from "./productTypes";
import {
  IAllCategoryResponse,
  IAllProductResponseNew,
  IMerchantProductCategories,
  ITopProducts,
} from "./types";
import { buildQueryString } from "@/utils/basicfunctions";

export const getTopProduct = async () => {
  const response = await customFetch<ITopProducts>({ url: "/top-products" });

  if (response.error) {
    return {
      status: false,
      message: "",
      data: [],
    };
  }
  return response.data;
};

export const getMerchantProductCategories = async () => {
  const response = await customFetch<IMerchantProductCategories>({
    url: "/categories",
  });
  return response;
};

export const getAllCategories = async () => {
  const response = await customFetch<IAllCategoryResponse>({
    url: "/all-categories",
  });
  if (response.error) {
    response.data.data = [];
    return response;
  }
  return response;
};
export const getProductBySlug = async ({
  slug,
  preview,
}: {
  slug: string;
  preview?: string;
}) => {
  const url = preview
    ? `/product/${slug}?preview=${preview}`
    : `/product/${slug}`;
  const response = await customFetch<IProductBySlugResponse>({
    url,
    method: "GET",
  });
  // if (response.error) {
  //   return defaultSingleProduct;
  // }
  return response;
};

export const getProductBySlugV2 = async ({
  slug,
  preview,
}: {
  slug: string;
  preview?: string;
}) => {
  const url = preview
    ? `/product/${slug}?preview=${preview}`
    : `/product/${slug}`;
  const response = await customFetch<IProductBySlugResponse>({
    url,
    method: "GET",
  });

  return response;
};

export const getDealBySlug = async ({
  slug,
  preview,
}: {
  slug: string;
  preview?: string;
}) => {
  const url = preview ? `/deal/${slug}?preview=${preview}` : `/deal/${slug}`;
  const response = await customFetch<ISingleDealResponse>({
    url,
    method: "GET",
  });
  return response;
};

// const defaultSingleProduct: ISingleProduct = {
//   id: 0,
//   product_code: "",
//   category_ids: [],
//   product_name: "",
//   short_description: "",
//   long_description: "",
//   store_id: 0,
//   feature_image: {
//     id: 0,
//     filename: "",
//     path: "",
//     thumbnail_path: "",
//     medium_path: "",
//     reference_id: null,
//     type: 0,
//     action_by: 0,
//   },
//   merchant_id: 0,
//   sub_category_ids: [],
//   status: 0,
//   is_active: 0,
//   product_type: 0,
//   is_wishlist: null,
//   which_policies: 0,
//   action_by: 0,
//   last_updated_by: null,
//   slug: "",
//   category: {
//     slug: "",
//     id: 0,
//     name: "",
//     image: null,
//     is_active: 0,
//     action_by: 0,
//     last_updated_by: null,
//   },
//   attributes: [],
//   variations: [],
//   price: {
//     id: 0,
//     product_id: 0,
//     variation_id: null,
//     regular_price: 0,
//     sale_price: 0,
//     donation_percentage: null,
//     discount_percentage: null,
//     is_active: 0,
//     is_manage_stock_enabled: 0,
//     action_by: 0,
//     last_updated_by: null,
//     donation_amount: 0
//   },
//   shipping: {
//     id: 0,
//     product_id: 0,
//     variation_id: null,
//     weight: 0,
//     length: 0,
//     width: 0,
//     height: 0,
//     shipping_class: "",
//     is_active: 0,
//     is_manage_stock_enabled: 0,
//     action_by: 0,
//     last_updated_by: null,
//   },
//   inventory: {
//     id: 0,
//     product_id: 0,
//     variation_id: null,
//     sku: "",
//     stock_quantity: 0,
//     low_stock_threshold: 0,
//     stock_status: 0,
//     backorders_status: 0,
//     is_active: 0,
//     is_stock_management: 0,
//     action_by: 0,
//     last_updated_by: null,
//   },
//   gallery: [],
//   merchant: {
//     id: 0,
//     type: "",
//     email: "",
//     first_name: "",
//     last_name: "",
//     about: null,
//     businessName: "",
//     city: "",
//     country: null,
//     postal_code: "",
//     website: "",
//     phone: "",
//     dob: null,
//     account_status: "",
//     email_verified_at: null,
//   },
//   linked_product: {
//     cross_sells: [],
//     up_sells: [],
//   },
//   is_stock_status: "",
//   reviews: [],
// };

function extractKeys(obj: Record<string, Record<string, boolean> | boolean>) {
  const parentArray = [];
  const childArray = [];

  for (const key in obj) {
    const value = obj[key];

    if (typeof value === "boolean" && value === true) {
      parentArray.push(key);
    } else if (typeof value === "object") {
      // parentArray.push(key);
      for (const childKey in value) {
        if (value[childKey] === true) {
          childArray.push(childKey);
        }
      }
    }
  }

  return { parentArray, childArray };
}
export const getAllProducts = async ({
  category_ids,
  ...props
}: {
  sort?: string;
  price?: string;
  min_price?: string;
  max_price?: string;
  category_ids: {
    [key: string]:
      | {
          [childKey: string]: boolean;
        }
      | boolean;
  };
  search?: string;
  per_page?: string;
  page?: string;
  rating?: string;
  is_deal?: string;
  is_product?: string;
  merchant?: string;
  merchant_slug?: string;
}) => {
  // let parentId: string = "";
  // let childId: string = "";

  const { childArray, parentArray } = extractKeys(category_ids);
  // for (const key in category_ids) {
  //   const category = category_ids[key];
  //   if (typeof category === "boolean") {
  //     if (category === true) {
  //       parentId += `&category_id[]=${key}`;
  //     }
  //   } else {
  //     for (const childKey in category) {
  //       if (category[childKey] === true) {
  //         childId += `&sub_category_id[]=${childKey}`;
  //       }
  //     }
  //   }
  // }

  // const queryString = `sort=${sort}&price=${price}&min=${min}&max=${max}${parentId}${childId}&search=${search}&per_page=${per_page}&page=${page}&rating=${rating}&deal=${deal}&product=${product}&merchant_slug=${merchant_slug}`;
  const queryString = `${buildQueryString(props)}${parentArray.length > 0 ? `&category_id=${JSON.stringify(parentArray)}` : ""}${childArray.length > 0 ? `&sub_category_id=${JSON.stringify(childArray)}` : ""}`;
  console.log("queryString", queryString);

  const url = `/all-products?${queryString}`;

  // Call customFetch with the constructed URL
  const response = await customFetch<IAllProductResponseNew>({ url });

  return response;
};
