"use client";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { getProductGalleryClient } from "@/api/merchant/merchantProducts";
import { uploadPhotoApi } from "@/api/common/imageUpload";
import { toast } from "react-toastify";
import { AddMediaContext } from "../../store/AddMediaContext";
import { FeatureImage } from "../../types";
import SingleImage from "./SingleImage";

const AddMedia = () => {
  // const { AddMediaState, setAddMediaState } = useContext(ProductContext);
  const { AddMediaState, setAddMediaState } = useContext(AddMediaContext);
  const [showLibrary, setShowLibrary] = useState(false);
  const [productGallery, setProductGallery] = useState<FeatureImage[]>(
    AddMediaState.selectedImages,
  );
  const [selectedImages, setSelectedImages] = useState<FeatureImage[]>(
    AddMediaState.selectedImages ?? [],
  );
  useEffect(() => {
    const fetchMedia = async () => {
      const data = await getProductGalleryClient();
      if (!data.error) {
        setProductGallery(data.data);
      }
    };
    fetchMedia();
  }, []);

  useEffect(() => {
    if (AddMediaState.isActive) {
      document.body.classList.add("overflow-hidden");
      setSelectedImages(AddMediaState.selectedImages);
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [AddMediaState.isActive]);
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      const response = await uploadPhotoApi(acceptedFiles, "product");
      if (!response.error) {
        const data = await getProductGalleryClient();
        toast.success("Image added to media gallery.");
        if (!data.error) {
          setProductGallery(data.data);
        }
      } else {
        toast.error("Image upload failed. Please try again!");
        console.error("Upload failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error uploading:", error);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
    },
  });
  const closeAddMedia = () => {
    setAddMediaState((prev) => ({ ...prev, isActive: false }));
    setSelectedImages([]);
  };
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setShowLibrary(false);
      closeAddMedia();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowLibrary(false);
      closeAddMedia();
    }
  };
  useEffect(() => {
    if (AddMediaState.isActive) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [AddMediaState.isActive]);

  const handleOnSelect = (image: FeatureImage) => {
    const foundIndex = selectedImages.findIndex(
      (element) => element.id === image.id,
    );

    if (AddMediaState.limit > 1) {
      const newSelectedItems = [...selectedImages];
      if (foundIndex > -1) {
        // Remove item from selection if already exists
        newSelectedItems.splice(foundIndex, 1);
      } else {
        // Add item to selection if not exists
        if (AddMediaState.limit > selectedImages.length) {
          newSelectedItems.push(image);
        } else {
          toast.error(
            `You have reached limit of ${AddMediaState.limit} images.`,
          );
        }
      }
      setSelectedImages(newSelectedItems);
    } else {
      if (foundIndex > -1) {
        // Remove item from selection
        setSelectedImages([]);
      } else {
        // Add item to selection
        setSelectedImages([image]);
      }
    }
  };
  return (
    <>
      {AddMediaState.isActive && (
        <div
          className="fixed inset-0 z-[45] flex h-full w-full items-center justify-center overflow-y-auto bg-black bg-opacity-50"
          onClick={handleBackdropClick}
        >
          <div
            className="h-[calc(100%-60px)] w-[calc(100%-60px)] rounded-md border bg-white shadow-lg animate-in "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-full w-full flex-col">
              <div className="border-b border-merchant_border p-5 ">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-merchant_sidebar_text">
                    Add Media
                  </span>{" "}
                  <FontAwesomeIcon
                    icon={faXmark}
                    fontVariant={"light"}
                    className="h-[15px] w-[15px] cursor-pointer font-thin"
                    onClick={closeAddMedia}
                  />
                </div>
                <div className="mt-[13px] flex h-[34px] gap-[10px]">
                  {!showLibrary ? (
                    <ButtonPrimary
                      label="Uploads Files"
                      className="gap-[10px] rounded-sm !px-[10px] !py-[8px] text-[13px] font-normal !shadow-none"
                      classNameLabel="h-[17px] text-[12px] font-normal"
                      onClick={() => setShowLibrary(true)}
                    />
                  ) : (
                    <button
                      className="items-center justify-center gap-[10px] rounded border border-solid border-merchant_border bg-buttonGradient px-[13px] text-[13px] font-medium text-merchant_text_color_blue"
                      onClick={() => setShowLibrary(false)}
                    >
                      Uploads Files
                    </button>
                  )}

                  {!showLibrary ? (
                    <button
                      className="items-center justify-center gap-[10px] rounded border border-solid border-merchant_border bg-buttonGradient px-[13px] text-[13px] text-merchant_text_color_blue"
                      onClick={() => setShowLibrary(true)}
                    >
                      Media Library
                    </button>
                  ) : (
                    <ButtonPrimary
                      label="Media Library"
                      className="gap-[10px] rounded-sm !px-[10px] !py-[8px] text-[13px] font-normal !shadow-none"
                      classNameLabel="h-[17px] text-[12px] font-normal"
                    />
                  )}
                </div>
              </div>
              {showLibrary ? (
                <div className="">
                  <div className="flex justify-between pl-5 pr-10 pt-[15px] max-xs:flex-col">
                    <div>
                      <span className="text-[12px] font-medium text-merchant_sidebar_text">
                        Filter Media
                      </span>
                      <div className="flex gap-4 pb-[20px] pt-[5px]">
                        <div>
                          <Select>
                            <SelectTrigger
                              classNameIcon="!text-black"
                              className="h-[34px] max-w-fit rounded-sm border-[1px] border-merchant_border text-[13px] font-normal text-merchant_text_color_blue outline-none"
                            >
                              <SelectValue placeholder="All Dates" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem
                                value="light"
                                className="text-merchant_text_color_blue"
                              >
                                Light
                              </SelectItem>
                              <SelectItem
                                value="dark"
                                className="text-merchant_text_color_blue"
                              >
                                Dark
                              </SelectItem>
                              <SelectItem
                                value="system"
                                className="text-merchant_text_color_blue"
                              >
                                System
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    {/* <div className="">
                      <span className="text-xs font-medium text-merchant_sidebar_text">
                        Search
                      </span>
                      <div className="mt-[5px] rounded-sm border border-merchant_border p-1 font-light max-xs:mb-[10px]">
                        <input
                          className="max-w-[136px] outline-none"
                          // onChange={(e) => {
                          //   setProductDetails((prev) => {
                          //     return {
                          //       ...prev,
                          //       product_name: e.target.value,
                          //     };
                          //   });
                          // }}
                        />
                      </div>
                    </div> */}
                  </div>
                  <div className="grid-rows- grid max-h-[calc(100vh-280px)] grid-cols-[repeat(auto-fit,minmax(170px,170px))] gap-[25px] overflow-y-auto pl-5">
                    {productGallery.length > 0 ? (
                      productGallery.map((item, i: number) => {
                        const isSelected: boolean = !!selectedImages.find(
                          (image) => image.id === item.id,
                        );
                        return (
                          <SingleImage
                            isSelected={isSelected}
                            image={item}
                            key={i}
                            onClick={handleOnSelect}
                            index={i}
                            setProductGallery={setProductGallery}
                          />
                        );
                      })
                    ) : (
                      <div className="flex flex-grow-0 items-center justify-center">
                        <p>No Images available. Please upload images.</p>
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-[50px] right-[70px]">
                    <button
                      className="gap-[10px] rounded border border-solid border-merchant_border bg-buttonGradient bg-white px-[14px] py-3 text-[13px] text-merchant_text_color_blue"
                      onClick={() => {
                        AddMediaState.onSubmit(selectedImages);
                        closeAddMedia();
                      }}
                    >
                      Insert into Product
                    </button>
                  </div>
                </div>
              ) : (
                <div className=" flex flex-grow flex-col items-center justify-center">
                  <div
                    {...getRootProps()}
                    className={`m-10 flex h-full w-[calc(100%-80px)] flex-col items-center justify-center p-10 ${isDragActive ? " border-2 border-dashed border-borders_color " : ""} `}
                  >
                    <input {...getInputProps()} />
                    <div className="text-lg font-medium text-merchant_sidebar_text">
                      Drop files to upload
                    </div>
                    <div className="py-[6px] text-sm text-merchant_placeholder">
                      or
                    </div>
                    <button className="rounded border border-merchant_border bg-white px-6 py-[11px] text-[13px] text-merchant_text_color_blue">
                      Select File
                    </button>
                    <div className="pt-[26px] text-sm font-normal text-merchant_placeholder">
                      Maximum upload file size: 100MB
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddMedia;
