import { Mail, Search, Trophy, Clock, CheckCircle2 } from "lucide-react";

export default function HowWeWork() {
  return (
    <section id="how-we-work" className="py-20 lg:py-28 relative bg-[var(--surface-secondary)]/50 border-y border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-semibold uppercase tracking-wider mb-4">
            <Clock className="w-4 h-4" />
            <span>How We Work</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--foreground)] tracking-tight">
            We Help You Discover Opportunities...
          </h2>
        </div>

        {/* High-Impact Alert Card */}
        <div className="mb-16 p-8 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-br from-[var(--primary)] via-[var(--primary-hover)] to-blue-900 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/15 backdrop-blur-md mb-6">
              <Clock className="w-8 h-8 text-amber-300" />
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-snug tracking-tight text-white mb-6">
              "The average lifespan of government bids is 10 business days.{" "}
              <span className="text-amber-300 underline decoration-amber-300 decoration-wavy underline-offset-8">
                Stop finding out about them on day 11.
              </span>
              "
            </h3>

            <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              RFPNexa was created to help you discover Federal, state, and local contracting
              opportunities the same day they are announced. RFPNexa is a comprehensive,
              constantly updated database of government business opportunities that lets you swiftly
              and near effortlessly connect with relevant bid requests and bid specifications.
            </p>
          </div>
        </div>

        {/* 3 Core Pillars Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1: Mail Symbol */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Mail className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-bold text-[var(--foreground)] mb-3 flex items-center gap-2">
                <span>Direct Inbox Delivery</span>
              </h3>

              <p className="text-[var(--muted)] text-sm sm:text-base leading-relaxed">
                Email notifications of relevant, customized bid opportunities across the US and Canada.
                Bid specification documents delivered directly to your inbox.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--border)] flex items-center text-xs font-semibold text-[var(--primary)] gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--success)]" />
              <span>Instant Specification Alerts</span>
            </div>
          </div>

          {/* Card 2: Search Symbol */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Search className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">
                111,000+ Entity Sweep Network
              </h3>

              <p className="text-[var(--muted)] text-sm sm:text-base leading-relaxed">
                Real-time comprehensive coverage network of over 111,000 entities across the USA,
                continuously updated to capture every active tender.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--border)] flex items-center text-xs font-semibold text-[var(--primary)] gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--success)]" />
              <span>Real-Time USA Network</span>
            </div>
          </div>

          {/* Card 3: Win More */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Trophy className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">
                Win More Contracts
              </h3>

              <p className="text-[var(--muted)] text-sm sm:text-base leading-relaxed">
                An essential tool to help you access USA public opportunities — and win more of them
                by submitting well-thought proposals ahead of competitors.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--border)] flex items-center text-xs font-semibold text-[var(--primary)] gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--success)]" />
              <span>Higher Bid Success Rate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
