"use client";
import React, { useContext, useEffect, useState } from "react";
import { produce } from "immer";
import { AddMediaContext } from "../store/AddMediaContext";
import { IMearchantStoreProfile } from "./types";
import AddImageGallery from "../AddImageGallery";
import { FeatureImage } from "../types";

interface IProductGalleryProps {
  initialImages: FeatureImage[];
  handleChange: (images: FeatureImage[] | null) => void;
}
const StoreGallery = ({
  initialImages,
  handleChange,
}: IProductGalleryProps) => {
  const [Images, setImages] = useState<FeatureImage[]>(initialImages ?? []);

  const { setAddMediaState } = useContext(AddMediaContext);

  useEffect(() => {
    setImages(initialImages);
  }, [initialImages]);

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
          handleChange(images);
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
    handleChange(Images);
  };

  return (
    <AddImageGallery
      handleAddMedia={handleAddMedia}
      handleRemoveImage={handleRemoveImage}
      images={Images}
      title="Product Gallery"
    />
  );
};

export default StoreGallery;
