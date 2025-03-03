"use client";
import CustomMultipleSelect from "@/components/common/CustomMultipleSelect";
import CustomInputField from "@/components/common/customFormComponents/CustomInputField";

import React, { useContext, useEffect, useState } from "react";
import { IAttributeValues } from "./Attributes";
import { ProductContext } from "../../store/ProductContext";
import { produce } from "immer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCaretUp } from "@fortawesome/free-solid-svg-icons";
interface ISingleAttribute {
  values: IAttributeValues;
  index: number;
  expandAttributes: boolean;
  setExpandAttributes: React.Dispatch<React.SetStateAction<boolean[]>>;
}

const SingleAttribute: React.FC<ISingleAttribute> = ({
  values,
  index,
  expandAttributes,
  setExpandAttributes,
}) => {
  const { setAllAttributes } = useContext(ProductContext);

  return (
    <div>
      <div className="flex flex-grow items-center justify-between border-b border-merchant_border border-opacity-30 py-[15px] text-[14px]">
        <div className="text-sm font-medium">
          {values.name || "New Attribute"}
        </div>
        <div className="flex items-center gap-[14px]">
          <button
            className="cursor-pointer text-red-500"
            onClick={() => {
              setAllAttributes(
                produce((draft) => {
                  draft.splice(index, 1);
                }),
              );
              setExpandAttributes(
                produce((draft) => {
                  draft.splice(index, 1);
                }),
              );
            }}
          >
            Remove
          </button>
          <FontAwesomeIcon icon={faBars} className="cursor-pointer" />
          <FontAwesomeIcon
            icon={faCaretUp}
            className={`cursor-pointer ${expandAttributes ? "rotate-180" : ""}`}
            onClick={() =>
              setExpandAttributes(
                produce((draft) => {
                  if (draft.length > 0) draft[index] = !draft[index];
                }),
              )
            }
          />
        </div>
      </div>
      {expandAttributes && (
        <div className="mt-[25px] flex flex-wrap gap-5">
          <div className="max-w-[217px] ">
            <span className="text-sm font-medium text-merchant_text ">
              Name:
            </span>
            <CustomInputField
              inputPlaceholder="F.E. Size Or Color"
              className="!py-3 text-[13px]"
              value={values.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setAllAttributes(
                  produce((draft) => {
                    draft[index].name = e.target.value;
                  }),
                );
              }}
              classNameContainer="rounded-sm border-merchant_border"
              classNameWrapper="pt-[5px]"
            />
          </div>
          <div className="flex-grow sm:min-w-[200px]">
            <span className="text-sm font-medium text-merchant_text ">
              Value(s):
            </span>

            <CustomInputField
              inputPlaceholder="Enter Some Descriptive Text. Use “|” To Separate Different Values."
              value={values.values || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAllAttributes(
                  produce((draft) => {
                    draft[index].values = e.target.value;
                  }),
                )
              }
              textArea={true}
              classNameContainer="h-[141px] rounded-sm border-merchant_border"
              textAreaRows={5}
              styleInput={{ resize: "none" }}
              classNameWrapper="pt-[5px]"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleAttribute;
