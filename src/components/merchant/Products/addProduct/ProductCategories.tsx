"use client";
import React, { useState } from "react";
import { IAllCategoryResponse } from "@/api/common/types";
import { Option } from "@/components/ui/multiple-selector";
import Select, { MultiValue } from "react-select";

interface IProductCategoriesProps {
  productCategories: IAllCategoryResponse;
  selectedCategories: MultiValue<Option>;
  selectedSubCategories: MultiValue<ISubCatOptions>;
  onCategoryChange: (values: Option[]) => void;
  onSubCategoryChange: (newValue: MultiValue<ISubCatOptions>) => void;
  placeholderCategory: string;
  placeholderSubCategory: string;
  className?: string;
  classontainer?: string;
}

export interface ISubCatOptions extends Option {
  parentCatId: string;
}

const ProductCategories = ({
  productCategories,
  onCategoryChange,
  onSubCategoryChange,
  selectedCategories,
  selectedSubCategories,
  placeholderCategory,
  placeholderSubCategory,
  className,
  classontainer,
}: IProductCategoriesProps) => {
  const [catOptions] = useState<MultiValue<Option>>(
    productCategories.data.map((cat) => ({
      label: cat.name,
      value: cat.id.toString(),
    })),
  );

  const getSubCatOptions = (
    categories: Option[],
  ): MultiValue<ISubCatOptions> => {
    const subCategories = categories.reduce((acc: ISubCatOptions[], cv) => {
      const category = productCategories.data.find(
        (cat) => cat.id.toString() === cv.value,
      );
      if (category && category.children) {
        acc.push(
          ...category.children.map((sub) => ({
            label: sub.name,
            value: sub.id.toString(),
            parentCatId: cv.value,
          })),
        );
      }
      return acc;
    }, []);
    return subCategories;
  };

  const handleCategoryChange = (options: MultiValue<Option>) => {
    const updatedCategories = [...options] as Option[];
    onCategoryChange(updatedCategories);
    const filteredSubCategories = selectedSubCategories.filter((sub) =>
      options.find((cat) => cat.value === sub.parentCatId),
    );
    onSubCategoryChange(filteredSubCategories);
  };

  const handleSubCategoryChange = (values: MultiValue<ISubCatOptions>) => {
    onSubCategoryChange(values);
  };

  const subCatOptions = getSubCatOptions([...selectedCategories]);

  return (
    <div className={`flex gap-5 lg:justify-between ${className}`}>
      <Select
        classNames={{
          control: () =>
            `py-1 w-full focus:!ring-0 focus:!outline-0`,
          multiValue: () =>
            "!bg-merchant_text_color_blue !text-white hover:!bg-gray-500",
          multiValueLabel: () => "!text-white",
          multiValueRemove: () => "hover:!text-white hover:!bg-[unset]",
          container: () => "w-full",
        }}
        styles={{
          control: (provided, state) => ({
            ...provided,
            boxShadow: "none",
            borderColor: state.isFocused ? "#cad6f3" : "#cad6f3",
            "&:hover": {
              borderColor: "#cad6f3",
            },
            "&:focus": {
              outline: "none",
              borderColor: provided.borderColor,
            },
          }),
          placeholder: (provided) => ({
            ...provided,
            color: "#94a3b8",
            fontSize: "14px",
          }),
        }}
        value={selectedCategories}
        options={catOptions}
        isMulti
        placeholder={placeholderCategory}
        onChange={handleCategoryChange}
        loadingMessage={() => "loading..."}
        noOptionsMessage={() => "No results found"}
        closeMenuOnSelect={false}
      />

      {subCatOptions.length > 0 && (
        <Select
          value={selectedSubCategories}
          isMulti
          options={subCatOptions}
          onChange={handleSubCategoryChange}
          placeholder={placeholderSubCategory}
          loadingMessage={() => "loading..."}
          noOptionsMessage={() => "No results found"}
          closeMenuOnSelect={false}
          classNames={{
            control: () => `py-1 focus:!ring-0 focus:!outline-0`,
            multiValue: () =>
              "!bg-merchant_text_color_blue !text-white hover:!bg-gray-500",
            multiValueLabel: () => "!text-white",
            multiValueRemove: () => "hover:!text-white hover:!bg-[unset]",
            container: () => "w-full",
          }}
          styles={{
            control: (provided, state) => ({
              ...provided,
              boxShadow: "none",
              borderColor: state.isFocused ? "#cad6f3" : "#cad6f3",
              "&:hover": {
                borderColor: "#cad6f3",
              },
              "&:focus": {
                outline: "none",
                borderColor: provided.borderColor,
              },
            }),
            placeholder: (provided) => ({
              ...provided,
              color: "#94a3b8",
              fontSize: "14px",
            }),
          }}
        />
      )}
    </div>
  );
};

export default ProductCategories;
