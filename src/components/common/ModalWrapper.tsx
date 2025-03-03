"use client";
import React, { createContext, useState } from "react";

interface IManageModalUiInitial {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export const ManageModalUI = createContext<IManageModalUiInitial>({
  openModal: false,
  setOpenModal: () => {},
});
export const ManageModalUIProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <ManageModalUI.Provider
      value={{
        openModal,
        setOpenModal,
      }}
    >
      {children}
    </ManageModalUI.Provider>
  );
};
