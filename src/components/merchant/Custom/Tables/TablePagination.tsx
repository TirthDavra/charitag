"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "../Button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const TablePagination = ({
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
  const [totalPages, setTotalPages] = useState(
    Math.ceil(totalItems / itemsPerPage),
  );

  const currentPageParam = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState<number>(
    Number(currentPageParam) || 1, // Start from page 1
  );

  const params = new URLSearchParams(searchParams.toString());
  const handlePageChange = async (newPage: number) => {
    setCurrentPage(newPage);
    params.set("page", newPage.toString());
    router.push(pathname + "?" + params.toString());
  };

  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / itemsPerPage));
  }, [totalItems, itemsPerPage]);

  return (
    <div className={`${className}`}>
      {totalPages > 0 ? (
        <>
          {totalItems} items
          <Button
            icon={<ChevronsLeft className="mx-[3px] w-[15px]" />}
            className={`cursor-pointer rounded-sm ${currentPage === 1 ? "!border-[#d9e2f9]" : ""} border-merchant_text_color_blue !bg-[#FFFFFF] text-merchat_icon2`}
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          />
          <Button
            icon={<ChevronLeft className="mx-[3px] w-[15px]" />}
            className={`cursor-pointer rounded-sm ${currentPage === 1 ? "!border-[#d9e2f9]" : ""} border-merchant_text_color_blue !bg-[#FFFFFF] text-merchat_icon2`}
            // className="cursor-pointer rounded-sm !border-[#d9e2f9] !bg-[#FFFFFF] text-merchat_icon2"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          <span className="pl-[5px] pr-[12px]">
            {currentPage} of {totalPages}
          </span>
          <Button
            icon={
              <ChevronRight
                className={`mx-[3px] w-[15px] translate-x-[3px] ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""}`}
              />
            }
            className={`cursor-pointer rounded-sm border-merchant_text_color_blue !bg-[#FFFFFF] text-merchant_text_color_blue ${currentPage === totalPages ? "!border-[#d9e2f9] text-merchat_icon2" : ""}`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
          <Button
            icon={
              <ChevronsRight
                className={`mx-[3px] w-[15px] ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""}`}
              />
            }
            className={`cursor-pointer rounded-sm border-merchant_text_color_blue !bg-[#FFFFFF] text-merchant_text_color_blue ${currentPage === totalPages ? "!border-[#d9e2f9] text-merchat_icon2" : ""}`}
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          />
        </>
      ) : (
        <span>No items to display</span>
      )}
    </div>
  );
};

export default TablePagination;
