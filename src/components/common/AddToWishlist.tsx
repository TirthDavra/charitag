"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IconHeart } from "../svgIcons";
import { deleteFromWishlist } from "@/api/consumer/order";
import { useModal } from "../context/ModalContext";
import AddToWishListModal from "./NavbarLinkPages/AllDeals/AddToWishListModal";
import { _IProductNew, IDataData, IProductNew } from "@/api/common/types";
import { ISingleProduct } from "@/api/common/productTypes";

const AddToWishlist = ({
  product,
  className,
  isDeal,
  notInWishlistLabel = "",
  inWishlistLabel = "",
  classNameLabel = "",
  classNameIcon = "",
}: {
  className?: string;
  product: { id: number | null; is_wishlist: number | null };
  notInWishlistLabel?: string;
  inWishlistLabel?: string;
  classNameLabel?: string;
  classNameIcon?: string;
  isDeal: boolean;
}) => {
  const { data: session } = useSession();
  const User = session?.user.token || null;
  const [isWishlist, setIsWishList] = useState<number | null | undefined>(
    product.is_wishlist,
  );

  const { openModal } = useModal();
  const handleOpenModal = async () => {
    if (!User) {
      return toast.error("Please Login First");
    }
    if (typeof isWishlist === "number") {
      const response = await deleteFromWishlist(isWishlist.toString());
      if (!response.error) {
        setIsWishList(null);
      }
    } else {
      // Call openModal function with the modal configuration
      openModal({
        content: (
          <AddToWishListModal
            productId={product.id}
            setIsWishList={setIsWishList}
          />
        ),
        // sharedState: { productId: product.id, setIsWishList },
      });
    }
  };

  return (
    <div
      className={`cursor-pointer rounded-full p-2 hover:bg-slate-400/10 ${className}`}
      onClick={handleOpenModal}
    >
      {typeof isWishlist !== "number" ? (
        <IconHeart color="black" className={` ${classNameIcon}`} />
      ) : (
        <IconHeart
          stroke={`#F85C36`}
          fill={`#F85C36`}
          className={` cursor-pointer  ${classNameIcon} `}
        />
      )}
      <span className={classNameLabel}>
        {isWishlist && notInWishlistLabel}
        {!isWishlist && inWishlistLabel}
      </span>
    </div>
  );
};

export default AddToWishlist;
