import IAnimateInfo from "@/components/common/Modals/actionModal/icon-AnimateInfo";
import { useModal } from "@/components/context/ModalContext";
import React, { useEffect, useState } from "react";

export type ActionType = "info" | "error" | "question";

interface ActionContentProps {
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onOk: () => Promise<void>;
  onCancel: () => void;
  type: ActionType;
  okDisabled?: boolean;
}

const ActionContent: React.FC<ActionContentProps> = ({
  onCancel,
  message,
  type,
  confirmLabel,
  cancelLabel,
  onOk,
  okDisabled,
}) => {
  const { sharedState } = useModal();

  return (
    <div className="rounded-lg p-4 text-center shadow-lg md:px-[109px] md:py-[63px]">
      <div>
        <IAnimateInfo type={type} />
      </div>
      <div className="py-[35px]">
        <p className=" text-gray-700">{message}</p>
      </div>
      <div className="flex justify-center">
        <button
          className={`mr-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600  focus:bg-blue-600 focus:outline-none ${
            sharedState?.disabled ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={onOk}
          disabled={sharedState?.disabled}
        >
          {confirmLabel}
        </button>
        <button
          className="rounded-md bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400 focus:bg-gray-400 focus:outline-none"
          onClick={onCancel}
        >
          {cancelLabel}
        </button>
      </div>
    </div>
  );
};

export default ActionContent;
