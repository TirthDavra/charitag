"use client";
import React, { useRef, useState, useEffect } from "react";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import ProductCard from "@/components/common/ProductCard";
import AddToWishListModal from "./AddToWishListModal";
import CreateNewWishListModal from "./CreateNewWishListModal";
// import { API_BASE_URL } from "../../../../../../apiConfig";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { _IProductNew, IDataData, IProductNew } from "@/api/common/types";
import { USER_ROLES } from "@/lib/userRoles";
import { useSession } from "next-auth/react";
import ProductCardNew from "../../ProductCardNew";
// import { IProduct } from "@/api/common/types";

export interface SliderProps {
  className: string;
  showAddToCart: boolean;
  showHeart: boolean;
  handleAddToCart?: any;
  allDeals?: IDataData[] | IProductNew[];
  deal?: boolean;
  onImageClick?: () => void;
  classSliderImage?: string;
  classSliderImageWrapper?: string;
}

export interface SliderNewProps {
  className: string;
  showAddToCart: boolean;
  showHeart: boolean;
  handleAddToCart?: any;
  allDeals?: _IProductNew[];
  deal?: boolean;
  onImageClick?: () => void;
  classSliderImage?: string;
  classSliderImageWrapper?: string;
}
const Slider: React.FC<SliderProps> = ({
  className,
  showAddToCart,
  showHeart,
  handleAddToCart,
  allDeals,
  deal,
  onImageClick,
  classSliderImage,
  classSliderImageWrapper,
}) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const [showAddToWishList, setShowAddToWishList] = useState(false);
  const [showCreateNewWishList, setShowCreateNewWishList] = useState(false);
  const { data: session } = useSession();
  const productIdRef = useRef<number | null>(null);

  const handleScroll = (direction: "left" | "right") => {
    const scrollAmount = 300;
    const currentScroll = sliderRef.current?.scrollLeft || 0;

    if (direction === "left" && sliderRef.current) {
      sliderRef.current.scrollLeft = currentScroll - scrollAmount;
    } else if (direction === "right" && sliderRef.current) {
      sliderRef.current.scrollLeft = currentScroll + scrollAmount;
    }
  };

  const handleScrollVisibility = () => {
    const container = sliderRef.current;

    if (container) {
      setShowLeftButton(container.scrollLeft > 0);
      setShowRightButton(
        container.scrollLeft < container.scrollWidth - container.clientWidth,
      );
    }
  };

  const handleAddToWishlist = (productId: number) => {
    productIdRef.current = productId;
    setShowAddToWishList(!showAddToWishList);
  };

  const handleshowCreateNewWishList = () => {
    setShowAddToWishList(false);
    setShowCreateNewWishList(!showCreateNewWishList);
  };

  useEffect(() => {
    handleScrollVisibility();
  }, [sliderRef, allDeals]);

  return (
    <>
      {showCreateNewWishList && (
        <CreateNewWishListModal
          onClose={() => setShowCreateNewWishList(false)}
        />
      )}
      <div className={`relative w-full md:w-[60%]  ${className}`}>
        <div
          className="slider-container no-scrollbar flex min-h-0 gap-5 overflow-scroll"
          ref={sliderRef}
          onScroll={handleScrollVisibility}
        >
          {allDeals &&
            allDeals.map((item) => (
              <div key={item.id} className="max-w-[323px]">
                <ProductCard
                  key={item.id}
                  product={item}
                  // handleAddToCart={handleAddToCart}
                  showAddToCart={showAddToCart}
                  deal={deal}
                  className="lg:min-w-[323px]"
                  classNameImage={`lg:min-h-[285px] ${classSliderImage}`}
                  showHeart={
                    session?.user.role
                      ? session?.user.role === USER_ROLES.CONSUMER
                      : true
                  }
                  classNameImageWrapper={classSliderImageWrapper}
                  onImageClick={onImageClick}
                  // handleProduct={handleproduct}
                />
              </div>
            ))}
        </div>
        {showLeftButton && (
          <ButtonPrimary
            className="absolute top-1/2 mt-[-50px] hidden h-[50px] w-[50px] -translate-y-1/2 transform rounded-full bg-gray-300 px-2 py-1 md:block"
            onClick={() => handleScroll("left")}
            FWIcon={faChevronLeft}
            label={undefined}
          />
        )}
        {showRightButton && (
          <ButtonPrimary
            className="absolute right-2 top-1/2 mt-[-50px] hidden h-[50px] w-[50px] -translate-y-1/2 transform rounded-full bg-gray-300 px-2 py-1 md:block lg:right-2 lg:-translate-y-1/2"
            onClick={() => handleScroll("right")}
            FWIcon={faChevronRight}
            label={undefined}
          />
        )}
      </div>
    </>
  );
};

