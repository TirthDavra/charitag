"use client";
import { ICorporateFundraiserResponse } from "@/api/common/types";
import React, { useState } from "react";
import CorporateCard from "./CorporateCard";
import ShowMore from "./ShowMore";

const CorporateCardContainer = ({
  corporateDataProp,
}: {
  corporateDataProp: ICorporateFundraiserResponse;
}) => {
  const [corporateData, setCorporateData] = useState(corporateDataProp.data);

  const [curPage, setCurPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setCurPage(newPage);
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-[20px] gap-y-[45px] pb-12 pt-[30px] lg:pt-[75px] md:grid-cols-2 lg:grid-cols-3">
        {corporateData &&
          corporateData.length > 0 &&
          corporateData.map((corporate, index) => (
            <CorporateCard
              key={corporate?.id || index}
              corporate={corporate}
              fundPercentage
              classNameImg="lg:max-h-[250px] object-scale-down"
            />
          ))}
      </div>
      <ShowMore
        setData={setCorporateData}
        url="/corporates"
        accessorKey="data"
        total={corporateDataProp.total}
        currentLength={corporateData.length}
        page={curPage}
        handlePageChange={handlePageChange}
        per_page={6}
        showmoreclass="!mt-4"
      />
    </div>
  );
};

export default CorporateCardContainer;
