import { IGetWishlist } from "@/components/consumer/SavedDeals/types";
import { clientCustomFetch, customFetch } from "../apiConfig";
import {
  IAddProductToWishlistResponse,
  IAddToWishlistCategoryResponse,
  ITopDealsResponse,
  ITopProducts,
  IWishList,
} from "./types";

export const getTopDeal = async () => {
  const response = await customFetch<ITopDealsResponse>({ url: "/top-deals" });
  if (response.error) {
    return {
      status: false,
      message: "",
      data: [],
    };
  }
  return response.data;
};

export const getCateogories = async () => {
  const res = await clientCustomFetch<IWishList>({
    url: "/wishlist/categories",
  });
  return res.data?.data;
};

export const getCateogoriesForConsumer = async () => {
  const res = await clientCustomFetch<IWishList>({
    url: "/wishlist/categories",
  });
  return res;
};

export const addProductToWishlistCategory = async (
  catId: string | number,
  productId: string | number | null,
) => {
  const res = await clientCustomFetch<IAddToWishlistCategoryResponse>({
    url: "/wishlist/add",
    method: "POST",
    data: JSON.stringify({
      wishlist_category_id: catId,
      product_id: productId,
    }),
  });

  return res;
};

export const addCategoryToWishlisht = async (name: string) => {
  const res = await clientCustomFetch<IAddProductToWishlistResponse>({
    url: "/wishlist/category/add",
    method: "POST",
    data: JSON.stringify({ name }),
  });
  return res;
};

export const getWishlist = async (wishCategoryId: string) => {
  const response = await customFetch<IGetWishlist>({
    url: `/wishlist/${wishCategoryId}`,
  });
  if (response.error) {
    return [];
  }
  return response.data.data;
};

export const deleteWishlist = async (id: number) => {
  const response = await customFetch({
    url: `/wishlist/${id}`,
    method: "DELETE",
  });
  return response.data;
};
