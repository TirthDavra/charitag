"use client";
import { IconMenuWithDots } from "@/components/svgIcons";
import { AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { AnimatedDiv, HoverAnimationDiv } from "../AnimatedDiv";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface SortingFilterProps {
  sorting: string;
}
const SortingFilter: React.FC<SortingFilterProps> = ({ sorting }) => {
  const searchParams = useSearchParams();
  const [isExpand, setIsExpand] = useState<boolean>(
    Number(sorting || 0) > 0 ? true : false,
  );
  const priceFiltes: { title: string; value: string }[] = [
    // {
    //   title: "Relevance",
    //   value: "0",
    // },
    {
      title: "Price: Low To High",
      value: "asc",
    },
    {
      title: "Price: High To Low",
      value: "desc",
    },
  ];
  const handleExpand = () => {
    setIsExpand(!isExpand);
  };
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      params.set("page", "1");
      return params.toString();
    },
    [searchParams],
  );
  return (
    <div className="">
      <div
        className=" flex cursor-pointer items-center gap-2 text-merchant_text_color_blue"
        onClick={handleExpand}
      >
        <IconMenuWithDots className="w-5 text-merchant_text_color_blue" />
        <HoverAnimationDiv className="flex flex-grow items-center justify-between ">
          <span className="font-semibold">Sorting</span>
          <ChevronDown className="h-5 w-5" />
        </HoverAnimationDiv>
      </div>
      <AnimatePresence>
        {isExpand && (
          <AnimatedDiv>
            {priceFiltes.map((item) => {
              // const sorting = searchParams.get("sorting");
              return (
                <div key={item.value}>
                  <Link
                    href={`?${createQueryString("sorting", item.value)}`}
                    className={`hover:text-merchant_text_color_blue hover:underline ${sorting === item.value ? "text-merchant_text_color_blue" : ""}`}
                  >
                    {item.title}
                  </Link>
                </div>
              );
            })}
          </AnimatedDiv>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SortingFilter;
