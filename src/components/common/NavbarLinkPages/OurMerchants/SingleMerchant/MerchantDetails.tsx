import React from "react";
import Breadcrumb from "@/components/common/BreadCrumbs";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import charitagLogoInBadge from "@images/charitag_logo_in_badge.png";
import { ISingleMerhant, ISingleMerhantResponse } from "@/api/common/types";

const MerchantDetails = ({ merchant }: { merchant?: ISingleMerhant }) => {
  return (
    <div>
      <div className="hidden md:block">
        <Breadcrumb
          items={[
            {
              href: "/our-merchants",
              label: "Our Merchants",
            },
            {
              href: `/our-merchants/${merchant?.slug}`,
              label: merchant?.slug || "",
            },
          ]}
        />
      </div>
      <div className="pt-[30px]">
        <span className="text-[34px] font-bold leading-[34px] text-[#2F2F36] lg:text-[45px] md:leading-[56px] capitalize">
          {`${merchant?.first_name || ""} ${merchant?.last_name || ""}`}
        </span>
      </div>
      <div>
        <div className="mt-[10px] grid grid-cols-1 gap-[10px] lg:mt-[15px] lg:flex lg:gap-[20px]">
          <div className="flex items-center gap-[10px]">
            <FontAwesomeIcon
              icon={faStar}
              className="text-[16px] text-gradient_color_2"
            />
            <span className="text-[#3969E0]"> {4.5}</span>
            <span className="relative font-bold text-[#2F2F35] underline">
              {`${828} ${"Reviews"}`}
              <span className="absolute right-[-14px] top-[40%] h-[5px] w-[5px] rounded-full bg-gradient_color_2"></span>
            </span>
          </div>
          <div className="flex items-center gap-[10px]">
            <Image
              src={charitagLogoInBadge}
              alt=""
              className="h-[20px] w-[16px] object-cover"
            />
            <span className="relative text-[#3969E0]">
              Best Merchant
              <span className="absolute right-[-14px] top-[40%] h-[5px] w-[5px] rounded-full bg-gradient_color_2"></span>
            </span>
            <span className="relative ml-[10px] font-bold text-merchant_sidebar_text underline">
              {merchant?.type?.title || "Hello"}
              <span className="absolute right-[-14px] top-[40%] h-[5px] w-[5px] rounded-full bg-gradient_color_2"></span>
            </span>
            <span className="ml-[10px] font-bold text-merchant_sidebar_text underline">
              {" "}
              {merchant?.city || "City"}
            </span>
          </div>
        </div>
        <div className="mt-[15px]">
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus, repudiandae?
          </span>
        </div>
      </div>
    </div>
  );
};

export default MerchantDetails;
