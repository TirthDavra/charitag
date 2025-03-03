import { buildQueryString } from "@/utils/basicfunctions";
import { customFetch } from "../apiConfig";
import {
  IMerchantTransactions,
  IMerchantTransactionsCount,
  ITransactionDetails,
} from "./types";

export const getTransactionscount = async () => {
  const response = await customFetch<IMerchantTransactionsCount>({
    url: "/transaction/counts",
  });
  return response;
};

export const getTransactions = async (props: {
  search?: string;
  sort_field?: string;
  sort_order?: string;
  per_page?: number;
  page?: number;
}) => {
  const response = await customFetch<IMerchantTransactions>({
    url: `/transactions?${buildQueryString(props)}`,
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
      next_page_url: null,
      path: "",
      per_page: 0,
      prev_page_url: null,
      to: 0,
      total: 0,
    };
  }
  return response.data;
};

export const getSingleTransaction = async (id: string) => {
  const response = await customFetch<ITransactionDetails>({
    url: `/transaction/${id}`,
  });
  if (response.error) {
    return {
      data: {
        id: "",
        product_id: "",
        product_variation_id: "",
        customer_id: "",
        transaction_type: "",
        from: "",
        to: "",
        payment_method: "",
        account_number: "",
        reference_id: "",
        net: "",
        fees: "",
        total: "",
        status: "",
        action_by: "",
        last_updated_by: null,
        created_at: "",
        updated_at: "",
      },
    };
  }
  return response.data;
};
