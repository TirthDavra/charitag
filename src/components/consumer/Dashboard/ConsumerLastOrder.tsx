import React from "react";
import Heading from "@/components/common/Heading";
import { IConsumerOrder } from "./types";
import Image from "next/image";
import blueCharitagLogo from "@images/blue_charitag_logo.svg";
import { formatDate } from "@/utils/basicfunctions";
import { OrderStatus } from "../constants";
import Link from "next/link";

const ConsumerLastOrder = ({
  orderDetails,
}: {
  orderDetails: IConsumerOrder;
}) => {
  return (
    <div className="rounded-xl border border-merchant_border px-4 py-5">
      <div className="flex items-center justify-between">
        <Heading
          content={"My last order"}
          className="!text-[22px] text-merchant_sidebar_text"
        />
        <Link
          href={`/consumer/orders?last_order_id=${orderDetails?.id || ""}`}
          className="text-sidebar_icon_color underline"
        >
          View details
        </Link>
      </div>
      <div className="pt-1">
        <span className="text-merchant_sidebar_text">
          Find your details here
        </span>
      </div>
      <div className="flex flex-wrap justify-between pt-[45px]">
        {orderDetails && (
          <div>
            <div className="font-bold text-merchant_sidebar_text">
              {orderDetails?.order_code || ""}
            </div>
            <div className="">
              {orderDetails?.date && formatDate(orderDetails?.date)}
            </div>
          </div>
        )}
        {orderDetails && (
          <div>
            <div className="text-merchant_sidebar_text">
              Total:{" "}
              <span className="font-bold">
                $
                {Number(orderDetails?.total).toFixed(2).replace(/\.00$/, "") ||
                  0}
              </span>
            </div>
            <div
              className={`my-1 flex  items-center gap-1 font-bold text-gradient_color_2`}
            >
              <span className="h-[16px] w-[10px]">
                <Image src={blueCharitagLogo} alt="" className="h-full" />
              </span>
              <span className="text-[14px] text-sidebar_icon_color">
                Donations: $
                {isNaN(Number(orderDetails?.total_donation))
                  ? 0
                  : Number(orderDetails?.total_donation)}
              </span>
            </div>
          </div>
        )}
        <div className="font-bold text-merchant_sidebar_text">
          {OrderStatus[orderDetails?.status]?.label || ""}
        </div>
      </div>
    </div>
  );
};

export default ConsumerLastOrder;
