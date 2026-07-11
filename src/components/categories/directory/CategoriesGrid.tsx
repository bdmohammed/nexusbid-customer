"use client";

import Link from "next/link";
import { Search, Bell } from "lucide-react";
import Button from "../../ui/Button";
import { useCategories } from "@/features/categories/api/queries";
import CategoryCard from "./CategoryCard";
import type { Category } from "@/types";

export default function CategoriesGrid() {
  const { data: categories, isLoading, error } = useCategories();

  if (isLoading) {
    return (
      <section className="pb-24 pt-15">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <div className="h-10 w-64 bg-[var(--surface-secondary)] rounded-lg animate-pulse mb-3"></div>
            <div className="h-6 w-96 bg-[var(--surface-secondary)] rounded-lg animate-pulse"></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="h-44 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-2xl animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !categories) {
    return (
      <section className="pb-24 pt-15">
        <div className="max-w-7xl mx-auto px-6 text-center py-12">
          <p className="text-red-500 font-semibold">
            Failed to load categories.
          </p>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return (
      <section className="pb-24 pt-15">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-[var(--foreground)]">
              Industry Categories
            </h2>
            <p className="mt-3 text-[var(--muted)]">
              High-density tender management across all major sectors.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-12 rounded-3xl border border-[var(--border)] bg-[var(--surface-secondary)] max-w-2xl mx-auto shadow-xs mt-8">
            <div className="w-16 h-16 rounded-full bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center mb-6">
              <Search className="w-8 h-8 text-[#003EC7] dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">
              No Active Categories Found
            </h3>
            <p className="text-[var(--muted)] text-sm max-w-md mb-8 leading-relaxed">
              We couldn't find any contract categories at the moment. Please
              check back later or set up a notification alert to get notified
              when new tenders go live.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link href="/pricing">
                <Button variant="primary" className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-white" />
                  Subscribe to Alerts
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Curated list of details/icons to map with database categories
  const categoryDetails: Record<
    string,
    { subtitle: string; icon: string; description: string }
  > = {
    construction: {
      subtitle: "Infrastructure & Civil Works",
      icon: "/categories/construction.svg",
      description: "Infrastructure, civil engineering and urban development",
    },
    "it-software": {
      subtitle: "SaaS & Infrastructure",
      icon: "/categories/software.svg",
      description: "SaaS implementation, cybersecurity and networks",
    },
    healthcare: {
      subtitle: "Clinical & Medical Logistics",
      icon: "/categories/healthcare.svg",
      description: "Medical equipment supply and pharmaceutical distribution",
    },
    government: {
      subtitle: "Municipal & State Services",
      icon: "/categories/government.svg",
      description: "SaaS implementation, cybersecurity and networks",
    },
  };

  const getDetails = (slug: string) => {
    return (
      categoryDetails[slug] || {
        subtitle: "Curated Opportunities",
        icon: "/categories/software.svg",
        description: "Find federal, state, and local contract opportunities.",
      }
    );
  };

  return (
    <section className="pb-24 pt-15">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-[var(--foreground)]">
            Industry Categories
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            High-density tender management across all major sectors.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category: Category) => {
            const details = getDetails(category.slug);
            return (
              <CategoryCard
                key={category.slug}
                title={category.name}
                slug={category.slug}
                subtitle={details.subtitle}
                icon={details.icon}
                active={category.activeTenderCount ?? 0}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
