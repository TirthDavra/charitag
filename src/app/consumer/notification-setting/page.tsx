import { getCharitiesForHome } from "@/api/common/charities";
import { getNotificationSettings } from "@/api/consumer/notification";
import { getProductsCategories } from "@/api/merchant/merchantProducts";
import FailedToLoadPage from "@/components/FailedToLoad";
import Heading from "@/components/common/Heading";
import ConsumerNotifications from "@/components/consumer/NotificationSetting";
import React from "react";

const page = async () => {
  const charities = await getCharitiesForHome({ is_only_name: false });

  const categories = await getProductsCategories();
  const response = await getNotificationSettings();

  if (response.statusCode !== 404 && response.error) {
    return <FailedToLoadPage />;
  }
  response.data = {
    notification_setting: {
      is_newsletter: response.data.notification_setting?.is_newsletter || 0,
      is_deals: response.data.notification_setting?.is_deals || 0,
      is_charity: response.data.notification_setting?.is_charity || 0,
      is_volunteer_missions:
        response.data.notification_setting?.is_volunteer_missions || 0,
    },
    newsletters: response.data?.newsletters || [],
    charity_alerts: response.data?.charity_alerts || [],
    deals_alerts: response.data?.deals_alerts || [],
  };
  return (
    <main className="mt-[30px] w-full pt-7">
      <Heading
        content={"Notifications"}
        className="pb-4 !text-[34px] text-[#2F2F35]"
      />
      <span>
        This is where you can stay up-to-date on Charitag news and be among the
        first to hear about new deals. Choose the type of information
        you&apos;re interested in and how often you want to receive updates.
        Don&apos;t worry, you can change your preferences at any time.
      </span>
      <div className="mt-6">
        <ConsumerNotifications
          charities={charities.data}
          categories={categories.data}
          initSettings={response.data}
        />
      </div>
    </main>
  );
};

export default page;
