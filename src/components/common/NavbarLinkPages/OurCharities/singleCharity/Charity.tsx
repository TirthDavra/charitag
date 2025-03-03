import { ISingleCharityData } from "@/api/common/types";
import Breadcrumb from "@/components/common/BreadCrumbs";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

const Charity = ({ charityData }: { charityData: ISingleCharityData }) => {
  return (
    <div>
      <div className="hidden md:block">
        <Breadcrumb
          items={[
            {
              href: "/our-charities",
              label: "Our Charities",
            },
            {
              href: `/our-charities/${charityData?.slug || ""}`,
              label: charityData?.slug,
            },
          ]}
        />
      </div>
      <div className="">
        <div className="pt-[34px]">
          <span className="text-[34px] font-bold leading-[34px] text-[#2F2F36] lg:text-[45px] lg:leading-[56px]">
            {charityData?.charity_name || ""}
          </span>
        </div>
        <div className="flex items-center gap-[25px] pt-[15px]">
          <span className="relative text-base font-bold underline">
            {charityData?.type?.title || "Charity Type"}
            <span className="absolute right-[-15px] top-[40%] h-[5px] w-[5px] rounded-full bg-gradient_color_2"></span>
          </span>
          <span className="text-base font-bold underline">Toronto</span>
        </div>
        <div className="w-[552px] pt-6">
          <span className="text-base text-[#2F2F36] md:text-lg">
            {charityData?.charity_short_description || ""}
          </span>
        </div>
      </div>
      <Link
        href={"/shop?deal=true&page=1"}
        className="hidden pb-[57px] pt-[25px] md:block"
      >
        <ButtonPrimary
          label={"Shop Our Deals"}
          className={
            "h-[50px] w-[158px] justify-center rounded-full px-[15px] py-[25px]"
          }
        />
      </Link>
    </div>
  );
};

export default Charity;
