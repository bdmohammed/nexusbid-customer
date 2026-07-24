//@ts-nocheck
"use client";

import React, { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useTender } from "@/features/tenders/api/queries";
import { useDownloadTender } from "@/features/tenders/api/mutations";
import { useCategories } from "@/features/categories/api/queries";
import { useMySubscription } from "@/features/subscriptions/api/queries";
import { getErrorMessage } from "@/lib/errors";
import {
  Calendar,
  MapPin,
  Building2,
  Lock,
  Download,
  FileText,
  CheckCircle2,
  Clock,
  ShieldAlert,
} from "lucide-react";

interface TenderDetailPageProps {
  params: Promise<{
    tenderId: string; // This is the tender slug or ID
  }>;
}

export default function TenderDetailPage({ params }: TenderDetailPageProps) {
  const router = useRouter();
  const { tenderId: slug } = use(params);
  const { user } = useAuth();

  // Fetch live details & subscription status
  const { data, isLoading, error } = useTender(slug);
  const { data: subData } = useMySubscription();
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

  if (error || !data || !data.tender) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-red-500">Tender Not Found</h1>
        <p className="mt-4 text-[var(--muted)]">
          This procurement opportunity does not exist or has been removed.
        </p>
        <Link
          href="/tenders"
          className="mt-6 inline-block text-[#003EC7] hover:underline font-semibold"
        >
          ← Browse All Tenders
        </Link>
      </div>
    );
  }

  const { tender, hasAccess } = data;

  // Deadline calculation
  const deadlineRaw = tender.deadline || tender.closingDate;
  const deadlineDate = deadlineRaw ? new Date(deadlineRaw) : null;
  const diffTime = deadlineDate ? deadlineDate.getTime() - Date.now() : 0;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const daysLeft = diffDays > 0 ? diffDays : 0;

  // Budget formatting
  const rawBudget =
    tender.priceCents !== undefined
      ? tender.priceCents / 100
      : tender.budgetMax || 0;
  const formattedBudget = rawBudget.toLocaleString("en-US", {
    style: "currency",
    currency: tender.currency || "USD",
    maximumFractionDigits: 0,
  });

  // Dates formatting
  const postedRaw = tender.postedDate || tender.openingDate || tender.createdAt;
  const postedDate = postedRaw
    ? new Date(postedRaw).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "N/A";

  const closingDateFormatted = deadlineDate
    ? deadlineDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "N/A";

  // Location & Agency
  const agencyName =
    tender.agency || tender.department || "Government Procurement Entity";
  const locationText =
    tender.formattedAddress ||
    (tender.city
      ? `${tender.city}, ${tender.state?.code || tender.state?.name}`
      : tender.state?.name || "United States");

  const handleDownload = async () => {
    if (!hasAccess) return;
    try {
      const downloadUrl = await downloadMutation.mutateAsync(tender.id);
      window.open(downloadUrl, "_blank");
    } catch (err: any) {
      alert(getErrorMessage(err) || "Failed to retrieve download link.");
    }
  };

  // Reconstruct nested category breadcrumbs
  const category = tender.category;
  const breadcrumbs: { name: string; href: string }[] = [];

  if (category) {
    breadcrumbs.push({
      name: category.name,
      href: `/tenders?category=${category.id}`,
    });
  }

  return (
    <main className="py-12 lg:py-20 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Navigation Breadcrumbs */}
        <div className="mb-6 text-sm text-[var(--muted)] flex flex-wrap items-center gap-1.5">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span>/</span>
          <Link href="/tenders" className="hover:underline">
            Tenders
          </Link>

          {breadcrumbs.map((bc, idx) => (
            <React.Fragment key={idx}>
              <span>/</span>
              <Link href={bc.href} className="hover:underline">
                {bc.name}
              </Link>
            </React.Fragment>
          ))}

          <span>/</span>
          <span className="text-[var(--foreground)] truncate max-w-[220px] inline-block font-semibold">
            {tender.title}
          </span>
        </div>

        {/* Tender Header Banner */}
        <section className="relative p-8 bg-[var(--surface)] border border-[var(--border)] rounded-3xl overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#003EC7]/5 blur-3xl rounded-full"></div>

          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="bg-green-500/10 text-green-600 dark:text-green-400 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase border border-green-500/20">
                {tender.publicationStatus ||
                  tender.status ||
                  "Verified Opportunity"}
              </span>

              <span className="text-xs font-bold text-[var(--muted)] bg-[var(--surface-secondary)] px-3 py-1 rounded-lg border border-[var(--border)] font-mono">
                Ref: {tender.referenceNumber || tender.referenceNo || "RFP-BID"}
              </span>
            </div>

            <h1 className="mt-5 text-3xl lg:text-5xl font-extrabold text-[var(--foreground)] tracking-tight leading-tight max-w-4xl">
              {tender.title}
            </h1>

            <div className="mt-5 flex flex-wrap gap-4 text-sm text-[var(--muted)] font-medium items-center">
              <span className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-[#003EC7]" />
                Agency:{" "}
                <strong className="text-[var(--foreground)]">
                  {agencyName}
                </strong>
              </span>

              {category && (
                <>
                  <span>•</span>
                  <span>
                    Category:{" "}
                    <strong className="text-[var(--foreground)]">
                      {category.name}
                    </strong>
                  </span>
                </>
              )}

              {tender.state && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-[#003EC7]" />
                    Location:{" "}
                    <strong className="text-[var(--foreground)]">
                      {tender.state.name} ({tender.state.code})
                    </strong>
                  </span>
                </>
              )}
            </div>

            <div className="mt-8 flex flex-wrap gap-4 items-center">
              {hasAccess ? (
                <button
                  onClick={handleDownload}
                  disabled={downloadMutation.isPending}
                  className="bg-[#003EC7] hover:bg-[#002fad] text-white px-7 py-3.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  {downloadMutation.isPending
                    ? "Preparing document..."
                    : "Download Full Specification PDF"}
                </button>
              ) : subData?.subscription?.status === "ACTIVE" ? (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 w-full max-w-2xl">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-bold text-xs">
                      <Lock className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>Subscription Scope Limit</span>
                    </div>
                    <p className="text-xs text-[var(--muted)] leading-relaxed">
                      Your active plan (
                      <strong>
                        {subData.subscription.planVersion?.name ||
                          "Targeted Plan"}
                      </strong>
                      ) does not cover this tender's location or category.
                    </p>
                  </div>
                  <Link
                    href="/pricing"
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-all shrink-0 cursor-pointer"
                  >
                    View Plan Options
                  </Link>
                </div>
              ) : (
                <Link
                  href={user ? "/pricing" : `/login?redirect=/tenders/${slug}`}
                  className="bg-[#003EC7] hover:bg-[#002fad] text-white px-7 py-3.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <Lock className="w-4 h-4 text-yellow-300" />
                  <span>Unlock Details & Download RFP</span>
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Main Details Grid */}
        <div className="mt-10 grid lg:grid-cols-12 gap-8 items-start">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Overview */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 relative shadow-xs">
              <h2 className="text-xl font-bold text-[var(--foreground)] border-b border-[var(--border)] pb-3 mb-4">
                Tender Overview & Description
              </h2>
              <p className="text-[var(--foreground)] leading-relaxed whitespace-pre-line text-sm sm:text-base">
                {tender.description ||
                  "No description provided for this tender."}
              </p>
            </div>

            {/* Eligibility & Conditions */}
            {(tender.eligibility || tender.specialConditions) && (
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-xs space-y-6">
                {tender.eligibility && (
                  <div>
                    <h3 className="text-lg font-bold text-[var(--foreground)] border-b border-[var(--border)] pb-2 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span>Eligibility Criteria</span>
                    </h3>
                    <p className="text-sm text-[var(--foreground)] leading-relaxed">
                      {tender.eligibility}
                    </p>
                  </div>
                )}

                {tender.specialConditions && (
                  <div>
                    <h3 className="text-lg font-bold text-[var(--foreground)] border-b border-[var(--border)] pb-2 mb-3 flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 text-amber-500" />
                      <span>Special Conditions</span>
                    </h3>
                    <p className="text-sm text-[var(--foreground)] leading-relaxed">
                      {tender.specialConditions}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Documents Section */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 relative shadow-xs">
              <h2 className="text-xl font-bold text-[var(--foreground)] border-b border-[var(--border)] pb-3 mb-4 flex items-center justify-between">
                <span>Specification Documents</span>
                <span className="text-xs font-normal text-[var(--muted)]">
                  {tender.documents?.length || 0} File(s)
                </span>
              </h2>

              {tender.documents && tender.documents.length > 0 ? (
                <div className="space-y-3">
                  {tender.documents.map((doc: any) => (
                    <div
                      key={doc.id}
                      className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)]/50 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-6 h-6 text-[#003EC7] shrink-0" />
                        <div>
                          <h5 className="text-sm font-bold text-[var(--foreground)]">
                            {doc.originalName ||
                              doc.documentType ||
                              "Tender Specification PDF"}
                          </h5>
                          <span className="text-xs text-[var(--muted)]">
                            {doc.fileSize
                              ? `${(doc.fileSize / 1024 / 1024).toFixed(2)} MB`
                              : "Official PDF"}{" "}
                            • Status: {doc.virusScanStatus || "Clean"}
                          </span>
                        </div>
                      </div>

                      {hasAccess ? (
                        <button
                          onClick={handleDownload}
                          className="px-4 py-2 bg-[#003EC7] text-white text-xs font-bold rounded-lg hover:bg-[#002fad] transition-all cursor-pointer"
                        >
                          Download
                        </button>
                      ) : (
                        <span className="text-xs font-bold text-amber-600 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-md flex items-center gap-1">
                          <Lock className="w-3 h-3" /> Locked
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[var(--muted)]">
                  No public documents uploaded for this tender specification
                  yet.
                </p>
              )}

              {!hasAccess && (
                <div className="mt-6 p-4 rounded-xl bg-[#003EC7]/5 border border-[#003EC7]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-left">
                    <h5 className="text-sm font-bold text-[var(--foreground)]">
                      Want to download official RFP specification files &
                      contact emails?
                    </h5>
                    <p className="text-xs text-[var(--muted)]">
                      Subscribe to an active RFPNexa membership plan to get
                      instant unrestricted access.
                    </p>
                  </div>
                  <Link
                    href={
                      user ? "/pricing" : `/login?redirect=/tenders/${slug}`
                    }
                    className="px-5 py-2.5 bg-[#003EC7] hover:bg-[#002fad] text-white text-xs font-bold rounded-xl whitespace-nowrap"
                  >
                    Subscribe Now
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Info Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Summary Card */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-xs space-y-5">
              <h3 className="font-bold text-lg text-[var(--foreground)] border-b border-[var(--border)] pb-3">
                Key Procurement Metrics
              </h3>

              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                  Estimated Budget
                </span>
                <span className="text-3xl font-extrabold text-[#003EC7]">
                  {formattedBudget}
                </span>
              </div>

              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-1">
                  Time Remaining
                </span>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20 font-bold text-sm">
                    {daysLeft} Days Left
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-[var(--border)] text-xs font-medium text-[var(--foreground)]">
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Opening Date:</span>
                  <span className="font-bold">{postedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Closing Date:</span>
                  <span className="font-bold">{closingDateFormatted}</span>
                </div>
                {tender.procurementType && (
                  <div className="flex justify-between">
                    <span className="text-[var(--muted)]">
                      Procurement Type:
                    </span>
                    <span className="font-bold capitalize">
                      {tender.procurementType}
                    </span>
                  </div>
                )}
                {tender.bidValidity && (
                  <div className="flex justify-between">
                    <span className="text-[var(--muted)]">Bid Validity:</span>
                    <span className="font-bold">{tender.bidValidity} Days</span>
                  </div>
                )}
                {tender.emdAmount !== undefined && tender.emdAmount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-[var(--muted)]">EMD Amount:</span>
                    <span className="font-bold">
                      ${tender.emdAmount.toLocaleString()}
                    </span>
                  </div>
                )}
                {tender.siteVisitRequired && (
                  <div className="flex justify-between text-amber-600 dark:text-amber-400">
                    <span>Site Visit Required:</span>
                    <span className="font-bold">Yes</span>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Person Card */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-xs relative">
              <h3 className="font-bold text-lg text-[var(--foreground)] border-b border-[var(--border)] pb-3 mb-4">
                Contact & Nodal Officer
              </h3>

              {hasAccess ? (
                <div className="space-y-3 text-sm text-[var(--foreground)]">
                  <div>
                    <span className="text-xs text-[var(--muted)] block">
                      Contact Person
                    </span>
                    <span className="font-bold">
                      {tender.contactPerson || "Procurement Officer"}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-[var(--muted)] block">
                      Email Address
                    </span>
                    <span className="font-bold text-[#003EC7]">
                      {tender.contactEmail || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-[var(--muted)] block">
                      Phone Number
                    </span>
                    <span className="font-bold">
                      {tender.contactPhone || "N/A"}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h5 className="font-bold text-sm text-[var(--foreground)]">
                    Contact Details Locked
                  </h5>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">
                    Official officer email IDs, direct phone extensions, and
                    contact names are visible exclusively to subscribed members.
                  </p>
                  <Link
                    href={
                      user ? "/pricing" : `/login?redirect=/tenders/${slug}`
                    }
                    className="mt-2 block w-full py-2.5 bg-[#003EC7] text-white text-xs font-bold rounded-xl shadow-xs"
                  >
                    Unlock Officer Contacts
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
