import React from "react";
import Heading from "@/components/common/Heading";
import Image from "next/image";
import { IConsumerReview } from "./types";
import productImage from "@images/wish_resturant.jpg";
import RatingStar from "../Reviews/RatingStar";

const DashboardReviews = ({
  consumerReviews,
}: {
  consumerReviews: IConsumerReview;
}) => {
  const product = consumerReviews?.product;

  return (
    <div className="rounded-xl border border-merchant_border px-4 py-5">
      <Heading
        content={"My reviews"}
        className="!text-[22px] text-merchant_sidebar_text"
      />
      <div className="pt-3">
        <div className="flex flex-wrap items-center gap-[14px] md:flex-nowrap">
          <div>
            <Image
              alt=""
              src={
                product?.feature_image?.thumbnail_path
                  ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                    encodeURIComponent(product?.feature_image?.thumbnail_path)
                  : productImage
              }
              className="aspect-auto h-[100px] max-w-[114px] rounded-md"
              width={100}
              height={100}
            />
          </div>
          <div>
            <span className="text-sidebar_icon_color">
              {product?.merchant.first_name} {product?.merchant.last_name}
            </span>
            <div className="flex flex-wrap gap-8 md:flex-nowrap md:gap-[76px]">
              <div className="max-w-[330px] font-bold text-merchant_sidebar_text">
                {product?.product_name}
              </div>
              <div>
                <div>Rate this deal:</div>
                <div>
                  <RatingStar
                    review={consumerReviews}
                    activeColor="#3969E0"
                    color="#cdd9f7"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardReviews;
