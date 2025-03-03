import { ITransaction } from "@/api/merchant/types";
import React from "react";

const PaymentDetails = ({ details }: { details: ITransaction }) => {
  return (
    <div className="rounded-sm border border-merchant_border">
      <div className="px-5 py-7">
        <div className="border-b border-merchant_border pb-5">
          <span className="text-lg font-semibold text-merchant_sidebar_text">
            Payment Details
          </span>
        </div>
        <div className="grid gap-y-3 pt-5 grid-cols-[150px,1fr]">
          <div>
            <span className="text-[13px] font-semibold text-merchant_placeholder">
              Net:
            </span>
          </div>
          <div>
            <span className="text-[13px] font-semibold text-merchant_placeholder">
              ${details.net || "N/A"}
            </span>
          </div>
          <div>
            <span className="text-[13px] font-semibold text-merchant_placeholder">
              Fees:
            </span>
          </div>
          <div>
            <span className="text-[13px] font-semibold text-merchant_placeholder">
              ${details.fees || "N/A"}
            </span>
          </div>
          <div>
            <span className="text-[13px] font-semibold text-merchant_placeholder">
              Total:
            </span>
          </div>
          <div>
            <span className="text-[13px] font-semibold text-merchant_placeholder">
              ${details.total || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
