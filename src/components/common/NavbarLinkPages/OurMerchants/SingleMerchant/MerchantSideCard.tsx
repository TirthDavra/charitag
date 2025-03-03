import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { IStore } from "@/api/common/types";
import Link from "next/link";
import defaultMerchantBg from "@images/campaign.png";
import defaultMerchantLogo from "@images/productDefault.jpg";

const MerchantSideCard = ({ merchantDetails }: { merchantDetails: IStore }) => {
  return (
    <div className="min-h-[398px] flex-1 rounded-xl bg-white shadow-lg shadow-[#ecf0fc]">
      <div className="relative w-full">
        <Image
          src={
            merchantDetails?.feature_image?.medium_path
              ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                merchantDetails?.feature_image?.medium_path
              : defaultMerchantBg
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
              merchantDetails?.logo?.thumbnail_path
                ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                  merchantDetails?.logo?.thumbnail_path
                : defaultMerchantLogo
            }
            alt=""
            className="absolute top-[-32px] aspect-square h-[65px] w-[140px] rounded-xl"
            width={200}
            height={200}
          />
        </div>

        <span className="text-lg font-bold md:text-[22px]">
          Total amount raised with charitag:
        </span>
        <div className="pt-3">
          <span className="text-2xl font-bold text-[#3969E0] md:text-[34px]">
            {`$${merchantDetails?.total_raised || "2,463,510"}`}
          </span>
        </div>
        <div className="pt-[10px]">
          <span className="text-sm text-[#3969E0] md:text-base">
            Last donation {merchantDetails?.last_donation || "30m"}
          </span>
        </div>
      </div>
      <div className="border-b-[2px] border-[#eff3fc] pt-[29px]" />
      <div className="flex justify-center gap-5 py-6">
        {merchantDetails?.website && (
          <div title={merchantDetails.website}>
            <Link href={merchantDetails.website} target="_blank">
              <FontAwesomeIcon
                icon={faGlobe}
                className="text-2xl text-blue-600 md:text-[32px]"
              />
            </Link>
          </div>
        )}
        {merchantDetails?.facebook && (
          <div title={merchantDetails.facebook}>
            <Link href={merchantDetails.facebook} target="_blank">
              <FontAwesomeIcon
                icon={faFacebook}
                className="text-2xl text-blue-600 md:text-[32px]"
              />
            </Link>
          </div>
        )}
        {merchantDetails?.instagram && (
          <div title={merchantDetails.instagram}>
            <Link href={merchantDetails.instagram} target="_blank">
              <FontAwesomeIcon
                icon={faInstagram}
                className="text-2xl text-blue-600 md:text-[32px]"
              />
            </Link>
          </div>
        )}

        {merchantDetails?.twitter && (
          <div title={merchantDetails.twitter}>
            <Link href={merchantDetails.twitter} target="_blank">
              <FontAwesomeIcon
                icon={faTwitter}
                className="text-2xl text-blue-600 md:text-[32px]"
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MerchantSideCard;
