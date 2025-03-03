import ButtonPrimary from "@/components/common/ButtonPrimary";
import Link from "next/link";
import React from "react";

const ShippingDescription = () => {
  return (
    <div>
      <div className="mt-[25px] flex items-center gap-[10px]">
        <span className="text-lg font-medium">Shipping Zones</span>
        <Link href={"shipping/manage-zone"}>
          <ButtonPrimary
            label="Add Zone"
            className="rounded-sm px-[10px] py-2 !shadow-none"
            classNameLabel="text-[13px] font-normal"
          />
        </Link>
      </div>
      <div className="mt-4 max-w-[800px]">
        <span className="text-[12px] text-merchant_sidebar_text leading-4">
          A shipping zone consists of the region(S) you&apos;d like to ship to
          and the shipping method(S) offered. a shopper can only be matched to
          one zone, and we&apos;ll use their shipping address to show them the
          methods available in their area.
        </span>
      </div>
    </div>
  );
};

export default ShippingDescription;
