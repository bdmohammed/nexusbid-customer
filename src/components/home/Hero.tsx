"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Sparkles,
  ArrowRight,
  FileText,
  Building2,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Filter,
} from "lucide-react";
import Container from "../common/Container";
import Button from "../ui/Button";
import {
  useTenders,
  useTenderStatistics,
} from "@/features/tenders/api/queries";
import { useCategories } from "@/features/categories/api/queries";

export default function Hero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;

  // Real API Queries
  const { data: categoriesData = [] } = useCategories({ status: "PUBLISHED" });
  const tendersQuery = useTenders({
    page,
    limit,
    categoryId: selectedCategory || undefined,
  });
  const { data: stats } = useTenderStatistics();

  const tendersList = Array.isArray(tendersQuery.data?.data)
    ? tendersQuery.data.data
    : Array.isArray((tendersQuery.data?.data as any)?.tenders)
      ? (tendersQuery.data!.data as any).tenders
      : [];

  const meta = tendersQuery.data?.meta as any;
  const totalPages =
    meta?.totalPages || (meta?.total ? Math.ceil(meta.total / limit) : 1);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("search", searchQuery.trim());
    if (selectedCategory) params.set("categoryId", selectedCategory);

    if (params.toString()) {
      router.push(`/tenders?${params.toString()}`);
    } else {
      router.push("/tenders");
    }
  };

  return (
    <section className="py-20 md:py-28 lg:py-32 relative overflow-hidden bg-gradient-to-b from-[var(--primary)]/5 via-[var(--background)] to-[var(--background)]">
      {/* Ambient Radial Background Globs */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-[var(--primary)]/20 to-purple-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-[var(--primary)]/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <Container>
        <div className="max-w-5xl mx-auto text-center">
          {/* Trust & Live Stats Badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-4.5 py-2 bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-md shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {stats?.totalPublished
                ? `${stats.totalPublished.toLocaleString()}+ Published Active Tenders`
                : "Trusted by 500+ Global Enterprises"}
            </span>
          </div>

          {/* Heading */}
          <h1 className="mt-4 font-extrabold tracking-[-0.03em] leading-[1.08] text-4xl md:text-6xl lg:text-7xl text-[var(--foreground)]">
            Access the World's Most
            <br />
            High-Value
            <span className="text-[var(--primary)]"> RFPs & Tenders.</span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-3xl mx-auto text-[15px] md:text-lg text-[var(--muted)] leading-relaxed">
            RFPNexa connects premium service providers with complex
            institutional procurement opportunities. Navigate a multi-billion
            dollar marketplace with surgical precision and real-time bid
            insights.
          </p>

          {/* Search Bar with Integrated Category Filter */}
          <form
            onSubmit={handleSearch}
            className="mt-10 bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-xl p-2.5 flex flex-col md:flex-row gap-2 max-w-3xl mx-auto transition-all focus-within:ring-2 focus-within:ring-[var(--primary)]"
          >
            {/* Keyword Search Input */}
            <div className="flex items-center flex-1 px-4">
              <Search size={20} className="text-gray-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by keyword, industry, or region..."
                className="flex-1 bg-transparent px-3 py-3.5 outline-none text-sm text-[var(--foreground)] placeholder-[var(--muted)]"
              />
            </div>

            {/* Category Select Dropdown */}
            <div className="flex items-center border-t md:border-t-0 md:border-l border-[var(--border)] px-3 pt-2 md:pt-0">
              <Building2 size={18} className="text-gray-400 shrink-0 ml-1" />
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setPage(1);
                }}
                className="bg-transparent px-2 py-3.5 outline-none text-xs md:text-sm text-[var(--foreground)] font-semibold cursor-pointer max-w-[180px] truncate"
              >
                <option value="" className="bg-[var(--surface)] text-[var(--foreground)] font-normal">
                  All Categories
                </option>
                {categoriesData.map((cat: any) => (
                  <option
                    key={cat.id}
                    value={cat.id}
                    className="bg-[var(--surface)] text-[var(--foreground)] font-normal"
                  >
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <Button
              type="submit"
              className="md:min-w-[170px] py-3.5 text-sm font-semibold cursor-pointer"
            >
              Search Tenders
            </Button>
          </form>

          {/* Quick Category Pills */}
          {categoriesData.length > 0 && (
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
              <span className="text-xs text-[var(--muted)] font-medium mr-1 flex items-center gap-1">
                <Filter size={12} /> Filter:
              </span>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("");
                  setPage(1);
                }}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === ""
                    ? "bg-[var(--primary)] text-white shadow-xs"
                    : "bg-[var(--surface-secondary)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                All Categories
              </button>
              {categoriesData.slice(0, 6).map((cat: any) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setPage(1);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-[var(--primary)] text-white shadow-xs"
                      : "bg-[var(--surface-secondary)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}

          {/* Tenders List with Pagination */}
          <div className="mt-12 text-left max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4 px-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[var(--primary)]" />
                <span>
                  Live Published Tenders
                  {selectedCategory && (
                    <span className="ml-1 text-[var(--primary)]">
                      (Filtered)
                    </span>
                  )}
                </span>
              </span>

              <Link
                href="/tenders"
                className="text-xs font-bold text-[var(--primary)] hover:underline flex items-center gap-1"
              >
                <span>View Full Directory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* List Container */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl shadow-lg divide-y divide-[var(--border)] overflow-hidden">
              {tendersQuery.isFetching ? (
                <div className="p-6 space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="h-16 bg-[var(--surface-secondary)] rounded-xl animate-pulse"
                    />
                  ))}
                </div>
              ) : tendersList.length === 0 ? (
                <div className="p-8 text-center text-sm text-[var(--muted)]">
                  No active tenders found for the selected filter.
                </div>
              ) : (
                tendersList.map((tender: any) => (
                  <div
                    key={tender.id || tender.slug}
                    className="p-5 hover:bg-[var(--surface-secondary)]/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                  >
                    <div className="space-y-1 max-w-xl">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-bold text-[var(--primary)] bg-[var(--primary)]/10 px-2.5 py-0.5 rounded-md border border-[var(--primary)]/20">
                          {tender.referenceNo ||
                            tender.referenceNumber ||
                            "RFP-BID"}
                        </span>
                        {tender.category?.name && (
                          <span className="text-[var(--muted)] text-[11px] font-medium flex items-center gap-1">
                            <Building2 className="w-3 h-3 shrink-0" />
                            <span>{tender.category.name}</span>
                          </span>
                        )}
                      </div>

                      <h4 className="text-base font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors leading-snug">
                        <Link href={`/tenders/${tender.slug || tender.id}`}>
                          {tender.title ||
                            tender.activeVersion?.title ||
                            "Government Procurement Tender"}
                        </Link>
                      </h4>

                      {tender.description && (
                        <p className="text-xs text-[var(--muted)] line-clamp-1">
                          {tender.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-[var(--border)]">
                      {tender.closingDate && (
                        <div className="text-right text-xs">
                          <span className="text-[var(--muted)] block text-[10px] uppercase font-semibold">
                            Closing Date
                          </span>
                          <span className="font-semibold text-[var(--foreground)] flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-[var(--muted)]" />
                            {new Date(tender.closingDate).toLocaleDateString()}
                          </span>
                        </div>
                      )}

                      <Link
                        href={`/tenders/${tender.slug || tender.id}`}
                        className="px-4 py-2 rounded-xl bg-[var(--surface-secondary)] border border-[var(--border)] text-xs font-semibold text-[var(--foreground)] group-hover:bg-[var(--primary)] group-hover:text-white group-hover:border-transparent transition-all shrink-0"
                      >
                        View RFP →
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* List Pagination Footer */}
            {totalPages > 1 && (
              <div className="mt-4 flex items-center justify-between px-2">
                <span className="text-xs text-[var(--muted)] font-medium">
                  Page <strong className="text-[var(--foreground)]">{page}</strong> of{" "}
                  <strong className="text-[var(--foreground)]">{totalPages}</strong>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="p-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--primary)] disabled:opacity-40 disabled:hover:border-[var(--border)] transition-all cursor-pointer"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page >= totalPages}
                    className="p-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--primary)] disabled:opacity-40 disabled:hover:border-[var(--border)] transition-all cursor-pointer"
                    aria-label="Next page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
