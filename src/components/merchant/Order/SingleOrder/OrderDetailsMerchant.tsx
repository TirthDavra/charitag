import React from "react";
import OrderSummary from "./OrderSummary";
import { ISOrder } from "./types";
import SelectOrderStatus from "./SelectOrderStatus";
import { formatTimestamp } from "@/utils/basicfunctions";

interface OrderDetailsMerchantProps {
  order: ISOrder; // Assuming ISOrder is imported from your types file
}

const OrderDetailsMerchant: React.FC<OrderDetailsMerchantProps> = ({
  order,
}) => {
  return (
    <div className="max-w-[1213px] rounded-sm  bg-[#ebf5fa] px-[15px] pb-[30px] pt-[15px]">
      <div className="flex flex-wrap justify-between gap-[10px]">
        <div>
          <span className="text-lg font-semibold text-merchant_sidebar_text">
            {/* order #295 details */}
            {order?.order_code || ""}
          </span>
          <div>
            <span className="text-[13px] text-merchant_gray">
              {/* paid on march 20, 2024 @ 6:24 PM */}
              {`paid on ${formatTimestamp(order?.paid_date || "")}`}
            </span>
          </div>
        </div>
        {/* <div className="flex flex-wrap items-center gap-[10px]">
          <span className="font-[500] text-merchant_sidebar_text">
            Order Status
          </span>

          <SelectOrderStatus status={order?.status || 0} id={order?.id} />
        </div> */}
      </div>
      <div className="pt-[35px]">
        <OrderSummary order={order} />
      </div>
    </div>
  );
};

export default OrderDetailsMerchant;
