import { ICheckoutDetails } from "@/components/consumer/Cart";
import {
  axiosClientCustom,
  clientCustomFetch,
  customFetch,
} from "../apiConfig";
import { ICartResponse, IaddOrUpdateCartItemsResponse, } from "./types";

export interface ICartItemQtyPayload extends Omit<ICartItemQuantity, "type"> {}

export interface ICartItemQuantity {
  product_id: number | null;
  quantity: number;
  item_attributes?: string | null;
}

export const getCart = async () => {
  const response = await customFetch<ICartResponse>({
    url: `/cart`,
  });
  return response;
};
export const getCartClient = async () => {
  const response = await clientCustomFetch<ICartResponse>({
    url: `/cart`,
  });
  return response;
};

export const getUpSellAndCrossSellProducts = async (id: string | number) => {
  const response = await clientCustomFetch({
    url: `/cart/${id}`,
  });
  return response;
};

// export const addOrUpdateCart = async (data: ICartItemQtyPayload[]) => {
//   const response = await clientCustomFetch({
//     url: `/cart`,
//     method: "POST",
//     data: JSON.stringify({
//       products: data,
//     }),
//   });
//   return response;
// };

/// addOrUpdateSingleCartItem

export interface IUpdateCartItemArgs {
  cart_id: number | null;
  quantity: number;
}
export const updateCartItem = async (item: IUpdateCartItemArgs) => {
  const response = await axiosClientCustom<IaddOrUpdateCartItemsResponse>({
    url: `/cart/update`,
    method: "POST",
    data: JSON.stringify(item),
  });
  return response;
};
export const addOrUpdateCartItems = async (item: ICartItemQuantity[]) => {
  const response = await axiosClientCustom<ICartResponse>({
    url: `/cart/item`,
    method: "POST",
    data: JSON.stringify({ items: item }),
  });
  return response;
};
// export const debouncedAddOrUpdateCartItem = (delay: number = 500) => {
//   return debounce(async (cartItem: ICartItemQuantity) => {
//     await addOrUpdateSingleCartItem(cartItem);
//   }, delay);
// };
///
export const deleteCartItemById = async ({
  cart_item_id,
}: {
  cart_item_id: number | null;
}) => {
  const response = await clientCustomFetch({
    url: `/cart/item/${cart_item_id}`,
    method: "DELETE",
  });
  return response;
};

export const paymentCheckout = async (data: IPaymentPayload) => {
  const response = await clientCustomFetch<ICharityResponse>({
    url: `/checkout`,
    method: "POST",
    data: JSON.stringify(data),
    customHeaders: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  return response;
};

export interface IPaymentPayload
  extends Omit<ICheckoutDetails, "campaign_ids" | "charity_ids"> {
  cart_id: number | null;
  campaign_ids: string[];
  charity_ids: string[];
}

export interface ICharityResponse {
  status: boolean;
  session_url: string;
}
