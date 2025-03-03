"use client";
import React, { useEffect, useState } from "react";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import {
  getCateogories,
  addProductToWishlistCategory,
} from "@/api/common/deals";
import { toast } from "react-toastify";
import { useModal } from "@/components/context/ModalContext";
import CreateNewWishListModal from "./CreateNewWishListModal";
import Spinner from "@/components/common/Spinner"; // Assuming you have a Spinner component
import { IDatum } from "@/api/common/types";
import { useAppDispatch } from "@/lib/Store/hooks";
import { addSubItem } from "@/lib/Store/slices/consumerFeatures/wishlist/wishlistSlice";

const AddToWishListModal = ({
  productId,
  setIsWishList,
}: {
  productId: number | null;
  setIsWishList: React.Dispatch<
    React.SetStateAction<number | null | undefined>
  >;
}) => {
  const [wishlistCategory, setWishlistCategory] = useState<IDatum[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start with loading true
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { openModal, closeModal, sharedState } = useModal();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCateogories();
        setWishlistCategory(categories);
      } catch (error) {
        toast.error("Failed to fetch categories");
        console.error("Error fetching categories:", error);
      }
      setIsLoading(false);
    };
    fetchCategories();
  }, []);

  const handleAddProductToWishlistCategory = async (catId: string) => {
    if (isSubmitting) return; // Prevent multiple submissions

    setIsSubmitting(true); // Set submitting to true
    const response = await addProductToWishlistCategory(catId, productId);
    if (!response.error) {
      setIsWishList(response.data.data.id);
      toast.success(response.data.message);
      dispatch(addSubItem(Number(catId)));
      closeModal();
    } else {
      const message = response.data.message;
      if (typeof message === "object" && message !== null) {
        const errorMessage = Object.values<string>(message);
        toast.error(errorMessage[0].toString());
      } else {
        toast.error(message);
      }
      closeModal();
    }
    setIsSubmitting(false);
  };

  return (
    <div className="">
      <div className="mt-2 p-3">
        <div className="flex justify-center text-[22px] font-bold ">
          <span>Your wishlist</span>
        </div>
        <div className="mb-[30px] border-b-2 border-[rgba(57,105,224,0.25)] pt-[14px]" />
        <ButtonPrimary
          label="Create new wishlist"
          className="m-auto !w-[290px] justify-center rounded-full border border-gray-300 bg-gradient-to-r from-transparent to-transparent !shadow-none"
          classNameLabel="py-1 text-black"
          onClick={() =>
            openModal({
              content: <CreateNewWishListModal onClose={closeModal} />,
            })
          }
        />
      </div>
      <div className="mb-5 max-h-[500px] scrollbar">
        {isLoading ? (
          <Spinner /> // Show spinner while loading
        ) : wishlistCategory && wishlistCategory.length > 0 ? (
          wishlistCategory.map((category) => (
            <div className="py-3" key={category.name}>
              <ButtonPrimary
                label={`${category.name} (${category.wishlist_count})`}
                className="m-auto !w-[290px] justify-center rounded-full border border-black bg-gradient-to-r from-transparent to-transparent !shadow-none"
                classNameLabel="py-1 text-black"
                onClick={() =>
                  handleAddProductToWishlistCategory(category.id.toString())
                }
                disabled={isSubmitting}
              />
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600">
            No categories available. Please try again later.
          </div> // Display message when no categories are available
        )}
      </div>
    </div>
  );
};

export default AddToWishListModal;
