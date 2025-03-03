"use client";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter, useSearchParams } from "next/navigation"; // Assuming useRouter is from next/client
import React, { useEffect, useState } from "react";

const TableSearch = ({
  label,
  className,
}: {
  label?: string;
  className?: string;
}) => {
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(searchParams.get("search") || "");
  }, []);

  const pathname = usePathname();
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      search();
    }
  };

  const search = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", inputValue);
    params.set("page", "1");
    router.push(pathname + "?" + params.toString());
  };

  const clearSearch = () => {
    setInputValue("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    router.push(pathname + "?" + params.toString());
  };

  return (
    <div className={`flex space-x-[5px] pt-[10px] md:pt-0 ${className}`}>
      <span className="flex h-[34px] w-[200px] items-center rounded-sm border border-merchant_blue/15 px-2 py-1 outline-none">
        <input
          type="text"
          className="w-full text-sm outline-none"
          value={inputValue ?? ""}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown} // Use onKeyDown instead of onKeyPress
        />
        {inputValue && (
          <button
            aria-label="Clear search"
            className="ml-2 text-gray-500 hover:text-gray-700"
            onClick={clearSearch}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
      </span>
      <div className="hidden xs:block">
        <ButtonPrimary
          label={label}
          className="ml-1 h-[34px] rounded-sm px-[10px] py-2 !shadow-none"
          classNameLabel="text-[13px] font-normal"
          onClick={search}
        />
      </div>

      <div className="xs:hidden">
        <button
          aria-label="search deals"
          className="h-[30px] w-[30px] rounded-full bg-gradient-to-r from-blue-600 to-blue-300"
          onClick={search}
        >
          <FontAwesomeIcon icon={faSearch} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default TableSearch;
