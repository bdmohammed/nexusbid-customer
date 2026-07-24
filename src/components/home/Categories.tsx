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

const getMappedCategory = (cat: Category) => {
  return {
    title: cat.name,
    slug: cat.slug,
    description: cat.description,
    openings: "View Opportunities →",
  };
};

export default function Categories() {
  const categoriesQuery = useCategories({ status: "PUBLISHED" });
  const categorySkeleton = (
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
  );

  return (
    <section className="py-24">
      <Container>
        {categoriesQuery.isFetching ? (
          categorySkeleton
        ) : (
          <QueryBoundary
            query={categoriesQuery}
            skeleton={categorySkeleton}
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
                    We couldn't find any published contract categories at the
                    moment. Please check back later or set up a notification
                    alert to get notified when new tenders go live.
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
            {(categories) => (
              <>
                <SectionHeading
                  title="Categories"
                  subtitle="Browse curated opportunities across specialized industries."
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {(categories || []).slice(0, 4).map((item: Category) => (
                    <CategoryCard
                      key={item.slug}
                      category={getMappedCategory(item)}
                    />
                  ))}
                </div>
              </>
            )}
          </QueryBoundary>
        )}
      </Container>
    </section>
  );
}
