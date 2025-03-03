"use client";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const SearchProducts = () => {
  const [inputValue, setInputValue] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="flex space-x-[5px] pt-[10px] md:pt-0">
      <span className="rounded-[3px] border text-[2px] border-merchant_blue/15 px-2 py-1 outline-none">
        <input
          type="text"
          className="max-w-[140px] outline-none sm:max-w-[169px] text-sm"
          value={inputValue ?? ""}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </span>
      <ButtonPrimary
        label="Serach Products"
        className="rounded-[3px] px-[10px] py-2 !shadow-none"
        classNameLabel="text-[13px] font-normal"
        onClick={() => {
          const params = new URLSearchParams(searchParams.toString());
          params.set("search", inputValue);

          router.push(pathname + "?" + params.toString());
        }}
      />
    </div>
  );
};

export default SearchProducts;
