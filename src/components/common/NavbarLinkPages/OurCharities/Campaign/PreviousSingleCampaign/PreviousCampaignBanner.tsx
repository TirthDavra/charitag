import ButtonPrimary from "@/components/common/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import charityImage from "@images/charities-with-cloud-3.png";
import { ISinglePreviousCampaignResponse } from "./types";
import { getDayMonthYear } from "@/utils/basicfunctions";
import Breadcrumb from "@/components/common/BreadCrumbs";
import CountCardBox from "@/components/common/CountCardBox";

const PreviousCampaignBanner = ({
  classNameImage,
  campaignDetails,
}: {
  classNameImage?: string;
  campaignDetails: ISinglePreviousCampaignResponse;
}) => {
  return (
    <div className="bg-header_bg">
      <div className="sm:hidden">
        <div className="relative">
          <Image
            src={charityImage}
            alt=""
            className={` w-full md:max-h-[309px] lg:max-h-[444px] ${classNameImage}`}
          />
          <div className="absolute bottom-[0%] left-[10%] right-[10%] md:left-[25%] md:right-[unset] lg:right-[15%] xl:left-[33%] xl:right-[unset]">
            <CountCardBox total_raised="0" title="Counting..." />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="flex flex-wrap-reverse justify-between pt-7 md:flex-nowrap ">
          <div className="max-sm:pt-7 md:max-w-[668px]">
            <div className="hidden pb-[15px] md:block ">
              <Breadcrumb
                items={[
                  { href: "/campaigns?prev_campaign=true", label: "Campaigns" },
                  {
                    href: "",
                    label: campaignDetails.data?.campaign.title,
                  },
                ]}
              />
            </div>
            <div className="content-center h-[80%]">
              <span className="text-[34px] font-bold leading-[34px] xl:text-[45px] xl:leading-[56px]">
                {campaignDetails.data.campaign.title || ""}
              </span>
              {/* Todo format date */}
              <div className="mt-3 max-w-[552px]">
                <span className="text-base md:text-lg">
                  Campaign ended on{" "}
                  {getDayMonthYear(
                    campaignDetails.data.campaign.end_date || "Jul 13th, 2020",
                  )}
                </span>
              </div>
            </div>
            <div className="mt-[25px] flex flex-wrap justify-center gap-7 pb-3 sm:justify-start md:pb-0"></div>
          </div>
          <div className="hidden sm:block">
            <div className="relative">
              <Image
                src={charityImage}
                alt=""
                className={` w-full md:max-h-[309px] lg:max-h-[444px] ${classNameImage}`}
              />
              <div className="absolute bottom-[0%] left-[10%] right-[10%] md:left-[25%] md:right-[unset] lg:right-[15%] xl:left-[33%] xl:right-[unset]">
                <CountCardBox total_raised="0" title="Counting..." />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviousCampaignBanner;
