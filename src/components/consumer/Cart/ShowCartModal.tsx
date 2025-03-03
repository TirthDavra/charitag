"use-client";
import React, { useEffect, useState } from "react";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import Slider from "@/components/common/NavbarLinkPages/AllDeals/Slider";
import ItemCard, { IItemCardProduct, Product } from "./ItemCard";
import Link from "next/link";
import { getSliderProduct } from "@/api/common/slider";
import { IDataData } from "@/api/common/types";
import { useModal } from "@/components/context/ModalContext";
import Spinner from "@/components/common/Spinner"; // Assuming you have a Spinner component

interface ShowCartModalProps {
  onClose: () => void;
  item: IItemCardProduct;
}

const ShowCartModal: React.FC<ShowCartModalProps> = ({ onClose, item }) => {
  const [sliderData, setSliderData] = useState<IDataData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start with loading true
  useEffect(() => {
    const fetchSliderData = async () => {
      const data = await getSliderProduct(
        item.isDeal ? { dId: item.id } : { pId: item.id },
      );
      if (!data.error) {
        setSliderData(data.data?.data?.cross_sells || []);
      }
      setIsLoading(false);
    };
    fetchSliderData();
  }, []);

  const { closeModal } = useModal();

  return (
    <div className="border-bottom-0 max-h-[90vh] overflow-y-auto pb-10 scrollbar">
      <div className="mt-10 pl-[20px] pr-[20px]">
        <span className="text-2xl font-semibold">
          The article has been added to your cart
        </span>
        <ItemCard product={item} quantity={1} onQuantityChange={() => {}} />
        <div className="flex flex-row items-center  gap-6 md:mt-8">
          <Link href={"/cart/checkout"}>
            <ButtonPrimary
              label="Go to checkout"
              className="h-[50px]  w-[250px] rounded-full"
              onClick={() => {
                onClose();
              }}
            />
          </Link>
          <Link href={"/shop"}>
            <ButtonPrimary
              label="Continue my shopping"
              className="h-[50px] w-[250px] rounded-full border-2 border-blue-500 bg-gradient-to-r from-transparent to-transparent !shadow-none"
              classNameLabel="text-[#3969e0] w-full"
              onClick={() => {
                onClose();
              }}
            />
          </Link>
        </div>
        {isLoading ? (
          <div className="mt-8">
            <span className="mb-8 font-bold">You may also like...</span>
            <Spinner />
          </div>
        ) : (
          sliderData?.length > 0 && (
            <div className="mt-8">
              <span className="font-bold">You may also like...</span>
              <div className="mt-8">
                <Slider
                  className="aspect-auto md:w-full"
                  showAddToCart={false}
                  showHeart={false}
                  handleAddToCart={undefined}
                  allDeals={sliderData}
                  deal={false}
                  onImageClick={() => {
                    closeModal();
                  }}
                  classSliderImage="lg:!min-h-0 max-h-[200px] max-w-[200px]"
                  classSliderImageWrapper="max-h-[200px] max-w-[200px] mx-auto"
                />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ShowCartModal;
