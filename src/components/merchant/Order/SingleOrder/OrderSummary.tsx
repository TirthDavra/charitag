import React from "react";
import { ISOrder } from "./types";
import { colorsForOrderStatus } from "../../constants";

interface OrderSummaryProps {
  order: ISOrder;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  order,
}: OrderSummaryProps) => {
  // const color = colorsForOrderStatus[order.status]?.color;

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3">
      <div>
        <span className="tetx-base font-medium text-merchant_sidebar_text">
          General
        </span>
        <div className="pt-[15px]">
          <span className="text-[13px] font-semibold text-merchant_sidebar_text">
            Date Created:
          </span>
          <div>
            <span className="text-[13px] text-merchant_gray">
              {new Date(order?.paid_date || "").toLocaleString()}
            </span>
          </div>
        </div>

        <div className="pt-[15px] xs:pt-[43px]">
          <span className="font-medium text-merchant_sidebar_text">
            Status:
          </span>
          <div
            className={`max-w-[121px] rounded-sm  px-2 py-[7.5px] text-center text-[11px] font-normal`}
            // style={{ backgroundColor: `${color}26`, color: `${color}` }}
          >
            {/* {colorsForOrderStatus[order.status]?.value} */}
          </div>
        </div>
      </div>
      <div className="pt-[25px] xs:pt-0">
        <span className="tetx-base font-medium text-merchant_sidebar_text">Billing</span>
        <div className="pt-[15px]">
          <span className="text-[13px] font-semibold text-merchant_sidebar_text">
            Address:
          </span>
          <div className="max-w-[187px] text-[13px] text-merchant_gray">
            <span>{order.billing_information?.address}</span>
            {", "}
            <span>{order.billing_information?.address2}</span>{" "}
            <span>{order.billing_information?.city}</span>
            {", "}
            <span>{order.billing_information?.state}</span>
            {", "}
            <span>{order.billing_information?.country}</span>
            {"- "}
            <span>{order.billing_information?.postal_code || ""}</span>
          </div>
        </div>

        <div className="pt-[15px] xs:pt-[27px]">
          <span className="text-[13px] font-semibold text-merchant_sidebar_text">
            Email Address:
          </span>
          <div className="max-w-[187px]">
            <span className="text-[13px] text-merchant_gray">
              {order?.email || ""}
            </span>
          </div>
        </div>
      </div>
      <div className="pt-[25px] sm:pt-0">
        <span className="tetx-base font-medium text-merchant_sidebar_text">Shipping</span>
        <div className="pt-[15px]">
          <span className="text-[13px] font-semibold text-merchant_sidebar_text">
            Address:
          </span>
          <div className="max-w-[187px] text-[13px] text-merchant_gray">
            <span>{order.shipping_information?.address}</span>
            {", "}
            <span>{order.shipping_information?.address2}</span>{" "}
            <span>{order.shipping_information?.city}</span>
            {", "}
            <span>{order.shipping_information?.state}</span>
            {", "}
            <span>{order.shipping_information?.country}</span>
            {"- "}
            <span>{order.shipping_information?.postal_code || ""}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
