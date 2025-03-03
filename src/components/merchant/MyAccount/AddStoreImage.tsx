"use client";
import React, { useContext, useEffect, useState } from "react";
import { AddMediaContext } from "../store/AddMediaContext";
import AddImage from "../AddImage";
import { FeatureImage } from "../types";

const AddProductImage = ({
  handleChange,
  initialValue,
}: {
  handleChange: (image: FeatureImage | null) => void;
  initialValue: FeatureImage | null;
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
      onSubmit: (images: FeatureImage[]) => {
        if (images.length > 0) {
          const selectedImage = images[0];
          handleChange(selectedImage);
          setImage(selectedImage);
        }
      },
      isActive: true,
      selectedImages: image ? [image] : [],
    });
  };

  const handleRemoveImage = () => {
    setImage(null);
    handleChange(null);
  };

  return (
    <AddImage
      handleAddImage={handleAddImage}
      handleRemoveImage={handleRemoveImage}
      image={image}
    />
  );
};

export default AddProductImage;
