"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import charityImg from "@images/charity.jpg";
import { ICharityCampaignBySlug } from "@/api/common/types";
import Link from "next/link";
import Heading from "@/components/common/Heading";
import { IconGradientCharityLogo } from "@/components/svgIcons";
export interface PreviousCampaignCard {
  campaign: ICharityCampaignBySlug;
  fundPercentage?: boolean;
  classNameImg?: string;
  classNameShadow?: string;
  index?: number;
  redirectUrl: string;
}

const PreviousCampaignCard: React.FC<PreviousCampaignCard> = ({
  campaign,
  fundPercentage,
  classNameImg,
  classNameShadow,
  index = 0,
  redirectUrl,
}) => {
  const [fundRaisedPercentage, setFundRaisedPercentage] = useState(0);

  useEffect(() => {
    setFundRaisedPercentage(
      Math.round((campaign.total_raised / campaign.total_fund_target) * 100),
    );
  }, [fundRaisedPercentage, campaign.total_raised, campaign.total_fund_target]);
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
      className={`relative flex-1 rounded-xl shadow-lg shadow-gray-300 ${classNameShadow} `}
    >
      {/* <!-- Img --> */}
      <div className="relative w-full">
        <Link href={redirectUrl}>
          <Image
            src={
              campaign?.feature_image?.medium_path
                ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                  campaign.feature_image.medium_path
                : charityImg
            }
            alt=""
            className={`h-full w-full rounded-t-xl object-cover ${classNameImg}`}
            width={500}
            height={500}
          />
        </Link>
      </div>
      {/* <!-- Details --> */}
      <Image
        src={
          campaign?.charity?.logo?.thumbnail_path
            ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
              campaign?.charity?.logo?.thumbnail_path
            : charityImg
        }
        className={`absolute left-[15px] top-[15px]  h-[75px] w-[75px] rounded-xl  `}
        alt="img"
        width={100}
        height={100}
      />
      <div className="relative pl-[15px] pr-[16px]">
        <Heading
          content={campaign?.title}
          required={false}
          className="pb-[21px] pt-[26px] !text-[22px]"
        />
        <p className="mb-2 font-bold">{campaign?.charity.charity_name}</p>
        <p className="text-base lg:text-lg text-[#3969E0]">
          Last donation {campaign?.last_donation}
        </p>

        {/* <!-- Slider --> */}
        <div className="relative my-5 h-[3px] w-full bg-unselected_star_color">
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
              firstcolor={gradient.hexColors.firstColor}
              secondcolor={gradient.hexColors.secondColor}
              id={gradient.hexColors.firstColor}
            />
          </span>
        </div>

        <p className="text-sm lg:text-base pb-[15px]">
          <strong className="text-blue-600">
            ${campaign?.total_raised} raised{" "}
          </strong>
          of ${campaign?.total_fund_target}
        </p>
      </div>
    </div>
  );
};

export default PreviousCampaignCard;
