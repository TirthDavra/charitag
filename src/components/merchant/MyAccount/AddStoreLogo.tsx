"use client";
import React, { useContext, useEffect, useState } from "react";
import { AddMediaContext } from "../store/AddMediaContext";
import AddImage from "../AddImage";
import { FeatureImage } from "../types";

const AddStoreLogo = ({
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
      currentLength: image ? 1 : 0,
      limit: 1,
      onSubmit: (images: FeatureImage[]) => {
        if (images.length > 0) {
          const selectedImage = images[0];
          setImage(selectedImage);
          handleChange(selectedImage);
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
      title="Store Logo"
    />
  );
};

export default AddStoreLogo;
