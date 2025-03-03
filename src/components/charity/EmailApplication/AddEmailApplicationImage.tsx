"use client";
import { AddMediaContext } from "@/components/merchant/store/AddMediaContext";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Editor } from "@tiptap/react";
import React, { useContext, useState } from "react";

const AddEmailApplicationImage = ({ editor }: { editor: Editor | null }) => {
  const { setAddMediaState } = useContext(AddMediaContext);
  
  if (!editor) {
    return null;
  }


  const handleAddImage = () => {
    setAddMediaState({
      currentLength: 0,
      selectedImages: [],
      limit: 1,
      onSubmit: (images) => {
        if (images.length > 0) {
          editor
            .chain()
            .focus()
            .setImage({
              src:
                process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                encodeURIComponent(images[0].thumbnail_path ?? ""),
            })
            .run();
        }
      },
      isActive: true,
    });
  };

  return (
    <div>
      <button onClick={handleAddImage}>
        <FontAwesomeIcon icon={faImage} />
      </button>
    </div>
  );
};

export default AddEmailApplicationImage;
