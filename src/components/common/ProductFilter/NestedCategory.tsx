"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { ICategoryWithSub } from "@/api/common/types";
import CheckBox from "@/components/merchant/Custom/CheckBox";
import { AnimatedDiv } from "../AnimatedDiv";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface NestedCategory {
  [categoryId: string]:
    | {
        [nestedCategoryId: string]: boolean;
      }
    | boolean;
}
interface NestedCategoryProps {
  item: ICategoryWithSub;
  className?: string;
  category: NestedCategory;
}
const NestedCategory = ({ item, className, category }: NestedCategoryProps) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const [currentCat, setCurrentCat] = useState(category[item.id] || {});
  const [isExpand, setIsExpand] = useState<boolean>(
    category[item.id] ? true : false,
  );
  const router = useRouter();
  const pathname = usePathname();
  const handleExpand = () => {
    setIsExpand(!isExpand);
  };

  useEffect(() => {
    setCurrentCat(category[item.id] || {});
    setIsExpand(category[item.id] ? true : false);
  }, [category, searchParams]);
  const handleCategoryChange = (id: number, name: string) => {
    // const categoryString = params.get("category");
    // const category = categoryString ? JSON.parse(categoryString) : {}; // Parse the category string or initialize as empty object if not found

    // Get the category object for the current item ID or initialize it as an empty object
    const currentItemCategory: { [key: number]: boolean } =
      typeof currentCat === "boolean"
        ? item.children.reduce((acc: { [key: number]: boolean }, cv) => {
            acc[cv.id] = true;
            return acc;
          }, {})
        : currentCat;
    // Update the category object with the updated item category
    const updatedCategory: NestedCategory = {
      ...category,
      [item.id]: {
        ...currentItemCategory,
        [id]: !currentItemCategory[id], // Toggle the value of the provided ID
      },
    };
    params.set("category", JSON.stringify(updatedCategory));
    let cNameValue = searchParams.get("c-name");
    const cNameArray = cNameValue ? cNameValue.split(",") : [];
    const isNamePresent = cNameArray.includes(item.name);
    const condition = Object.values(updatedCategory[item.id]).every(
      (value) => value === false,
    );
    if (isNamePresent && condition) {
      cNameValue = cNameArray.filter((name) => name !== item.name).join(",");
    }
    if (!isNamePresent) {
      cNameValue = cNameValue ? `${cNameValue},${item.name}` : item.name;
    }
    params.set("c-name", cNameValue || "");
    params.set("page", "1");
    router.push(pathname + "?" + params.toString());
  };

  const handleParentCategorytoggle = () => {
    const params = new URLSearchParams(searchParams.toString());
    const updatedItemCategory =
      typeof category[item.id] === "boolean"
        ? !category[item.id]
        : true || true;
    const updatedCategory = {
      ...category,
      [item.id]: updatedItemCategory,
    };
    params.set("category", JSON.stringify(updatedCategory));
    let cNameValue = searchParams.get("c-name") || "";
    const cNameArray = cNameValue.split(",");
    const isNamePresent = cNameArray.includes(item.name);
    if (isNamePresent) {
      // Remove item.name from the "c-name" parameter
      cNameValue = cNameArray.filter((name) => name !== item.name).join(",");
    } else {
      // Add item.name to the "c-name" parameter
      cNameValue = cNameValue ? `${cNameValue},${item.name}` : item.name;
    }
    params.set("c-name", cNameValue);
    params.set("page", "1");
    router.push(pathname + "?" + params.toString());
  };
  return (
    <div className={`${className} font-medium`}>
      <div className="flex">
        <CheckBox
          label=""
          onChange={handleParentCategorytoggle}
          value={
            typeof category[item.id] === "boolean"
              ? (category[item.id] as boolean)

              : false 
          }
          className="!text-[16px] !font-semibold text-merchant_text_color_blue"
          classNameCheckbox="!h-5 !w-5"
          classNameLable=" !text-[16px] !font-semibold !text-merchant_text_color_blue"
        />
        <motion.div
          className="flex flex-grow cursor-pointer items-center justify-between"
          onClick={item.children.length > 0 ? handleExpand : undefined}
          whileHover={{ scale: 1.06 }} // Example hover effect
        >
          <span className="font-semibold">{item.name}</span>
          {item.children.length > 0 && (
            <ChevronDown
              className={`h-5 w-5 ${isExpand ? "rotate-180" : ""}`}
            />
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {isExpand && (
          <AnimatedDiv>
            {item.children?.map((subItem, idx) => {
              const subItemFromUrl = category[item.id] || {};
              return (
                <div
                  className="flex cursor-pointer"
                  key={subItem.id}
                  onClick={() => {
                    handleCategoryChange(subItem.id, subItem.name);
                  }}
                >
                  <CheckBox
                    label=""
                    onChange={() => {}}
                    value={
                      typeof subItemFromUrl === "boolean"
                        ? subItemFromUrl
                        : subItemFromUrl[subItem.id] || false
                    }
                    className="!text-[16px] !font-semibold text-merchant_text_color_blue"
                    classNameCheckbox="!h-5 !w-5"
                    classNameLable=" !text-[16px] !font-semibold !text-merchant_text_color_blue"
                  />
                  <span>{subItem.name}</span>
                </div>
              );
            })}
          </AnimatedDiv>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NestedCategory;
