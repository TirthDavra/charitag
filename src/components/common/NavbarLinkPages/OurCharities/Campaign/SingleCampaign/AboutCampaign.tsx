import React from "react";
import Heading from "@/components/common/Heading";
import capmaignImg from "@images/campaign.png";
import ImageSlider2 from "@/components/common/product/ImageSlider2";
import { ISingleCompaignResponse } from "@/api/charity/types";
import Parse from "html-react-parser";

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
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores repellendus recusandae laudantium Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores repellendus recusandae laudantium.",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores repellendus recusandae laudantium.",
  },
];

const AboutCampaign = ({
  compaignDetails,
}: {
  compaignDetails: ISingleCompaignResponse;
}) => {
  return (
    <div className="mt-2 lg:-mt-56">
      <Heading
        content={"Presentation of the campaign"}
        className="text-[24px] leading-[29px] font-bold lg:text-[34px] lg:leading-[43px]"
      />
      <div className="mt-3">
        <span className="text-sm lg:text-base text-[#2F2F35]">
          {Parse(compaignDetails.data?.description || "")}
        </span>
      </div>
      <div className="mt-10">
        <Heading
          content={"Details"}
          className="lg:text-lg text-[22px] font-bold"
        />
        <div>
          <ul className="ml-5 list-disc">
            {data.map((item, index) => (
              <li
                key={index}
                className="text-sm lg:text-base pt-1 text-[#2F2F35] marker:text-2xl marker:text-blue-600"
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-10">
        <Heading
          content={"Lorem ipsum dolor sit amet"}
          className="lg:text-lg text-[22px] font-bold"
        />
        <div className="mt-2">
          <span className="text-base lg:text-lg font-bold text-[#3969E0] underline">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
            ipsam possimus voluptates nam animi totam! Lorem ipsum dolor sit
            amet consectetur?
          </span>
        </div>
        <div className="mt-2">
          <span className="text-sm lg:text-base text-[#2F2F35]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia,
            magnam blanditiis nulla a architecto exercitationem est odit at sed
            adipisci ullam in necessitatibus libero, ipsa unde. In maiores,
            quibusdam harum, explicabo rem facere ducimus autem, mollitia nihil
            animi numquam possimus sed provident quaerat eum dolorum eos
            officiis porro repellendus laudantium culpa libero? Sint distinctio
            at facilis blanditiis eaque. A cum asperiores quidem, harum quia
            tempora repudiandae debitis fugit vero corporis saepe commodi nam
            placeat assumenda illum nulla tempore earum fuga facilis repellendus
            ab error! Accusantium corrupti reiciendis error ad atque explicabo
            dignissimos cupiditate, aperiam iusto alias ducimus eveniet eius
            facere?
          </span>
        </div>
      </div>
      <div className="mt-5 border-b-[2px] border-[#eff3fc]" />
      <div className="py-5">
        <span className="text-base lg:text-lg font-bold underline">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, ipsam
          possimus voluptates nam animi totam! Lorem ipsum dolor sit amet
          consectetur?
        </span>
      </div>
      <div className="border-b-[2px] border-[#eff3fc]" />
      <div className="pb-10 pt-5">
        <span className="text-base lg:text-lg font-bold underline">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, ipsam
          possimus voluptates nam animi totam?
        </span>
      </div>
      <div className="border-b-[2px] border-[#eff3fc]" />
      <div className="mt-10 md:pb-12">
        <ImageSlider2 gallery={compaignDetails.data?.gallery || []} classDots="md:!bottom-[-4%]"/>
        <div className="mt-11 border-t border-sidebar_devider_color md:hidden" />
      </div>
      {/* <div className="" /> */}
    </div>
  );
};

export default AboutCampaign;
