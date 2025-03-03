"use client";
import React, { useEffect } from "react";
import CustomInputField from "@/components/common/customFormComponents/CustomInputField";
// import CustomInputField from "../../../custom/CustomInputField";
import ReactSlider from "react-slider";
import CustomInputFieldFormik from "@/components/common/customFormComponents/CustomTextFieldFormik";

interface PriceRangeProps {
  filterParameter: {
    priceRange: {
      minPrice: number;
      maxPrice: number;
    };
  };
  handlePriceRangeChange: (values: number[]) => void;
  setFilterParameter?: React.Dispatch<
    React.SetStateAction<{
      priceRange: {
        minPrice: number;
        maxPrice: number;
      };
    }>
  >;
}

const PriceRange: React.FC<PriceRangeProps> = ({
  filterParameter,
  handlePriceRangeChange,
}) => {
  return (
    <div className="mt-4">
      <h1 className="text-xl font-bold">Price range</h1>
      <div className="mt-2 ">
        <ReactSlider
          min={0}
          max={2000}
          value={[
            filterParameter.priceRange.minPrice,
            filterParameter.priceRange.maxPrice,
          ]}
          onChange={handlePriceRangeChange}
          className="horizontal-slider py-5"
          thumbClassName="thumb"
          trackClassName="example-track"
          renderThumb={(props) => {
            const thumb1 = props?.className?.includes("thumb-0") ?? null;
            return (
              <div {...props} className="-translate-y-1/2 outline-none  ">
                <div
                  className={`h-[25px] w-[25px]  rounded-full  ${
                    thumb1
                      ? "border-[1px] border-[#6185e0] bg-white"
                      : "bg-gradient-to-l from-gradient_color_1 to-gradient_color_2"
                  }  flex items-center justify-center gap-[3px]`}
                >
                  <div
                    className={`h-[10px] w-[0.2px] border-l-[1px] ${
                      thumb1 ? "border-[#6185e0]" : "border-white "
                    }`}
                  ></div>
                  <div
                    className={`h-[12px] w-[0.21px] border-l-[1px] ${
                      thumb1 ? "border-[#6185e0]" : "border-white "
                    }`}
                  ></div>
                  <div
                    className={`h-[10px] w-[0.2px] border-l-[1px] ${
                      thumb1 ? "border-[#6185e0]" : "border-white "
                    }`}
                  ></div>
                </div>
              </div>
            );
          }}
          renderTrack={() => (
            <div className="mx-auto h-[0.5px] w-[calc(100%-47px)] bg-[#a1b8f0]"></div>
          )}
        />
        <div className="mt-2 flex items-center justify-between gap-3 ">
          <CustomInputField
            placeholder="min-price"
            value={filterParameter.priceRange.minPrice}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const inputValue = e.target.value;
              const newValue = inputValue !== "" ? parseInt(inputValue) : 0;
              handlePriceRangeChange([
                newValue,
                filterParameter.priceRange.maxPrice,
              ]);
            }}
            className="font-bold text-blue-600"
          />
          <div className="w-[90px] border-b border-black" />
          <CustomInputField
            placeholder="max-price"
            value={filterParameter.priceRange.maxPrice}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const inputValue = e.target.value;
              const newValue = inputValue !== "" ? parseInt(inputValue) : 0;
              handlePriceRangeChange([
                filterParameter.priceRange.minPrice,
                newValue,
              ]);
            }}
            className="font-bold text-blue-600"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
