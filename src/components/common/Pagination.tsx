"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (pageNumber: number) => void;
  className?: string;
  siblingPages?: number; // Number of sibling pages to show on each side of the current page
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  className,
  siblingPages = 2, // Default value for sibling pages
}) => {
  const rangeStart = Math.max(currentPage - siblingPages, 1);
  const rangeEnd = Math.min(currentPage + siblingPages, totalPages);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const onPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(pathname + "?" + params.toString());
  };
  const pages = Array.from(
    { length: rangeEnd - rangeStart + 1 },
    (_, index) => rangeStart + index,
  );

  return (
    <div className={`flex ${className}`}>
      {rangeStart > 1 && (
        <button
          className={`mx-1 rounded-md bg-gray-200 px-3 py-1 text-gray-700`}
          onClick={() => onPageChange && onPageChange(1)}
        >
          1
        </button>
      )}
      {rangeStart > 2 && <span className="mx-1">...</span>}
      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`mx-1 rounded-md px-3 py-1 ${
            currentPage === pageNumber
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => onPageChange && onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      {rangeEnd < totalPages - 1 && <span className="mx-1">...</span>}
      {rangeEnd < totalPages && (
        <button
          className={`mx-1 rounded-md bg-gray-200 px-3 py-1 text-gray-700`}
          onClick={() => onPageChange && onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      )}
    </div>
  );
};

export default Pagination;
