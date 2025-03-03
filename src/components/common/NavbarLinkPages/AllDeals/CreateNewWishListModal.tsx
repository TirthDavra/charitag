"use client";
import React, { useState } from "react";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import CustomInputField from "@/components/common/CustomInputField";
import { addCategoryToWishlisht } from "@/api/common/deals";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useModal } from "@/components/context/ModalContext";
import AddToWishListModal from "./AddToWishListModal";
import { parseMsg } from "@/utils/basicfunctions";
import { useAppDispatch } from "@/lib/Store/hooks";
import { addNewSubItem } from "@/lib/Store/slices/consumerFeatures/wishlist/wishlistSlice";
interface CreateNewWishListModalProps {
  onClose: () => void;
}

const CreateNewWishListModal: React.FC<CreateNewWishListModalProps> = ({}) => {
  const [newCategoryInput, setNewCategoryInput] = useState<string>("");
  const [errorMessageCategoryInput, setErrorMessageCategoryInput] =
    useState<string>("");
  const { closeModal } = useModal();
  const dispatch = useAppDispatch();
  const handleCreate = async () => {
    if (newCategoryInput.length < 0 || newCategoryInput.length > 50) {
      setErrorMessageCategoryInput(
        "Please add a category name within a valid range!",
      );
      return;
    }

    const response = await addCategoryToWishlisht(newCategoryInput);
    if (!response.error) {
      toast.success(response.data.message);
      dispatch(
        addNewSubItem({
          id: response.data.data.id,
          name: newCategoryInput,
          wishlist_count: 0,
        }),
      );
      closeModal();
    } else {
      toast.error(parseMsg(response.data.message));
    }
  };

  const isButtonDisabled =
    newCategoryInput.length === 0 || newCategoryInput.length > 50;

  return (
    <div>
      <div className="flex justify-center pt-4">
        <span className="text-2xl font-bold">Create new wishlist </span>
      </div>
      <div className="border-b-2 border-[rgba(57,105,224,0.25)] pt-[18px]" />
      <div className="flex flex-col items-center p-7">
        <CustomInputField
          label="Name"
          className="!pb-3"
          instruction="50 characters maximum"
          classNameInstruction="!mt-3"
          onChange={(value) => setNewCategoryInput(value)}
          value={newCategoryInput}
          backendError={errorMessageCategoryInput}
          type={""}
        />
        <ButtonPrimary
          label={"Create"}
          className={`flex !w-[290px] justify-center rounded-full px-10 py-3 max-md:mt-12`}
          onClick={handleCreate}
          disabled={isButtonDisabled}
        />
      </div>
    </div>
  );
};

export default CreateNewWishListModal;
