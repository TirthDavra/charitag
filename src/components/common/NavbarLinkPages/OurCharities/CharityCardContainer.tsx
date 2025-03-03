"use client";
import React, { useEffect, useState } from "react";
import ChartityCard from "./ChartityCard";
import { IAllCharitiesResponse } from "@/api/common/types";
import ShowMore from "../CorporateFundraisers/ShowMore";
import DataNotAvailable from "../../DataNotAvailable";

const CharityCardContainer = ({
  charityDataProp,
  searchParams,
}: {
  charityDataProp: IAllCharitiesResponse;
  searchParams: {
    sort_by?: string;
    page?: number;
    per_page?: number;
    charity_type?: string;
    charity_location?: string;
  };
}) => {
  const [charityData, setCharityData] = useState(charityDataProp.data);

  const [curPage, setCurPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setCurPage(newPage);
  };

  useEffect(() => {
    setCharityData(charityDataProp.data);
    setCurPage(1);
  }, [
    searchParams.charity_type,
    searchParams.charity_location,
    searchParams.sort_by,
  ]);

  return (
    <div>
      {charityData.length > 0 ? (
        <ChartityCard
          data={charityData.map((charity) => ({
            charity_name: charity.charity_name,
            id: charity.id,
            logo: charity.logo,
            redirectUrl: `/our-charities/${charity.slug}`,
            total_raised: charity.total_raised,
            type: charity.type,
            isCharity: true,
          }))}
        />
      ) : (
        <DataNotAvailable title="Opps ! there no charity found." />
      )}
      <div className="pt-6">
        <ShowMore
          page={curPage}
          handlePageChange={handlePageChange}
          setData={setCharityData}
          url="/all-charities"
          accessorKey="data"
          total={charityDataProp.total}
          currentLength={charityData.length}
          per_page={12}
        />
      </div>
    </div>
  );
};

export default CharityCardContainer;
