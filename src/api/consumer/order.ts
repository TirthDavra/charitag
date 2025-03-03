import {
  IChatHistoryData,
  IChatHistoryRespone,
  IChatMessageAddRespone,
  IGetOrder,
  IGetOrdersRespone,
  IOrderDetailRespone,
  ISupportOrderRespone,
} from "@/components/consumer/Orders/types";
import { clientCustomFetch, customFetch } from "../apiConfig";
import { buildQueryString } from "@/utils/basicfunctions";
import { IAddNewMeassageResponse } from "../charity/types";

export const getOrders = async (props: {
  per_page: number;
  page: number;
  filter: string;
}) => {
  const rawData = await customFetch<IGetOrder>({
    url: `/store/orders?${buildQueryString(props)}`,
    fetchInit: {
      next: {
        tags: [`get-orders-consumer-${props.page}`],
      },
    },
  });
  return rawData.data;
};

export const deleteFromWishlist = async (id: string) => {
  const response = await clientCustomFetch<{
    status: boolean;
    message: any;
  }>({
    url: `/wishlist/${id}`,
    method: "DELETE",
  });
  return response;
};

export const archiveOrder = async (id: number) => {
  const response = await clientCustomFetch<{
    status: boolean;
    message: string;
  }>({
    url: `/store/orders/archive/${id}`,
  });
  return response;
};

export const getSingleOrderDetails = async (orderId: string) => {
  const response = await customFetch<IOrderDetailRespone>({
    url: `/store/orders/details/${orderId}`,
  });

  return response;
};

export const getChatHistory = async (request_id: string) => {
  const response = await customFetch<IChatHistoryRespone>({
    url: `/consumer/support/${request_id}`,
    fetchInit: {
      next: {
        tags: [`chat-support-consumer-${request_id}`],
      },
    },
  });

  return response.data;
};

export const addOrderSupportMessage = async ({
  data,
}: {
  data: { message: string; support_id: string };
}) => {
  const response = await clientCustomFetch<IChatMessageAddRespone>({
    url: `/consumer/support/send/message`,
    method: "POST",
    data: JSON.stringify(data),
  });
  return response;
};
export const createNewSupportTicketForOrder = async (data: {
  order_id: string;
  product_id: number;
  title: string;
  description: string;
}) => {
  const response = await clientCustomFetch<{
    status: boolean;
    message: string;
    data: string;
  }>({
    url: `/consumer/support`,
    method: "POST",
    data: JSON.stringify(data),
  });

  return response;
};

export const getSupportOrderDetails = async (orderId: string) => {
  const response = await customFetch<ISupportOrderRespone>({
    url: `/consumer/support/detail/${orderId}`,
  });

  return response.data;
};
