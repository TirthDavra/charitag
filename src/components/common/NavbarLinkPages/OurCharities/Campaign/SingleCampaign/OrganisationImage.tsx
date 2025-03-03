import React from "react";
import volunteerImg from "@images/charities_sample-img.png";
import Heading from "@/components/common/Heading";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { ISingleCompaignResponse } from "@/api/charity/types";

const OrganisationImage = ({
  compaignDetails,
  classNameImg,
}: {
  compaignDetails?: ISingleCompaignResponse;
  classNameImg?: string;
}) => {
  return (
    <div
      className={`bg-single-campaign max-w-[438px] overflow-hidden ${classNameImg} rounded-lg bg-[url('./volunteer-girl-img.png')] bg-cover bg-no-repeat text-center md:h-[340px] lg:bg-cover`}
    >
      <div className="h-full overflow-hidden bg-[rgba(57,105,224,0.69)]  bg-fixed  px-5 py-12 lg:py-4 xl:py-12 ">
        <div className="flex items-center justify-center">
          <div className="text-white">
            <Heading content=" About the organisation" varient="3xl" />
            <div className="py-3">
              <span className="text-[22px]">Name of the organisation </span>
            </div>
            <div>
              <span>
                {compaignDetails?.data.charity.about ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
              </span>
            </div>

            <div className="flex justify-center pt-6">
              <ButtonPrimary
                label="Learn more about the organisation"
                className="!h-[50px] rounded-full bg-gradient-to-r from-white to-white px-2 py-3 !shadow-none	"
                classNameLabel="text-[#3969E0]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganisationImage;
