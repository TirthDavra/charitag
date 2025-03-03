import React from "react";
import ProductContext from "@/components/merchant/store/ProductContext";
import Title from "@/components/merchant/Title";
import { getAllCategories, getProductBySlugV2 } from "@/api/common/products";
import { initialProduct } from "./initVal";
import ProductAddContainer from "@/components/merchant/Products/addProduct";

const AddProduct = async () => {
  const productCategories = await getAllCategories();

  return (
    <ProductContext initProduct={initialProduct}>
      <Title label="New Product" />
      <ProductAddContainer productCategories={productCategories} />
    </ProductContext>
  );
};

export default AddProduct;
