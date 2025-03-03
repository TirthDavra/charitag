import { getNotificationsList } from "@/api/common/notifications";
import MerhantNotificationsContainer from "@/components/merchant/Notifications/MerhantNotificationsContainer";
import Title from "@/components/merchant/Title";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: { page: string; per_page: string };
}) => {
  const notifications = await getNotificationsList({
    page: Number(searchParams?.page || 1),
    per_page: 10,
  });

  return (
    <div>
      <Title label="Notifications" />
      <div className="py-4">
        <MerhantNotificationsContainer
          notificationDataProp={notifications.data}
        />
      </div>
    </div>
  );
};

export default page;
