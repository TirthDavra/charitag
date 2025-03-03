"use client";
import { ISingleProduct } from "@/api/common/productTypes";
import { FeatureImage } from "@/components/merchant/types";
import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";

interface IProductImageCarousel {
  images: FeatureImage[];
  className?: string;
}

const imageBasePath = process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT;

const ProductImageCarousel: React.FC<IProductImageCarousel> = ({
  images,
  className,
}) => {
  const [selectedImage, setSelectedImage] = useState<{
    image: string;
    index: number;
  }>({
    image: imageBasePath + images[0]?.medium_path,
    index: 0,
  });

  useEffect(() => {
    setSelectedImage({
      image: imageBasePath + images[0]?.medium_path,
      index: 0,
    });
  }, [images]);

  return (
    <div
      className={`flex flex-wrap-reverse justify-center gap-[20px] xl:max-h-[550px] xl:flex-nowrap ${className}`}
    >
      <div className=" flex  gap-[17px] scrollbar  xl:flex-col xl:[grid-auto-flow:row]">
        {images.map((image, index) => {
          return (
            <SmallProductImage
              key={index}
              image={image?.thumbnail_path || ""}
              onClick={(index) => {
                setSelectedImage({
                  image: imageBasePath + image.medium_path,
                  index,
                });
              }}
              index={index}
              selectedImage={selectedImage}
            />
          );
        })}
      </div>
      <div className="relative  aspect-square w-full max-w-[621px] xl:min-h-[400px]  xl:w-4/5">
        <Image
          src={selectedImage.image}
          alt="product_image"
          fill={true}
          className="rounded-[5px]"
          sizes="fit"
        />
      </div>
    </div>
  );
};

export default ProductImageCarousel;

const SmallProductImage = ({
  image,
  onClick,
  index,
  selectedImage,
}: {
  image: string | StaticImageData;
  onClick: (image: number) => void;
  index: number;
  selectedImage: {
    image: string;
    index: number;
  };
}) => {
  return (
    <div
      onClick={() => {
        onClick(index);
      }}
      className="relative aspect-square h-[75px] max-h-[125px] rounded-sm bg-red-200 lg:min-w-[75px] xl:min-h-[125px] xl:w-[125px]"
    >
      <Image
        src={(imageBasePath as string) + image}
        fill={true}
        alt="product_image"
        className={`h-[125px] max-h-[125px] w-[125px] rounded-[2px] ${selectedImage.index === index ? "border border-blue-500" : ""}`}
      />
    </div>
  );
};
