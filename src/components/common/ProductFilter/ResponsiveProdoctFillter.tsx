"use client";
import { useModal } from "@/components/context/ModalContext";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductFilter from "./ProductFilter";
import { IAllCategoryResponse } from "@/api/common/types";
import { IShopQueryPrams } from "./types";
import { SlidersHorizontal } from "lucide-react";

const ResponsiveProdoctFillter = ({
  categories,
  searchParams,
}: {
  categories: IAllCategoryResponse;
  searchParams: IShopQueryPrams;
}) => {
  const { closeModal, openModal, modalConfig } = useModal();

  const toggleMenu = () => {
    // if (modalConfig) {
    //     closeModal()
    //     return
    // }
    openModal({
      classNameBg: "sm:!hidden",
      content: (
        <div className=" !max-h-[680px] scrollbar">
          <ProductFilter
            categories={categories}
            searchParam={searchParams}
            className="!m-auto !flex !h-full !w-full !flex-col !justify-center !py-10"
          />
        </div>
      ),
    });
  };
  return (
    <div>
      <button onClick={toggleMenu} className="mt-2 pl-[2px]">
        <SlidersHorizontal className="!p-0 text-2xl font-thin text-[#3969E0]" />
      </button>
    </div>
  );
};

export default ResponsiveProdoctFillter;
