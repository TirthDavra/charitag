import React from "react";
import Heading from "@/components/common/Heading";
import ImageSlider2 from "@/components/common/product/ImageSlider2";
import { ISinglePreviousCampaignResponse } from "./types";

const MoneyRaisedDetails = ({
  campaignDetails,
}: {
  campaignDetails: ISinglePreviousCampaignResponse;
}) => {
  // Create an array of objects containing the content data
  const moneyRaisedContent = [
    {
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In arcu cursus euismod quis viverra. Vulputate odio ut enim blandit volutpat maecenas volutpat.",
      items: [
        {
          title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
          amount: "$2,000",
        },
        {
          title: "Lorem ipsum dolor sit amet",
          amount: "$10,000",
        },
      ],
      footer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In arcu cursus euismod quis viverra. Vulputate odio ut enim blandit volutpat maecenas volutpat.",
    },
  ];

  return (
    <div className="grid grid-cols-2 rounded-3xl p-4 pb-10 lg:pb-[35px] lg:p-[35px] shadow-equally_distributed_bluish">
      <div className="col-span-2 lg:col-span-1 lg:max-w-[410px] xl:max-w-[520px] lg:py-[41px] lg:pt-[31px]">
        <Heading
          content={`How the money raised was used`}
          className="text-[24px] leading-[29px] lg:!text-[34px] lg:leading-[43px] text-merchant_sidebar_text"
        />
        {moneyRaisedContent.map((content, index) => (
          <div key={index}>
            <div className="pt-[20px] text-merchant_sidebar_text">
              {content.description}
            </div>
            {content.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className={`flex flex-col lg:flex-row gap-y-2 lg:items-center justify-between ${itemIndex === 0 ? "border-b border-sidebar_devider_color pb-[15px] pt-[20px]" : "pt-[10px]"}`}
              >
                <span className="font-bold text-merchant_sidebar_text">
                  {item.title}
                </span>
                <span className="text-lg font-bold text-sidebar_icon_color">
                  {item.amount}
                </span>
              </div>
            ))}
            <div className="border-b border-sidebar_devider_color pb-[15px] text-merchant_sidebar_text">
              {content.footer}
            </div>
          </div>
        ))}
      </div>
      <div className="col-span-2 lg:col-span-1">
        <ImageSlider2 gallery={campaignDetails.data.campaign.gallery} classImg="!rounded-xl" classDots="!bottom-[-6%]"/>
      </div>
    </div>
  );
};

export default MoneyRaisedDetails;
