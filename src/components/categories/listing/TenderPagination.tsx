"use client";

import React from "react";

interface TenderPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function TenderPagination({
  currentPage,
  totalPages,
  onPageChange,
}: TenderPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div
      className="
      mt-12
      flex
      justify-center
      gap-2
    "
    >
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="
        px-3
        py-2
        rounded-lg
        border
        border-[var(--border)]
        text-sm
        font-medium
        text-[var(--muted)]
        hover:border-[#003EC7]
        hover:text-[#003EC7]
        disabled:opacity-40
        disabled:hover:border-[var(--border)]
        disabled:hover:text-[var(--muted)]
        transition-all
      "
      >
        Previous
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`
          w-10
          h-10
          rounded-lg
          border
          text-sm
          font-semibold
          transition-all
          ${
            currentPage === p
              ? "bg-[#003EC7] border-[#003EC7] text-white"
              : "border-[var(--border)] text-[var(--foreground)] hover:border-[#003EC7] hover:text-[#003EC7]"
          }
        `}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="
        px-3
        py-2
        rounded-lg
        border
        border-[var(--border)]
        text-sm
        font-medium
        text-[var(--muted)]
        hover:border-[#003EC7]
        hover:text-[#003EC7]
        disabled:opacity-40
        disabled:hover:border-[var(--border)]
        disabled:hover:text-[var(--muted)]
        transition-all
      "
      >
        Next
      </button>
    </div>
  );
}
