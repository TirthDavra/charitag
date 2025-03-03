import Heading from "@/components/common/Heading";
import React from "react";
import OrganisationImage from "../SingleCampaign/OrganisationImage";
import { ISinglePreviousCampaignResponse } from "./types";
import Parse from "html-react-parser";
import Link from "next/link";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface Data {
  title: string;
}
const data: Data[] = [
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores repellendus recusandae laudantium Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores repellendus recusandae laudantium.",
  },
];
const AboutPrevCampaign = ({
  campaignDetails,
}: {
  campaignDetails: ISinglePreviousCampaignResponse;
}) => {
  return (
    <div className="grid grid-cols-3 gap-5 ">
      <div className="col-span-3 rounded-3xl border border-merchant_border px-4 py-4 lg:col-span-2 lg:px-9 lg:py-10">
        <Heading
          content={`About the campaign`}
          className="text-[24px] leading-[29px] text-merchant_sidebar_text lg:!text-[34px] lg:leading-[43px]"
        />
        <div className="pt-[15px]">
          {Parse(campaignDetails.data.campaign.description || "")}
        </div>
        <div className="py-5">
          <span className="text-base font-bold lg:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
            ipsam possimus voluptates nam animi totam! Lorem ipsum dolor sit
            amet consectetur?
          </span>
        </div>
        <div>
          <ul className="ml-5 list-disc">
            {data.map((item, index) => (
              <li
                key={index}
                className="pt-1 text-base text-[#2F2F35] marker:text-2xl marker:text-blue-600 lg:text-lg"
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex w-full mt-5 items-center justify-start">
          <Link href={"/"}>
            <ButtonPrimary
              label="Lorem ipsum dolor"
              classNameLabel="text-blue-500"
              className={
                "bg-gradient-to-r text-lg from-transparent to-transparent pr-2 !shadow-none"
              }
            />
          </Link>
          <div className="flex items-center text-blue-600 ">
            <span className="-mr-[3px] text-[30px]">·</span>
            <span className="text-[30px]">·</span>
            <span>
              <FontAwesomeIcon icon={faArrowRight} />
            </span>
          </div>
        </div>
      </div>
      <div className="col-span-3 mx-auto mt-[20px] lg:col-span-1 lg:mt-0">
        <OrganisationImage classNameImg="!rounded-3xl"/>
      </div>
    </div>
  );
};

export default AboutPrevCampaign;
