"use client";
import React, { useContext, useEffect, useState } from "react";
import Help from "@/components/common/Help";
import { ProductContext } from "../../store/ProductContext";
import MultipleSelector from "@/components/ui/multiple-selector";
import { getLinkedProducts } from "@/api/merchant/merchantProducts";

const LinkedProduct = () => {
  const { productDetails, setProductDetails } = useContext(ProductContext);
  const [linkedOptions, setLinkedOptions] =
    useState<{ label: string; value: string }[]>();
  useEffect(() => {
    const fetchOptions = async () => {
      setLinkedOptions(await getLinkedProducts());
    };
    fetchOptions();
  }, []);
  return (
    <div>
      <div className="py-[13px] pl-5 pr-[15px] md:py-0 md:pr-0">
        <div className="gap-x-[45px] xl:grid  xl:grid-cols-4">
          <div className="col-span-1 py-[5px]">
            <span className="text-[14px] text-merchant_text">UpSells</span>
          </div>
          <div className="col-span-3 flex max-w-[427px] ">
            <MultipleSelector
              value={productDetails.linked_products.up_sells}
              // hidePlaceholderWhenSelected
              defaultOptions={linkedOptions}
              options={linkedOptions}
              placeholder="Select products that you want for upsells..."
              onChange={(values) => {
                const modfiedValues = values.map((val) => val.value);
                setProductDetails((prev) => {
                  return {
                    ...prev,
                    linked_products: {
                      ...productDetails.linked_products,
                      up_sells: values,
                    },
                  };
                });
              }}
              loadingIndicator={
                <p className="py-2 text-center text-lg leading-10 text-muted-foreground">
                  loading...
                </p>
              }
              emptyIndicator={
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  You haven&apos;t created any products yet!
                </p>
              }
            />
            <Help className="ml-2 py-2" />
          </div>
        </div>
        <div className="gap-x-[45px] pt-[15px]  xl:grid xl:grid-cols-4">
          <div className="col-span-1 py-[5px]">
            <span className="text-sm text-merchant_text">Cross-Sells</span>
          </div>
          <div className="col-span-3 flex max-w-[427px] ">
            <MultipleSelector
              value={productDetails.linked_products.cross_sells}
              classNameItem="!line-clamp-1"
              badgeClassName="!line-clamp-1 !flex"
              defaultOptions={productDetails.linked_products.cross_sells ?? []}
              options={linkedOptions}
              placeholder="Select products that you want for cross sells..."
              onChange={(values) => {
                setProductDetails((prev) => {
                  return {
                    ...prev,
                    linked_products: {
                      ...productDetails.linked_products,
                      cross_sells: values,
                    },
                  };
                });
              }}
              loadingIndicator={
                <p className="py-2 text-center text-lg leading-10 text-muted-foreground">
                  loading...
                </p>
              }
              emptyIndicator={
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  You haven&apos;t created any products yet!
                </p>
              }
            />
            <Help className="ml-2 py-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedProduct;
