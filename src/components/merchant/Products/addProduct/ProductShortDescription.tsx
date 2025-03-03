"use client";
import React, { useContext } from "react";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tiptap from "../../../common/RichTextEditor/RichTextEditor";
import Help from "@/components/common/Help";
import { ProductContext } from "../../store/ProductContext";

const ProductShortDescription = () => {
  const { setProductDetails,productDetails } = useContext(ProductContext);

  const handleChange = (data: any) => {
    setProductDetails((prev) => {
      return {
        ...prev,
        short_description: data,
      };
    });
  };
  return (
    <div>
      <div>
        <div className="my-4 text-lg font-medium">
          Product Short Description
        </div>
      </div>
      <Tiptap
        placeholder="Product Short Description..."
        onChange={handleChange}
        initContent={productDetails.short_description}
      />
    </div>
  );
};

export default ProductShortDescription;
