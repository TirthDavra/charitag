import React, { useContext, useState } from "react";
import Help from "@/components/common/Help";
import CustomInputField from "@/components/common/customFormComponents/CustomInputField";
import { ProductContext } from "../../store/ProductContext";

const General = () => {
  const { productDetails, setProductDetails } = useContext(ProductContext);
  const [errorMsg, setErrorMsg] = useState(false);

  const handleSalePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (/^\d*\.?\d{0,2}$/.test(e.target.value)) {
      const salePrice = e.target.value;
      const regularPrice = productDetails.price.regular_price;

      if (Number(salePrice) > Number(regularPrice)) {
        setErrorMsg(true);
      } else {
        setErrorMsg(false);
        setProductDetails((prev) => ({
          ...prev,
          price: {
            ...productDetails.price,
            sale_price: salePrice,
          },
        }));
      }
    }
  };

  return (
    <div className="py-[13px] pl-5 pr-[15px] md:py-0 md:pr-0">
      <div>
        <div className="items-center gap-x-[45px] xl:grid xl:grid-cols-4">
          <div className="col-span-1">
            <span className="text-[14px] text-merchant_text">
              Regular Price ($)
            </span>
          </div>
          <div className="col-span-3 flex max-w-[427px] items-center">
            <CustomInputField
              type="number"
              className="!py-[3px]"
              classNameContainer="border-merchant_border rounded-sm"
              classNameWrapper="flex-grow"
              value={productDetails.price.regular_price}
              min={0}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (/^\d*\.?\d{0,2}$/.test(e.target.value)) {
                  setProductDetails((prev) => ({
                    ...prev,
                    price: {
                      ...productDetails.price,
                      regular_price: e.target.value,
                    },
                  }));
                }
              }}
            />
            <Help className="ml-2" />
          </div>
        </div>
        <div className="items-center gap-x-[45px] pt-[15px] xl:grid xl:grid-cols-4">
          <div className="col-span-1">
            <span className="text-[14px] text-merchant_text">
              Sale Price ($)
            </span>
          </div>
          <div className="col-span-3 flex max-w-[427px] items-center">
            <CustomInputField
              className="!py-[3px]"
              classNameContainer="border-merchant_border rounded-sm"
              classNameWrapper="flex-grow"
              value={productDetails.price.sale_price}
              onChange={handleSalePriceChange}
            />
            <Help className="ml-2" />
          </div>
        </div>
        {errorMsg && (
          <div className="items-center gap-x-[45px] pt-[15px] xl:grid xl:grid-cols-4">
            <div className="col-span-1" />
            <div className="col-span-3 flex max-w-[427px] text-sm text-red-500">
              Sale price should be less than regular price.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default General;
