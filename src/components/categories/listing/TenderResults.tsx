"use client";

import TenderCard from "./TenderCard";
import { Tender } from "@/types";

interface TenderResultsProps {
  tenders: Tender[];
  isLoading: boolean;
  error: any;
  categorySlug: string;
}

export default function TenderResults({
  tenders,
  isLoading,
  error,
  categorySlug,
}: TenderResultsProps) {
  if (isLoading) {
    return (
      <div className="space-y-6 mt-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 h-48 animate-pulse flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="h-4 w-20 bg-[var(--surface-secondary)] rounded-full"></div>
              <div className="h-8 w-96 bg-[var(--surface-secondary)] rounded-md"></div>
              <div className="h-4 w-full bg-[var(--surface-secondary)] rounded-md"></div>
            </div>
            <div className="h-4 w-60 bg-[var(--surface-secondary)] rounded-md"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 p-6 text-center border border-[var(--border)] rounded-2xl bg-[var(--surface)]">
        <p className="text-red-500 font-semibold">
          Failed to fetch opportunities.
        </p>
        <p className="text-sm text-[var(--muted)] mt-2">
          Please try again later.
        </p>
      </div>
    );
  }

  if (tenders.length === 0) {
    return (
      <div className="mt-8 p-12 text-center border border-[var(--border)] rounded-2xl bg-[var(--surface)]">
        <p className="text-lg font-semibold text-[var(--foreground)]">
          No opportunities found
        </p>
        <p className="text-sm text-[var(--muted)] mt-2">
          Try adjusting your search query or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-8">
      {tenders.map((tender) => (
        <TenderCard
          key={tender.id}
          tender={tender}
          categorySlug={categorySlug}
        />
      ))}
    </div>
  );
}
