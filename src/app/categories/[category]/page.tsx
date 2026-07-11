"use client";

import { useState, useEffect, use } from "react";
import TenderFilters from "@/components/categories/listing/TenderFilters";
import TenderSearch from "@/components/categories/listing/TenderSearch";
import TenderResults from "@/components/categories/listing/TenderResults";
import TenderPagination from "@/components/categories/listing/TenderPagination";
import { useCategories } from "@/features/categories/api/queries";
import { useTenders } from "@/features/tenders/api/queries";
import { SlidersHorizontal, X } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = use(params);

  // States for search and filtering
  const [search, setSearch] = useState("");
  const [stateId, setStateId] = useState("");
  const [selectedBudgets, setSelectedBudgets] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [search, stateId, selectedBudgets]);

  // Fetch categories to find matching ID
  const { data: categories, isLoading: isCatLoading } = useCategories();
  const matchedCategory = categories?.find((c) => c.slug === categorySlug);

  // Compute min/max price in cents based on selected budgets
  let minPriceCents: number | undefined;
  let maxPriceCents: number | undefined;

  if (selectedBudgets.length > 0) {
    const budgetMap: Record<string, { min: number; max?: number }> = {
      "10k-50k": { min: 10_000_00, max: 50_000_00 },
      "50k-250k": { min: 50_000_00, max: 250_000_00 },
      "250k-1M": { min: 250_000_00, max: 1_000_000_00 },
      "1M+": { min: 1_000_000_00 },
    };

    const mins = selectedBudgets
      .map((b) => budgetMap[b]?.min)
      .filter((m) => m !== undefined) as number[];
    const maxs = selectedBudgets
      .map((b) => budgetMap[b]?.max)
      .filter((m) => m !== undefined) as number[];

    if (mins.length > 0) {
      minPriceCents = Math.min(...mins);
    }
    // If any checked range is 1M+, maxPriceCents is undefined (no ceiling)
    if (maxs.length === selectedBudgets.length) {
      maxPriceCents = Math.max(...maxs);
    }
  }

  // Fetch tenders under the matched category with current filters
  const {
    data: response,
    isLoading: isTendersLoading,
    error,
  } = useTenders(
    matchedCategory
      ? {
          categoryId: matchedCategory.id,
          search: search || undefined,
          stateId: stateId || undefined,
          minPriceCents,
          maxPriceCents,
          page,
          limit: 10,
        }
      : undefined,
  );

  const title =
    categorySlug.charAt(0).toUpperCase() +
    categorySlug.slice(1).replace("-", " ");

  if (isCatLoading) {
    return (
      <main className="py-12 lg:py-20 animate-pulse">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-10 w-64 bg-[var(--surface-secondary)] rounded-lg mb-4"></div>
          <div className="h-6 w-96 bg-[var(--surface-secondary)] rounded-lg mb-12"></div>
        </div>
      </main>
    );
  }

  if (!matchedCategory && !isCatLoading) {
    return (
      <main className="py-20 text-center">
        <h1 className="text-3xl font-bold text-red-500">Category Not Found</h1>
        <p className="mt-4 text-[var(--muted)]">
          The requested category slug does not exist.
        </p>
      </main>
    );
  }

  const tenders = response?.data || [];
  const meta = response?.meta as any; // paginated meta properties

  return (
    <main className="py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl font-bold text-[var(--foreground)]">
          {title} Opportunities
        </h1>
        <p className="mt-4 text-lg text-[var(--muted)]">
          Explore verified procurement opportunities in the {title} sector.
        </p>

        <div className="mt-12 grid lg:grid-cols-12 gap-8">
          <div className="hidden lg:block lg:col-span-3">
            <TenderFilters
              stateId={stateId}
              setStateId={setStateId}
              selectedBudgets={selectedBudgets}
              setSelectedBudgets={setSelectedBudgets}
            />
          </div>

          <div className="lg:col-span-9">
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden w-full mb-4 px-4 py-3 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl font-semibold text-sm text-[var(--foreground)] flex items-center justify-center gap-2 hover:bg-[var(--border)] transition-all"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#003EC7] dark:text-blue-400" />
              Filter Opportunities
            </button>

            <TenderSearch search={search} setSearch={setSearch} />

            <TenderResults
              tenders={tenders}
              isLoading={isTendersLoading}
              error={error}
              categorySlug={categorySlug}
            />

            {meta && meta.totalPages > 1 && (
              <TenderPagination
                currentPage={page}
                totalPages={meta.totalPages}
                onPageChange={setPage}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile filters drawer */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          <div className="relative w-80 max-w-full bg-[var(--surface)] border-l border-[var(--border)] h-full p-6 overflow-y-auto flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[var(--foreground)]">
                Filters
              </h3>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="p-2 hover:bg-[var(--surface-secondary)] rounded-lg text-[var(--foreground)]"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <TenderFilters
              stateId={stateId}
              setStateId={setStateId}
              selectedBudgets={selectedBudgets}
              setSelectedBudgets={setSelectedBudgets}
              className="space-y-6"
            />
          </div>
        </div>
      )}
    </main>
  );
}
