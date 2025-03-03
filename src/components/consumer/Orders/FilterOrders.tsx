"use client";
import SelectCategories from "@/components/merchant/Custom/SelectCategories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const FilterOrders = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const router = useRouter();
  const pathname = usePathname();

  const generateOptions = () => {
    const currentYear = new Date().getFullYear();
    const pastThreeMonths = "Past 3 Months";

    const options = [{ name: pastThreeMonths, value: "3_months" }];

    for (let year = currentYear; year >= 2024; year--) {
      options.push({ name: year.toString(), value: year.toString() });
    }
    options.push({ name: "Archived", value: "archived" });
    return options;
  };
  return (
    <div>
      <Select
        onValueChange={(value) => {
          params.set("filter", value);
          router.push(pathname + "?" + params.toString());
        }}
      >
        <SelectTrigger className="text-md justify-center rounded-full border-[1px] !px-4 !py-6 text-center font-semibold text-merchant_sidebar_text">
          <SelectValue placeholder="Filter" />
        </SelectTrigger>

        <SelectContent className="text-merchant_gray">
          {generateOptions().map((item, index) => {
            return (
              <SelectItem key={index} value={item.value} className="text-base">
                {item.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterOrders;
