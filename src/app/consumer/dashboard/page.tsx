import React from "react";
import Heading from "@/components/common/Heading";
import Image from "next/image";
import volunteerImg from "@images/volunteer-5.png";
import { getConusmerDashboardDetails } from "@/api/consumer/dashboard";
import ConsumerLastOrder from "@/components/consumer/Dashboard/ConsumerLastOrder";
import DashboardProfile from "@/components/consumer/Dashboard/DashboardProfile";
import DashboardReviews from "@/components/consumer/Dashboard/DashboardReviews";
import CharityCard from "@/components/common/CharityCard";
import ConsumerStats from "@/components/consumer/Dashboard/ConsumerStats";

const Dashboard = async () => {
  const response = await getConusmerDashboardDetails();
  const consumerData = response.data;

  return (
    <div className="mt-[30px]">
      <div className="grid-cols-5 gap-x-[14px] md:grid">
        <div className="col-span-3 rounded-xl bg-sidebar_color px-4 pb-6 pt-[31px]">
          <Heading
            content={`Welcome ${consumerData?.consumer?.first_name || ""}`}
            className="!text-[45px] leading-[56px] text-merchant_sidebar_text"
          />
          <div className="pt-6">
            <span className="text-merchant_sidebar_text">
              On your account dashboard, you can access all your personal
              information, including the history of your orders and your
              donation management.
            </span>
          </div>
        </div>
        <div className="mb:mt-0 col-span-2 mt-[30px] rounded-xl border border-merchant_border  p-4">
          <div className="flex flex-wrap items-center justify-between">
            <Heading
              content={"My volunteer Badge"}
              className="!text-[22px] text-merchant_sidebar_text"
            />
            <span className="text-sidebar_icon_color underline">
              View details
            </span>
          </div>
          <div className="flex sm:flex-col xl:flex-row pt-4">
            <span className="text-merchant_sidebar_text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </span>
            <div className="min-h-20 min-w-[160px] mx-auto">
              <Image src={volunteerImg} alt="" className="h-[80px] w-[160px]" />
            </div>
          </div>
          <div className="rounded-lg bg-gradient-to-r from-gradient_color_2 to-gradient_color_1  py-1 text-center font-bold text-white">
            {` Days remaining: ${consumerData?.days_remaining || "-"}`}
          </div>
        </div>
      </div>
      <div className="mt-[30px] grid-cols-2 gap-x-5 md:grid">
        <div className="col-span-1">
          <ConsumerLastOrder orderDetails={consumerData?.order} />
        </div>
        <div className="col-span-1 mt-[30px] md:mt-0">
          <DashboardProfile profileDetails={consumerData?.consumer} />
        </div>
      </div>
      <div className="mt-[30px]">
        <DashboardReviews consumerReviews={consumerData?.review} />
      </div>
      <div className="mt-[30px] grid-cols-2 gap-x-5 md:grid">
        <div className="col-span-1">
          <CharityCard
            charity={consumerData?.charity}
            classNameImg="!object-none max-h-[200px]"
            fundPercentage
            classNameShadow="!shadow-equally_distributed_bluish"
          />
        </div>
        <div className="col-span-1 mt-[30px] md:mt-0">
          <ConsumerStats ConsumerStat={consumerData?.donation} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
