"use client";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../store/ProductContext";
import { CircleX } from "lucide-react";
import { produce } from "immer";
import { AddMediaContext } from "../../store/AddMediaContext";
import { FeatureImage } from "../../types";

const ProductGallery = () => {
  const { productDetails, setProductDetails } = useContext(ProductContext);
  const { setAddMediaState } = useContext(AddMediaContext);

  const [Images, setImages] = useState<FeatureImage[]>(
    productDetails?.init_Image_gallery
      ? productDetails?.init_Image_gallery
      : [],
  );
  useEffect(() => {
    if (productDetails.photo_gallery.length === 0) {
      setImages([]);
    }
  }, [productDetails.photo_gallery]);
  const handleAddMedia = () => {
    setAddMediaState({
      currentLength: 0,
      limit: 8,
      selectedImages: Images,
      onSubmit: (images) => {
        if (images.length > 0) {
          const imageId = images.map((image) => {
            return image.id;
          });
          setProductDetails((prev) => {
            return {
              ...prev,
              photo_gallery: imageId,
            };
          });
          setImages(images);
        }
      },
      isActive: true,
    });
  };
  return (
    <div className="mt-10">
      <div className="pb-[13px] text-lg font-medium">Product Gallery</div>

      <div
        className={`flex w-full flex-col rounded bg-merchant_header bg-opacity-10 ${Images.length > 0 ? "pt-3.5" : "pt-0"} pb-3.5 pl-4 pr-2`}
      >
        <div className="flex flex-wrap gap-5 xl:gap-8">
          {Images.map((image, index) => (
            <div className="group relative " key={image.id}>
              <Image
                src={
                  process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                  image.thumbnail_path
                }
                alt=""
                className="h-[95px] w-[95px]"
                width={500}
                height={500}
              />
              <div
                className="absolute right-[-13px] top-[-14px] cursor-pointer p-1 opacity-0 group-hover:opacity-100"
                onClick={() => {
                  setImages(
                    produce((draft) => {
                      draft.splice(index, 1);
                    }),
                  );
                  setProductDetails(
                    produce((draft) => {
                      draft.photo_gallery.splice(index, 1);
                    }),
                  );
                }}
              >
                <CircleX
                  className="h-6 w-6 "
                  fill="#1657d9"
                  stroke="white"
                  strokeWidth={1}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mb-3 mt-5 text-sm leading-5 text-blue-600">
          <button className="flex-auto underline" onClick={handleAddMedia}>
            Add product gallery images
          </button>
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className="ml-2  text-black"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
