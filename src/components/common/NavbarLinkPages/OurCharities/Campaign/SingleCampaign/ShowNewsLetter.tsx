"use client";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import NewsLetterModal from "@/components/common/NewsLetterModal";
import { useModal } from "@/components/context/ModalContext";
import React from "react";

const ShowNewsLetter = ({
  reference_id,
  type,
}: {
  reference_id: number;
  type: number;
}) => {
  const { openModal, closeModal } = useModal();
  return (
    <ButtonPrimary
      onClick={() => {
        openModal({
          content: (
            <NewsLetterModal
              onClose={closeModal}
              reference_id={reference_id}
              type={type}
            />
          ),
        });
      }}
      label="Learn more about the organisation"
      className="rounded-full bg-gradient-to-r from-white to-white py-3 pr-2 !shadow-none	"
      classNameLabel="text-[#3969E0]"
    />
  );
};

export default ShowNewsLetter;
