"use client";
import React, { useState } from "react";
import { ErrorMessage, FieldAttributes } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

interface CustomMultipleSelectFormikProps extends FieldAttributes<any> {
  options: string[];
  label?: string;
  placeholder?: string;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  className?: string;
  classNameContaine?: string;
  classNameSelect?: string;
  // classNameSelectValue?: string;
  merchantSelect?: boolean;
  classNameOption?: string;
}

const CustomMultipleSelectFormik: React.FC<CustomMultipleSelectFormikProps> = ({
  options,
  label = "",
  placeholder = "",
  field,
  form,
  setFieldValue,
  value,
  className,
  classNameContaine,
  classNameSelect,
  // classNameSelectValue,
  merchantSelect = false,
  classNameOption,
  ...props
}) => {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    field.value || [],
  );

  const showOptions = () => {
    setOptionsVisible(!optionsVisible);
  };

  const selectOption = (option: string) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
      setFieldValue(field.name, [...selectedOptions, option]);
    }
  };

  const deselectOption = (option: string) => {
    const filteredOptions = selectedOptions.filter((value) => value !== option);
    setSelectedOptions(filteredOptions);
    setFieldValue(field.name, filteredOptions);
  };

  const handleToggleOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      deselectOption(option);
    } else {
      selectOption(option);
    }
  };

  let timeoutId: NodeJS.Timeout;

  const debouncedShowOptions = (event: React.MouseEvent) => {
    event.stopPropagation();
    clearTimeout(timeoutId);

    // Check if the click occurred on the selected options
    const isClickOnSelectedOption = (
      event.target as HTMLElement
    ).classList.contains("bg-selected_option_color");

    if (!isClickOnSelectedOption) {
      timeoutId = setTimeout(() => {
        setOptionsVisible(!optionsVisible);
      }, 250); // Adjust the debounce delay as needed
    }
  };

  return (
    <main className={`relative ${className}`}>
      <div
        className={`flex items-center justify-between rounded-lg border-[1.2px] border-b-borders_color p-1 pr-4 ${classNameContaine}`}
        onClick={debouncedShowOptions}
      >
        {selectedOptions.length > 0 ? (
          <div className="flex flex-wrap" onClick={() => {}}>
            {selectedOptions.map((selectedOption, index) => (
              <>
                {merchantSelect === true ? (
                  <span
                    key={index}
                    className={`mr-2 flex items-center gap-[10px] rounded-[2px] bg-merchant_text_color_blue px-3 py-[2.5px] text-[11px] text-white`}
                  >
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="ml-3 h-[7px] w-[7px] cursor-pointer text-[10px] font-thin"
                      onClick={() => deselectOption(selectedOption)}
                    />
                    {selectedOption}
                  </span>
                ) : (
                  <span
                    key={index}
                    className={`mr-2 flex items-center rounded-lg bg-selected_option_color px-3 py-2 text-gradient_color_2`}
                  >
                    {selectedOption}

                    <FontAwesomeIcon
                      icon={faTimes}
                      className="ml-3 cursor-pointer text-[10px] font-thin"
                      onClick={() => deselectOption(selectedOption)}
                    />
                  </span>
                )}
              </>
            ))}
          </div>
        ) : (
          <span className=" rounded-lg px-1 py-2 text-gray-500">
            {placeholder}
          </span>
        )}
        <span>
          {/* <i
            className={`fas cursor-pointer ${
              optionsVisible ? "fa-chevron-up" : "fa-chevron-down"
            }`}
            onClick={debouncedShowOptions}
          ></i> */}
          <FontAwesomeIcon
            icon={optionsVisible ? faChevronUp : faChevronDown}
          />
        </span>
      </div>
      {optionsVisible && (
        <div
          className={`right-0 z-10 my-1 mt-[5px] flex w-full flex-col gap-1 rounded-lg border-[2px]  border-sidebar_devider_color bg-white p-2 ${classNameOption}`}
        >
          {options.map((option, index) => (
            <p
              key={index}
              onClick={() => handleToggleOption(option)}
              className={`cursor-pointer rounded-lg bg-selected_option_color p-2 text-gradient_color_2 ${classNameSelect} `}
            >
              {option}
            </p>
          ))}
        </div>
      )}
      <div className="text-red-600">
        <ErrorMessage name={field.name} />
      </div>
    </main>
  );
};

export default CustomMultipleSelectFormik;
