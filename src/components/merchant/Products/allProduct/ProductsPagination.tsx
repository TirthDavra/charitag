"use client";
import React, { useRef, useState } from "react";
import Button from "../../Custom/Button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ProductsPagination = ({
  className,
  totalItems,
  itemsPerPage,
}: {
  className: string;
  totalItems: number;
  itemsPerPage: number;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const totalPagesRef = useRef(Math.ceil(totalItems / itemsPerPage));

  const currentPageParam = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState<number>(
    Number(currentPageParam) || 1,
  );

  const params = new URLSearchParams(searchParams.toString());
  const handlePageChange = async (newPage: number) => {
    setCurrentPage(newPage);
    params.set("page", newPage.toString());
    router.push(pathname + "?" + params.toString());
  };

  return (
    <div className={`${className}`}>
      {totalItems} items
      <Button
        icon={<ChevronsLeft className="mx-[3px] w-[15px]" />}
        className="cursor-pointer rounded-sm !border-[#d9e2f9] text-merchat_icon2"
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      />
      <Button
        icon={<ChevronLeft className="mx-[3px] w-[15px]" />}
        className="cursor-pointer rounded-sm !border-[#d9e2f9] text-merchat_icon2"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      <span className="pl-[5px] pr-[12px]">
        {currentPage} of {totalPagesRef.current}
      </span>
      <Button
        icon={
          <ChevronRight className="text- mx-[3px] w-[15px] translate-x-[3px] text-merchant_text_color_blue" />
        }
        className="cursor-pointer rounded-sm border-merchant_text_color_blue"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPagesRef.current}
      />
      <Button
        icon={
          <ChevronsRight className="mx-[3px] w-[15px] text-merchant_text_color_blue" />
        }
        className="cursor-pointer rounded-sm border-merchant_text_color_blue"
        onClick={() => handlePageChange(totalPagesRef.current)}
        disabled={currentPage === totalPagesRef.current}
      />
    </div>
  );
};

export default ProductsPagination;
