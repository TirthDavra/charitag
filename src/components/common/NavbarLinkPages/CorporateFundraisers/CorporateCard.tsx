"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import charityImg from "@images/charity.jpg";
import { ICorporateFundraiser } from "@/api/common/types";
import Link from "next/link";
import { IconGradientCharityLogo } from "../../../svgIcons";
import Heading from "../../Heading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import ButtonPrimary from "../../ButtonPrimary";
import RemaningTime from "../OurCharities/Campaign/SingleCampaign/RemaningTime";
export interface CharityCardProps {
  corporate: ICorporateFundraiser;
  fundPercentage?: boolean;
  classNameImg?: string;
  classNameShadow?: string;
  index?: number;
  expiry?: boolean;
}

const CorporateCard: React.FC<CharityCardProps> = ({
  corporate,
  fundPercentage,
  classNameImg,
  classNameShadow,
  index = 0,
  expiry = false,
}) => {
  const [fundRaisedPercentage, setFundRaisedPercentage] = useState(0);

  useEffect(() => {
    setFundRaisedPercentage(
      Math.round((corporate.total_raised / corporate.total_fund_target) * 100),
    );
    console.log("fundRaisedPercentage", fundRaisedPercentage);
  }, [
    fundRaisedPercentage,
    corporate.total_raised,
    corporate.total_fund_target,
  ]);
  const getGradient = () => {
    switch (index % 3) {
      case 0:
        return {
          tailwindCls: "from-purple-600 to-blue-600",
          hexColors: { firstColor: "#9333ea", secondColor: "#2563eb" },
        };
      case 1:
        return {
          tailwindCls: "from-rose-500 to-purple-500",
          hexColors: { firstColor: "#f43f5e", secondColor: "#a855f7" },
        };
      case 2:
        return {
          tailwindCls: "from-cyan-300 to-cyan-600",
          hexColors: { firstColor: "#67e8f9", secondColor: "#0891b2" },
        };
      default:
        return {
          tailwindCls: "from-purple-600 to-blue-600",
          hexColors: { firstColor: "#9333ea", secondColor: "#2563eb" },
        };
    }
  };
  const [color] = useState(index % 3);

  const gradient = getGradient();
  return (
    <div
      className={`relative flex-1 rounded-xl shadow-lg shadow-gray-300 lg:max-w-[438px] ${classNameShadow} `}
    >
      {/* <!-- Img --> */}
      <div className="relative w-full">
        <Link href={`/corporate-fundraisers/${corporate.slug}`}>
          <Image
            src={
              corporate?.feature_image?.medium_path
                ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                  corporate.feature_image.medium_path
                : charityImg
            }
            alt=""
            className={`h-full w-full rounded-t-xl object-cover ${classNameImg}`}
            width={500}
            height={500}
          />
        </Link>

        {/* {charity?.deal && (
          <div className="absolute bottom-2 left-[50%] h-[30px] w-[229px] rounded-lg bg-gradient-to-r from-gradient_color_2 to-gradient_color_1 p-1">
            <p className="text-center font-bold text-white">{charity?.deal}</p>
          </div>
        )} */}
        {/* {expiry && (
          <div className="absolute bottom-2 right-2 h-[30px] w-[229px] rounded-lg bg-gradient-to-r from-gradient_color_2 to-gradient_color_1 p-1">
            <div className="text-center font-bold text-white">
              <RemaningTime endTime={corporate?.end_date || ""} />
            </div>
          </div>
        )} */}
      </div>
      {/* <!-- Details --> */}
      <Image
        src={
          corporate?.logo?.thumbnail_path
            ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
              corporate?.logo?.thumbnail_path
            : charityImg
        }
        className={`absolute left-[15px] top-[15px]  z-auto rounded-xl object-cover  `}
        alt="img"
        width={100}
        height={100}
      />
      <div className="relative pl-[15px] pr-[16px]">
        <Heading
          content={corporate?.name || ""}
          required={false}
          className="pt-[22px] !text-[22px]"
        />

        <div className="flex flex-wrap items-center gap-x-[25px] border-b border-merchant_border pb-[26px] pt-4">
          {/* <span className="relative text-base font-bold underline">
            {corporate?.type?.title || "Charity Type"}
            <span className="absolute right-[-15px] top-[40%] h-[5px] w-[5px] rounded-full bg-gradient_color_2"></span>
          </span> */}
          <span className="relative text-base font-bold underline">
            {corporate?.country?.name || "India"}
            <span className="absolute right-[-15px] top-[40%] h-[5px] w-[5px] rounded-full bg-gradient_color_2"></span>
          </span>
          <span className="flex items-center gap-2 text-sidebar_icon_color">
            <FontAwesomeIcon icon={faUserGroup} />
            {corporate?.member_count && `${corporate?.member_count} Members`}
          </span>
        </div>
        {/* <!-- Slider --> */}
        <div className="relative mb-3 mt-[36px] h-[3px] w-full bg-unselected_star_color">
          <div
            className={`absolute h-full bg-gradient-to-r ${gradient.tailwindCls}`}
            style={{ width: fundRaisedPercentage + "%" }}
          ></div>
          <span
            className={`absolute top-[-250%] flex h-[16px]`}
            style={{ left: fundRaisedPercentage - 1 + "%" }}
          >
            {fundPercentage && (
              <span
                className={`absolute top-[-100%] flex h-[16px] text-[12px] font-bold text-blue-600`}
              >
                {fundRaisedPercentage}%
              </span>
            )}

            <IconGradientCharityLogo
              id={gradient.hexColors.firstColor}
              firstcolor={gradient.hexColors.firstColor}
              secondcolor={gradient.hexColors.secondColor}
            />
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between">
          <p>
            <strong className="text-blue-600">
              ${corporate?.total_raised} raised{" "}
            </strong>
            of ${corporate?.total_fund_target}
          </p>
          <p className="text-sidebar_icon_color">
            Last donation
            {corporate?.last_donation}
          </p>
        </div>
        <div className="flex items-center justify-center pb-5 pt-[26px]">
          <Link href={"/register"}>
            <ButtonPrimary
              label="Join this corporate fundraiser"
              className={
                "h-[50px] justify-center rounded-full px-[30px] py-[25px] md:px-[15px]"
              }
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CorporateCard;
