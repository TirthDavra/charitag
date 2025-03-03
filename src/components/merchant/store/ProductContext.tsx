"use client";
import React, { createContext, useEffect, useState } from "react";
import {
  IProduct,
  ProductVariation,
  initialProduct,
} from "@/app/merchant/products/manage/initVal";
import { IAttributeValues } from "../Products/addProduct/Attributes";
import { IProductGallery } from "@/api/merchant/types";
import { mergeArrays } from "@/lib/utils";
import { IColorItem } from "../Products/addProduct/ColorAttribute";

interface AddMediaState {
  onSubmit: (selectedImages: IProductGallery[]) => void;
  limit: number;
  currentLength: number;
  isActive: boolean;
}

interface ProductContextValue {
  productDetails: IProduct;
  setProductDetails: React.Dispatch<React.SetStateAction<IProduct>>;
  allAttributes: IAttributeValues[];
  setAllAttributes: React.Dispatch<React.SetStateAction<IAttributeValues[]>>;
  allVariations: ProductVariation[];
  setAllVariations: React.Dispatch<React.SetStateAction<ProductVariation[]>>;
  processedAttributes: string[][];
  setProcessedAttributes: React.Dispatch<React.SetStateAction<string[][]>>;
  AddMediaState: AddMediaState;
  setAddMediaState: React.Dispatch<React.SetStateAction<AddMediaState>>;
}

export const ProductContext = createContext<ProductContextValue>({
  productDetails: initialProduct,
  setProductDetails: () => {},
  allAttributes: [{ name: "", values: "" }],
  setAllAttributes: () => {},
  allVariations: [],
  setAllVariations: () => {},
  processedAttributes: [],
  setProcessedAttributes: () => {},
  AddMediaState: {
    limit: 0,
    onSubmit: (selectedImages: IProductGallery[]) => {},
    currentLength: 0,
    isActive: false,
  },
  setAddMediaState: () => {},
});

const ProductContextProvider = ({
  children,
  initProduct,
}: {
  children: React.ReactNode;
  initProduct: IProduct;
}) => {
  const [productDetails, setProductDetails] = useState<IProduct>(initProduct);
  const [allAttributes, setAllAttributes] = useState<IAttributeValues[]>(
    initProduct.attributes || [{ name: "", values: "" }],
  );
  const [allVariations, setAllVariations] = useState<ProductVariation[]>(
    [...Object.values(initProduct.variations)] || [],
  );
  // const process = initProduct.attributes.map((attr) => attr.values.split("|"));
  const [processedAttributes, setProcessedAttributes] = useState<string[][]>(
    [],
  );
  useEffect(() => {
    const processedAttr: string[][] =
      initProduct.attributes.length > 0
        ? initProduct.attributes.map((attr) => {
            if (attr.name === "Color") {
              const arrayValues: IColorItem[] = JSON.parse(
                attr.values === "" ? "[]" : attr.values,
              );
              const processedArrayContent = arrayValues.map(
                (item) => item.name,
              );
              return processedArrayContent;
            }
            return attr.values.split("|");
          })
        : [];

    if (processedAttr.length > 0) {
      setProcessedAttributes(mergeArrays(processedAttr));
    }
  }, []);

  const [AddMediaState, setAddMediaState] = useState<AddMediaState>({
    onSubmit: ([]) => {},
    limit: 0,
    currentLength: 0,
    isActive: false,
  });

  return (
    <ProductContext.Provider
      value={{
        productDetails,
        setProductDetails,
        allAttributes,
        setAllAttributes,
        allVariations,
        setAllVariations,
        processedAttributes,
        setProcessedAttributes,
        AddMediaState,
        setAddMediaState,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
