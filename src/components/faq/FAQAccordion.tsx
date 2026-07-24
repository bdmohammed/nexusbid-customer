"use client";

import React, { useState } from "react";
import { faqsData } from "@/data/faq";
import { ChevronDown, Search, HelpCircle, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FAQAccordion() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [openIds, setOpenIds] = useState<string[]>(["how-we-work", "try-before-subscribe"]);

  const categories = ["All", "General", "Account & Trial", "Bidding & Guarantees", "Support & Purchases", "Subscriptions"];

  const toggleOpen = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = faqsData.filter((faq) => {
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search & Category Bar */}
      <div className="mb-10 space-y-6">
        <div className="relative max-w-xl mx-auto">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs (e.g. subscription, cancel, register...)"
            className="w-full h-13 pl-12 pr-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] text-sm shadow-sm focus:outline-hidden focus:ring-2 focus:ring-[var(--primary)] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[var(--muted)] hover:text-[var(--foreground)] cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-[var(--primary)] text-white shadow-md"
                  : "bg-[var(--surface-secondary)] text-[var(--muted)] hover:text-[var(--foreground)] border border-[var(--border)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-16 bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8">
            <HelpCircle className="w-12 h-12 text-[var(--muted)] mx-auto mb-3 opacity-50" />
            <h3 className="text-lg font-bold text-[var(--foreground)]">No matching FAQs found</h3>
            <p className="text-xs text-[var(--muted)] mt-1">Try refining your search terms or view all categories.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              className="mt-4 px-5 py-2 rounded-xl bg-[var(--primary)] text-white text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq, index) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-[var(--surface)] border-[var(--primary)]/40 shadow-lg ring-1 ring-[var(--primary)]/20"
                    : "bg-[var(--surface)] border-[var(--border)] hover:border-[var(--primary)]/30"
                }`}
              >
                <button
                  onClick={() => toggleOpen(faq.id)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 font-semibold text-base sm:text-lg text-[var(--foreground)] cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <span>{faq.question}</span>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--foreground)] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-[var(--primary)] text-white border-transparent" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-[var(--border)]/60 text-sm leading-relaxed text-[var(--muted)] space-y-4 animate-in fade-in duration-200">
                    {faq.answer.split("\n\n").map((paragraph, pIdx) => (
                      <p key={pIdx} className="text-[var(--foreground)]/80">
                        {paragraph}
                      </p>
                    ))}

                    {faq.bullets && faq.bullets.length > 0 && (
                      <ul className="space-y-2.5 mt-4 p-4 rounded-xl bg-[var(--surface-secondary)]/60 border border-[var(--border)]">
                        {faq.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--foreground)]">
                            <CheckCircle2 className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {faq.links && (
                      <div className="flex flex-wrap gap-3 pt-2">
                        {faq.links.map((link) => (
                          <Link
                            key={link.label}
                            href={link.href}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold hover:bg-[var(--primary)] hover:text-white transition-all"
                          >
                            <span>{link.label}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
