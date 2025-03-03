import { getNotificationsList } from "@/api/common/notifications";
import CharityNotificationsContainer from "@/components/charity/Notifications";
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
        <CharityNotificationsContainer
          notificationDataProp={notifications.data}
        />
      </div>
    </div>
  );
};

export default page;
