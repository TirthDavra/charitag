import { getNotificationsList } from "@/api/common/notifications";
import ManageCorporateNotifications from "@/components/corporate/Notifications";
import CorporateNotificationsContainer from "@/components/corporate/Notifications/CorporateNotificationsContainer";
 import Title from "@/components/merchant/Title";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: { page: string; per_page: string };
}) => {
  const notifications = await getNotificationsList({
    page: Number(searchParams?.page || 1),
    per_page: 5,
  });
  return (
    <div>
      <Title label="Notifications" />
      <div className="py-4">
        <CorporateNotificationsContainer notificationDataProp={notifications.data} />
      </div>
    </div>
  );
};

export default page;
