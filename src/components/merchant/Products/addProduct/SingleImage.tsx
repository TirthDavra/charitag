import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faSpinner,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { produce } from "immer";
import { toast } from "react-toastify";
import { deleteImageById } from "@/api/common/imageUpload";
import { FeatureImage } from "../../types";

interface SingleImageProps {
  image: FeatureImage;
  index: number;
  setProductGallery: React.Dispatch<React.SetStateAction<FeatureImage[]>>;
  isSelected: boolean;
  onClick: (image: FeatureImage) => void;
}

const SingleImage: React.FC<SingleImageProps> = ({
  image,
  index,
  setProductGallery,
  isSelected,
  onClick,
}) => {
  const [isActive, setIsActive] = useState(isSelected);
  const [isDeleting, setIsDeleting] = useState(false); // State for loading spinner
  useEffect(() => {
    setIsActive(isSelected);
  }, [isSelected]);

  const handleDelete = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation(); // Prevent event propagation

    setIsDeleting(true); // Set loading state

    const response = await deleteImageById(image.id);
    if (!response.error) {
      setProductGallery((prevImages) =>
        produce(prevImages, (draft) => {
          draft.splice(index, 1); // Remove image at the specified index
        }),
      );
      toast.success("Image deleted successfully.");
    } else {
      toast.error("Image deletion failed. Please try again later!");
    }
    setIsDeleting(false); // Reset loading state
  };
  return (
    <div
      className={`group relative border border-merchant_border p-[9px] ${
        isActive
          ? "border-2 !border-blue-500 p-[7px]" // Active state
          : ""
      }`}
      onClick={() => {
        onClick(image);
      }}
    >
      {isActive && (
        <FontAwesomeIcon
          icon={faCheckCircle}
          className="absolute right-1 top-1 text-blue-600"
        />
      )}

      <Image
        src={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT}${encodeURIComponent(
          image.medium_path,
        )}`}
        alt=""
        className="min-h-[150px] max-w-[150px]"
        width={150}
        height={150}
      />
      {!isActive && (
        <div>
          {!isDeleting ? (
            <div
              onClick={handleDelete}
              className="invisible absolute left-2 top-2 rounded-full bg-zinc-300/30 p-1 group-hover:visible hover:bg-zinc-300/50"
            >
              <FontAwesomeIcon
                icon={faTrashAlt}
                className="h-[20px] w-[20px]"
              />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="h-6 w-6">
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="animate-spin text-white"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleImage;
