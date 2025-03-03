import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircleX } from "lucide-react";
import Image from "next/image";
import React from "react";
import { FeatureImage } from "./types";

interface AddImageGalleryProps {
  images: FeatureImage[];
  handleRemoveImage: (index: number) => void;
  handleAddMedia: () => void;
  title?: string;
  setTitle?: string;
}

const AddImageGallery: React.FC<AddImageGalleryProps> = ({
  images,
  handleRemoveImage,
  handleAddMedia,
  title = "Other Image",
  setTitle = "Add product gallery images",
}) => {
  return (
    <div className="mt-10">
      <div className="pb-[13px] text-[15px] font-medium">{title}</div>

      <div
        className={`flex w-full flex-col rounded bg-merchant_header bg-opacity-10 px-4 ${images.length > 0 ? "py-3.5" : "py-2.5"} md:pl-4 md:pr-2  2xl:px-5`}
      >
        <div className="flex flex-wrap gap-[1.78rem] sm:gap-[1.27rem] md:gap-[0.92rem] lg:gap-[0.93rem] xl:gap-11">
          {images.map((image, index) => (
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
                onClick={() => handleRemoveImage(index)}
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

        <div className={` my-2 text-sm leading-5 text-blue-600`}>
          <button className="flex-auto underline" onClick={handleAddMedia} type="button">
            {setTitle}
          </button>
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className="ml-2 text-black md:ml-[3px]  xl:ml-2"
          />
        </div>
      </div>
    </div>
  );
};

export default AddImageGallery;
