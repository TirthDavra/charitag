import React from "react";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import Heading from "@/components/common/Heading";
import Image from "next/image";
import blueChartitagLogo from "@images/blue_charitag_logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { IRecommendedProduct } from "@/api/common/types";
import Link from "next/link";
import { discountCalculator } from "@/utils/basicfunctions";

const OurProducts = ({
  product,
  title,
  className,
}: {
  product: IRecommendedProduct[];
  title: string;
  className?: string;
}) => {
  const calculateFinalAmount = (
    amount: string,
    discount_percentage: string,
  ) => {
    const discountedAmount =
      parseFloat(amount) -
      (parseFloat(amount) * parseFloat(discount_percentage)) / 100;
    return discountedAmount.toFixed(2);
  };
  return (
    <div className={`mt-[40px] ${className}`}>
      <Heading content={title} className="!text-[22px]" />

      <div>
        {product.map((item) => {
          const disPercent = discountCalculator(
            Number(item?.price?.sale_price || 0),
            Number(item?.price?.regular_price || 0),
          );
          return (
            <>
              <div className="flex max-w-[438px] flex-wrap items-center gap-3 pt-6 md:flex-nowrap">
                <Link href={`/shop/${item.slug}`}>
                  <Image
                    src={
                      item.feature_image?.medium_path
                        ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                          item.feature_image?.medium_path
                        : ""
                    }
                    alt=""
                    className="h-[77px] w-[87px] min-w-[87px] rounded-lg"
                    width={100}
                    height={100}
                  />
                </Link>
                <div>
                  <div>
                    <div className={`mb-1 flex gap-5 text-gradient_color_2`}>
                      <div className="relative w-fit">
                        <FontAwesomeIcon
                          icon={faStar}
                          className="mr-1 text-[11px]"
                        />
                        <span>
                          {"4,95 (838)"}

                          {/* blue dot */}
                          <span className="absolute right-[-13px] top-[40%] h-[20%] w-[5px] rounded-full bg-gradient_color_2"></span>
                        </span>
                      </div>
                      <span>{item?.merchant.first_name}</span>
                      <span>{item?.merchant.last_name}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-md line-clamp-3 font-bold">
                      {item?.product_name}
                    </span>
                  </div>
                  <div>
                    <div className="mt-1 flex flex-wrap items-center gap-1 whitespace-nowrap">
                      <div>
                        {item.price?.sale_price !==
                          item.price?.regular_price && (
                          <>
                            <span className="text-[16px] text-gray-400">
                              <span className="text-[18px] line-through">
                                {Number(item.price?.regular_price)
                                  .toFixed(2)
                                  .replace(/\.00$/, "") ?? "0.00"}
                              </span>{" "}
                              From{" "}
                            </span>
                          </>
                        )}
                        <span className="bg-[linear-gradient(239.52deg,rgba(248,92,54,0.65)0%,#F85C36_100%)] bg-clip-text text-[18px] text-lg font-bold text-transparent">
                          {Number(item.price?.sale_price)
                            .toFixed(2)
                            .replace(/\.00$/, "") ?? "0.00"}
                        </span>{" "}
                      </div>
                      {disPercent !== 0 && (
                        <span className="h-[25px] rounded-full bg-[linear-gradient(239.52deg,rgba(248,92,54,0.65)0%,#F85C36_100%)] px-3 py-[3px] text-[14px] text-white lg:mx-0">
                          {disPercent}% OFF
                        </span>
                      )}
                      <p
                        className={`my-1 flex items-center gap-1 font-bold text-gradient_color_2`}
                      >
                        <span className="h-[16px] w-[10px]">
                          <Image
                            src={blueChartitagLogo}
                            alt=""
                            className="object-cover"
                          />
                        </span>
                        <span className="text-[14px] text-[#3969E0]">
                          Donations: ${item?.price?.donation_amount || "0"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 border-b-[1px] border-sidebar_devider_color" />
            </>
          );
        })}
      </div>
      <Link href={"/shop?product=true"} className="mt-4 flex items-center ">
        <ButtonPrimary
          label="View all products"
          classNameLabel="text-[#3969E0]"
          className={
            "bg-gradient-to-r from-transparent to-transparent pl-0 pr-2 !shadow-none"
          }
        />
        <div className="mt-0.5 flex items-center text-[#3969E0]">
          <span className="-mr-[3px] text-[30px]">·</span>
          <span className="text-[30px]">·</span>
          <span>
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
        </div>
      </Link>
    </div>
  );
};

export default OurProducts;
