"use client";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export interface ISearchInput {
  styles?: string;
  placeholder?: string;
  classNameInput?: string;
  searchParamKey: string;
  redirectPath?: string;
}

const SearchInput: React.FC<ISearchInput> = ({
  styles,
  placeholder,
  classNameInput,
  searchParamKey,
  redirectPath,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(searchParams.get(searchParamKey) || "");
  }, [searchParamKey, searchParams]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      search();
    }
  };

  const search = () => {
    const params = new URLSearchParams(searchParams.toString().trim());
    params.set(searchParamKey, inputValue);
    params.set("page", "1");
    const newPath = redirectPath ? redirectPath : pathname;
    router.push(newPath + "?" + params.toString());
  };

  return (
    <div
      className={`${styles} flex h-[40px] w-[300px] flex-nowrap items-center justify-between rounded-full border-[1px] border-gradient_color_1 bg-white px-1 shadow-md shadow-blue-100`}
    >
      <input
        type="text"
        name="text"
        value={inputValue}
        onKeyDown={handleKeyDown}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder || "Search deals"}
        className={`input text-base placeholder:text-bla w-full border-none bg-transparent rounded-full pl-6 pr-1 font-sans font-medium outline-none ${classNameInput}`}
      />
      <button
        aria-label="search deals"
        className="min-h-[30px] min-w-[30px] rounded-full bg-gradient-to-r from-blue-600 to-blue-300"
        onClick={search}
      >
        <FontAwesomeIcon icon={faSearch} className="text-white" />
      </button>
    </div>
  );
};

export default SearchInput;
