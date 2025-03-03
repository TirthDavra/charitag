import React from "react";
import Heading from "@/components/common/Heading";
import blueChartitagLogo from "@images/blue_charitag_logo.svg";
import Image from "next/image";
import Link from "next/link";
import { ICharityCard } from "@/api/common/types";
import profileImg from "@images/productDefault.jpg";
import profileImgUser from "@images/default_user.png";

const ChartityCard = ({ data }: { data: ICharityCard[] }) => {
  return (
    <div className="mt-[29px] grid grid-cols-1 gap-6 sm:mt-5 sm:grid-cols-2 md:gap-5 xl:grid-cols-3">
      {data.map((item) => (
        <div
          key={item.id}
          className="flex flex-col gap-[25px] gap-y-4 rounded-lg border-[1px] border-merchant_border py-[15px] pl-[15px] xs:flex-row md:mt-6 md:items-center lg:flex-row "
        >
          <Link href={item.redirectUrl}>
            <div className="relative -z-50 min-w-[75px]">
              <Image
                src={
                  item.logo?.thumbnail_path
                    ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                      item.logo.thumbnail_path
                    : item.isCharity
                      ? profileImg
                      : profileImgUser
                }
                alt=""
                className="h-[77px] w-[75px] rounded-lg"
                width={100}
                height={100}
              />
            </div>
          </Link>
          <div className="">
            <Link href={item.redirectUrl}>
              <Heading
                content={item.charity_name}
                className="!text-[22px] font-bold capitalize"
              />
            </Link>

            {item?.deals_count !== undefined && item.deals_count >= 0 ? (
              <div className="items-center gap-[18px]">
                {item.type?.title && (
                  <div>
                    <span className="text-md relative font-bold underline">
                      {item?.type?.title || ""}
                      {/* <span className="absolute right-[-12px] top-[40%] h-[5px] w-[5px] rounded-full bg-gradient_color_2"></span> */}
                    </span>
                  </div>
                )}
                <div className="flex items-center  gap-[18px]">
                  <span className="relative text-sidebar_icon_color">
                    {`${item.deals_count} Deals`}{" "}
                    <span className="absolute right-[-12px] top-[40%] h-[5px] w-[5px] rounded-full bg-gradient_color_2"></span>
                  </span>
                  <span>{`${item.products_count} Products`}</span>
                </div>
              </div>
            ) : (
              <span className="text-md relative font-bold underline">
                {" "}
                {item?.type?.title}
              </span>
            )}
            <div>
              <p
                className={`my-1 flex gap-[5px] text-blue-500 md:items-center`}
              >
                <span className="h-[16px] w-[11px]">
                  <Image
                    src={blueChartitagLogo}
                    alt=""
                    className="translate-y-[2px] object-cover md:translate-y-0"
                  />
                </span>
                <span className="text-sm font-bold">
                  Total donations raised: ${item.total_raised}
                </span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChartityCard;
