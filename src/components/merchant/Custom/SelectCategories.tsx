import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useEffect } from "react";

interface productCategories {
  id?: string | number;
  name?: string;
  product_name?: string;
  charity_name?: string;
  title?: string;
  type_id?: string | number;
}

interface SelectCategoriesProps {
  productCategories?: productCategories[];
  placeholder?: string;
  handleSelectChange?: (value: any) => void;
  value?: any;
  labelKey?: string;
  valueKey?: string;
  className?: string;
  all?: boolean;
  disabled?: boolean;
}

const SelectCategories: React.FC<SelectCategoriesProps> = ({
  productCategories,
  placeholder,
  handleSelectChange,
  value,
  labelKey = "name",
  valueKey = "id",
  className,
  all = true,
  disabled,
}) => {
  return (
    <>
      <Select
        disabled={disabled}
        onValueChange={handleSelectChange}
        value={value}
      >
        <SelectTrigger
          classNameIcon="!text-black font-bold"
          className={`h-[34px] rounded-sm border-[1px] border-merchant_border text-[13px] font-normal text-merchant_gray outline-none ${className}`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="!bg-white">
          {all && <SelectItem value="0">All</SelectItem>}
          {productCategories &&
            productCategories.map((category: any) => (
              <SelectItem
                key={category.id}
                value={category[valueKey]}
                className="text-merchant_gray"
              >
                {category[labelKey]}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default SelectCategories;
