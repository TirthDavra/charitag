"use client";
import React, { useState, useRef, ChangeEvent, ReactNode } from "react";

interface CustomInputFieldProps {
  label: string;
  type: string;
  value?: string | number;
  required?: boolean;
  isDisabled?: boolean;
  onChange: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  backendError?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  instruction?: string;
  classNameInput?: string;
  classNameInstruction?: string;
  className?: string;
  btnLabel?: string;
  showDollar?: boolean;
}

const CustomInputField: React.FC<CustomInputFieldProps> = ({
  label,
  type,
  value = "",
  required = false,
  isDisabled = false,
  onChange,
  backendError,
  inputProps,
  instruction,
  classNameInput,
  classNameInstruction,
  className,
  btnLabel,
  showDollar,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState<string | number>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isHidden, setIsHidden] = useState(true);

  const handleEyeClick = () => {
    setIsHidden(!isHidden);
  };

  const inputFocused = () => {
    setIsFocused(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const inputDeFocused = () => {
    setIsFocused(false);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  return (
    <main className={`w-full ${isDisabled ? "rounded-lg bg-gray-100" : ""}`}>
      <div
        onClick={inputFocused}
        className={`${
          isDisabled ? "cursor-default" : ""
        } relative w-full cursor-text  rounded-lg border-[1.2px] border-borders_color  ${
          btnLabel && "flex justify-between"
        } ${className}`}
      >
        <div className="px-3 pt-3">
          <span
            className={`absolute ${
              isFocused || inputValue || value === 0 || value
                ? "top-[2px] text-xs font-thin"
                : ""
            } text-gray-500`}
          >
            {label}
            <span className={`ml-1 text-blue-500 ${required ? "" : "hidden"}`}>
              *
            </span>
          </span>
          <span className="flex gap-1">
            {showDollar && <span className="font-bold text-blue-600">$</span>}
            <input
              className={`w-full outline-none ${classNameInput}`}
              value={inputValue || value}
              type={isHidden ? type : "text"}
              onChange={(e) => {
                setInputValue(e.target.value);
                onChange(e.target.value, e);
              }}
              onFocus={inputFocused}
              onBlur={inputDeFocused}
              ref={inputRef}
              disabled={isDisabled}
              {...inputProps}
            />
          </span>
          {type === "password" && (value || inputValue) && (
            <span
              className="absolute right-4 cursor-pointer"
              onClick={handleEyeClick}
            >
              <i className={`fas ${isHidden ? "fa-eye" : "fa-eye-slash"}`} />
            </span>
          )}
        </div>
        {btnLabel && (
          <button className="m-2 min-w-[100px] max-w-fit rounded-sm bg-gradient-to-r from-gradient_color_2 to-gradient_color_1 font-medium text-white shadow-sm shadow-gradient_color_2 ">
            {btnLabel}
          </button>
        )}
      </div>
      {instruction && (
        <div className={`text-gray-400 ${classNameInstruction}`}>
          {instruction}
        </div>
      )}
      <span className="text-red-500">{backendError}</span>
    </main>
  );
};

export default CustomInputField;
