import { INotificationsAlert } from "@/components/consumer/NotificationSetting/types";
import { clientCustomFetch, customFetch } from "../apiConfig";
import { NotificationsSettingsState } from "@/components/consumer/NotificationSetting";

export const getNotificationSettings = async () => {
  const response = await customFetch<INotificationsAlert>({
    url: `/notification-settings`,
  });
  return response;
};

interface NotificationsSettingsStateData
  extends Omit<
    NotificationsSettingsState,
    "category_ids" | "charity_ids" | "newsletter_charity_ids"
  > {
  newsletter_charity_ids: string[];
  category_ids: string[];
  charity_ids: string[];
}
export const postNotificationSettings = async (
  data: NotificationsSettingsStateData,
) => {
  const response = await clientCustomFetch<{
    status: boolean;
    message: any;
  }>({
    url: `/notification-settings`,
    method: "POST",
    data: JSON.stringify(data),
  });
  return response;
};
