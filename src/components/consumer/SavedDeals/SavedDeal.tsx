"use client";
import ProductCard from "@/components/common/ProductCardNew";
import React, { useEffect, useState } from "react";
import { _IProductNew, IProductNew } from "@/api/common/types";
import { deleteFromWishlist } from "@/api/consumer/order";
import ActionContent from "@/components/common/Modals/actionModal/ActionContent";
import { useModal } from "@/components/context/ModalContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { produce } from "immer";
import { deleteAllWishlist } from "@/api/consumer/saved-deals";
import {
  deleteSubItem,
  deleteWishlist,
} from "@/lib/Store/slices/consumerFeatures/wishlist/wishlistSlice";
import { useAppDispatch, useAppSelectorConsumer } from "@/lib/Store/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";

interface SavedDealProps {
  savedDeals: _IProductNew[];
  searchParams: { category: string; "wish-category": string };
}

const SavedDeal: React.FC<SavedDealProps> = ({ savedDeals, searchParams }) => {
  const [dealsData, setDealsData] = useState(savedDeals);
  const { openModal, closeModal } = useModal();
  const router = useRouter();

  useEffect(() => {
    setDealsData(savedDeals);
  }, [savedDeals]);

  const dispatch = useAppDispatch();

  const allSubItem = useAppSelectorConsumer((state) => state.wishlist);

  const subItem = allSubItem.subItem;

  const currentSubItem = subItem.find(
    (item) => item.id === Number(searchParams["wish-category"]),
  );

  return (
    <div>
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold text-merchant_sidebar_text md:text-[34px]">
            My Wishlist {searchParams.category}{" "}
            <span className="text-md font-normal">
              ({currentSubItem?.wishlist_count || 0})
            </span>
          </h1>
          {subItem.length > 0 && (
            <button
              className="text-sidebar_icon_color underline"
              onClick={async () => {
                openModal({
                  content: (
                    <ActionContent
                      type="info"
                      message="Are you sure you want to delete all deals? Once it's gone, all associated data will be lost forever."
                      confirmLabel="Confirm"
                      cancelLabel="Cancel"
                      onCancel={closeModal}
                      onOk={async () => {
                        const response = await deleteAllWishlist(
                          searchParams["wish-category"],
                        );
                        if (!response.error) {
                          setDealsData([]);
                          toast.success(response.data.message);
                          dispatch(
                            deleteWishlist(
                              Number(searchParams["wish-category"]),
                            ),
                          );
                          if (
                            searchParams["wish-category"] ===
                            subItem[0]?.id.toString()
                          ) {
                            router.replace(
                              `/consumer/saved-deals?wish-category=${subItem[1]?.id || ""}&category=${subItem[1]?.name || ""}`,
                            );
                          } else {
                            router.replace(
                              `/consumer/saved-deals?wish-category=${subItem[0]?.id || ""}&category=${subItem[0]?.name || ""}`,
                            );
                          }
                        } else {
                          const errorMessage = Object.values<string>(
                            response.data.message,
                          );
                          toast.error(errorMessage[0].toString());
                        }
                        closeModal();
                      }}
                    />
                  ),
                });
              }}
            >
              Delete list
            </button>
          )}
        </div>
        <p className="mb-[30px] mt-[10px]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </p>
      </div>
      {dealsData.length === 0 ? (
        <div className="flex h-80 flex-col items-center justify-center">
          <h1 className="mb-2 text-4xl font-bold text-gray-400">
            <FontAwesomeIcon icon={faCartArrowDown} className="text-8xl" />
          </h1>
          <p className="text-2xl text-gray-400">No wishlist found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {dealsData.map((deals, index) => (
            <div key={deals?.id + "id"} className="">
              <ProductCard
                showAddToCart={false}
                product={deals}
                classNameDetails={"flex-col !items-start pt-[14px]"}
                classNameImage="h-[250px] object-content"
                showHeart={false}
                deal={deals.status === 4}
                handleDelete={async (val) => {
                  openModal({
                    content: (
                      <ActionContent
                        type="info"
                        message="Are you sure you want to delete this deal? Once it's gone, all associated data will be lost forever."
                        confirmLabel="Confirm"
                        cancelLabel="Cancel"
                        onCancel={closeModal}
                        onOk={async () => {
                          const response = await deleteFromWishlist(
                            deals.is_wishlist?.toString() || "",
                          );
                          if (!response.error) {
                            setDealsData(
                              produce((draft) => {
                                draft.splice(index, 1);
                              }),
                            );
                            toast.success(response.data.message);
                            dispatch(
                              deleteSubItem(
                                Number(searchParams["wish-category"]),
                              ),
                            );
                            router.refresh();
                          } else {
                            const errorMessage = Object.values<string>(
                              response.data.message,
                            );
                            toast.error(errorMessage[0].toString());
                          }
                          closeModal();
                        }}
                      />
                    ),
                  });
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedDeal;
