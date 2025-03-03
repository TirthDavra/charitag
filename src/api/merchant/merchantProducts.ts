import { IMerchantProduct } from "@/app/merchant/products/all/types";
import { clientCustomFetch, customFetch } from "../apiConfig";
import {
  IProductsCount,
  IProductAttributes,
  IProductCategoryResponse,
  IAddProductResponse,
  ILinkedProductResponse,
  IProductSubCategory,
} from "./types";
import {
  IProduct,
  ProductVariation,
} from "@/app/merchant/products/manage/initVal";
import { FeatureImage } from "@/components/merchant/types";
import { buildQueryString } from "@/utils/basicfunctions";

export const getMerchantProductsList = async (props: {
  stock_status?: string | number;
  product_type?: string | number;
  product_category_id?: string | number;
  search?: string;
  per_page?: number;
  page?: number;
  sort_field?: string;
  sort_order?: string;
}) => {
  const response = await customFetch<IMerchantProduct>({
    url: `/products?${buildQueryString(props)}`,
  });
  if (response.error) {
    return {
      current_page: 0,
      data: [],
      first_page_url: "",
      from: 0,
      last_page: 0,
      last_page_url: "",
      links: [],
      next_page_url: "",
      path: "",
      per_page: 0,
      prev_page_url: null,
      to: 0,
      total: 0,
    };
  }

  return response.data;
};

export const getProductsCount = async () => {
  const respons = await customFetch<IProductsCount>({
    url: "/products/counts",
  });
  return respons;
};

export const getProductGallery = async () => {
  const response = await customFetch<FeatureImage>({
    url: "/media/gallery",
  });

  return response.data;
};

export const getProductGalleryClient = async () => {
  const response = await clientCustomFetch<FeatureImage[]>({
    url: "/media/gallery",
  });

  return response;
};

export const getProductsMetaData = async () => {
  const response = await customFetch({ url: "" });
};
export const getProductsCategories = async () => {
  const response = await customFetch<IProductCategoryResponse>({
    url: "/categories",
  });
  return response.data;
};
export const getProductsSubCategories = async (id: number) => {
  const response = await clientCustomFetch<IProductSubCategory>({
    url: `/categories/${id}`,
  });
  return response;
};
export const getAttributes = async () => {
  const response = await clientCustomFetch<IProductAttributes>({
    url: "/attributes",
  });
  return response;
};

interface IProductData
  extends Omit<
    IProduct,
    | "linked_products"
    | "product_category_ids"
    | "product_sub_category_ids"
    | "variations"
  > {
  linked_products: {
    up_sells: string[];
    cross_sells: string[];
  };
  product_category_ids: string[];
  product_sub_category_ids: string[];
  variations: ProductVariation[];
}
export const addProductApi = async (data: IProductData) => {
  const response = await clientCustomFetch<IAddProductResponse>({
    url: "/product/add",
    method: "POST",
    data: JSON.stringify(data),
  });
  return response;
};

export const getLinkedProducts = async () => {
  const response = await clientCustomFetch<ILinkedProductResponse>({
    url: "/products?is_only_name=true",
  });
  if (response.error) {
    return [];
  } else {
    return response.data.data.length > 0
      ? response.data.data.map((item) => ({
          label: item.product_name,
          value: item.id.toString(),
        }))
      : [];
  }
};

export const setActiveStatus = async (productId: number, status: number) => {
  const response = await clientCustomFetch({
    url: "/products/status/update",
    data: JSON.stringify({ product_id: productId, status }),
    method: "PUT",
  });
  return response;
};

export const deleteProduct = async (productId: number) => {
  const response = await clientCustomFetch({
    url: `/products/delete/${productId}`,
    method: "DELETE",
  });
  return response;
};