export default Slider;

export const SliderNew: React.FC<SliderNewProps> = ({
  className,
  showAddToCart,
  showHeart,
  handleAddToCart,
  allDeals,
  deal,
  onImageClick,
  classSliderImage,
  classSliderImageWrapper,
}) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const [showAddToWishList, setShowAddToWishList] = useState(false);
  const [showCreateNewWishList, setShowCreateNewWishList] = useState(false);
  const { data: session } = useSession();
  const productIdRef = useRef<number | null>(null);

  const handleScroll = (direction: "left" | "right") => {
    const scrollAmount = 300;
    const currentScroll = sliderRef.current?.scrollLeft || 0;

    if (direction === "left" && sliderRef.current) {
      sliderRef.current.scrollLeft = currentScroll - scrollAmount;
    } else if (direction === "right" && sliderRef.current) {
      sliderRef.current.scrollLeft = currentScroll + scrollAmount;
    }
  };

  const handleScrollVisibility = () => {
    const container = sliderRef.current;

    if (container) {
      setShowLeftButton(container.scrollLeft > 0);
      setShowRightButton(
        container.scrollLeft < container.scrollWidth - container.clientWidth,
      );
    }
  };

  useEffect(() => {
    handleScrollVisibility();
  }, [sliderRef, allDeals]);

  return (
    <>
      <div className={`relative w-full md:w-[60%]  ${className}`}>
        <div
          className="slider-container no-scrollbar flex min-h-0 gap-5 overflow-scroll"
          ref={sliderRef}
          onScroll={handleScrollVisibility}
        >
          {allDeals &&
            allDeals.map((item) => (
              <div key={item.id} className="max-w-[323px]">
                <ProductCardNew
                  key={item.id}
                  product={item}
                  // handleAddToCart={handleAddToCart}
                  showAddToCart={showAddToCart}
                  deal={item.status === 4}
                  className="lg:min-w-[323px]"
                  classNameImage={`lg:min-h-[285px] ${classSliderImage}`}
                  showHeart={
                    session?.user.role
                      ? session?.user.role === USER_ROLES.CONSUMER
                      : true
                  }
                  classNameImageWrapper={classSliderImageWrapper}
                  onImageClick={onImageClick}
                  // handleProduct={handleproduct}
                />
              </div>
            ))}
        </div>
        {showLeftButton && (
          <ButtonPrimary
            className="absolute top-1/2 mt-[-50px] hidden h-[50px] w-[50px] -translate-y-1/2 transform rounded-full bg-gray-300 px-2 py-1 md:block"
            onClick={() => handleScroll("left")}
            FWIcon={faChevronLeft}
            label={undefined}
          />
        )}
        {showRightButton && (
          <ButtonPrimary
            className="absolute right-2 top-1/2 mt-[-50px] hidden h-[50px] w-[50px] -translate-y-1/2 transform rounded-full bg-gray-300 px-2 py-1 md:block lg:right-2 lg:-translate-y-1/2"
            onClick={() => handleScroll("right")}
            FWIcon={faChevronRight}
            label={undefined}
          />
        )}
      </div>
    </>
  );
};
