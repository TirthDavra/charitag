"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadPhotoApi } from "@/api/common/imageUpload";
import Image, { StaticImageData } from "next/image";
import productDefault from "@images/productDefault.jpg";
import { getSession, useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";
interface IImageUploadProps {
  name?: string;
  limit: number;
  outerClassname?: string;
  innerClassname?: string;
  classNameImage?: string;
  values: (StaticImageData | string)[];
  content?: string;
  addProduct?: number[];
  onChange: (value: any) => void;
  onRemove: (value: any) => void;
  maxSize: number;
}

const ImageUpload = ({
  name,
  limit,
  outerClassname,
  innerClassname,
  values,
  content,
  onChange,
  onRemove,
  classNameImage,
  addProduct,
  maxSize,
}: IImageUploadProps) => {
  const addRef = useRef(addProduct ?? []);
  const removeImage = (index: number) => {
    const newImages = [...images];
    if (addProduct) {
      addRef.current.splice(index, 1);
      onRemove(addRef.current);
    }
    newImages.splice(index, 1);
    setImages(newImages);
  };
  const [images, setImages] = useState(values);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (limit === 1) {
        try {
          const response = await uploadPhotoApi([acceptedFiles[0]], "product");
          onChange(response.data.id);
          const imageUrl =
            process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
            encodeURIComponent(response.data.path);
          setImages([imageUrl]);
        } catch (error) {
          console.log("error ", error);
          toast.error("Image upload failed. Please try again later.");
        }
        return;
      }

      if (values.length + acceptedFiles.length > limit) {
        toast.error(`Maximum limit reached: ${limit} images`);
        return;
      }
      const newImages = await Promise.all(
        acceptedFiles.map(async (file) => {
          try {
            const response = await uploadPhotoApi([file], "product");
            if (!response.error) {
              const imagePath =
                process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                response.data.path;
              if (addProduct) {
                addRef.current.push(response.data.id);
                onChange(addRef.current);
              }
              setImages((prevImages) => [...prevImages, imagePath]);
              return imagePath;
            } else {
              // Handle error response
              toast.error("Image upload failed. Please try again later!");
              return null; // Return null in case of error
            }
          } catch (error) {
            console.error("Error uploading image:", error);
            toast.error("An error occurred while uploading the image.");
            return null; // Return null in case of error
          }
        }),
      );

      const validNewImages = newImages.filter(
        (image): image is string => image !== null,
      ) as string[];

      //   setImages((prevImages) => [...prevImages, ...validNewImages]);
      //   onChange(validNewImages);
    },
    [limit, name, addProduct],
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
    },
    maxSize,
  });
  return (
    <div
      className={`container mx-auto rounded-lg border-[1px] border-borders_color bg-white p-8 shadow-md ${outerClassname}`}
    >
      <div
        {...getRootProps()}
        className="cursor-pointer border-2 border-dashed border-borders_color p-8 text-center"
      >
        <input {...getInputProps()} />
        <p className="text-gray-500">
          {content} (max {limit})
        </p>
      </div>
      <div className={`my-4 flex flex-wrap justify-center ${innerClassname}`}>
        {images.map((file, index) => (
          <div
            key={`Preview ${index}`}
            className="relative m-2 overflow-hidden rounded-md"
          >
            <Image
              src={file ? file : productDefault}
              alt={`Preview ${index}`}
              className={`h-32 w-32 object-cover ${classNameImage}`}
              width={500}
              height={500}
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute right-0 top-0 bg-red-500 p-1 text-white"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
