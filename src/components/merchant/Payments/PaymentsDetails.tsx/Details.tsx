import { ITransaction } from "@/api/merchant/types";
import React from "react";
import { colorsForTransactionStatus } from "../../constants";
import { IconVisa } from "@/components/svgIcons/build/icon-Visa";

const Details = ({ details }: { details: ITransaction }) => {
  const backgroundColor =
    colorsForTransactionStatus[Number(details.transaction_type)].color;

  return (
    <div className="rounded-sm bg-merchant_header">
      <div className="px-5 py-7">
        <span className="text-[13px] text-merchant_placeholder">
          Transactions
        </span>
        <div className="flex items-center gap-5 border-b border-merchant_border  pb-5">
          <div className="text-[25px]">
            <span className="font-semibold ">{details.total}</span> USD
          </div>
          {/* <div
            className={`min-w-[121px] max-w-[121px] flex-grow rounded-sm py-[7.5px] text-center text-[11px] font-normal`}
            style={{
              backgroundColor: `${backgroundColor}26`,
              color: `${backgroundColor}`,
            }}
          >
            <span>
              {
                colorsForTransactionStatus[Number(details.transaction_type)]
                  .value
              }
            </span>
          </div> */}
        </div>
        <div className="gap-[25px] divide-y divide-merchant_border pt-[18px] sm:flex sm:divide-x sm:divide-y-0">
          <div>
            <div className="text-base font-medium text-merchant_sidebar_text">
              Reference Id
            </div>
            <div className="py-[15px] text-[13px] font-semibold text-merchant_placeholder">
              {details.reference_id || "N/A"}
            </div>
          </div>
          <div className="py-3 sm:pl-[25px] sm:pt-0">
            <div className="text-base font-medium text-merchant_sidebar_text">
              Client
            </div>
            <div className="pt-[15px] text-[13px] font-semibold text-merchant_placeholder">
              N/A
            </div>
          </div>
          <div className="py-3 sm:pl-[25px] sm:pt-0">
            <div className="text-base font-medium text-merchant_sidebar_text">
              Payment Method
            </div>
            <div className="flex gap-1 pt-[15px]">
              <IconVisa color="#172B85" />

              <span className="text-[13px] font-semibold text-merchant_placeholder">
                ****6651
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
