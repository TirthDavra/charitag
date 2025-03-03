"use client";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
interface CheckBoxProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: boolean;
  name?: string;
  label: string;
  className?: string;
  classNameCheckbox?: string;
  classNameLable?: string;
}
const CheckBox = ({
  onChange,
  value,
  name,
  label,
  className,
  classNameCheckbox,
  classNameLable,
}: CheckBoxProps) => {
  return (
    <div>
      <label className={`text-black-700 relative block ${className}`}>
        <input
          type="checkbox"
          name={name}
          checked={value}
          onChange={onChange}
          className="hidden appearance-none"
        />
        <div className="flex cursor-pointer items-center gap-2">
          <div
            className={`flex h-[25px] w-[25px] items-center justify-center rounded-sm border border-merchant_border bg-white ${classNameCheckbox}`}
          >
            {value && (
              <FontAwesomeIcon icon={faCheck} className="text-blue-600" />
            )}
          </div>
          <span className={`text-[14px] text-merchant_text ${classNameLable}`}>
            {label}
          </span>
        </div>
      </label>
    </div>
  );
};

export default CheckBox;
