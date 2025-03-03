"use client";
import React, { useContext, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductDataTab from "./ProductDataTab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import Help from "@/components/common/Help";
import { ProductContext } from "../../store/ProductContext";
const ProductData = () => {
  const [productType, setProductType] = useState("simple");
  // const [isVirtual, setIsVirtual] = useState(false);
  // const [isDownloadable, setIsDownloadable] = useState(false);
  const { setProductDetails, productDetails } = useContext(ProductContext);
  return (
    <div className="rounded-md border-[1.5px] border-merchant_border ">
      <div className="flex flex-wrap items-center gap-[10px] border-b-[1.5px] border-merchant_border px-[10px] py-[8px]">
        <span className="text-merchant_sidebar_text">Product Data</span>
        <div className="flex items-center gap-[10px]">
          <Select
            defaultValue="1"
            value={productDetails.product_type.toString()}
            onValueChange={(value) => {
              setProductType(value);
              setProductDetails((prev) => {
                return {
                  ...prev,
                  product_type: Number(value),
                };
              });
            }}
          >
            <SelectTrigger
              classNameIcon="!text-black font-bold"
              className="h-[34px] min-w-[210px] rounded-sm border-[1px] border-merchant_border text-[13px] font-normal text-merchant_gray outline-none"
            >
              <SelectValue placeholder="Simple product" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1" className="text-merchant_gray">
                Simple Product
              </SelectItem>
              <SelectItem value="2" className="text-merchant_gray">
                Variable Product
              </SelectItem>
            </SelectContent>
          </Select>
          <Help className="ml-2" />
        </div>
      </div>

      {/* <div className="flex items-center gap-5">
          <CheckBox
            value={isVirtual}
            label="virtual"
            onChange={(e) => setIsVirtual(e.target.checked)}
            classNameCheckbox="border-merchant_text !rounded !w-4 !h-4"
          />
          <CheckBox
            value={isDownloadable}
            label="downloadable"
            onChange={(e) => setIsDownloadable(e.target.checked)}
            classNameCheckbox="border-merchant_text !rounded !w-4 !h-4"
          />
        </div> */}

      <div>
        <ProductDataTab productType={productType} />
      </div>
    </div>
  );
};

export default ProductData;
