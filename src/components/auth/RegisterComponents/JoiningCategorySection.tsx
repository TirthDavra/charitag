"use client";
import React, { useRef, useState } from "react";
import CustomSelect from "./CustomSelect";
import { produce } from "immer";

interface Category {
  label: string;
  value: string;
  url: string;
}

// Define a union type for categories
type Categories = Category[] | string[];
export interface IOptionType {
  label: string;
  value: string | number;
}
interface IJoinginCategorySectionProps {
  categories: IOptionType[];
  handleChange?: (values: IOptionType[]) => void;
  initialOptions: IOptionType[];
  multiple?: boolean;
  min?: number;
  max?: number;
  className?: string;
  isDisabled?: any;
}

const JoinginCategorySection = ({
  categories,
  handleChange,
  initialOptions = [],
  multiple = true,
  min = 0,
  max = categories?.length,
  className,
  isDisabled,
}: IJoinginCategorySectionProps) => {
  const [selectedValues, setSelectedValues] = useState<IOptionType[]>(
    initialOptions || [],
  );
  const currentLength = useRef(initialOptions.length);
  const _handleChange = (val: IOptionType) => {
    const updatedValues = produce(selectedValues, (draft) => {
      const valIndex = draft.findIndex((item) => item.value === val.value);
      if (max === 1) {
        currentLength.current = 1;
        return [val]; // Directly return new state when max is 1
      }
      if (valIndex !== -1) {
        if (currentLength.current - 1 >= min) {
          currentLength.current =
            currentLength.current - 1 > 0 ? currentLength.current - 1 : 0;
          draft.splice(valIndex, 1); // Remove item if it exists and not violating min constraint
        }
      } else {
        if (draft.length + 1 <= max) {
          currentLength.current += 1;
          draft.push(val); // Add item if it doesn't exist and not violating max constraint
        }
      }
    });

    setSelectedValues(updatedValues);
    handleChange && handleChange(updatedValues);
  };
  return (
    <div className={`mt-6 flex flex-wrap gap-5 ${className}`}>
      {categories &&
        categories.map((category, index) => {
          return (
            <CustomSelect
              key={index}
              value={category}
              isActive={
                selectedValues.findIndex(
                  (item) => item?.value === category.value,
                ) !== -1
              }
              onSelect={() => _handleChange(category)}
              disabled={isDisabled}
            />
          );
        })}
    </div>
  );
};

export default JoinginCategorySection;
