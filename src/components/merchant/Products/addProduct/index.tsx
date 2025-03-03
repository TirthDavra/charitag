"use client";
import React, { useContext, useEffect } from "react";
import ProductName from "./ProductName";
import ProductDescription from "./ProductDescription";
import ProductCategory from "./ProductCategory";
import ProductData from "./ProductData";
import ProductShortDescription from "./ProductShortDescription";
import Publish from "./Publish";
import ProductImage from "./ProductImage";
import ProductGallery from "./ProductGallery";
import { IAllCategoryResponse } from "@/api/common/types";
import { ApiResponse } from "@/api/apiConfig";
import { ProductContext } from "../../store/ProductContext";
import { initialProduct } from "@/app/merchant/products/manage/initVal";
import { useSearchParams } from "next/navigation";

const ProductAddContainer = ({
  productCategories,
}: {
  productCategories: ApiResponse<IAllCategoryResponse>;
}) => {
  const { setProductDetails } = useContext(ProductContext);
  const searchParams = useSearchParams();
  //   useEffect(() => {
  //     if (!searchParams.get("edit")) {
  //       setProductDetails(initialProduct);
  //     }
  //   }, [searchParams]);
  return (
    <div className="gap-6 pb-4 pt-4 md:grid md:grid-cols-8 ">
      <div className="col-span-5 xl:col-span-6">
        <ProductName />
        <div className="mt-4">
          <ProductDescription />
        </div>

        <div className="w-full">
          <div className="py-10 ">
            <ProductCategory productCategories={productCategories.data} />
          </div>
        </div>
        <div>
          <ProductData />
        </div>
        <div>
          <ProductShortDescription />
        </div>
      </div>
      <div className="col-span-3 xl:col-span-2">
        <Publish />
        <div className="grid grid-cols-2 gap-x-2 md:block">
          <div className="col-span-2 sm:col-span-1">
            <ProductImage />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <ProductGallery />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAddContainer;
