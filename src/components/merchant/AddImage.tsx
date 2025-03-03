import Image from "next/image";
import React from "react";
import Button from "./Custom/Button";
import { FeatureImage } from "./types";

const AddImage = ({
  image,
  handleAddImage,
  handleRemoveImage,
  title = "Featured Image",
  className,
  setTitle = "Set product image",
  removeTitle = "Remove product image",
}: {
  image: FeatureImage | null;
  handleAddImage: () => void;
  handleRemoveImage: () => void;
  title?: string;
  className?: string;
  setTitle?: string;
  removeTitle?: string;
}) => {
  return (
    <div className={`mt-10 ${className}`}>
      <div className="pb-[13px] text-[15px] font-medium">{title}</div>
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
          label={`${image ? removeTitle : setTitle}`}
          type="button"
        />
      </div>
    </div>
  );
};

export default AddImage;
