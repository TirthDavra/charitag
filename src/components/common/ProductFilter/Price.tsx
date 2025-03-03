"use client";
import CheckBox from "@/components/merchant/Custom/CheckBox";
import { ArrowRight, ChevronDown } from "lucide-react";
import React, { KeyboardEvent, useCallback, useState } from "react";
import CustomInputField from "../customFormComponents/CustomInputField";
import { AnimatePresence } from "framer-motion";
import { AnimatedDiv } from "../AnimatedDiv";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

interface PriceProps {
  price: {
    price: string;
    min: string;
    max: string;
  };
}

const Price = ({}: PriceProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const params = new URLSearchParams(searchParams.toString());

  const priceInUrl = searchParams.get("price") || "";
  const [isExpand, setIsExpand] = useState<boolean>(priceInUrl ? true : false);
  const [selectedPriceRange, setSelectedPriceRange] =
    useState<string>(priceInUrl);
  const [minMax, setMinMax] = useState(
    !priceInUrl
      ? {
          min: searchParams.get("min_price") || "",
          max: searchParams.get("max_price") || "",
        }
      : {
          min: "",
          max: "",
        },
  );
  const [errorField, setErrorField] = useState<"min" | "max" | null>(null);

  const priceFiltes = [
    { id: "1", title: "Under $100.00", min: "0", max: "100" },
    { id: "2", title: "$100.00 To $1000.00", min: "100", max: "1000" },
    { id: "3", title: "Over $1000.00", min: "1000", max: "" },
  ];

  const handleExpand = () => {
    setIsExpand(!isExpand);
  };

  const handlePriceSelection = (value: string, min: string, max: string) => {
    if (selectedPriceRange === value) {
      // Uncheck the checkbox if it's already selected
      setSelectedPriceRange("");
      setMinMax({ min: "", max: "" });
      params.delete("price");
      params.delete("min_price");
      params.delete("max_price");
    } else {
      // Check the checkbox and set min/max values
      setSelectedPriceRange(value);
      params.set("price", value);
      params.set("min_price", min);
      params.set("max_price", max);
    }
    params.set("page", "1");
    router.push(pathname + "?" + params.toString());
  };

  const handleMinMaxChange =
    (key: "min" | "max") => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (/^\d*\.?\d{0,2}$/.test(value)) {
        setMinMax((prev) => ({ ...prev, [key]: value }));
        setSelectedPriceRange(""); // Clear selected price range when custom input is used
        setErrorField(null); // Clear error field when typing valid data
      }
    };

  const validateAndSearch = () => {
    if (!minMax.min || !minMax.max || Number(minMax.min) > Number(minMax.max)) {
      const field = !minMax.min ? "min" : "max";
      setErrorField(field);
      toast.error("Please enter valid price ranges.");
      return;
    }
    applyMinMaxFilter();
  };

  const applyMinMaxFilter = () => {
    params.delete("price");
    params.set("min_price", minMax.min);
    params.set("max_price", minMax.max);
    params.set("page", "1");
    router.push(pathname + "?" + params.toString());
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.key === "Enter") {
      validateAndSearch();
    }
  };

  return (
    <div className="space-y-2">
      <div
        className="flex flex-grow cursor-pointer justify-between font-semibold text-merchant_text_color_blue"
        onClick={handleExpand}
      >
        Price
        {priceFiltes.length > 0 && (
          <ChevronDown className={`h-5 w-5 ${isExpand ? "rotate-180" : ""}`} />
        )}
      </div>
      <AnimatePresence>
        {isExpand &&
          priceFiltes.map((item) => (
            <AnimatedDiv key={item.id}>
              <CheckBox
                label={item.title}
                onChange={() =>
                  handlePriceSelection(item.id, item.min, item.max)
                }
                value={selectedPriceRange === item.id}
                className="font-normal"
                classNameCheckbox="!h-5 !w-5"
                classNameLable="!font-normal"
              />
            </AnimatedDiv>
          ))}
      </AnimatePresence>
      <div className="mt-2 flex max-w-[200px] items-center justify-between gap-3">
        <CustomInputField
          type="text"
          inputPlaceholder="$ Min"
          value={minMax.min}
          onChange={handleMinMaxChange("min")}
          onKeyDown={handleKeyDown}
          classNameWrapper="border-"
          className={`!py-2 text-xs font-bold text-slate-700 ${
            errorField === "min"
              ? "border-red-500"
              : "border-merchant_text_color_blue"
          }`}
          classNameContainer="rounded-sm"
        />
        To
        <CustomInputField
          type="text"
          inputPlaceholder="$ Max"
          value={minMax.max}
          onChange={handleMinMaxChange("max")}
          onKeyDown={handleKeyDown}
          classNameWrapper=""
          className={`!py-2 text-xs font-bold text-slate-700 ${
            errorField === "max"
              ? "border-red-500"
              : "border-merchant_text_color_blue"
          }`}
          classNameContainer="rounded-sm"
        />
        <ArrowRight
          className="h-10 w-10 cursor-pointer text-merchant_text_color_blue"
          onClick={validateAndSearch}
        />
      </div>
    </div>
  );
};

export default Price;
