import { Mail, Phone, MessageSquare } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="pt-24 md:pt-28 lg:pt-32 pb-10">
      <div className="max-w-7xl mx-auto px-6 text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-semibold uppercase tracking-wider mb-4">
          <MessageSquare className="w-4 h-4" />
          <span>Contact Us</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--foreground)] tracking-tight">
          Get in Touch With Us
        </h1>

        <p className="mt-4 text-base sm:text-lg text-[var(--muted)] leading-relaxed">
          Have a query about subscriptions, tenders, or our services? Our team
          is here to help. Reach us by phone, email, or fill out the form below.
        </p>

        {/* Quick Contact Badges */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <a
            href="tel:+12121212121"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[var(--surface)] border border-[var(--border)] text-sm font-medium text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all shadow-xs"
          >
            <Phone className="w-4 h-4 text-[var(--primary)]" />
            <span>Sales: +1 (212) 121-2121</span>
          </a>

          <a
            href="mailto:Info@rfpnexa.com"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[var(--surface)] border border-[var(--border)] text-sm font-medium text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all shadow-xs"
          >
            <Mail className="w-4 h-4 text-[var(--primary)]" />
            <span>Email: Info@rfpnexa.com</span>
          </a>
        </div>
      </div>
    </section>
  );
}
