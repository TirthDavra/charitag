"use client";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage, FieldAttributes } from "formik";
import React, { useState, useRef, useEffect } from "react";

interface CustomInputFieldFormikProps extends FieldAttributes<any> {
  placeholder?: string;
  inputPlaceholder?: string;
  required?: boolean;
  isDisabled?: boolean;
  type: string;
  min?: number;
  max?: number;
  className?: string;
  autoComplete?: string;
  textPlaceholder?: string;
  classNameWrapper?: string;
  classNameContainer?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  titleText?: string;
  children?: React.ReactNode;
}

const CustomInputFieldFormik: React.FC<CustomInputFieldFormikProps> = ({
  field,
  form,
  placeholder,
  inputPlaceholder,
  required = false,
  isDisabled = false,
  type,
  min,
  max,
  className,
  autoComplete,
  children,
  classNameWrapper,
  classNameContainer,
  handleChange,
  textPlaceholder,
  titleText,
}) => {
  if (handleChange) {
    field.onChange = handleChange;
  }
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isHidden, setIsHidden] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

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
    <div className={classNameWrapper}>
      <div className="flex">
        <div
          onClick={inputFocused}
          className={`flex flex-grow items-center rounded-lg border-[1.2px] ${isDisabled ? "border-borders_color/30" : "border-borders_color"} ${classNameContainer}`}
        >
          <div
            className={`${
              isDisabled ? "cursor-default" : ""
            } relative max-h-[58px] w-full cursor-text px-3 py-4 ${className}`}
          >
            <span
              className={`absolute ${
                field.value || isFocused || field.value === 0
                  ? "top-[2px] text-xs "
                  : ""
              } text-gray-500`}
            >
              {field.value || isFocused || field.value === 0
                ? titleText || placeholder
                : placeholder}
              <span
                className={`ml-1 text-sidebar_devider_color ${
                  required ? "" : "hidden"
                }`}
              >
                *
              </span>
            </span>
            <input
              ref={inputRef}
              type={isHidden ? type : "text"}
              value={field?.value ?? ""}
              className={`w-full outline-none ${textPlaceholder}`}
              {...field}
              onBlur={inputDeFocused}
              onFocus={inputFocused}
              min={min}
              max={max}
              autoComplete="off"
              placeholder={inputPlaceholder}
              disabled={isDisabled}
            />
            {type === "password" && field.value && (
              <span
                className="absolute right-4 cursor-pointer"
                onClick={handleEyeClick}
              >
                <FontAwesomeIcon icon={isHidden ? faEye : faEyeSlash} />
              </span>
            )}
          </div>
          <div>{children}</div>
        </div>
      </div>
      <div className="text-sm text-red-600">
        <ErrorMessage name={field.name} />
      </div>
    </div>
  );
};

export default CustomInputFieldFormik;
