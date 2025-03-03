"use client";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import ActionContent from "@/components/common/Modals/actionModal/ActionContent";
import { useModal } from "@/components/context/ModalContext";
import React from "react";
import SupportrRequestModal from "./SupportrRequestModal";
import { useRouter } from "next/navigation";

const SupportButton = ({
  order_id,
  product_id,
  request_id,
}: {
  order_id: string;
  request_id: string;
  product_id: number;
}) => {
  const { openModal, closeModal } = useModal();

  const router = useRouter();

  return (
    <div className="">
      <ButtonPrimary
        classNameLabel="text-blue-500 text-base font-medium"
        className="flex h-10 justify-center rounded-full border border-blue-500 bg-gradient-to-r from-transparent to-transparent !shadow-none md:!w-[190px]"
        label="Support"
        onClick={() => {
          if (request_id) {
            router.push(`/consumer/orders/${request_id}/support`);
            return;
          } else {
            openModal({
              content: (
                <SupportrRequestModal
                  onClose={closeModal}
                  order_id={order_id}
                  product_id={product_id}
                  request_id={request_id}
                />
              ),
            });
          }
        }}
      />
    </div>
  );
};

export default SupportButton;
