"use client";
import CheckBox from "@/components/merchant/Custom/CheckBox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

interface DealOrProductProps {
  dealOrProduct: {
    deal: string;
    product: string;
  };
  className?: string;
}
const DealOrProduct = ({}: DealOrProductProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const nameParam = params.get(name);
      if (nameParam) {
        nameParam === "true" ? params.delete(name) : params.set(name, "true");
      } else {
        params.set(name, "true");
      }
      params.set("page", "1");
      return params.toString();
    },
    [searchParams],
  );

  return (
    <div className="space-y-2 !text-merchant_text_color_blue">
      <CheckBox
        label="Show Only Product"
        onChange={() => {
          router.push(pathname + "?" + createQueryString("product"));
        }}
        value={searchParams.get("product") === "true"} // Update value based on query parameter
        className="!text-[16px] !font-semibold text-merchant_text_color_blue"
        classNameCheckbox="!h-5 !w-5"
        classNameLable="!text-[16px] !font-semibold !text-merchant_text_color_blue"
      />
      <CheckBox
        label="Show Only Deals"
        onChange={() => {
          router.push(pathname + "?" + createQueryString("deal"));
        }}
        value={searchParams.get("deal") === "true"} // Update value based on query parameter
        className=""
        classNameCheckbox="!h-5 !w-5"
        classNameLable="!text-[16px] !font-semibold !text-merchant_text_color_blue"
      />
    </div>
  );
};

export default DealOrProduct;
