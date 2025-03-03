import { ICorporateFundraiserBySlug } from "@/api/common/types";
import Heading from "@/components/common/Heading";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Corporate = ({
  corporateDetails,
}: {
  corporateDetails: ICorporateFundraiserBySlug;
}) => {
  return (
    <div className="mt-4 md:mt-5 bg-[#f9fafe] sm:bg-[unset]">
      <Heading content={corporateDetails?.name} className="!text-[34px] lg:!text-5xl" />
      <div className="flex flex-wrap items-center gap-x-6 pt-4">
        <span className="relative text-lg font-bold underline">
          {corporateDetails?.type?.title || "Community"}
          <span className="absolute right-[-15px] top-[50%] h-[5px] w-[5px] -translate-y-1/2 transform rounded-full bg-gradient_color_2"></span>
        </span>
        <span className="relative text-lg font-bold underline">
          {corporateDetails.country.name || "India"}
          <span className="absolute right-[-15px] top-[50%] h-[5px] w-[5px] -translate-y-1/2 transform rounded-full bg-gradient_color_2"></span>
        </span>
        <span className="flex items-center gap-2 text-lg text-sidebar_icon_color">
          <FontAwesomeIcon icon={faUserGroup} />
          {(corporateDetails.member_count &&
            `${corporateDetails.member_count} Members`) ||
            "38 Members"}
        </span>
      </div>
      <div className="pt-4">
        <span className="text-lg text-[#2F2F35]">
          {corporateDetails.short_description}
        </span>
      </div>
    </div>
  );
};

export default Corporate;
