"use client";
import React, { useEffect, useState } from "react";
import charitagLogoForFundTracking from "@images/orange_purple_logo.svg";
import Heading from "./Heading";
import Image from "next/image";
import charityImg from "@images/charity.jpg";
import { ICampaignAndCharityCard } from "@/api/common/types";
import Link from "next/link";
import { IconGradientCharityLogo } from "../svgIcons";
import RemaningTime from "./NavbarLinkPages/OurCharities/Campaign/SingleCampaign/RemaningTime";
import { getlength } from "@/utils/basicfunctions";
export interface CharityCardProps {
  charity: ICampaignAndCharityCard;
  fundPercentage?: boolean;
  classNameImg?: string;
  classNameShadow?: string;
  index?: number;
  expiry?: boolean;
}

const CharityCard: React.FC<CharityCardProps> = ({
  charity,
  fundPercentage,
  classNameImg,
  classNameShadow,
  index = 0,
  expiry = false,
}) => {
  const [fundRaisedPercentage, setFundRaisedPercentage] = useState(0);

  useEffect(() => {
    setFundRaisedPercentage(Number(charity?.progress_percentage));
  }, [fundRaisedPercentage, charity?.progress_percentage]);

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

  const gradient = getGradient();

  return (
    <div
      className={`relative flex-1 bg-white rounded-xl shadow-lg shadow-gray-300 ${classNameShadow} `}
    >
      {/* <!-- Img --> */}
      <div className="relative w-full">
        <Link href={`${charity?.redirect_url}`}>
          <Image
            src={
              charity?.feature_image?.medium_path
                ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                  charity.feature_image.medium_path
                : charityImg
            }
            alt=""
            className={`h-full w-full rounded-t-xl object-cover ${classNameImg}`}
            width={500}
            height={500}
          />
        </Link>

        {expiry && (
          <div className="absolute bottom-2 right-2 h-[30px] w-[229px] rounded-lg bg-gradient-to-r from-gradient_color_2 to-gradient_color_1 p-1">
            <div className="text-center font-bold text-white">
              <RemaningTime endTime={charity?.end_date || ""} />
            </div>
          </div>
        )}
      </div>
      {/* <!-- Details --> */}
      <Image
        src={
          charity?.logo?.thumbnail_path
            ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
              charity?.logo?.thumbnail_path
            : charityImg
        }
        className={`absolute left-[15px] top-[15px]  h-[75px] w-[75px] rounded-xl  `}
        alt="img"
        width={100}
        height={100}
      />
      <div className="relative pl-[15px] pr-[16px]">
        <Heading
          content={charity?.charity_name || "Charity name"}
          required={false}
          className="pb-[21px] pt-[26px] !text-[22px]"
        />
        <p className="mb-2 font-bold">{charity?.charity_short_description}</p>
        <p className="text-[#3969E0]">Last donation {charity?.last_donation}</p>

        {/* <!-- Slider --> */}

        <div className="relative my-5 h-[3px] w-full bg-unselected_star_color">
          <div
            className={`absolute h-full bg-gradient-to-r ${gradient.tailwindCls}`}
            style={{
              width:
                fundRaisedPercentage > 100
                  ? "100%"
                  : fundRaisedPercentage + "%",
            }}
          ></div>
          <span
            className={`absolute top-[-250%] flex h-[16px]`}
            style={{
              left:
                fundRaisedPercentage > 100
                  ? 100 - getlength(fundRaisedPercentage) + "%"
                  : fundRaisedPercentage + "%",
            }}
          >
            {fundPercentage && (
              <span
                className={`absolute top-[-100%] ${fundRaisedPercentage > 98 ? "right-[-13px]" : "right-[unset]"} flex h-[16px] text-[12px] font-bold text-blue-600`}
              >
                {isNaN(fundRaisedPercentage) ? 0 : fundRaisedPercentage}%
              </span>
            )}
            {/* <Image
              src={charitagLogoForFundTracking}
              alt="h-full"
              width={10}
              height={100}
            /> */}
          </span>
          <span
            className={`absolute top-[-250%] flex h-[16px]`}
            style={{
              left:
                fundRaisedPercentage > 100 ? "99%" : fundRaisedPercentage + "%",
            }}
          >
            {/* <Image
              src={charitagLogoForFundTracking}
              alt="h-full"
              width={10}
              height={100}
            /> */}
            <IconGradientCharityLogo
              firstcolor={gradient.hexColors.firstColor}
              secondcolor={gradient.hexColors.secondColor}
              id={gradient.hexColors.firstColor}
            />
          </span>
        </div>

        <p className="pb-[15px]">
          <strong className="text-blue-600">
            ${charity?.total_raised || 0} raised{" "}
          </strong>
          of ${charity?.total_fund_target || 0}
        </p>
      </div>
    </div>
  );
};

export default CharityCard;
