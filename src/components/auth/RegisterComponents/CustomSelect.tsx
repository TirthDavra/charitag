import React from "react";
import { IOptionType } from "./JoiningCategorySection";

interface ICustomSelectProps {
  value: IOptionType;
  isActive: boolean;
  onSelect: (value: IOptionType) => void;
  disabled?: boolean;
}

const CustomSelect: React.FC<ICustomSelectProps> = ({
  value,
  isActive,
  onSelect,
  disabled,
}) => {
  return (
    <div
      className={`
        py-3 items-center rounded-full border-[1px] border-blue-200 px-[10px] font-bold lg:px-4
        ${isActive ? "border-blue-500 bg-gray-50 text-blue-500" : ""}
        ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
      `}
      onClick={() => {
        if (!disabled) {
          onSelect(value);
        }
      }}
    >
      {value.label}
    </div>
  );
};

export default CustomSelect;
