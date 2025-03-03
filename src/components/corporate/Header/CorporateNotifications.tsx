"use client";
import { useModal } from "@/components/context/ModalContext";
import { Bell } from "lucide-react";
import React from "react";
import CorporateNotificationModal from "../Notifications/CorporateNotificationModal";

const CorporateNotifications = () => {
  const { openModal, closeModal } = useModal();

  const handleClick = () => {
    openModal({
      generalModal: true,
      onClickGeneral: closeModal,
      classNameGeneral:
        "w-[100vw] h-[100vh] left-[30%] thin_scrollbar absolute right-[90px] -top-[13px] z-[51] flex items-end justify-center bg-opacity-75 sm:items-center",
      content: <CorporateNotificationModal />,
    });
  };
  return (
    <div>
      <div className="flex  cursor-pointer items-center justify-center rounded-full">
        <Bell
          className="mx-2 h-[22px] w-[22px] text-merchant_primary"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default CorporateNotifications;
