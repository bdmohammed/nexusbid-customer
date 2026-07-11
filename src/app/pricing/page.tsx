"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import PricingHero from "@/components/pricing/PricingHero";
import PricingComparison from "@/components/pricing/PricingComparison";
import PricingFAQ from "@/components/pricing/PricingFAQ";
import PricingCTA from "@/components/pricing/PricingCTA";
import {
  Sparkles,
  Building,
  Globe,
  Bookmark,
  Layers,
  Check,
  AlertCircle,
} from "lucide-react";
import {
  useMySubscription,
  usePlans,
} from "@/features/subscriptions/api/queries";
import { useCategories } from "@/features/categories/api/queries";
import { useCountries, useStates } from "@/features/state/api/queries";
import {
  useCancelSubscription,
  useCreateSubscription,
} from "@/features/subscriptions/api/mutations";

export default function PricingPage() {
  const router = useRouter();
  const { user } = useAuth();

  const { data: plans, isLoading: isPlansLoading } = usePlans();
  const { data: subData, isLoading: isSubLoading } = useMySubscription();
  const { data: categories } = useCategories();
  const { data: states } = useStates({ limit: 100 });
  const { data: countries } = useCountries();

  const checkoutMutation = useCreateSubscription();
  const cancelMutation = useCancelSubscription();

  const [activeTab, setActiveTab] = useState<
    "all-access" | "state" | "country" | "category" | "bundle"
  >("all-access");

  // Selection states for targeted plans
  const [selectedStateId, setSelectedStateId] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Set default selection values when data loads
  useEffect(() => {
    if (states && states.length > 0 && !selectedStateId) {
      setSelectedStateId(states[0].id);
    }
  }, [states, selectedStateId]);

  useEffect(() => {
    if (countries && countries.length > 0 && !selectedCountry) {
      setSelectedCountry(countries[0]);
    }
  }, [countries, selectedCountry]);

  useEffect(() => {
    console.log("categories", categories);
    if (categories && categories.length > 0 && !selectedCategoryId) {
      setSelectedCategoryId(categories[0].id);
    }
  }, [categories, selectedCategoryId]);

  const handleSubscribe = async (
    planId: string,
    planType: string,
    bundleSize: number | null,
  ) => {
    setErrorMessage(null);
    if (!user) {
      router.push(`/login?redirect=/pricing`);
      return;
    }

    // Validation checks for targeted plan options
    if (planType === "state" && !selectedStateId) {
      setErrorMessage("Please select a target State for your subscription.");
      return;
    }
    if (planType === "country" && !selectedCountry) {
      setErrorMessage("Please select a target Country for your subscription.");
      return;
    }
    if (planType === "category" && !selectedCategoryId) {
      setErrorMessage("Please select a target Category for your subscription.");
      return;
    }
    if (planType === "bundle") {
      if (selectedCategoryIds.length === 0) {
        setErrorMessage(
          "Please select at least one Category for your custom bundle.",
        );
        return;
      }
      if (bundleSize && selectedCategoryIds.length > bundleSize) {
        setErrorMessage(
          `You can select at most ${bundleSize} categories for this bundle.`,
        );
        return;
      }
    }

    try {
      const returnUrl = `${window.location.origin}/dummy-paypal-approve`;
      const cancelUrl = `${window.location.origin}/pricing`;

      const payload = {
        planId,
        returnUrl,
        cancelUrl,
        targetStateId: planType === "state" ? selectedStateId : undefined,
        targetCountry: planType === "country" ? selectedCountry : undefined,
        targetCategoryId:
          planType === "category" ? selectedCategoryId : undefined,
        selectedCategoryIds:
          planType === "bundle" ? selectedCategoryIds : undefined,
      };

      const res = await checkoutMutation.mutateAsync(payload);

      // Redirect user to the PayPal approval URL
      if (res.approvalUrl) {
        window.location.href = res.approvalUrl;
      }
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || "Failed to start checkout process.",
      );
    }
  };

  const handleCancel = async () => {
    if (
      !confirm(
        "Are you sure you want to cancel your current subscription? You will lose access to premium documents instantly.",
      )
    ) {
      return;
    }
    try {
      await cancelMutation.mutateAsync();
      alert("Subscription cancelled successfully.");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to cancel subscription.");
    }
  };

  const activePlanId = subData?.subscription?.planId || null;
  const filteredPlans =
    plans?.filter((p: any) => p.planType === activeTab) || [];

  const handleCategoryCheckboxChange = (
    catId: string,
    bundleSize: number | null,
  ) => {
    setSelectedCategoryIds((prev) => {
      if (prev.includes(catId)) {
        return prev.filter((id) => id !== catId);
      } else {
        if (bundleSize && prev.length >= bundleSize) {
          alert(
            `You can select at most ${bundleSize} categories for this bundle.`,
          );
          return prev;
        }
        return [...prev, catId];
      }
    });
  };

  return (
    <main className="bg-[var(--background)]">
      <PricingHero />

      {/* Pricing Navigation / Tabbing Interface */}
      <section className="py-12 border-b border-[var(--border)] bg-[var(--surface-secondary)]/50 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              {
                id: "all-access",
                label: "All-Access",
                icon: <Sparkles className="w-4 h-4" />,
              },
              {
                id: "state",
                label: "State-Specific",
                icon: <Building className="w-4 h-4" />,
              },
              {
                id: "country",
                label: "Country-Specific",
                icon: <Globe className="w-4 h-4" />,
              },
              {
                id: "category",
                label: "Category-Specific",
                icon: <Bookmark className="w-4 h-4" />,
              },
              {
                id: "bundle",
                label: "Custom Bundles",
                icon: <Layers className="w-4 h-4" />,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setErrorMessage(null);
                  setSelectedCategoryIds([]);
                }}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 shadow-sm
                  ${
                    activeTab === tab.id
                      ? "bg-[#003EC7] text-white shadow-md transform -translate-y-0.5"
                      : "bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--surface-secondary)]"
                  }
                `}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Targeted Subscriptions Options Configurator */}
      {activeTab !== "all-access" && (
        <section className="pt-12 pb-6">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 shadow-sm">
              <h4 className="text-xl font-extrabold text-[var(--foreground)] mb-3 flex items-center gap-2">
                Configure Your Plan Options
              </h4>
              <p className="text-sm text-[var(--muted)] mb-6">
                Choose the specific location or industry sectors you wish to
                monitor. Targeted plans allow you to pay only for what you need.
              </p>

              {activeTab === "state" && (
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                    Target US State / Territory
                  </label>
                  <select
                    value={selectedStateId}
                    onChange={(e) => setSelectedStateId(e.target.value)}
                    className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3.5 text-sm text-[var(--foreground)] focus:ring-2 focus:ring-[#003EC7]"
                  >
                    {states?.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.code}) - {s.type}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {activeTab === "country" && (
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                    Target Country
                  </label>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3.5 text-sm text-[var(--foreground)] focus:ring-2 focus:ring-[#003EC7]"
                  >
                    {countries?.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {activeTab === "category" && (
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                    Target Industry Category
                  </label>
                  <select
                    value={selectedCategoryId}
                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                    className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3.5 text-sm text-[var(--foreground)] focus:ring-2 focus:ring-[#003EC7]"
                  >
                    {categories?.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.activeTenderCount || 0} active tenders)
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {activeTab === "bundle" && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                      Select Categories
                    </label>
                    <span className="text-xs bg-[#003EC7]/10 text-[#003EC7] px-3 py-1 rounded-full font-bold">
                      Selected: {selectedCategoryIds.length} categories
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto border border-[var(--border)] p-4 rounded-2xl bg-[var(--background)]">
                    {categories?.map((cat) => (
                      <label
                        key={cat.id}
                        className={`
                          flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 text-sm
                          ${
                            selectedCategoryIds.includes(cat.id)
                              ? "border-[#003EC7] bg-[#003EC7]/5 text-[#003EC7] font-bold"
                              : "border-[var(--border)] hover:bg-[var(--surface-secondary)] text-[var(--foreground)]"
                          }
                        `}
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategoryIds.includes(cat.id)}
                          onChange={() =>
                            handleCategoryCheckboxChange(cat.id, 20)
                          }
                          className="w-4 h-4 rounded text-[#003EC7] focus:ring-[#003EC7]"
                        />
                        <span className="truncate">{cat.name}</span>
                      </label>
                    ))}
                  </div>
                  <p className="text-xs text-[var(--muted)] italic">
                    Note: Your custom bundle discount increases as you add more
                    categories (up to 30% discount!). Make sure you pick a
                    bundle plan below that fits your selected count.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Pricing Cards Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          {errorMessage && (
            <div className="max-w-4xl mx-auto mb-8 bg-red-500/10 border border-red-500/20 text-red-600 p-4 rounded-2xl text-sm font-medium flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {isPlansLoading || isSubLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-[480px] bg-[var(--surface-secondary)] border border-[var(--border)] rounded-3xl animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch justify-center">
              {filteredPlans.map((plan: any) => {
                const isActive = activePlanId === plan.id;

                // Original and final pricing calculation
                const finalPriceCents =
                  plan.discountPercentage > 0
                    ? Math.round(
                        plan.priceCents * (1 - plan.discountPercentage / 100),
                      )
                    : plan.priceCents;

                const billingFrequency =
                  plan.durationDays === 365 ? "yr" : "mo";
                const hasDiscount = plan.discountPercentage > 0;
                const hasTrial = plan.trialDays > 0;

                // Feature points based on plan type
                const features: string[] = [];
                if (plan.planType === "all-access") {
                  features.push("Full access to all US States & Territories");
                  features.push("Full access to all Federal tenders");
                  features.push(
                    "Unlimited downloads of original RFP documents",
                  );
                } else if (plan.planType === "state") {
                  features.push("Monitored alerts for your chosen state");
                  features.push("Full document access in targeted state");
                } else if (plan.planType === "country") {
                  features.push(
                    `Exclusive access to targeted international RFPs`,
                  );
                  features.push("Localized bidding updates and documents");
                } else if (plan.planType === "category") {
                  features.push(
                    "Monitored alerts for selected industry category",
                  );
                  features.push("Unlimited downloads in the chosen sector");
                } else if (plan.planType === "bundle") {
                  features.push(
                    `Monitor up to ${plan.bundleSize} specific categories`,
                  );
                  features.push(
                    "Flexible customization at a bulk discount rate",
                  );
                }

                features.push("Email notification alerts");
                features.push(
                  plan.features?.support === "priority"
                    ? "Priority support response"
                    : "Standard email support",
                );

                return (
                  <div
                    key={plan.id}
                    className={`
                      relative rounded-3xl p-8 flex flex-col border transition-all duration-300 bg-[var(--surface)] hover:shadow-lg
                      ${
                        isActive
                          ? "border-2 border-green-500 shadow-md"
                          : plan.planType === "all-access" &&
                              plan.durationDays === 365
                            ? "border-2 border-[#003EC7] shadow-md"
                            : "border-[var(--border)]"
                      }
                    `}
                  >
                    {plan.planType === "all-access" &&
                      plan.durationDays === 365 && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#003EC7] text-white text-[10px] uppercase px-4 py-1 rounded-full font-extrabold tracking-wider">
                          BEST VALUE
                        </div>
                      )}
                    {isActive && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] uppercase px-4 py-1 rounded-full font-extrabold tracking-wider">
                        ACTIVE SUBSCRIPTION
                      </div>
                    )}

                    <h3 className="text-2xl font-extrabold text-[var(--foreground)] capitalize flex items-center gap-2">
                      {plan.name}
                    </h3>

                    {/* Trial / Discount Badges */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {hasTrial && (
                        <span className="text-[10px] bg-amber-500/10 text-amber-600 px-2.5 py-0.5 rounded-full font-bold border border-amber-500/25">
                          🎁 {plan.trialDays}-Day Free Trial
                        </span>
                      )}
                      {hasDiscount && (
                        <span className="text-[10px] bg-red-500/10 text-red-600 px-2.5 py-0.5 rounded-full font-bold border border-red-500/25 animate-pulse">
                          🔥 {plan.discountPercentage}% Off
                        </span>
                      )}
                    </div>

                    <div className="mt-6 flex items-baseline">
                      <span className="text-5xl font-extrabold text-[var(--foreground)]">
                        ${(finalPriceCents / 100).toFixed(2)}
                      </span>
                      <span className="text-[var(--muted)] ml-2 text-sm">
                        /{billingFrequency}
                      </span>
                      {hasDiscount && (
                        <span className="text-[var(--muted)] ml-3 text-sm line-through">
                          ${(plan.priceCents / 100).toFixed(2)}
                        </span>
                      )}
                    </div>

                    <ul className="mt-8 space-y-4 flex-1 text-sm text-[var(--foreground)]">
                      {features.map((item) => (
                        <li key={item} className="flex items-center gap-3">
                          <Check className="w-4 h-4 text-green-500 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {isActive ? (
                      <div className="mt-8 space-y-3">
                        <div className="w-full py-3.5 text-center bg-green-500/10 text-green-600 font-bold rounded-xl border border-green-500/20 text-sm">
                          ✓ Current Active Plan
                        </div>
                        <button
                          onClick={handleCancel}
                          disabled={cancelMutation.isPending}
                          className="w-full py-3 text-xs font-bold text-red-500 hover:text-red-700 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 rounded-xl transition-all"
                        >
                          {cancelMutation.isPending
                            ? "Cancelling..."
                            : "Cancel Subscription"}
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() =>
                          handleSubscribe(
                            plan.id,
                            plan.planType,
                            plan.bundleSize,
                          )
                        }
                        disabled={checkoutMutation.isPending}
                        className={`
                          mt-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-sm
                          ${
                            plan.planType === "all-access" &&
                            plan.durationDays === 365
                              ? "bg-[#003EC7] hover:bg-[#002fad] text-white hover:shadow-md"
                              : "border border-[var(--border)] text-[var(--foreground)] hover:border-[#003EC7] hover:text-[#003EC7] hover:bg-[var(--surface-secondary)]"
                          }
                        `}
                      >
                        {checkoutMutation.isPending
                          ? "Initiating..."
                          : `Subscribe to ${plan.name}`}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <PricingComparison />
      <PricingFAQ />
      <PricingCTA />
    </main>
  );
}
