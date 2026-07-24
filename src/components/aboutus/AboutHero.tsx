import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bell, Building2 } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="pt-24 md:pt-28 lg:pt-32 pb-16 lg:pb-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-semibold uppercase tracking-wider mb-6">
              <Building2 className="w-4 h-4" />
              <span>About RFPNexa</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-[var(--foreground)]">
              We are collecting government business opportunities.{" "}
              <span className="text-[var(--primary)] block mt-2">
                We are happy to serve you.
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-[var(--muted)] leading-relaxed">
              RFPNexa is a comprehensive, constantly updated database of government
              business opportunities that lets you swiftly and near effortlessly
              connect with relevant bid requests and bid specifications.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/bids"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-all shadow-md hover:shadow-lg gap-2"
              >
                <span>Explore Opportunities</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#how-we-work"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] font-medium hover:bg-[var(--surface-secondary)] transition-all"
              >
                How We Work
              </a>
            </div>

            {/* Quick stats pills */}
            <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-[var(--border)]">
              <div>
                <h4 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)]">
                  111,000+
                </h4>
                <p className="text-xs sm:text-sm text-[var(--muted)] mt-1">
                  US Entities Covered
                </p>
              </div>
              <div>
                <h4 className="text-2xl sm:text-3xl font-extrabold text-[var(--primary)]">
                  Day 1
                </h4>
                <p className="text-xs sm:text-sm text-[var(--muted)] mt-1">
                  Same-Day Discovery
                </p>
              </div>
              <div>
                <h4 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)]">
                  US & CAN
                </h4>
                <p className="text-xs sm:text-sm text-[var(--muted)] mt-1">
                  Nationwide Scope
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto rounded-3xl overflow-hidden shadow-2xl border border-[var(--border)] bg-[var(--surface)]">
              <Image
                src="/about/hero.png"
                alt="Government Procurement Workspace"
                width={700}
                height={700}
                className="w-full h-[460px] lg:h-[540px] object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-[var(--surface)]/95 backdrop-blur-md border border-[var(--border)] shadow-xl text-[var(--foreground)]">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] shrink-0">
                    <Bell className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg">
                      Instant Bid Specification Alerts
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--muted)] mt-1">
                      Direct to your inbox as soon as federal, state, or local RFPs are issued.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

