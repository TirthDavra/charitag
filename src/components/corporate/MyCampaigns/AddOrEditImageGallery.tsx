"use client";
import React, { useContext, useEffect, useState } from "react";
import { produce } from "immer";
import { AddMediaContext } from "@/components/merchant/store/AddMediaContext";
import AddImageGallery from "@/components/merchant/AddImageGallery";
import { FeatureImage } from "@/components/merchant/types";

interface AddOrEditImageGalleryProps {
  images: FeatureImage[];
  handleAdd: (images: FeatureImage[]) => void;
  handleRemove: (index: number) => void;
  limit?: number;
  setTitle?: string;
}
const AddOrEditImageGallery = ({
  images,
  handleAdd,
  handleRemove,
  limit = 8,
  setTitle,
}: AddOrEditImageGalleryProps) => {
  const [Images, setImages] = useState<FeatureImage[]>(images);
  const { setAddMediaState } = useContext(AddMediaContext);
  useEffect(() => {
    setImages(images);
  }, [images]);

  const handleAddMedia = () => {
    setAddMediaState({
      currentLength: 0,
      limit,
      selectedImages: Images,
      onSubmit: (images) => {
        if (images.length > 0) {
          handleAdd(images);
          setImages(images);
        }
      },
      isActive: true,
    });
  };

  const handleRemoveImage = (index: number) => {
    setImages(
      produce((draft) => {
        draft.splice(index, 1);
      }),
    );
    handleRemove(index);
  };

  return (
    <AddImageGallery
      handleAddMedia={handleAddMedia}
      handleRemoveImage={handleRemoveImage}
      images={Images}
      setTitle={setTitle}
    />
  );
};

export default AddOrEditImageGallery;
