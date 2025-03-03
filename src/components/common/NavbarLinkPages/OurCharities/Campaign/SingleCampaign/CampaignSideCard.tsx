import React from "react";
import Image from "next/image";
import charity from "@images/campaign.png";
import charitiesCloudImage from "@images/charity_logo.png";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { ISingleCompaignResponse } from "@/api/charity/types";
import RemaningTime from "./RemaningTime";
import Link from "next/link";

const CampaignSideCard = ({
  compaignDetails,
}: {
  compaignDetails: ISingleCompaignResponse;
}) => {
  const imagePath =
    process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT ||
    "" + compaignDetails.data.feature_image.medium_path;
  const progress = compaignDetails.data?.progress_percentage || "";

  return (
    <div className="mt-5 min-h-[599px] max-w-[440px] flex-1 rounded-xl bg-white shadow-xl shadow-[#ecf0fc]">
      <div className="relative w-full">
        <div className="absolute right-[5%] top-4 w-[60%] rounded-lg py-2 md:left-[5%] xl:left-[9%] md:right-[unset] md:w-[90%] xl:w-[81%]">
          <div className="text-center bg-white font-bold text-[#3969E0]">
            <RemaningTime
              startTime={compaignDetails.data?.start_date}
              endTime={compaignDetails.data?.end_date}
            />
            {/* Days Remaining: 04d 13h 47m */}
          </div>
        </div>
        <Image
          src={
            compaignDetails?.data?.feature_image?.thumbnail_path
              ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                compaignDetails?.data.feature_image.medium_path
              : ""
          }
          className="h-[258px] rounded-t-xl object-cover"
          alt=""
          width={440}
          height={258}
        />
        <Image
          src={charitiesCloudImage}
          alt=""
          className="absolute left-[33%] top-56 h-[65px] w-[140px] rounded-xl md:left-[30%]"
        />
      </div>
      <div className=" pt-10 text-center">
        <div className="flex flex-col xl:flex-row max-md:gap-y-3 md:items-center justify-center  space-x-3 pt-3">
          <span className="text-4xl font-bold text-blue-600">
            ${compaignDetails.data?.total_raised}
          </span>
          <span className="text-base lg:text-lg font-bold">
            raised of ${compaignDetails.data?.total_fund_target} goal
          </span>
        </div>
        <div className="flex items-center justify-center gap-[25px] pt-4">
          <span className="relative text-sm lg:text-base text-[#3969E0]">
            Last donation {compaignDetails.data?.last_donation || "0 day ago"}
              <span className="absolute right-[-15px] top-[40%] h-[5px] w-[5px] rounded-full bg-gradient_color_2"></span>
          </span>
          <span className="text-lg text-[#3969E0]">
            {compaignDetails.data?.total_donation}
          </span>
        </div>
        <div className="px-10 pt-5">
          <div className="relative my-5 h-[3px] w-full bg-unselected_star_color">
            <div
              className={`absolute h-full bg-gradient-to-r from-gradient_color_2 to-gradient_color_1`}
              style={{
                width: Number(progress) > 100 ? "100%" : `${progress}%`,
              }}
            ></div>
            <span
              className={`absolute top-[-250%] flex h-[16px]`}
              style={{ left: Number(progress) > 100 ? "100%" : `${progress}%` }}
            >
              {progress && (
                <span
                  className={`absolute top-[-100%] flex h-[16px] text-[10px] font-bold text-blue-600`}
                >
                  {progress}%
                </span>
              )}
              <span className="absolute top-[20%] h-[10px] w-[10px] rounded-full bg-gradient-to-r from-gradient_color_2 to-gradient_color_1"></span>
            </span>
          </div>
        </div>
      </div>
      <div className="mt-9 border-b-[1px] border-[rgba(57,105,224,0.25)]" />
      <Link
        href={"/shop?deal=true"}
        className="flex justify-center px-[45px] py-10"
      >
        <ButtonPrimary
          label="Shop Our Deals"
          className="w-full rounded-full py-3"
          classNameLabel="w-full"
        />
      </Link>
    </div>
  );
};

export default CampaignSideCard;
