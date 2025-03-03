"use client";
import React, { useContext, useEffect, useState } from "react";
import TipTap from "../../../common/RichTextEditor/RichTextEditor";
import { ProductContext } from "../../store/ProductContext";

import { IProductGallery } from "@/api/merchant/types";

const ProductDescription = () => {
  const { setProductDetails,productDetails } = useContext(ProductContext);

  const handleChange = (data: any) => {
    setProductDetails((prev) => {
      return {
        ...prev,
        long_description: data.toString(),
      };
    });
  };

  return (
    <div>
      <div className="mb-4 text-lg font-medium">Product Description</div>

      <TipTap
        onChange={handleChange}
        placeholder="Product Long Description..."
        initContent={productDetails.long_description}
      />
    </div>
  );
};

export default ProductDescription;
