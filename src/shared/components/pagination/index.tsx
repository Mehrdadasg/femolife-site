"use client";

import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface PaginationProps {
  totalCount: number;
  pageSize: number;
  currentPage: number;
}

export function Pagination({
  totalCount,
  pageSize,
  currentPage,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const leftSiblingCount = 1;
  const rightSiblingCount = 2;
  const totalPages = Math.ceil(totalCount / pageSize);

  const createPageURL = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", page.toString());
      return `${pathname}?${params.toString()}`;
    },
    [pathname, searchParams]
  );

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const startPage = Math.max(1, currentPage - leftSiblingCount);
    const endPage = Math.min(totalPages, currentPage + (startPage <2 ? 4:rightSiblingCount));

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push("ellipsis");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push("ellipsis");
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      router.push(createPageURL(page));
    }
  };

  return (
    <nav className="flex items-center gap-1 py-4" aria-label="Pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`size-10 flex justify-center items-center cursor-pointer rounded-md border transition-colors ${
          currentPage === 1
            ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400"
            : "bg-white text-gray-700 hover:bg-gray-50"
        }`}
        aria-label="صفحه قبلی"
        type="button"
      >
        <ArrowRight2 color="var(--color-lake-blue-500)" size={16} />
      </button>

      {getPageNumbers().map((page, index) =>
        page === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="px-1 py-1 text-gray-500 select-none"
            aria-hidden="true"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`size-10 rounded-md border cursor-pointer text-sm transition-colors ${
              page === currentPage
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`size-10 flex justify-center items-center cursor-pointer rounded-md border transition-colors ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400"
            : "bg-white text-gray-700 hover:bg-gray-50"
        }`}
        aria-label="صفحه بعدی"
      >
        <ArrowLeft2 color="var(--color-lake-blue-500)" size={16} />
      </button>
    </nav>
  );
}
