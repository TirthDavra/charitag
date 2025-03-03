"use client";
import React, { useContext, useEffect, useState } from "react";
import { produce } from "immer";
import { FeatureImage } from "@/components/merchant/types";
import { AddMediaContext } from "@/components/merchant/store/AddMediaContext";
import AddImageGallery from "@/components/merchant/AddImageGallery";

interface ICampaignsGalleryProps {
  images: FeatureImage[];
  setCharityCampaign: React.Dispatch<React.SetStateAction<any>>;
}
const CharityGallery = ({
  images,
  setCharityCampaign,
}: ICampaignsGalleryProps) => {
  const [Images, setImages] = useState<FeatureImage[]>(images);

  const { setAddMediaState } = useContext(AddMediaContext);

  useEffect(() => {
    setImages(images);
  }, [images]);

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
          setCharityCampaign((prev: any) => {
            return {
              ...prev,
              gallery: images,
            };
          });
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
    // setCharityCampaign(
    //   produce((draft) => {
    //     draft.gallery.splice(index, 1);
    //   }),
    // );
  };

  return (
    <AddImageGallery
      handleAddMedia={handleAddMedia}
      handleRemoveImage={handleRemoveImage}
      images={Images}
    />
  );
};

export default CharityGallery;
