"use client";
import React, { useEffect, useState } from "react";
import ChartityCard from "@/components/common/NavbarLinkPages/OurCharities/ChartityCard";
import { IMerchantsListsResponse } from "@/api/common/types";
import ShowMore from "../CorporateFundraisers/ShowMore";

const MerchantCardConatiner = ({
  merchantDataProp,
  searchParams,
}: {
  merchantDataProp: IMerchantsListsResponse;
  searchParams: {
    sort_by?: string;
    page?: number;
    per_page?: number;
    merchant_type_id?: string;
    country_id?: string;
  };
}) => {
  const [merchantData, setMerchantData] = useState(merchantDataProp.data);

  const [curPage, setCurPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setCurPage(newPage);
  };

  useEffect(() => {
    setMerchantData(merchantDataProp.data);
    setCurPage(1);
  }, [
    searchParams.merchant_type_id,
    searchParams.country_id,
    searchParams.sort_by,
  ]);

  return (
    <div>
      {merchantData.length > 0 && (
        <ChartityCard
          data={merchantData.map((merchant) => ({
            charity_name: merchant.name,
            id: merchant?.id,
            logo: merchant.profile_image,
            total_raised: merchant.total_raised,
            type: merchant.type,
            redirectUrl: `/our-merchants/${merchant.slug}`,
            deals_count: merchant.deals_count,
            products_count: merchant.products_count,
            isCharity: false,
          }))}
        />
      )}
      <div className="pt-8">
        <ShowMore
          page={curPage}
          handlePageChange={handlePageChange}
          setData={setMerchantData}
          url="/merchants"
          accessorKey="data"
          total={merchantDataProp.total}
          currentLength={merchantData.length}
          per_page={12}
        />
      </div>
    </div>
  );
};

export default MerchantCardConatiner;
