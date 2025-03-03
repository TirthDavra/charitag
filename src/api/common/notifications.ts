import { buildQueryString } from "@/utils/basicfunctions";
import { clientCustomFetch, customFetch } from "../apiConfig";
import { INotificationsResponse, ITopNotificationsResponse } from "./types";

export const getNotificationsList = async (props: {
  page?: number;
  per_page?: number;
}) => {
  const response = await customFetch<INotificationsResponse>({
    url: `/notifications/dashboard/list?${buildQueryString(props)}`,
  });
  return response;
};
export const getNotificationsListHeader = async (props: {
  page?: number;
  per_page?: number;
  mark_as_read?: number;
}) => {
  const response = await clientCustomFetch<INotificationsResponse>({
    url: `/notifications/dashboard/list?${buildQueryString(props)}`,
  });
  return response;
};

export const markReadNotification = async (id?: string) => {
  const url = id
    ? `/notifications/dashboard/make-read/?id=${id}`
    : `/notifications/dashboard/make-read`;
  const response = await clientCustomFetch({
    url: url,
  });
  return response;
};

export const deleteNotification = async (id?: string) => {
  const url = id
    ? `/notifications/dashboard/remove/?id=${id}`
    : `/notifications/dashboard/remove`;
  const response = await clientCustomFetch<{ status: boolean; message: any }>({
    url: url,
    method: "DELETE",
  });
  return response;
};

export const getTopNotifications = async () => {
  const response = await clientCustomFetch<ITopNotificationsResponse>({
    url: "/notifications/dashboard/",
  });
  return response;
};
