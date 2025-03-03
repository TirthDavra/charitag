"use client";
import { PRODUCT_DETAILS_TABS } from "@/components/constants/productDetails";
import { IconVariation } from "@/components/svgIcons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React, { useContext, useState } from "react";
import Variations from "./Variations";
import { ProductContext } from "../../store/ProductContext";

const ProductDataTab = ({ productType }: { productType: string }) => {
  const [selectedTab, setSelectedTab] = useState(1);
  const { productDetails, allVariations } = useContext(ProductContext);
  const [showVariations, setShowVariations] = useState(
    allVariations.length > 0 || false,
  );
  return (
    <div className="flex md:px-[15px] md:py-[22px] ">
      <div className="max-w-fit divide-y-2 divide-merchant_blue/15 bg-merchant_header px-5 py-[14px] xl:min-w-[244px] xl:px-[33px] 2xl:min-w-[344px] ">
        {PRODUCT_DETAILS_TABS.map((tab) => (
          <div key={tab.tab} className="max-w-fit xl:max-w-full">
            <div
              className={`my-[15px] ${Number(selectedTab) === tab.tab ? "bg-white" : ""} rounded-md`}
            >
              <div
                className="flex cursor-pointer items-center gap-[10px] p-2 xl:py-[10px] xl:pl-[15px]"
                onClick={() => {
                  setSelectedTab(tab.tab);
                }}
              >
                {tab.icon}
                <span className="hidden font-medium text-merchant_sidebar_text md:block">
                  {tab.label}
                </span>
              </div>
            </div>
          </div>
        ))}
        {productDetails.product_type === 2 && (
          <div>
            <div
              className={`my-[15px] ${selectedTab === PRODUCT_DETAILS_TABS.length + 1 ? "bg-white" : ""} rounded-md`}
            >
              <div
                className="flex cursor-pointer items-center gap-[10px] p-2 xl:py-[7px] xl:pl-[15px]"
                onClick={() => {
                  setSelectedTab(PRODUCT_DETAILS_TABS.length + 1);
                }}
              >
                <IconVariation className="text-blue-800" />
                <span className="hidden font-medium text-merchant_sidebar_text md:block">
                  Varriations
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="w-full overflow-auto">
        {PRODUCT_DETAILS_TABS[selectedTab - 1]?.component ?? (
          <Variations
            showVariations={showVariations}
            setShowVariations={setShowVariations}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDataTab;
