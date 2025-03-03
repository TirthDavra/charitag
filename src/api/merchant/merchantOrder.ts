import { IMerchantOrder } from "@/components/merchant/Order/SingleOrder/types";
import { clientCustomFetch, customFetch } from "../apiConfig";
import {
  IMerchantOrderResponse,
  IOrderCountResponse,
  IUpdateOrderStatusResponse,
} from "@/app/merchant/orders/types";
import { buildQueryString } from "@/utils/basicfunctions";

export const getMerchantOrder = async (id: string) => {
  const response = await customFetch<IMerchantOrder>({ url: `/order/${id}` });
  return response;
};

export const getOrderList = async (props: {
  id?: string;
  search?: string;
  sort_field?: string;
  sort_order?: string;
  per_page?: number;
  page?: number;
  status?: string;
}) => {
  const response = await customFetch<IMerchantOrderResponse>({
    url: `/orders?${buildQueryString(props)}`,
  });

  if (response.error) {
    return {
      current_page: 1,
      data: [],
      first_page_url: "",
      from: 1,
      last_page: 1,
      last_page_url: "",
      links: [],
      next_page_url: null,
      path: "",
      per_page: 1,
      prev_page_url: null,
      to: 1,
      total: 1,
    };
  }

  return response.data;
};

export const getOrderCount = async () => {
  const response = await customFetch<IOrderCountResponse>({
    url: "/orders/counts",
  });
  return response.data;
};

export const deletePolicy = async (id: number) => {
  // const response = await customFetch<any>({ url: `/policy/${id}`, method:'DELETE'});
  // const { data: session, status } = useSession();
  // const token = session ? session.user.token : "";
  // const response = await fetch(`http://127.0.0.1:3000/api/policy/${id}`, {
  //           method: 'DELETE',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             Authorization: `Bearer ${token}`,
  //           },
  //         });
  // return response;
};

export const updateOrderStatus = async ({
  body,
}: {
  body: { order_id: number; status: number };
}) => {
  const response = await clientCustomFetch<IUpdateOrderStatusResponse>({
    url: `/order/status/update`,
    method: "PUT",
    data: JSON.stringify(body),
  });
  return response;
};
