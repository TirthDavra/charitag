"use client";
import React, { useContext } from "react";
import { ProductContext } from "../../store/ProductContext";

const ProductName = () => {
  const { productDetails, setProductDetails } = useContext(ProductContext);
  return (
    <div>
      <div className="text-[18px] font-medium">
        {productDetails.product_id ? "Edit" : "Add New"} Product
      </div>
      <div className="mt-4 rounded-sm border border-merchant_border py-2 pl-3 font-light">
        <input
          placeholder="Product Name"
          className="!infoPlaceholder w-full outline-none"
          value={productDetails.product_name}
          onChange={(e) => {
            setProductDetails((prev) => {
              return {
                ...prev,
                product_name: e.target.value,
              };
            });
          }}
        />
      </div>
    </div>
  );
};

export default ProductName;
