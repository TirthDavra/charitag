import { getNotificationsList } from "@/api/common/notifications";
import ConsumerNotificationConatiner from "@/components/consumer/Notifications/ConsumerNotificationConatiner";
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
    <div className="mt-[30px]">
      <h1 className="mb-[10px] text-[34px] font-bold text-merchant_sidebar_text">
        Notifications
      </h1>
      <div>
        <ConsumerNotificationConatiner
          notificationDataProp={notifications.data}
        />
      </div>
    </div>
  );
};

export default page;
