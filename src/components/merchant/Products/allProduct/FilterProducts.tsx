"use client";
import React, { useEffect, useRef, useState } from "react";
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
  stock_status?: string;
  product_type?: string;
  product_category_id?: string;
}

interface IProductCategoriesProps {
  productCategories?: IProductCategory[];
  defaultValues?: IDefaultValues;
}

const FilterProducts = ({
  productCategories,
  defaultValues,
}: IProductCategoriesProps) => {
  const [filterParams, setFilterParams] = useState({
    stock_status: defaultValues?.stock_status,
    product_type: defaultValues?.product_type,
    product_category_id: defaultValues?.product_category_id,
  });

  const queryString = useRef<string>("");

  const updateQueryString = (key: string, value: string) => {
    const params = new URLSearchParams(queryString.current);

    if (value && value !== "null") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    queryString.current = "?" + params.toString();
  };

  const handleFilterParamsChange = (key: string, value: string) => {
    setFilterParams((prev) => {
      const newParams = {
        ...prev,
        [key]: value === "null" ? "" : value,
      };
      updateQueryString(key, value);
      return newParams;
    });
  };

  useEffect(() => {
    // Initialize the query string with default values
    Object.entries(filterParams).forEach(([key, value]) => {
      updateQueryString(key, value as string);
    });
  }, [filterParams]);

  return (
    <div className="flex flex-wrap gap-[5px] sm:gap-[10px]">
      {productCategories && productCategories.length > 0 && (
        <Select
          onValueChange={(id) =>
            handleFilterParamsChange("product_category_id", id)
          }
          value={filterParams.product_category_id ?? ""}
          key={"product_category_id"}
        >
          <SelectTrigger
            classNameIcon="!text-black font-bold"
            className="h-[34px] max-w-fit rounded-[3px] border-[1px] border-merchant_border text-[13px] font-normal text-merchant_gray outline-none"
          >
            <SelectValue placeholder="Filter By Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"null"} className="text-merchant_gray">
              All
            </SelectItem>
            {productCategories.map((category) => (
              <SelectItem
                key={category.id}
                value={category.id.toString()}
                className="text-merchant_gray"
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <Select
        onValueChange={(value) =>
          handleFilterParamsChange("product_type", value)
        }
        value={filterParams.product_type}
        key={"product_type"}
      >
        <SelectTrigger
          classNameIcon="!text-black font-bold"
          className="h-[34px] min-w-[150px] max-w-fit rounded-[3px] border-[1px] border-merchant_border text-[13px] font-normal text-merchant_gray outline-none"
        >
          <SelectValue placeholder="Filtered By Product Type" />
        </SelectTrigger>

        <SelectContent className="min-w-[150px] text-merchant_gray">
          <SelectItem value={"null"} className="text-merchant_gray">
            All
          </SelectItem>
          <SelectItem value="1">Simple Product</SelectItem>
          <SelectItem value="2">Variable Product</SelectItem>
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) =>
          handleFilterParamsChange("stock_status", value)
        }
        value={filterParams.stock_status}
        key={"stock_status"}
      >
        <SelectTrigger
          classNameIcon="!text-black font-bold"
          className="h-[34px] max-w-fit rounded-[3px] border-[1px] border-merchant_border text-[13px] font-normal text-merchant_gray outline-none"
        >
          <SelectValue placeholder="Filter By Stock Status" />
        </SelectTrigger>

        <SelectContent className="text-merchant_gray">
          <SelectItem value={"null"} className="text-merchant_gray">
            All
          </SelectItem>
          <SelectItem value="1">In Stock</SelectItem>
          <SelectItem value="0">Out Of Stock</SelectItem>
        </SelectContent>
      </Select>

      <Link href={queryString.current}>
        <ButtonPrimary
          label="Filter"
          className="h-[34px] rounded-[3px] px-[22px] py-2 !shadow-none"
          classNameLabel="text-[13px] font-normal"
        />
      </Link>
    </div>
  );
};

export default FilterProducts;
