"use client";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";

interface CustomInputFieldProps {
  placeholder?: string;
  inputPlaceholder?: string;
  required?: boolean;
  isDisabled?: boolean;
  type?: string;
  min?: number;
  max?: number;
  className?: string;
  autoComplete?: string;
  value: string | number;
  onChange: any;
  children?: React.ReactNode;
  classNameWrapper?: string;
  classNameContainer?: string;
  styleInput?: object;
  errorMessage?: string;
  textArea?: boolean;
  textAreaRows?: number;
  textAreaColumns?: number;
  name?: string;
  autoFocus?: boolean;
  textPlaceholder?: string;
  defaultValue?: any;
  pattern?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}

const CustomInputField = ({
  isDisabled,
  className,
  value = "",
  placeholder,
  inputPlaceholder,
  required,
  type = "text",
  min,
  max,
  autoComplete,
  onChange,
  children,
  classNameWrapper,
  classNameContainer,
  errorMessage,
  textArea,
  textAreaRows,
  textAreaColumns,
  styleInput,
  name,
  textPlaceholder,
  autoFocus = false,
  defaultValue,
  pattern,
  onKeyDown
}: CustomInputFieldProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isHidden, setIsHidden] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleEyeClick = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div className={classNameWrapper}>
      <div className="flex">
        <div
          className={`flex flex-grow rounded-lg border-[1.2px] border-borders_color ${classNameContainer}`}
          onClick={() => {
            inputRef.current?.focus();
          }}
        >
          <div
            className={`${
              isDisabled ? "cursor-default" : ""
            } relative max-h-[58px] w-full cursor-text items-center px-3 py-3 ${className}`}
          >
            <span
              className={`absolute ${
                value || isFocused || value === 0 ? "top-[2px] text-xs" : ""
              } text-gray-500`}
            >
              {placeholder}
              <span
                className={`ml-1 text-sidebar_devider_color ${
                  required ? "" : "hidden"
                }`}
              >
                *
              </span>
            </span>

            {textArea ? (
              <textarea
                // ref={inputRef}
                value={value ?? ""}
                name={name ?? ""}
                className={`w-full text-sm placeholder-merchant_placeholder outline-none ${textPlaceholder}`}
                onBlur={handleBlur}
                onFocus={handleFocus}
                placeholder={inputPlaceholder}
                onChange={onChange}
                rows={textAreaRows}
                cols={textAreaColumns}
                style={styleInput}
                defaultValue={defaultValue}
                onKeyDown={onKeyDown}
              />
            ) : (
              <>
                <input
                  ref={inputRef}
                  name={name}
                  type={isHidden ? type : "text"}
                  value={value ?? ""}
                  className={`w-full placeholder-merchant_placeholder outline-none ${textPlaceholder}`}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  min={min}
                  max={max}
                  autoComplete={autoComplete}
                  onChange={onChange}
                  placeholder={inputPlaceholder}
                  style={styleInput}
                  autoFocus={autoFocus}
                  defaultValue={defaultValue}
                  pattern={pattern}
                  onKeyDown={onKeyDown}
                />
                {type === "password" && value && (
                  <span
                    className="absolute right-4 cursor-pointer"
                    onClick={handleEyeClick}
                  >
                    <FontAwesomeIcon icon={isHidden ? faEyeSlash : faEye} />
                  </span>
                )}
                {type === "password" && value && (
                  <span
                    className="absolute right-4 cursor-pointer"
                    onClick={handleEyeClick}
                  >
                    <FontAwesomeIcon icon={isHidden ? faEyeSlash : faEye} />
                  </span>
                )}
              </>
            )}
          </div>
          <div>{children}</div>
        </div>
      </div>
      <div className="text-red-600">{errorMessage}</div>
    </div>
  );
};

export default CustomInputField;
