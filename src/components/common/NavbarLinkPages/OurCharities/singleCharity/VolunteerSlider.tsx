"use client";
import React, { useEffect, useRef, useState } from "react";
import VolunteerCard from "./VolunteerCard";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import charity from "@images/charity.jpg";
import charitiesCloudImage from "@images/charity_logo.png";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const dummyData = [
  {
    id: 1,
    charityImg: charity,
    charityLogoImg: charitiesCloudImage,
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit",
    category: "Category",
    city: "Toronto",
    volunteers: "77",
  },
  {
    id: 2,
    charityImg: charity,
    charityLogoImg: charitiesCloudImage,
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit Lorem ipsum dolor, sit",
    category: "Category",
    city: "Toronto",
    volunteers: "122",
  },
  {
    id: 3,
    charityImg: charity,
    charityLogoImg: charitiesCloudImage,
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit",
    category: "Category",
    city: "Toronto",
    volunteers: "77",
  },
  {
    id: 4,
    charityImg: charity,
    charityLogoImg: charitiesCloudImage,
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit",
    category: "Category",
    city: "Toronto",
    volunteers: "77",
  },
];

const VolunteerSlider = () => {
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
    <div className="relative">
      <div
        className="slider-container flex gap-5 overflow-hidden"
        ref={sliderRef}
        onScroll={handleScrollVisibility}
      >
        {dummyData.map((item) => (
          <VolunteerCard key={item.id} charity={item} />
        ))}
      </div>
      {showLeftButton && (
        <ButtonPrimary
          className="absolute top-1/2 hidden h-[50px] w-[50px] -translate-y-1/2 transform rounded-full bg-gray-300 px-2 py-1 md:block"
          onClick={() => handleScroll("left")}
          FWIcon={faChevronLeft}
          label={""}
        />
      )}
      {showRightButton && (
        <ButtonPrimary
          className="absolute right-2 top-1/2 hidden h-[50px] w-[50px] -translate-y-1/2 transform rounded-full bg-gray-300 px-2 py-1 md:block lg:right-2 lg:-translate-y-1/2"
          onClick={() => handleScroll("right")}
          FWIcon={faChevronRight}
          label={undefined}
        />
      )}
    </div>
  );
};

export default VolunteerSlider;
