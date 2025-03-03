"use client";
import React, { useContext } from "react";

import { getProductsCategories } from "@/api/merchant/merchantProducts";
import ProductCategories, { ISubCatOptions } from "./ProductCategories";
import { getAllCategories } from "@/api/common/products";
import { ProductContext } from "../../store/ProductContext";
import { IAllCategoryResponse } from "@/api/common/types";
import { MultiSelectValuetypes } from "../../types";
import { Option } from "@/components/ui/multiple-selector";
import { MultiValue } from "react-select";
import { useModal } from "@/components/context/ModalContext";
import SuggestCategoryModal from "../../SuggestCategoryModal";

const ProductCategory = ({
  productCategories,
}: {
  productCategories: IAllCategoryResponse;
}) => {
  // const productCategories = await getAllCategories();
  const { productDetails, setProductDetails } = useContext(ProductContext);
  const { openModal, closeModal } = useModal();
  const handleCategoryChange = (values: Option[]) => {
    setProductDetails((prev) => {
      return {
        ...prev,
        product_category_ids: values,
      };
    });
  };

  const handleSubCategoryChange = (values: MultiValue<ISubCatOptions>) => {
    setProductDetails((prev) => {
      return {
        ...prev,
        product_sub_category_ids: [...values],
      };
    });
  };

  return (
    <div className="flex-grow">
      <div className="p-2 font-medium">Product Category</div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex-grow">
          <ProductCategories
            productCategories={productCategories}
            onCategoryChange={handleCategoryChange}
            onSubCategoryChange={handleSubCategoryChange}
            selectedCategories={productDetails.product_category_ids}
            selectedSubCategories={productDetails.product_sub_category_ids}
            placeholderCategory="Select Product Main Category."
            placeholderSubCategory="Select Sub-Categories For Your Product"
            className="!flex-col xl:!flex-row"
          />
        </div>
        <div
          className="font-normal text-merchant_text_color_blue cursor-pointer"
          onClick={() => {
            openModal({
              content: <SuggestCategoryModal onClose={closeModal} />,
            });
          }}
        >
          Suggest new
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
