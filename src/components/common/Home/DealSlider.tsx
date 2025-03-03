"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import ButtonPrimary from "../ButtonPrimary";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { IProductCategories } from "@/api/common/types";

const DealSlider = ({
  productCategories,
  label,
}: {
  productCategories: IProductCategories[];
  label?: string;
}) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

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
  }, [sliderRef]);

  return (
    <div className="relative my-5 mt-[41px]">
      <div
        className="slider-container no-scrollbar flex gap-[21px] overflow-x-scroll"
        ref={sliderRef}
        onScroll={handleScrollVisibility}
      >
        {productCategories &&
          productCategories.length > 0 &&
          productCategories.map((item) => (
            <div key={item.id}>
              <div className="flex min-h-0 w-[208px] flex-col justify-start rounded-xl border border-[#d6e0f9] py-[15px] pl-[14px]">
                <div>
                  <span className="text-[22px] font-bold text-[#2F2F35]">
                    {item.name}
                  </span>
                </div>
                <div>
                  {label === "deals" ? (
                    <span className="text-[#3969E0]">
                      {item.deals_count} <span>{label}</span>
                    </span>
                  ) : (
                    <span className="text-[#3969E0]">
                      {item.products_count} <span>{label}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
      {showLeftButton && (
        <ButtonPrimary
          className="absolute top-1/2 hidden !h-[32px] !w-[32px] -translate-x-1/2 -translate-y-1/2 transform rounded-full  !px-2 !py-0 md:block"
          onClick={() => handleScroll("left")}
          FWIcon={faChevronLeft}
          aria-label="Slide left"
        />
      )}
      {showRightButton && (
        <ButtonPrimary
          className="absolute top-1/2 hidden !h-[32px] !w-[32px] -translate-y-1/2 translate-x-1/2 transform rounded-full  !px-2 !py-0 md:right-2 md:block lg:-translate-y-1/2"
          onClick={() => handleScroll("right")}
          FWIcon={faChevronRight}
          aria-label="Slide right"
        />
      )}
    </div>
  );
};

export default DealSlider;
