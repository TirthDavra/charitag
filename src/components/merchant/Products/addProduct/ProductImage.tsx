"use client";
import Image, { StaticImageData } from "next/image";

import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../store/ProductContext";
import Button from "../../Custom/Button";
import { AddMediaContext } from "../../store/AddMediaContext";
import { FeatureImage } from "../../types";

const ProductImage = () => {
  const { productDetails, setProductDetails } = useContext(ProductContext);
  const { setAddMediaState, AddMediaState } = useContext(AddMediaContext);
  const initialImageURL = productDetails?.main_image || null;
  const [image, setImage] = useState<FeatureImage | null>(
    initialImageURL || null,
  );
  useEffect(() => {
    if (productDetails.feature_image === null) {
      setImage(null);
    }
  }, [productDetails.feature_image]);
  const handleAddImage = () => {
    setAddMediaState({
      currentLength: 0,
      limit: 1,
      onSubmit: (images) => {
        if (images.length > 0) {
          setProductDetails((prev) => {
            return {
              ...prev,
              feature_image: images[0].id,
            };
          });
          setImage(images[0]);
        }
      },
      isActive: true,
      selectedImages: image ? [image] : [],
    });
  };
  const handleRemoveImage = () => {
    setImage(null);
    setProductDetails((prev) => {
      return {
        ...prev,
        feature_image: null,
      };
    });
  };
  return (
    <div className="mt-10">
      <div className="pb-[13px] text-lg font-medium">Product Image</div>
      <div className="flex w-full flex-col rounded bg-merchant_header bg-opacity-10 px-5 py-4 text-sm">
        {image && (
          <>
            <div className="">
              <Image
                src={
                  process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                  encodeURIComponent(image.medium_path)
                }
                alt="Preview"
                style={{ cursor: "pointer" }}
                onClick={handleAddImage}
                width={500}
                height={500}
                className="aspect-[1.05] max-h-[330px] w-full"
              />
            </div>
            <p className="mt-5 font-medium capitalize text-zinc-800">
              click the image to edit or update
            </p>
          </>
        )}

        <Button
          className="max-w-fit border-none p-0 text-merchant_text_color_blue underline"
          onClick={image ? handleRemoveImage : handleAddImage}
          label={`${image ? "Remove product image" : "Set product image"}`}
        />
      </div>
    </div>
  );
};

export default ProductImage;
