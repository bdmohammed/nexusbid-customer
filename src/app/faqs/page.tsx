import FAQAccordion from "@/components/faq/FAQAccordion";
import { HelpCircle, Mail, MessageSquare } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Frequently Asked Questions (FAQs) | RFPNexa",
  description:
    "Find answers to common questions about RFPNexa subscriptions, government contract search, RFP documents, registration, and bidding.",
};

export default function FAQsPage() {
  return (
    <main className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="pt-24 md:pt-28 lg:pt-32 pb-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-semibold uppercase tracking-wider mb-4">
            <HelpCircle className="w-4 h-4" />
            <span>Help & Knowledge Base</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--foreground)] tracking-tight">
            Frequently Asked Questions
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[var(--muted)] leading-relaxed">
            Everything you need to know about RFPNexa e-procurement services, account registration, subscription management, and RFP document access.
          </p>
        </div>
      </section>

      {/* Accordion & Search Section */}
      <section className="px-6">
        <FAQAccordion />
      </section>

      {/* Bottom Still Have Questions Banner */}
      <section className="max-w-4xl mx-auto px-6 mt-20">
        <div className="p-8 sm:p-10 rounded-3xl bg-[var(--surface-secondary)] border border-[var(--border)] text-center relative overflow-hidden">
          <div className="max-w-xl mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center mx-auto">
              <MessageSquare className="w-6 h-6" />
            </div>

            <h3 className="text-2xl font-extrabold text-[var(--foreground)] tracking-tight">
              Still Have Questions?
            </h3>

            <p className="text-sm text-[var(--muted)] leading-relaxed">
              If you couldn't find the answer to your question, our support team is available to assist with your subscriptions, purchases, or platform queries.
            </p>

            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Link
                href="/contactus"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--primary)] text-white text-sm font-semibold hover:bg-[var(--primary-hover)] transition-all shadow-md"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Support</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
