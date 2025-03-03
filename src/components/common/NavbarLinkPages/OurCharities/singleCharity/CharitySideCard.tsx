import React from "react";
import Heading from "@/components/common/Heading";
import Image from "next/image";
import capmaignImg from "@images/productDefault.jpg";
import charitiesCloudImage from "@images/productDefault.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { ISingleCharityData } from "@/api/common/types";

const CharitySideCard = ({
  charityDetails,
}: {
  charityDetails: ISingleCharityData;
}) => {
  return (
    <div className="min-h-[398px] flex-1 rounded-xl bg-white shadow-[0_6px_24px_0_rgba(57,105,224,0.15)]">
      <div className="relative w-full">
        <Image
          src={
            charityDetails?.feature_image?.medium_path
              ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                charityDetails?.feature_image?.medium_path
              : capmaignImg
          }
          className="max-h-[285px] w-full rounded-t-xl "
          alt=""
          width={500}
          height={500}
        />
      </div>
      <div className="relative pt-14 text-center">
        <div className="flex justify-center">
          <Image
            src={
              charityDetails?.logo?.thumbnail_path
                ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                  charityDetails?.logo?.thumbnail_path
                : charitiesCloudImage
            }
            alt=""
            className="absolute top-[-32px] aspect-square h-[65px] w-[140px] rounded-xl object-cover"
            width={200}
            height={200}
          />
        </div>

        <span className="text-lg font-bold md:text-[22px]">
          Total amount raised with charitag:
        </span>
        <div className="pt-3">
          <span className="text-2xl font-bold text-[#3969E0] md:text-[34px]">
            {`$${charityDetails?.total_raised || "0"}`}
          </span>
        </div>
        <div className="pt-[10px]">
          <span className="text-sm text-[#3969E0] md:text-base">
            Last donation {charityDetails?.last_donation || "30m"} ago
          </span>
        </div>
      </div>
      <div className="border-b-[2px] border-[#eff3fc] pt-[29px]" />
      <div className="flex justify-center gap-5 py-6">
        <FontAwesomeIcon
          icon={faGlobe}
          className="h-[32px] w-[32px] text-blue-600 md:text-[32px]"
        />
        <FontAwesomeIcon
          icon={faFacebook}
          className="h-[32px] w-[32px] text-blue-600 md:text-[32px]"
        />
        <FontAwesomeIcon
          icon={faInstagram}
          className="h-[32px] w-[32px] text-blue-600 md:text-[32px]"
        />
        <FontAwesomeIcon
          icon={faTwitter}
          className="h-[32px] w-[32px] text-blue-600 md:text-[32px]"
        />
      </div>
    </div>
  );
};

export default CharitySideCard;
