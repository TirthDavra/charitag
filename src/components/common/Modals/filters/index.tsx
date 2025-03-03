"use client";
import React, { useEffect, useState } from "react";
import ButtonPrimary from "../../ButtonPrimary";
import Sort from "./Sort";
import ExceptionalDeals from "./ExceptionalDeals";
import PriceRange from "./PriceRange";
import Locations from "./Locations";
import Ratings from "./Ratings";

interface Location {
  title: string;
  value: string;
}

interface Rating {
  title: string;
  value: number;
}

interface FilterParameter {
  sort: string;
  exceptionalDeals: string[];
  priceRange: {
    minPrice: number;
    maxPrice: number;
  };
  locations: string[];
  ratings: number[];
}

interface ConsumerFilterProps {
  onClose: () => void;
}

const dummyLocatios: Location[] = [
  { title: "Calgary", value: "calgary" },
  { title: "Ottawa", value: "ottawa" },
  { title: "Edmonton", value: "edmonton" },
  { title: "Toronto", value: "toronto" },
  { title: "Mississauga", value: "mississauga" },
  { title: "Vancouver", value: "vancouver" },
  { title: "Montreal", value: "montreal" },
  { title: "Winnipeg", value: "winnipeg" },
];

const dummyRatings: Rating[] = [
  { title: "All", value: 0 },
  { title: "4 & Up", value: 4 },
  { title: "3 & Up", value: 3 },
  { title: "2 & Up", value: 2 },
  { title: "1 & Up", value: 1 },
];

const dummySort = [
  {
    title: "Relevance",
    value: "relevance",
  },
  {
    title: "Price: Low to High",
    value: "priceasc",
  },
  {
    title: "Price: High to Low",
    value: "pricedesc",
  },
  {
    title: "Distance",
    value: "distance",
  },
  {
    title: "Rating",
    value: "rating",
  },
];

const dummyDeals = [
  {
    title: "Organic",
    value: "organic",
  },
  {
    title: "Rare",
    value: "rare",
  },
  {
    title: "Exotic",
    value: "exotic",
  },
];

const ConsumerFilter: React.FC<ConsumerFilterProps> = ({ onClose }) => {
  const [filterParameter, setFilterParameter] = useState<FilterParameter>({
    sort: "relevance",
    exceptionalDeals: ["exotic"],
    priceRange: {
      minPrice: 0,
      maxPrice: 2000,
    },
    locations: ["toronto"],
    ratings: [3], // (0 means All)
  });

  const handlePriceRangeChange = (values: number[]) => {
    if (values[1] >= 0) {
      setFilterParameter((prevFilter) => ({
        ...prevFilter,
        priceRange: {
          minPrice: values[0] > 2000 ? 2000 : values[0],
          maxPrice: values[1] > 2000 ? 2000 : values[1],
        },
      }));
    }
  };

  const handleChangeCheck = (
    key: string,
    value: number | string,
    checked: boolean,
  ) => {
    setFilterParameter((prevFilter: any) => {
      const currentValues = prevFilter[key];

      if (checked) {
        return {
          ...prevFilter,
          [key]: [...currentValues, value],
        };
      } else {
        return {
          ...prevFilter,
          [key]: currentValues.filter((item: string) => item !== value),
        };
      }
    });
  };

  const halfLengthSort = Math.ceil(dummySort.length / 2);
  const firstHalfSort = dummySort.slice(0, halfLengthSort);
  const secondHalfSort = dummySort.slice(halfLengthSort);

  const halfLength = Math.ceil(dummyLocatios.length / 2);
  const firstHalfLocations = dummyLocatios.slice(0, halfLength);
  const secondHalfLocations = dummyLocatios.slice(halfLength);

  const halfLengthRatings = Math.ceil(dummyRatings.length / 2);
  const firstHalfRatings = dummyRatings.slice(0, halfLengthRatings);
  const secondHalfRatings = dummyRatings.slice(halfLengthRatings);

  const handleChangeRadio = (value: string) => {
    setFilterParameter((prev) => ({ ...prev, sort: value }));
  };

  return (
    <div className=" max-h-[90vh]">
      <div className="no-scrollbar overflow-y-scroll">
        <div className="max-h-[80vh] w-full">
          <div className="p-[20px] pb-[115px]">
            <Sort
              firstHalfSort={firstHalfSort}
              secondHalfSort={secondHalfSort}
              filterParameter={filterParameter}
              handleChangeRadio={handleChangeRadio}
            />
            <div className="mt-5 w-full border-b border-blue-200"></div>

            <ExceptionalDeals
              dummyDeals={dummyDeals}
              filterParameter={filterParameter}
              handleChangeCheck={handleChangeCheck}
            />
            <div className="mt-5 w-full border-b border-blue-200"></div>
            <PriceRange
              filterParameter={filterParameter}
              handlePriceRangeChange={handlePriceRangeChange}
              // setFilterParameter={setFilterParameter}
            />
            <div className="mt-5 w-full border-b border-blue-200"></div>
            <Locations
              filterParameter={filterParameter}
              firstHalfLocations={firstHalfLocations}
              secondHalfLocations={secondHalfLocations}
              handleChangeCheck={handleChangeCheck}
            />
            <div className="mt-5 w-full border-b border-blue-200"></div>
            <Ratings
              filterParameter={filterParameter}
              handleChangeCheck={handleChangeCheck}
              secondHalfRatings={secondHalfRatings}
              firstHalfRatings={firstHalfRatings}
            />
          </div>
        </div>
        <div className="absolute bottom-0 z-[9] mt-7  w-full rounded-b-[10px] bg-white pt-4  shadow-[0_0px_2px_#3c6be1] ">
          <div className="flex justify-center">
            <ButtonPrimary
              label={"Show 87 deals"}
              className={"flex h-[50px] w-[250px] justify-center rounded-full"}
            />
          </div>
          <ButtonPrimary
            label={"Reset filter"}
            classNameLabel="text-black underline"
            className={
              "!block w-full bg-gradient-to-r from-transparent to-transparent pr-2  !shadow-none"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ConsumerFilter;
