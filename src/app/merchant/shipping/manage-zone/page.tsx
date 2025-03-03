import React, { Suspense } from "react";
import AddShippingZone from "@/components/merchant/Shipping/manage-zone";
import Title from "@/components/merchant/Title";
import AddOrEdit from "@/components/merchant/Shipping/manage-zone";
import { getMerchantShippingZoneById } from "@/api/merchant/merchantShipping";
import Link from "next/link";

const page = async (context: { searchParams: { zoneId: string } }) => {
  const response = await getMerchantShippingZoneById(
    context.searchParams.zoneId ?? "",
  );

  return (
    <div key={Math.random()}>
      <Title label="Shipping" />
      <div className="py-4">
        <div className="flex gap-[10px] divide-x divide-[#2F2F35]">
          <Link href={"/merchant/shipping"}>
            <div className="text-sm font-normal text-merchant_text_color_blue">
              Shipping Zones
            </div>
          </Link>
          <div className="pl-[10px] text-sm font-normal text-merchant_sidebar_text">
            Classes
          </div>
        </div>
        <div>
          <AddOrEdit
            initialState={{
              name: response.data.data?.name || "",
              regions: response.data.data?.regions || "",
              is_shipping_free_shipping:
                response.data.data?.is_shipping_free_shipping,
              is_shipping_flat_rate: response.data.data?.is_shipping_flat_rate,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
