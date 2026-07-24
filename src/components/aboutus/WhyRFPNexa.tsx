import { Zap, Compass, Unlock, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function WhyRFPNexa() {
  const reasons = [
    {
      icon: Zap,
      accentColor: "bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-900",
      title: "Maximum Time to Compile Your Winning Bid",
      subtitle: "We tell you about government contract opportunities as soon as they are issued.",
      description:
        "This gives you the longest time possible in which to compile your bid. More time means you can put more thought into it, thereby increasing the likelihood that you will produce the winning bid.",
      highlight: "Longest preparation window",
    },
    {
      icon: Compass,
      accentColor: "bg-indigo-500/10 text-indigo-600 border-indigo-200 dark:border-indigo-900",
      title: "Exhaustive Daily Sweeps",
      subtitle: "We also tell you about government contract opportunities you might otherwise overlook.",
      description:
        "To make sure you never miss an opportunity, we perform an exhaustive, continual daily sweep of all the possible places where new federal, state, and local RFPs might be announced. When we find them, we immediately make them available to you.",
      highlight: "Zero missed RFPs",
    },
    {
      icon: Unlock,
      accentColor: "bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-900",
      title: "Unrestricted Data Access",
      subtitle: "We enable you to gain access to almost every government contract opportunity you pursue.",
      description:
        "You won’t be told that public data you need in order to qualify a bid request’s terms or specifications are inaccessible or unavailable. The doors open wide for you when you rely on RFPNexa.",
      highlight: "Complete specification access",
    },
  ];

  return (
    <section className="py-20 lg:py-28 relative bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>Why RFPNexa?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--foreground)] tracking-tight leading-tight">
            You want government contracts — lucrative ones.{" "}
            <span className="text-[var(--primary)] block mt-2">
              RFPNexa helps you win them.
            </span>
          </h2>
        </div>

        {/* 3 Detailed Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 lg:p-10 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${item.accentColor} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-[var(--surface-secondary)] text-[var(--muted)] border border-[var(--border)]">
                      {item.highlight}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-sm font-semibold text-[var(--primary)] mb-4 leading-relaxed">
                    {item.subtitle}
                  </p>

                  <p className="text-[var(--muted)] text-sm sm:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[var(--border)] flex items-center justify-between relative z-10">
                  <span className="text-xs font-medium text-[var(--muted)]">
                    Pillar 0{idx + 1}
                  </span>
                  <Link
                    href="/bids"
                    className="text-xs font-bold text-[var(--primary)] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Find Bids</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
