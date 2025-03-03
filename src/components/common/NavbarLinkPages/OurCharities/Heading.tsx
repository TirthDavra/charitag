import React from "react";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import charityLogoWhite from "@images/charitag_logo_white.svg";
import newsImg from "@images/charities_sample-img.png";
import Image, { StaticImageData } from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import CountCardBox from "../../CountCardBox";
import { ICardDataResponse } from "@/api/common/types";

interface HeadingProps {
  label: string;
  labelButton: string;
  img: StaticImageData;
  classNameImage?: string;
  redirectUrl?: string;
  redirectRegisterUrl?: string;
  cardData?: ICardDataResponse;
}

const Heading: React.FC<HeadingProps> = ({
  label,
  img,
  labelButton,
  classNameImage,
  redirectUrl,
  redirectRegisterUrl,
  cardData,
}) => {
  return (
    <div className="flex flex-wrap-reverse justify-between md:flex-nowrap">
      <div className="pt-7 md:max-w-[668px] md:pt-14">
        <span className="text-[34px] font-bold leading-[34px] xl:text-[75px] xl:leading-[87px]">
          Lorem ipsum dolor sit amet consectetur.
        </span>
        <div className="mt-3 max-w-[552px]">
          <span className="text-base md:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            aliquam fugiat est error ad.
          </span>
        </div>
        <div className="mt-[25px] flex w-full flex-col justify-center gap-2 md:gap-7 pb-3 sm:justify-start md:flex-row lg:flex-wrap md:pb-0">
          <Link href={redirectRegisterUrl || ""}>
            <ButtonPrimary
              label={label}
              logo={charityLogoWhite}
              classNameLogo="w-[16px] h-[24px]"
              className="h-[50px] w-full justify-center rounded-full !py-0"
            />
          </Link>
          <div className="flex items-center max-sm:justify-center">
            <Link href={redirectUrl || ""}>
              <ButtonPrimary
                label={labelButton}
                classNameLabel="text-blue-500"
                className={
                  "bg-gradient-to-r max-sm:text-base from-transparent to-transparent px-0 !shadow-none"
                }
              />
            </Link>
            <div className="ml-[-10px] flex items-center text-blue-600">
              <span className="-mr-[3px] text-[30px]">·</span>
              <span className="text-[30px]">·</span>
              <span>
                <FontAwesomeIcon icon={faArrowRight} />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <div className="relative">
          <Image
            src={img}
            alt=""
            className={` w-full md:max-h-[444px] ${classNameImage}`}
          />
          <div className="absolute bottom-[0%] left-[10%] right-[10%] md:left-[15%] md:right-[15%] lg:right-[15%] xl:left-[13%]">
            <CountCardBox
              total_raised={cardData?.total_raised || "0"}
              title={cardData?.title || "Counting..."}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heading;
