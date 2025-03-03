import React from "react";
import { IOrder } from "@/components/consumer/Orders/types";
import Image from "next/image";
import orderImg from "@images/No_Image_Available.jpg";
import Link from "next/link";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import SupportButton from "./SupportButton";

interface OrderDetailsCardProps {
  detailsHidden: boolean;
  orderDetails: IOrder;
}

const statusMapping: { [key: number]: string } = {
  1: "Completed",
  2: "Processing",
  3: "Pending payment",
  4: "On hold",
  5: "Refunded",
  6: "Failed",
};

const orderDetailsCard: React.FC<OrderDetailsCardProps> = ({
  detailsHidden = true,
  orderDetails,
}) => {
  const statusId = Number(orderDetails?.status);
  const statusName = statusMapping[statusId] || "Unknown Status";
  return (
    <main>
      {!detailsHidden && (
        <div className="">
          <div className="grid grid-cols-4 flex-row items-start justify-between sm:flex md:min-w-[650px]">
            {/* Img */}
            <div className="col-span-4 flex max-w-fit flex-row items-center gap-5">
              <Link
                href={
                  orderDetails?.product.status === 6
                    ? `/shop/${orderDetails?.product?.slug || ""}`
                    : `/deal/${orderDetails.product?.slug || ""}`
                }
                className="max-h-[max-content] min-w-[max-content] max-w-[max-content] overflow-hidden rounded-lg object-fill md:max-h-[max-content] md:min-w-[max-content] md:max-w-[max-content]"
              >
                <Image
                  src={
                    orderDetails?.feature_image?.thumbnail_path
                      ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                        encodeURIComponent(
                          orderDetails?.feature_image?.thumbnail_path,
                        )
                      : orderImg
                  }
                  alt=""
                  className="h-auto max-w-20 object-cover"
                  layout="responsive"
                  objectPosition="center"
                  objectFit="cover"
                  width={200}
                  height={200}
                />
              </Link>
              <div className="max-w-[600px] text-left">
                <Link
                  href={
                    orderDetails.product.status === 6
                      ? `/shop/${orderDetails?.product?.slug || ""}`
                      : `/deal/${orderDetails.product?.slug || ""}`
                  }
                  className="text-lg font-bold hover:text-blue-500"
                >
                  {orderDetails?.product?.product_name || ""}
                </Link>
                <div className="text-sm text-consumer_order_text">
                  By <span>{orderDetails?.product?.merchant_name || ""}</span>
                </div>

                <div className="mt-4 flex flex-row items-center gap-[10px] text-sm">
                  <p>Size: {orderDetails?.product.merchant_id}</p>
                  <p>Qty: {orderDetails?.quantity}</p>
                  <p className="font-bold">Rs. {orderDetails?.total}</p>
                </div>
              </div>
            </div>
            <div className="col-span-2 mt-5 sm:mt-0">
              <div className="flex flex-col">
                <p className="text-base text-consumer_order_text">status</p>
                <span className="text-base font-semibold text-consumer_order">
                  {statusName}
                </span>
              </div>
              <div>
                <div className="flex flex-col pt-[15px]">
                  <p className="text-base text-consumer_order_text">
                    Delivered On
                  </p>
                  <span className="text-base font-semibold text-consumer_order">
                    {orderDetails.delivered_on}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-2 mt-5 text-left sm:mt-0">
              <div className="flex flex-col gap-[5px] whitespace-nowrap md:items-center">
                <div className="">
                  <Link
                    href={`/consumer/orders/${orderDetails.product.slug}/review`}
                  >
                    <ButtonPrimary
                      classNameLabel="text-base font-medium"
                      className="flex h-10 justify-center rounded-full md:!w-[190px]"
                      label="Product Review"
                    />
                  </Link>
                </div>
                <div className="">
                  <ButtonPrimary
                    classNameLabel="text-blue-500 text-base font-medium"
                    className="flex h-10 justify-center rounded-full border border-blue-500 bg-gradient-to-r from-transparent to-transparent !shadow-none md:!w-[190px]"
                    label="Return of Exchange"
                  />
                </div>
                {/* <div className="">
                  <ButtonPrimary
                    classNameLabel="text-blue-500 text-base font-medium"
                    className="flex h-10 justify-center rounded-full border border-blue-500 bg-gradient-to-r from-transparent to-transparent !shadow-none md:!w-[190px]"
                    label="Support"
                  />
                </div> */}
                <SupportButton
                  order_id={orderDetails.order_id.toString()}
                  product_id={orderDetails.product_id}
                  request_id={orderDetails.support_exist?.request_id}
                />
                <div>
                  <Link
                    href={`/consumer/orders/`}
                    className="text-consumer_order underline"
                  >
                    View invoice
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
        </div>
      )}
    </main>
  );
};

export default orderDetailsCard;
