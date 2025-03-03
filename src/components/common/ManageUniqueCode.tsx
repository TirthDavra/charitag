"use client";
import { updateUniqueCode } from "@/api/common/common";
import { IUniqueCode } from "@/api/corporation/types";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ManageUniqueCode = ({ initialCode }: { initialCode: IUniqueCode }) => {
  const [uniqueCode, setUniqueCode] = useState(initialCode);

  const updateCode = async () => {
    const response = await updateUniqueCode();
    if (!response.error) {
      setUniqueCode(response.data.data);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(uniqueCode.unique_code);
      toast.success("Code Copied");
    } catch (error) {
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <ButtonPrimary
        label="Generate Code"
        onClick={updateCode}
        classNameLabel="font-medium"
        className="rounded-sm"
      />
      {uniqueCode?.unique_code && (
        <div className="flex items-center gap-3 rounded-md border border-borders_color  px-2 py-1">
          <div>{uniqueCode.unique_code}</div>
          <button
            onClick={copyToClipboard}
            className="rounded-sm bg-[linear-gradient(100deg,_#1657D9_-32.11%,_#FFF_220%)] px-2 py-1 text-white"
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageUniqueCode;
