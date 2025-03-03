"use client";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import SingleAttribute from "./SingleAttribute";
import { ProductContext } from "../../store/ProductContext";
import { mergeArrays } from "@/lib/utils";
import { toast } from "react-toastify";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import ImageNameList, { IColorItem } from "./ColorAttribute";
import { Switch } from "@/components/ui/switch";
import ColorAttribute from "./ColorAttribute";
import { Alert } from "@/components/ui/alert";
import { produce } from "immer";

export interface IAttributeValues {
  id?: number | null;
  product_id?: number | null;
  name: string;
  values: string;
  arrayValues?: string[];
}
const Attributes = () => {
  // const [attributeValues, setAttributeValues] = useState<IAttribute[]>([]);
  // const [internalAttributesValue, setInternalAttributesValue] = useState<
  //   IAttributeValues[]
  // >([{ name: "", values: "hello" }]);

  const {
    allAttributes,
    setAllAttributes,
    setProductDetails,
    setProcessedAttributes,
    processedAttributes,
  } = useContext(ProductContext);

  const [expandAttributes, setExpandAttributes] = useState(
    Array.from({ length: allAttributes.length }, () => false),
  );

  const handleAddNew = () => {
    setAllAttributes((prev) => {
      return [...prev, { name: "", values: "" }];
    });
    setExpandAttributes([...expandAttributes, true]);
  };

  const handleAddColor = () => {
    const colorExists = allAttributes.some((attr) => attr.name === "Color");
    if (colorExists) {
      toast.error("One Color attribute already exists.");
      return;
    }

    setAllAttributes((prev) => {
      return [...prev, { name: "Color", values: "" }];
    });
    setExpandAttributes([...expandAttributes, true]);
  };

  const ExpandCloseComponent = () => {
    return (
      <>
        {expandAttributes.length > 0 && (
          <div className="text-[14px] italic text-merchant_text_color_blue">
            <span
              className="cursor-pointer"
              onClick={() => {
                setExpandAttributes(expandAttributes.map(() => true));
              }}
            >
              Expand{" "}
            </span>
            /
            <span
              className="cursor-pointer"
              onClick={() =>
                setExpandAttributes(expandAttributes.map(() => false))
              }
            >
              {" "}
              Close
            </span>
          </div>
        )}
      </>
    );
  };
  const [showAlertMsg, setShowAlertMsg] = useState(true);
  return (
    <div className="py-[13px] pl-5 pr-[15px]  md:py-0  md:pr-0">
      {showAlertMsg && (
        <div className="relative flex flex-wrap justify-between gap-5 rounded border border-l-[6px] border-solid border-merchant_border border-opacity-30 p-4 xl:flex-nowrap">
          <p className="my-auto max-w-[681px] flex-auto">
            Add descriptive information that customers can use to search for
            this product in your store, such as “material” or “brand”.
          </p>
          <div className="max-w-[681px] flex-auto  text-sm font-bold text-red-500">
            Note: If you change the values of the attributes, the variations
            will also change.
          </div>
          {/* <FontAwesomeIcon
            icon={faCircleXmark}
            className="absolute right-1 top-1 cursor-pointer hover:text-zinc-700"
            onClick={() => setShowAlertMsg(false)}
          /> */}
        </div>
      )}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-y-1 border-b border-merchant_border border-opacity-30 pb-[14px]">
        <div className="flex flex-wrap gap-3">
          <button
            className="h-[34px] justify-center rounded border border-solid border-blue-600 bg-white px-3 text-[13px] text-merchant_text_color_blue"
            onClick={handleAddNew}
          >
            Add New
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center justify-between  gap-3 rounded-sm border border-merchant_blue px-2 text-[13px] text-merchant_blue">
              Add from Existing
              <ChevronDown className="h-[20px] w-[20px] text-[13px]" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleAddColor}>
                Color
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <ExpandCloseComponent />
      </div>

      <div className="mb-[25px]">
        {allAttributes.map((val, index) => {
          if (val.name.toLowerCase() === "color") {
            setAllAttributes(
              produce((draft) => {
                draft[index].name = "Color";
              }),
            );
            return (
              <ColorAttribute
                key={index}
                index={index}
                values={val}
                expandAttributes={expandAttributes[index]}
                setExpandAttributes={setExpandAttributes}
              />
            );
          }
          return (
            <SingleAttribute
              values={val}
              key={index}
              index={index}
              expandAttributes={expandAttributes[index]}
              setExpandAttributes={setExpandAttributes}
              // setExpandAttributes={() => {
              //   setExpandAttributes(
              //     produce((draft) => {
              //       draft[index] = !draft[index];
              //     }),
              //   );
              // }}
            />
          );
        })}
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-between pt-2 sm:pt-0 md:pt-2 xl:pt-0">
        <ButtonPrimary
          label="Save Attributes"
          // disabled={allAttributes.length === 0}
          className="h-[33px] rounded text-[13px] font-normal !shadow-none"
          onClick={() => {
            const hasEmptyAttribute = allAttributes.some(
              (attribute) =>
                attribute.name.trim() === "" || attribute.values.trim() === "",
            );

            if (hasEmptyAttribute) {
              toast.error("Please fill in all attribute fields.");
              return; // Abort saving if any attribute is empty
            }
            setProductDetails((prev) => {
              return {
                ...prev,
                attributes: allAttributes,
              };
            });
            setExpandAttributes(expandAttributes.map(() => false));
            const processedArray: string[][] = [];
            const updatedAttributes =
              allAttributes.length > 0
                ? allAttributes.map((attribute) => {
                    if (attribute.name === "Color") {
                      const arrayValues: IColorItem[] = JSON.parse(
                        attribute.values === "" ? "[]" : attribute.values,
                      );
                      const processedArrayContent = arrayValues.map(
                        (item) => item.name,
                      );
                      processedArray.push(processedArrayContent);
                      return {
                        ...attribute,
                        arrayValues: processedArrayContent,
                      };
                    }
                    const arrayValues = attribute.values.split("|");
                    processedArray.push(arrayValues);
                    return {
                      ...attribute,
                      values: attribute.values,
                      arrayValues,
                    };
                  })
                : [];

            const newProcessedArray =
              processedArray.length > 0 ? mergeArrays(processedArray) : [];

            setProcessedAttributes(newProcessedArray);
            setAllAttributes(updatedAttributes);
            toast.success("Attributes saved successfully.");
          }}
        />
        <ExpandCloseComponent />
      </div>
    </div>
  );
};

export default Attributes;
