import { buildQueryString } from "@/utils/basicfunctions";
import { customFetch } from "../apiConfig";
import {
  IInventoryProducts,
  IMInventoryCounts,
  IMerchantInventory,
  IMerchantInventoryResponse,
} from "./types";

export const getMerchantInventory = async (props: {
  search?: string;
  per_page?: number;
  sort_field?: string;
  sort_order?: string;
  stock_status?: string;
  page?: number;
}) => {
  const response = await customFetch<IMerchantInventoryResponse>({
    url: `/inventories?${buildQueryString(props)}`,
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

export const getInventoryCounts = async () => {
  const respnse = await customFetch<IMInventoryCounts>({
    url: "/inventorie/counts",
  });
  return respnse;
};

export const getInventoryProducts = async ({
  is_only_name,
}: {
  is_only_name?: boolean;
}) => {
  const response = await customFetch<IInventoryProducts>({
    url: `/products?is_only_name=${is_only_name}`,
  });
  if (response.error) {
    return {
      status: true,
      message: "",
      data: [],
    };
  }
  return response.data;
};
