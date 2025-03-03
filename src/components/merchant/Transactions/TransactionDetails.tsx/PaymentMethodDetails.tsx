import { ITransaction } from "@/api/merchant/types";
import { IconVisa } from "@/components/svgIcons/build/icon-Visa";
import React from "react";

const PaymentMethodDetails = ({ details }: { details: ITransaction }) => {
  return (
    <div className="rounded-sm border border-merchant_border">
      <div className="px-5 py-7">
        <div className="border-b border-merchant_border pb-5">
          <span className="text-lg font-semibold text-merchant_sidebar_text">
            Payment Method Details
          </span>
        </div>
        <div className="grid gap-y-3 pt-5 grid-cols-[150px,1fr]">
          <div>
            <span className="text-[13px] font-semibold text-merchant_placeholder">
              Type:
            </span>
          </div>
          <div>
            <span className="text-[13px] font-semibold text-merchant_placeholder">
              <IconVisa color="#172B85" />
            </span>
          </div>
          <div>
            <span className="text-[13px] font-semibold text-merchant_placeholder">
              Account Number:
            </span>
          </div>
          <div>
            <span className="text-[13px] font-semibold text-merchant_placeholder">
              ${details.account_number || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodDetails;
