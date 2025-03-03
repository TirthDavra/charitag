"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IProductCategory } from "@/api/merchant/types";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import Link from "next/link";

interface IDefaultValues {
  stock_status: string;
  product_type: string | null;
  product_category_id: string | null;
}
interface IProductCategoriesProps {
  filterSelections: IfilterSelections[];
  all?: boolean;
}
interface IfilterSelections {
  triggerName: string;
  queryParam: string;
  selectItems: { name: string; value: string }[];
  defaultValue?: string;
}
const TableFilters = ({
  filterSelections,
  all = true,
}: IProductCategoriesProps) => {
  const [filterParams, setFilterParams] = useState<{
    [key: string]: string | undefined;
  }>({});

  useEffect(() => {
    filterSelections.forEach((filter) => {
      if (filter.defaultValue) {
        handleFilterParamsChange(filter.queryParam, filter.defaultValue);
      }
    });
  }, [filterSelections]);

  const handleFilterParamsChange = (key: string, value: string) => {
    setFilterParams((prev) => {
      if (value === "all") {
        const { [key]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  return (
    <div className="flex flex-wrap gap-[5px] sm:gap-[10px]">
      {filterSelections.length > 0 &&
        filterSelections.map((filter, indexFilter) => {
          return (
            <div className="max-w-[400px]" key={filter.triggerName}>
              <Select
                key={filter.triggerName + indexFilter}
                onValueChange={(value) => {
                  handleFilterParamsChange(filter.queryParam, value);
                }}
                value={filterParams[filter.queryParam] || ""}
              >
                <SelectTrigger
                  classNameIcon="!text-black max-w-fit font-bold min-w-4"
                  className="h-[34px] max-w-fit whitespace-pre rounded-sm border-[1px] border-merchant_border text-[13px] font-normal text-merchant_gray outline-none"
                >
                  <SelectValue placeholder={`${filter.triggerName}`} />
                </SelectTrigger>
                <SelectContent>
                  {all && <SelectItem value="all">All</SelectItem>}
                  {filter.selectItems.length > 0 &&
                    filter.selectItems.map((cateogory, index) => {
                      return (
                        <SelectItem
                          key={cateogory.name + index}
                          value={cateogory.value}
                          className="text-merchant_gray"
                        >
                          {cateogory.name}
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>
            </div>
          );
        })}

      <Link
        href={`?${Object.keys(filterParams)
          .map((key) => `${key}=${filterParams[key]}`)
          .join("&")}`}
      >
        <ButtonPrimary
          label="Filter"
          className="!h-[34px] rounded-sm px-[22px] py-2 !shadow-none"
          classNameLabel="text-[13px] font-normal"
        />
      </Link>
    </div>
  );
};

export default TableFilters;
