import React from "react";
import { IGetOrdersRespone, IOrder, IOrderDetails } from "./types";
import Image from "next/image";
import orderImg from "@images/wish_resturant.jpg";
import { discountCalculator } from "@/utils/basicfunctions";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import Link from "next/link";

interface OrderCardProps {
  label?: string;
  description?: string;
  orderDetails: IGetOrdersRespone;
  onDetailsClick?: () => void;
  viewDetailsText?: string;
  quantity?: string;
  detailsHidden?: boolean;
}

const OrderCard: React.FC<OrderCardProps> = ({
  label,
  description,
  orderDetails,
  onDetailsClick,
  viewDetailsText,
  quantity,
  detailsHidden,
}) => {
  const trimWords = (text: string, wordLimit: number): string => {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + /* "..." */ "";
  };
  // const trimmedProductName = trimWords(
  //   (orderDetails?.order_details &&
  //     (orderDetails?.order_details[0]?.item_type === 1
  //       ? orderDetails?.order_details[0]?.product?.product_name || ""
  //       : orderDetails?.order_details[0]?.deal?.title || "")) ||
  //     "",
  //   3,
  // );

  // const totalDiscounts = orderDetails.order_details
  //   ?.map((detail) =>
  //     discountCalculator(
  //       Number(detail.sale_price || 0),
  //       Number(detail.regular_price || 0),
  //     ),
  //   )
  //   .filter((discount) => !isNaN(discount));

  // // Calculate the average total discount
  // const averageTotalDiscount =
  //   totalDiscounts &&
  //   totalDiscounts?.reduce((acc, discount) => acc + discount, 0) /
  //     totalDiscounts?.length;

  // const totalDonation = orderDetails.order_details
  //   ?.map((detail) => Number(detail.donation || 0))
  //   .filter((donation) => !isNaN(donation))
  //   .reduce((acc, donation) => acc + donation, 0);

  // const totalAmount = orderDetails.order_details
  //   ?.map((detail) => Number(detail.sale_price || 0))
  //   .filter((donation) => !isNaN(donation))
  //   .reduce((acc, donation) => acc + donation, 0);

  return (
    <div
      className={`flex flex-1 flex-col justify-between ${
        label ? "rounded-xl border-[1px] border-sidebar_devider_color p-5" : ""
      }`}
    >
      <div className="">
        <div
          className={`justify-between gap-y-2 sm:flex md:min-w-[650px] lg:mt-0 ${label ? "mt-3" : ""}`}
        >
          <div className="flex">
            <div>
              <p className="items-center gap-1 pt-1 text-base font-medium text-merchant_sidebar_text">
                Order{" "}
                <span className="ml-[10px] text-base font-semibold text-consumer_order">
                  #{orderDetails.order_code}
                </span>
              </p>
              <p className="mt-[17px] text-consumer_order_text">
                Order Placed{" "}
                {new Date(orderDetails.date).toLocaleDateString("en-GB", {
                  weekday: "short", // Abbreviated weekday
                  day: "numeric", // Numeric day
                  month: "long", // Full month name
                  year: "numeric", // Full year
                })}{" "}
              </p>
            </div>
            <div>
              <p className="text-merchant_sidebar_text">
                Total:{" "}
                <strong>
                  {`$${Number(orderDetails.total).toFixed(2).replace(/\.00$/, "")}` ??
                    "0.00"}
                </strong>
              </p>
            </div>
          </div>
          <Link
            href={`/consumer/orders/${orderDetails.order_code}`}
            className="flex justify-end max-sm:mx-auto max-sm:mt-2 max-sm:w-[max-content] md:col-span-2"
            onClick={(e) => e.stopPropagation()}
          >
            {!label && (
              <ButtonPrimary
                className="flex h-[45px] cursor-pointer justify-end rounded-full text-end text-sm font-medium text-blue-500 max-sm:mx-auto max-sm:mt-2 max-sm:w-[max-content] md:col-span-2"
                label={"VIEW ORDER DETAILS"}
              />
            )}
          </Link>
        </div>
        {detailsHidden && (
          <>
            <div className="mb-[25px] mt-[29px] h-[1px] w-full bg-consumer_order_border"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
