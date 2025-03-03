"use client";
import React, { createContext, useState } from "react";
import { IMearchantStoreProfile } from "../MyAccount/types";
import { initialStoreProfile } from "@/app/merchant/my-account/@storeProfile/initval";
import { FeatureImage } from "../types";
interface AddMediaState {
  onSubmit: (selectedImages: FeatureImage[]) => void;
  limit: number;
  currentLength: number;
  isActive: boolean;
  selectedImages: FeatureImage[];
  limitOneSelectedImage?: number;
}

interface IAddMediaContextValue {
  AddMediaState: AddMediaState;
  setAddMediaState: React.Dispatch<React.SetStateAction<AddMediaState>>;
}
export const AddMediaContext = createContext<IAddMediaContextValue>({
  AddMediaState: {
    limit: 0,
    onSubmit: () => {},
    currentLength: 0,
    isActive: false,
    selectedImages: [],
    limitOneSelectedImage: -1,
  },
  setAddMediaState: () => {},
});

const AddMediaContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [AddMediaState, setAddMediaState] = useState<AddMediaState>({
    onSubmit: ([]) => {},
    limit: 0,
    currentLength: 0,
    isActive: false,
    selectedImages: [],
    limitOneSelectedImage: -1,
  });

  return (
    <AddMediaContext.Provider
      value={{
        AddMediaState,
        setAddMediaState,
      }}
    >
      {children}
    </AddMediaContext.Provider>
  );
};

export default AddMediaContextProvider;
