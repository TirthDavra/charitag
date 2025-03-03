import React from "react";
import Image from "next/image";
import { IOrderDetailData } from "./types";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { cardIcons } from "../constants";

const SingleOrderDetails = ({ order }: { order: IOrderDetailData }) => {
  return (
    <div>
      <div className="mt-[65px]" key={order?.id}>
        <div className="mb-[30px] items-center justify-between gap-y-2 sm:flex">
          <span className="text-[24px] font-semibold">
            Order ID: {order?.order_id}
          </span>
          <div className="flex gap-2">
            <button className="rounded-full border border-blue-500 px-4 py-2 font-bold text-blue-500">
              Invoice
            </button>
            <ButtonPrimary
              className="rounded-full px-4 py-2 text-blue-500"
              label="Track Order"
            />
          </div>
        </div>

        <div className="mb-4 text-gray-500">
          <span>
            Order date:{" "}
            {new Date(order?.date).toLocaleDateString("en-GB", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}{" "}
            |{" "}
          </span>
          <a href="#" className="text-blue-500">
            Estimated delivery:{" "}
            {order?.estimated_delivery_date
              ? new Date(order?.estimated_delivery_date).toLocaleDateString(
                  "en-GB",
                  {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  },
                )
              : "N/A"}
          </a>
        </div>

        <div className="mb-[30px] border-t border-consumer_order_border py-4">
          {order?.order_details?.map((item) => (
            <div
              className="flex items-center border-b border-consumer_order_border py-4"
              key={item.id}
            >
              <div className="relative h-20 w-20">
                <Image
                  src={
                    process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                    encodeURIComponent(item?.feature_image?.thumbnail_path)
                  }
                  alt={item.feature_image.filename}
                  layout="fill"
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="ml-4">
                <span className="text-base font-semibold">
                  {item?.product_detail?.product_name}
                </span>
                <p className="pt-1 text-consumer_order_text">
                  By {item?.product_detail?.merchant_name}
                </p>
                <p className="pt-4 text-consumer_order_text">
                  {item?.product_detail?.category} Size{" "}
                  {item?.product_detail?.subcategory}
                </p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-lg font-semibold">${item?.total}</p>
                <p className="text-consumer_order_text">
                  Qty: {item?.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-4 grid grid-cols-12 gap-4">
          <div className="col-span-6 sm:col-span-9">
            <span className="mb-2 text-lg font-semibold">Payment</span>
            {order?.payment_method && (
              <div className="flex items-center gap-2">
                <p className="text-consumer_order_text">
                  {order?.payment_method?.brand} **{order?.payment_method?.last4.slice(-2)}
                </p>
                <div>
                  <Image
                    src={cardIcons[order?.payment_method?.brand] || ""}
                    alt={order?.payment_method?.brand}
                    width={50}
                    height={50}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="col-span-6 sm:col-span-3">
            <span className="mb-2 text-lg font-semibold">Delivery</span>
            <h3 className="mb-2 text-consumer_order_text">Address</h3>
            <p>
              {order?.address?.address} {order?.address?.address2}
            </p>
            <p>{order?.address?.city}</p>
            <p>
              {order?.address?.state}, {order?.address?.country}
            </p>
            <p>{order?.address?.postal_code}</p>
          </div>
        </div>

        <div className="mb-[30px] grid grid-cols-12 gap-4 border-t border-consumer_order_border py-4">
          <div className="col-span-6 lg:col-span-9">
            <div className="mb-[20px]">
              <span className=" text-lg font-semibold">Need help ?</span>
            </div>
            <button className="rounded-full border border-blue-500 px-9 py-2 font-semibold text-blue-500">
              Support
            </button>
          </div>
          <div className="col-span-6 lg:col-span-3">
            <span className="mb-2 text-lg font-semibold">Order Summary</span>
            <div className="mt-5 grid grid-cols-2">
              <div className="col-span-1">
                <p className="py-5">Subtotal:</p>
                <p className="text-base text-consumer_order_text">
                  Discount:({order?.discount_pr}%){" "}
                </p>
                <p className="py-[10px] text-base text-consumer_order_text">
                  Shiping Charge:{" "}
                </p>
                <p className="pb-5 text-base text-consumer_order_text">Tax: </p>
                <div className="border-t border-dashed border-[rgba(0,0,0,0.25)] py-5">
                  <p className="font-medium">Total:</p>
                </div>
              </div>
              <div className="col-span-1 text-right">
                <p className="py-5">${order?.sub_total}</p>
                <p className="text-base text-consumer_order_text">
                  - ${order?.total_discount}
                </p>
                <p className="py-[10px] text-base text-consumer_order_text">
                  ${order?.shipping_charge}
                </p>
                <p className="pb-5 text-base text-consumer_order_text">
                  + ${order?.tax}
                </p>
                <div className="border-t border-dashed border-[rgba(0,0,0,0.25)] py-5">
                  <p className="font-medium">${order?.total}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrderDetails;
