"use client";
import React, { useState } from "react";
import CustomInputField from "@/components/common/CustomInputField";
import ButtonPrimary from "@/components/common/ButtonPrimary";

const SuggestCategoryModal = ({ onClose }: { onClose: () => void }) => {
  const [title, setTitle] = useState("");
  const [errorMessageCategoryInput, setErrorMessageCategoryInput] =
    useState<string>("");

  const handleCreate = async () => {
    if (title.length === 0 || title.length > 50) {
      setErrorMessageCategoryInput("Please add a title within a valid range!");
      return;
    }
    console.log("Title:", title);
    onClose();
  };

  return (
    <div>
      <div className="flex justify-center pt-4">
        <span className="text-2xl font-bold">Suggest a category </span>
      </div>
      <div className="border-b-2 border-[rgba(57,105,224,0.25)] pt-[18px]" />
      <div className="flex flex-col items-center p-7">
        <CustomInputField
          label="Title"
          className="!pb-3"
          instruction="50 characters maximum"
          classNameInstruction="!mt-3"
          onChange={(value) => setTitle(value)}
          value={title}
          backendError={errorMessageCategoryInput}
          type={""}
        />

        <ButtonPrimary
          label={"Create"}
          className={`flex !w-[290px] justify-center rounded-full px-10 py-3 max-md:mt-12`}
          onClick={handleCreate}
          disabled={title.length < 1}
        />
      </div>
    </div>
  );
};

export default SuggestCategoryModal;
