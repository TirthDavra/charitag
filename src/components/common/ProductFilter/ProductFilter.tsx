"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SortingFilter from "./Sorting";
import DealOrProduct from "./DealOrProduct";
import Price from "./Price";
import AvgReview from "./AvgReview";
import NestedCategory from "./NestedCategory";
import { IAllCategoryResponse } from "@/api/common/types";
import { useSearchParams } from "next/navigation";
import { IShopQueryPrams } from "./types";

const ProductFilter = ({
  categories,
  searchParam,
  className,
}: {
  categories: IAllCategoryResponse;
  searchParam: IShopQueryPrams;
  className?: string;
}) => {

  // interface CheckedItems {
  //   [key: string]: {
  //     sub: {
  //       [key: string]: boolean;
  //     };
  //   };
  // }

  // const searchParam = useSearchParams();
  // const [filter, setFilter] = useState({
  //   sorting: searchParam.get("sorting") || "",
  //   showOnlyProduct: searchParam.get("product") || "",
  //   showOnlyDeal: searchParam.get("deal") || "",
  //   category: JSON.parse(searchParam.get("category") || "{}") || {},
  //   price: searchParam.get("price") || "",
  //   min: searchParam.get("min") || "",
  //   max: searchParam.get("max") || "",
  //   rating: searchParam.get("rating") || "",
  // });
  // const handleFilterChange = () => {};
  return (
    <div
      className={`w-[275px] min-w-[235px] max-w-[235px] space-y-3 ${className}`}
    >
      <Link
        href={"/shop"}
        className="font-semibold text-[] text-merchant_text_color_blue underline"
      >
        Clear Feature
      </Link>
      <SortingFilter sorting={searchParam?.sorting || ""} />
      <DealOrProduct
        className=""
        dealOrProduct={{
          deal: searchParam?.deal || "",
          product: searchParam?.product || "",
        }}
      />
      {categories?.status &&
        categories.data.map((category) => (
          <NestedCategory
            item={category}
            key={category.id}
            category={JSON.parse(searchParam?.category || "{}") || {}}
          />
        ))}
      <Price
        price={{
          price: searchParam?.price || "",
          min: searchParam?.min_price || "",
          max: searchParam?.max_price || "",
        }}
      />
      <AvgReview review={searchParam?.rating || ""} />
    </div>
  );
};

export default ProductFilter;
