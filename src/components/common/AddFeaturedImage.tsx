"use client";
import React, { useContext, useEffect, useState } from "react";
import { AddMediaContext } from "@/components/merchant/store/AddMediaContext";
import AddImage from "@/components/merchant/AddImage";
import { FeatureImage } from "@/components/merchant/types";

const AddFeaturedImage = ({
  initialValue,
  handleAdd,
  handleRemove,
  title,
  className,
  setTitle,
  removeTitle,
}: {
  handleAdd: (images: FeatureImage[]) => void;
  handleRemove: () => void;
  initialValue: FeatureImage | null;
  title?: string;
  className?: string;
  setTitle?: string;
  removeTitle?: string;
}) => {
  const [image, setImage] = useState<FeatureImage | null>(initialValue);
  useEffect(() => {
    setImage(initialValue);
  }, [initialValue]);

  const { setAddMediaState } = useContext(AddMediaContext);

  const handleAddImage = () => {
    setAddMediaState({
      currentLength: 0,
      limit: 1,
      onSubmit: (images) => {
        if (images.length > 0) {
          handleAdd([images[0]]);
          setImage(images[0]);
        }
      },
      selectedImages: [],
      isActive: true,
    });
  };

  const handleRemoveImage = () => {
    setImage(null);
    handleRemove();
  };

  return (
    <AddImage
      handleAddImage={handleAddImage}
      handleRemoveImage={handleRemoveImage}
      image={image}
      title={title}
      className={className}
      removeTitle={removeTitle}
      setTitle={setTitle}
    />
  );
};

export default AddFeaturedImage;
