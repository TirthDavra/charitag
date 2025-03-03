"use client";
import React, { useContext, useEffect, useState } from "react";
import { AddMediaContext } from "@/components/merchant/store/AddMediaContext";
import AddImage from "@/components/merchant/AddImage";
import { FeatureImage } from "@/components/merchant/types";

const AddCharityImage = ({
  setCharityCampaign,
  initialValue,
}: {
  setCharityCampaign: React.Dispatch<React.SetStateAction<any>>;
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
      onSubmit: (images) => {
        if (images.length > 0) {
          setCharityCampaign((prev: any) => {
            return {
              ...prev,
              feature_image: images[0],
            };
          });
          setImage(images[0]);
        }
      },
      isActive: true,
      selectedImages: image ? [image] : [],
    });
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  return (
    <AddImage
      handleAddImage={handleAddImage}
      handleRemoveImage={handleRemoveImage}
      image={image}
    />
  );
};

export default AddCharityImage;
