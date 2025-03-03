"use client";
import { useAppSelectorCommon } from "@/lib/Store/hooks";
import React from "react";

const Fundraiser = () => {
  const categoriesData = useAppSelectorCommon((state) => state.footer);
  const categories = categoriesData.categories;

  return (
    <div>
      {categories?.length > 0 && (
        <div className="flex flex-col justify-between">
          <h1 className="pb-2 text-xl font-bold text-blue-500">
            Fundraise for
          </h1>
          <ul className="flex flex-col gap-[10px] font-bold">
            {categories.slice(0, 5).map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Fundraiser;
