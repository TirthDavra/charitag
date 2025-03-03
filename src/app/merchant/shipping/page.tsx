import React, { Suspense } from "react";
import ShippingDescription from "@/components/merchant/Shipping/ShippingDescription";
import Title from "@/components/merchant/Title";
import TableSearch from "@/components/merchant/Custom/Tables/TableSearch";
import TablePagination from "@/components/merchant/Custom/Tables/TablePagination";
import { getMerchantShipping } from "@/api/merchant/merchantShipping";
import ShippingZoneTable from "@/components/merchant/Shipping/manage-zone/ShippingZoneTable";
import Await from "@/components/common/Await";

const page = async (context: {
  searchParams?: {
    search?: string;
    page?: string;
    per_page?: number;
  };
}) => {
  const shippingData = getMerchantShipping({
    search: context.searchParams?.search || "",
    page: Number(context.searchParams?.page) || "",
    per_page: 10,
  });

  return (
    <div>
      <Title label="Shipping" />
      <div className="py-4">
        <div className="flex items-center gap-[10px] divide-x divide-[#2F2F35]">
          <div className="text-sm font-normal text-merchant_text_color_blue">
            Shipping Zones
          </div>
          <div className="pl-[10px] text-sm font-normal text-merchant_sidebar_text">
            Classes
          </div>
        </div>
        <ShippingDescription />
        <div className="md:flex md:justify-end">
          <TableSearch label="Search Shipping" />
        </div>
        <Suspense
          key={Math.random()}
          fallback={
            <div className="h-[500px] animate-pulse">
              <div className="my-[13px] h-[20px] bg-gray-100"></div>
              <div className="my-[13px] h-[20px] bg-gray-100"></div>
              <div className="my-[16px] h-[113px] bg-gray-100"></div>
              <div className="my-[16px] h-[113px] bg-gray-100"></div>
              <div className="my-[16px] h-[113px] bg-gray-100"></div>
              <div className="my-[16px] h-[113px] bg-gray-100"></div>
              <div className="my-[16px] h-[113px] bg-gray-100"></div>
              <div className="my-[16px] h-[113px] bg-gray-100"></div>
              <div className="my-[16px] h-[113px] bg-gray-100"></div>
              <div className="my-[16px] h-[113px] bg-gray-100"></div>
              <div className="my-[16px] h-[113px] bg-gray-100"></div>
            </div>
          }
        >
          <Await promise={shippingData}>
            {(shippingData) => {
              return (
                <>
                  <TablePagination
                    className="flex items-center justify-end gap-[5px] pt-[10px] text-[12px]"
                    itemsPerPage={10}
                    totalItems={shippingData.total}
                  />
                  <div>
                    <ShippingZoneTable shipping={shippingData.data} />
                    <TablePagination
                      className="flex items-center justify-end gap-[5px] pt-5 text-[12px] "
                      itemsPerPage={10}
                      totalItems={shippingData.total}
                    />
                  </div>
                </>
              );
            }}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export default page;
