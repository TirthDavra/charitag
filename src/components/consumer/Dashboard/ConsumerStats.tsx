import React from "react";
import Heading from "@/components/common/Heading";
import Image from "next/image";
import charitagLogo from "@images/charitag_logo_white.svg";
import { IConsumerDonation } from "./types";
import volunteerImg from "@images/charities-with-cloud-2.png";

const ConsumerStats = ({
  ConsumerStat,
}: {
  ConsumerStat: IConsumerDonation;
}) => {
  return (
    <div className="relative h-full rounded-xl border border-merchant_border px-4 py-5">
      <div className="flex items-center justify-between">
        <Heading
          content={"My Giving Stats"}
          className="!text-[22px] text-merchant_sidebar_text"
        />
        <span className="text-sidebar_icon_color underline">View details</span>
      </div>
      <div className="pt-1 text-merchant_sidebar_text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </div>
      <div className="mt-3 flex flex-col items-center xl:justify-between  rounded-md bg-gradient-to-r from-gradient_color_2/100 to-blue-400 px-4 py-[11px] sm:flex-row">
        <div className="flex">
          <div className="sm:mt-2 xl:mt-0 xl:mr-[15px]">
            <Image
              alt=""
              src={charitagLogo}
              className="h-9 w-10 xl:h-[54px] xl:w-[37px]"
            />
          </div>
          <div className="flex gap-1 text-white my-auto sm:flex-col xl:flex-col">
            <span className="xl:text-lg">Number of donations:</span>
            <div className="text-2xl font-bold">
              {ConsumerStat?.number_of_donations}
            </div>
          </div>
        </div>
        <div className="w-full sm:mr-9 xl:mr-0 border-b border-white sm:h-12 sm:w-0 sm:border-b-0  sm:border-r"></div>
        <div className="flex pt-2 text-white sm:block sm:pt-0">
          <span className="text-lg">Total donations:</span>
          <div className="text-2xl font-bold">
            {`${ConsumerStat?.total_donations ? `$${ConsumerStat?.total_donations}` : ""}`}
          </div>
        </div>
      </div>
      <div className="flex max-w-[190px] pt-4">
        <span className="text-merchant_sidebar_text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </span>
      </div>
      <Image
        src={volunteerImg}
        alt=""
        className="absolute bottom-0 right-0 z-[-1] h-[250px] w-[250px]"
      />
    </div>
  );
};

export default ConsumerStats;
