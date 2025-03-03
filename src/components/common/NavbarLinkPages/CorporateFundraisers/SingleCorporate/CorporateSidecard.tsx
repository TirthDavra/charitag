import React from "react";
import Image from "next/image";
import charitiesCloudImage from "@images/charity_logo.png";
import NoDataFound from "@images/productDefault.jpg";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { ICorporateFundraiserBySlug } from "@/api/common/types";
import Link from "next/link";

const CorporateSidecard = ({
  corporateDetails,
}: {
  corporateDetails: ICorporateFundraiserBySlug;
}) => {
  const progress =
    (corporateDetails.total_raised / corporateDetails.total_fund_target) * 100;
  return (
    <div className="mt-5 min-h-[599px] max-w-[440px] flex-1 rounded-xl bg-white shadow-xl shadow-[#ecf0fc]">
      <div className="relative w-full">
        <Image
          src={
            corporateDetails?.feature_image?.thumbnail_path
              ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                corporateDetails?.feature_image.medium_path
              : NoDataFound
          }
          className="h-[258px] w-full rounded-t-xl object-contain md:object-contain lg:max-w-[440px]"
          alt=""
          width="440"
          height="258"
        />
        <Image
          src={
            corporateDetails?.logo?.thumbnail_path
              ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                corporateDetails?.logo?.thumbnail_path
              : charitiesCloudImage
          }
          alt=""
          className="absolute left-[32%] top-56 h-[65px] max-w-[140px] rounded-xl lg:top-52 xl:left-[34%] xl:top-56"
        />
      </div>
      <div className=" pt-10 text-center">
        <div className="flex flex-col justify-center gap-y-2 space-x-3 pt-3 lg:flex-row lg:items-center">
          <span className="text-4xl font-bold text-blue-600">
            ${corporateDetails.total_raised}
          </span>
          <span className="text-base font-bold lg:text-lg">
            raised of ${corporateDetails.total_fund_target} goal
          </span>
        </div>
        <div className="flex items-center justify-center gap-[25px] pt-2">
          <span className="relative text-sm text-[#3969E0] lg:text-base">
            Last donation {corporateDetails.last_donation}
            <span className="absolute right-[-15px] top-[40%] h-[5px] w-[5px] rounded-full bg-gradient_color_2"></span>
          </span>
          <span className="text-lg text-[#3969E0]">
            {corporateDetails.total_donation}
          </span>
        </div>
        <div className="px-10 pt-5">
          <div className="relative my-5 h-[3px] w-full bg-unselected_star_color">
            <div
              className={`absolute h-full bg-gradient-to-r from-gradient_color_2 to-gradient_color_1`}
              style={{ width: progress > 100 ? "100%" : `${progress}%` }}
            ></div>
            <span
              className={`absolute top-[-250%] flex h-[16px]`}
              style={{ left: progress > 100 ? "100%" : `${progress}%` }}
            >
              <span
                className={`absolute top-[-100%] flex h-[16px] text-[12px] font-bold text-blue-600`}
              >
                {progress}%
              </span>
              <span className="absolute top-[20%] h-[10px] w-[10px] rounded-full bg-gradient-to-r from-gradient_color_2 to-gradient_color_1"></span>
            </span>
          </div>
        </div>
      </div>
      <div className="mt-9 border-b-[1px] border-[rgba(57,105,224,0.25)]" />
      <div className="flex justify-center px-[45px] py-10">
        <Link href={"/shop"} className="w-full">
          <ButtonPrimary
            label="Shop Our Deals"
            className="w-full rounded-full py-3"
            classNameLabel="w-full"
          />
        </Link>
      </div>
    </div>
  );
};

export default CorporateSidecard;
