"use client";

import React, { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useTender } from "@/features/tenders/api/queries";
import { useDownloadTender } from "@/features/tenders/api/mutations";
import { useCategories } from "@/features/categories/api/queries";

interface TenderDetailPageProps {
  params: Promise<{
    tenderId: string; // This is the tender slug
  }>;
}

export default function TenderDetailPage({ params }: TenderDetailPageProps) {
  const router = useRouter();
  const { tenderId: slug } = use(params);
  const { user } = useAuth();

  // Fetch live details
  const { data, isLoading, error } = useTender(slug);
  const downloadMutation = useDownloadTender();

  // Fetch categories to reconstruct parent hierarchy breadcrumbs
  const { data: categories } = useCategories();

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 animate-pulse space-y-8">
        <div className="h-4 w-28 bg-[var(--surface-secondary)] rounded-full"></div>
        <div className="h-12 w-2/3 bg-[var(--surface-secondary)] rounded-lg"></div>
        <div className="h-6 w-1/3 bg-[var(--surface-secondary)] rounded-lg"></div>
        <div className="grid lg:grid-cols-12 gap-8 pt-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="h-48 bg-[var(--surface-secondary)] rounded-2xl"></div>
            <div className="h-48 bg-[var(--surface-secondary)] rounded-2xl"></div>
          </div>
          <div className="lg:col-span-4">
            <div className="h-80 bg-[var(--surface-secondary)] rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-red-500">Tender Not Found</h1>
        <p className="mt-4 text-[var(--muted)]">
          This procurement opportunity does not exist or has been removed.
        </p>
        <Link
          href="/categories"
          className="mt-6 inline-block text-[#003EC7] hover:underline font-semibold"
        >
          ← Browse Categories
        </Link>
      </div>
    );
  }

  const { tender, hasAccess } = data;

  const deadlineDate = new Date(tender.deadline);
  const diffTime = deadlineDate.getTime() - Date.now();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const daysLeft = diffDays > 0 ? diffDays : 0;

  const formattedBudget = (tender.priceCents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const postedDate = new Date(tender.postedDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleDownload = async () => {
    if (!hasAccess) return;
    try {
      const downloadUrl = await downloadMutation.mutateAsync(tender.id);
      window.open(downloadUrl, "_blank");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to retrieve download link.");
    }
  };

  // Reconstruct nested category breadcrumbs from tender's category path
  const category = tender.category;
  const breadcrumbs: { name: string; href: string }[] = [];

  //@ts-ignore
  if (category && category.path && Array.isArray(categories)) {
    //@ts-ignore
    const pathCodes = category.path.split("/").filter(Boolean);
    pathCodes.forEach((code: any, index: number) => {
      const cat = categories.find((c: any) => c.code === code);
      if (cat) {
        // Accumulate slugs to build the nested URL
        const slugsUpToNow = pathCodes
          .slice(0, index + 1)
          .map((cCode: any) => {
            const match = categories.find((c: any) => c.code === cCode);
            return match ? match.slug : "";
          })
          .filter(Boolean);

        breadcrumbs.push({
          name: cat.name,
          href: `/categories/${slugsUpToNow.join("/")}`,
        });
      }
    });
  } else if (category) {
    // Fallback if path is empty or categories not loaded yet
    breadcrumbs.push({
      name: category.name,
      href: `/categories/${category.slug}`,
    });
  }

  return (
    <main className="py-12 lg:py-20 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Navigation Breadcrumbs */}
        <div className="mb-6 text-sm text-[var(--muted)] flex flex-wrap items-center">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/categories" className="hover:underline">
            Categories
          </Link>

          {breadcrumbs.map((bc, idx) => (
            <React.Fragment key={idx}>
              <span className="mx-2">/</span>
              <Link href={bc.href} className="hover:underline">
                {bc.name}
              </Link>
            </React.Fragment>
          ))}

          <span className="mx-2">/</span>
          <span className="text-[var(--text-primary)] truncate max-w-[200px] inline-block align-bottom font-medium">
            {tender.title}
          </span>
        </div>

        {/* Tender Header */}
        <section className="relative p-8 bg-[var(--surface)] border border-[var(--border)] rounded-3xl overflow-hidden shadow-sm">
          {/* Glow background */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#003EC7]/5 blur-3xl rounded-full"></div>

          <div className="relative z-10">
            <span className="bg-green-500/10 text-green-600 dark:text-green-400 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase border border-green-500/20">
              Verified Opportunity
            </span>

            <h1 className="mt-5 text-3xl lg:text-5xl font-extrabold text-[var(--foreground)] tracking-tight leading-tight max-w-4xl">
              {tender.title}
            </h1>

            <div className="mt-5 flex flex-wrap gap-4 text-sm text-[var(--muted)] font-medium">
              <span>
                Agency: <strong>{tender.agency}</strong>
              </span>
              {category && (
                <>
                  <span>•</span>
                  <span>
                    Category: <strong>{category.name}</strong>
                  </span>
                </>
              )}
              <span>•</span>
              <span>
                State:{" "}
                <strong>
                  {tender.state?.name} ({tender.state?.code})
                </strong>
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              {hasAccess ? (
                <button
                  onClick={handleDownload}
                  disabled={downloadMutation.isPending}
                  className="bg-[#003EC7] hover:bg-[#002fad] text-white px-7 py-3.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center gap-2"
                >
                  {downloadMutation.isPending ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
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
                      Preparing document...
                    </>
                  ) : (
                    "📥 Download RFP Document"
                  )}
                </button>
              ) : (
                <Link
                  href={
                    user
                      ? "/pricing"
                      : `/login?redirect=/tenders/${slug}`
                  }
                  className="bg-[#003EC7] hover:bg-[#002fad] text-white px-7 py-3.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  🔒 Unlock Details & Download RFP
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Grid Body */}
        <div className="mt-10 grid lg:grid-cols-12 gap-8">
          {/* Main content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Overview */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 relative">
              <h2 className="text-xl font-bold text-[var(--foreground)] border-b border-[var(--border)] pb-3 mb-4">
                Tender Overview
              </h2>
              {hasAccess ? (
                <p className="text-[var(--foreground)] leading-relaxed whitespace-pre-line">
                  {tender.description}
                </p>
              ) : (
                <div className="space-y-3 blur-xs select-none">
                  <p className="text-[var(--muted)]">
                    This tender involves the provision of works and materials
                    for the implementation of procurement systems as detailed by
                    the local agency guidelines. All construction standards must
                    comply with state regulations.
                  </p>
                  <p className="text-[var(--muted)]">
                    The vendor will deliver end-to-end integration and quality
                    assurance logs throughout the lifecycle of the contract.
                  </p>
                </div>
              )}
              {!hasAccess && (
                <div className="absolute inset-0 bg-[var(--surface)]/70 backdrop-blur-[2px] rounded-2xl flex flex-col items-center justify-center p-6 text-center">
                  <span className="text-3xl mb-2">🔒</span>
                  <h4 className="font-bold text-sm text-[var(--foreground)]">
                    Detailed description is locked
                  </h4>
                  <p className="text-xs text-[var(--muted)] max-w-xs mt-1">
                    Please subscribe or log in to view the complete overview and
                    specifications.
                  </p>
                </div>
              )}
            </div>

            {/* Scope of Work */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 relative">
              <h2 className="text-xl font-bold text-[var(--foreground)] border-b border-[var(--border)] pb-3 mb-4">
                Scope of Work
              </h2>
              {hasAccess ? (
                <p className="text-[var(--foreground)] leading-relaxed whitespace-pre-line">
                  {/* {tender.scopeOfWork || "No specific scope of work provided in details."} */}
                </p>
              ) : (
                <div className="space-y-3 blur-xs select-none">
                  <p className="text-[var(--muted)]">
                    1. Mobilization of engineering teams and construction equipment.
                  </p>
                  <p className="text-[var(--muted)]">
                    2. Preparation of detailed architectural diagrams and local environmental reviews.
                  </p>
                  <p className="text-[var(--muted)]">
                    3. Execution of primary concrete structural components and plumbing lines.
                  </p>
                </div>
              )}
              {!hasAccess && (
                <div className="absolute inset-0 bg-[var(--surface)]/70 backdrop-blur-[2px] rounded-2xl flex flex-col items-center justify-center p-6 text-center">
                  <span className="text-3xl mb-2">🔒</span>
                  <h4 className="font-bold text-sm text-[var(--foreground)]">
                    Scope of Work is locked
                  </h4>
                  <p className="text-xs text-[var(--muted)] max-w-xs mt-1">
                    Complete deliverables and requirements are restricted to active plan subscribers.
                  </p>
                </div>
              )}
            </div>

            {/* Requirements */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 relative">
              <h2 className="text-xl font-bold text-[var(--foreground)] border-b border-[var(--border)] pb-3 mb-4">
                Requirements & Qualifications
              </h2>
              {hasAccess ? (
                <p className="text-[var(--foreground)] leading-relaxed whitespace-pre-line">
                  {/* {tender.requirements || "No specific qualifications requirements listed."} */}
                </p>
              ) : (
                <div className="space-y-3 blur-xs select-none font-mono">
                  <p className="text-[var(--muted)]">
                    - Minimum 5 years of active state licensing in the specific domain.
                  </p>
                  <p className="text-[var(--muted)]">
                    - Underwriters Laboratory certification and bonding capacity of $1,000,000.
                  </p>
                  <p className="text-[var(--muted)]">
                    - Proof of past successful government projects within the region.
                  </p>
                </div>
              )}
              {!hasAccess && (
                <div className="absolute inset-0 bg-[var(--surface)]/70 backdrop-blur-[2px] rounded-2xl flex flex-col items-center justify-center p-6 text-center">
                  <span className="text-3xl mb-2">🔒</span>
                  <h4 className="font-bold text-sm text-[var(--foreground)]">
                    Qualifications are locked
                  </h4>
                  <p className="text-xs text-[var(--muted)] max-w-xs mt-1">
                    Vendor compliance conditions are visible to authorized subscribers only.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Procurement Details Card */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-xs">
              <h3 className="font-bold text-lg text-[var(--foreground)] border-b border-[var(--border)] pb-3 mb-4">
                Procurement Summary
              </h3>

              <div className="space-y-4">
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                    Estimated Budget
                  </span>
                  <span className="text-2xl font-extrabold text-[#003EC7]">
                    {formattedBudget}
                  </span>
                </div>

                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                    Days Remaining
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-lg font-bold text-red-500">
                      {daysLeft} Days
                    </span>
                    <span className="text-xs text-[var(--muted)]">
                      ({new Date(tender.deadline).toLocaleDateString()})
                    </span>
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                    Submission Type
                  </span>
                  <span className="text-sm font-medium text-[var(--foreground)] capitalize">
                    {tender.submissionType}
                  </span>
                </div>

                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                    Date Published
                  </span>
                  <span className="text-sm font-medium text-[var(--foreground)]">
                    {postedDate}
                  </span>
                </div>

                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                    City / Region
                  </span>
                  <span className="text-sm font-medium text-[var(--foreground)]">
                    {tender.city || "Statewide"}, {tender.state?.code}
                  </span>
                </div>
              </div>
            </div>

            {/* Locked Prompt sidebar widget */}
            {!hasAccess && (
              <div className="bg-[#003EC7]/5 border border-[#003EC7]/20 rounded-2xl p-6 text-center">
                <span className="text-4xl block mb-3">💎</span>
                <h4 className="font-extrabold text-[var(--foreground)]">
                  Upgrade to Premium
                </h4>
                <p className="text-xs text-[var(--muted)] mt-2 leading-relaxed">
                  Gain instant access to original procurement tender documents, contact email addresses, bid phone numbers, and full scope documents.
                </p>
                <Link
                  href={
                    user
                      ? "/pricing"
                      : `/login?redirect=/tenders/${slug}`
                  }
                  className="mt-5 block w-full py-3 bg-[#003EC7] hover:bg-[#002fad] text-white text-xs font-bold rounded-xl shadow-xs transition-all"
                >
                  {user ? "View Pricing Plans" : "Log In & Subscribe"}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
