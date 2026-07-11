"use client";

import React, { useState, useEffect } from "react";

interface TenderSearchProps {
  search: string;
  setSearch: (val: string) => void;
}

export default function TenderSearch({ search, setSearch }: TenderSearchProps) {
  const [localInput, setLocalInput] = useState(search);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(localInput);
    }, 400);

    return () => clearTimeout(handler);
  }, [localInput, setSearch]);

  return (
    <div
      className="
      bg-[var(--surface)]
      border
      border-[var(--border)]
      rounded-2xl
      p-4
      flex
      flex-col
      md:flex-row
      gap-4
      items-center
    "
    >
      <input
        type="text"
        value={localInput}
        onChange={(e) => setLocalInput(e.target.value)}
        placeholder="Search by keyword, company or ID..."
        className="
          flex-1
          w-full
          border
          border-[var(--border)]
          rounded-xl
          p-3
          bg-transparent
          text-[var(--foreground)]
          focus:outline-hidden focus:ring-1 focus:ring-[#003EC7]
        "
      />

      <select
        className="
        border
        border-[var(--border)]
        rounded-xl
        p-3
        bg-[var(--surface)]
        text-[var(--foreground)]
      "
      >
        <option>Newest First</option>
      </select>
    </div>
  );
}
