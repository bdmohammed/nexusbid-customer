"use client";

import Link from "next/link";
import { Search, Bell } from "lucide-react";
import Button from "../ui/Button";
import { useCategories } from "@/features/categories/api/queries";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import CategoryCard from "./CategoryCard";
import { Category } from "@/types";
import { QueryBoundary } from "@/components/query";

export default function Categories() {
  const categoriesQuery = useCategories();

  const getMappedCategory = (cat: Category) => {
    const descriptions: Record<string, string> = {
      construction: "Infrastructure, civil engineering and urban development",
      "it-software": "SaaS implementation, cybersecurity and networks",
      healthcare: "Medical equipment supply and pharmaceutical distribution",
      government: "Municipal and regional administrative operations",
    };

    return {
      title: cat.name,
      slug: cat.slug,
      description:
        descriptions[cat.slug] || "Find federal, state, and local contracts.",
      openings: "View Opportunities →",
    };
  };

  return (
    <section className="py-24">
      <Container>
        <QueryBoundary
          query={categoriesQuery}
          skeleton={
            <>
              <SectionHeading
                title="Categories"
                subtitle="Browse curated opportunities across specialized industries."
              />
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-44 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl animate-pulse"
                  ></div>
                ))}
              </div>
            </>
          }
          empty={
            <>
              <SectionHeading
                title="Categories"
                subtitle="Browse curated opportunities across specialized industries."
              />
              <div className="flex flex-col items-center justify-center text-center p-12 rounded-3xl border border-[var(--border)] bg-[var(--surface-secondary)] max-w-2xl mx-auto shadow-xs mt-8">
                <div className="w-16 h-16 rounded-full bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center mb-6">
                  <Search className="w-8 h-8 text-[#003EC7] dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">
                  No Active Categories Found
                </h3>
                <p className="text-[var(--muted)] text-sm max-w-md mb-8 leading-relaxed">
                  We couldn't find any contract categories at the moment. Please
                  check back later or set up a notification alert to get
                  notified when new tenders go live.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                  <Link href="/pricing">
                    <Button
                      variant="primary"
                      className="flex items-center gap-2"
                    >
                      <Bell className="w-4 h-4 text-white" />
                      Subscribe to Alerts
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          }
        >
          {(response) => (
            <>
              <SectionHeading
                title={
                  <span className="inline-flex items-center gap-3">
                    <span>Categories</span>
                    {categoriesQuery.isFetching && (
                      <svg
                        className="animate-spin h-5 w-5 text-[#003EC7] shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-label="Loading"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    )}
                  </span>
                }
                subtitle="Browse curated opportunities across specialized industries."
              />

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {response.slice(0, 4).map((item: Category) => (
                  <CategoryCard
                    key={item.slug}
                    category={getMappedCategory(item)}
                  />
                ))}
              </div>
            </>
          )}
        </QueryBoundary>
      </Container>
    </section>
  );
}
