"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IProductCategory } from "@/api/merchant/types";
import Link from "next/link";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { buildQueryString } from "@/utils/basicfunctions";

interface IDefaultValues {
  rating: string;
  product_category_id: string | null;
}

interface IRatingsCategoriesProps {
  productCategories?: IProductCategory[];
  defaultValues?: IDefaultValues;
}

const FilterReviews = ({
  productCategories,
  defaultValues,
}: IRatingsCategoriesProps) => {
  const [filterParams, setFilterParams] = useState({
    rating: defaultValues?.rating ?? "",
    product_category_id: defaultValues?.product_category_id ?? "",
  });
  const handleFilterParamsChange = (key: string, value: string) => {
    setFilterParams((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  return (
    <div className="flex flex-wrap gap-[5px] sm:gap-[10px]">
      <Select
        onValueChange={(id) => {
          handleFilterParamsChange("product_category_id", id);
        }}
        value={filterParams.product_category_id ?? ""}
      >
        <SelectTrigger
          className="h-[34px] w-[200px] rounded-sm border-[1px] border-merchant_border text-[13px] font-normal text-merchant_gray outline-none"
          classNameIcon="!text-[black]"
        >
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={"all"} className="text-merchant_gray">
            All Categories
          </SelectItem>
          {productCategories &&
            productCategories.map((cateogory) => {
              return (
                <SelectItem
                  key={cateogory.id}
                  value={cateogory.id.toString()}
                  className="text-merchant_gray"
                >
                  {cateogory.name}
                </SelectItem>
              );
            })}
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) => handleFilterParamsChange("rating", value)}
        value={filterParams.rating ?? ""}
      >
        <SelectTrigger
          className="h-[34px] w-[150px] rounded-sm border-[1px]  border-merchant_border text-[13px] font-normal text-merchant_gray outline-none"
          classNameIcon="!text-[black]"
        >
          <SelectValue placeholder="Select Ratings" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={"all"}>All</SelectItem>
          <SelectItem value="1">1</SelectItem>
          <SelectItem value="2">2</SelectItem>
          <SelectItem value="3">3</SelectItem>
          <SelectItem value="4">4</SelectItem>
          <SelectItem value="5">5</SelectItem>
        </SelectContent>
      </Select>
      <Link href={`?${buildQueryString(filterParams)}`}>
        <ButtonPrimary
          label="Filter"
          className="rounded-sm px-[22px] py-2 !shadow-none"
          classNameLabel="text-[13px] font-normal"
        />
      </Link>
    </div>
  );
};

export default FilterReviews;
