import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="pt-24 md:pt-28 lg:pt-32 pb-16 lg:pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="uppercase tracking-[3px] text-sm text-[var(--primary)] mb-4">
              Our Mission
            </p>

            <h1
              className="
                  text-4xl
                  sm:text-5xl
                  lg:text-6xl
                  font-bold
                  leading-tight
                  "
            >
              Democratizing Global{" "}
              <span className="text-[var(--primary)]">Procurement.</span>
            </h1>

            <p className="mt-6 text-lg text-[var(--muted)]">
              NexusBid bridges institutional issuers and global service
              providers through intelligent procurement.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <button className="px-6 py-3 rounded-xl bg-[var(--primary)] text-white">
                Explore Platform
              </button>

              <button className="px-6 py-3 rounded-xl border border-[var(--border)]">
                Read Whitepaper
              </button>
            </div>
          </div>

          <div className="relative order-first lg:order-last">
            <Image
              src="/about/hero.png"
              alt="Building"
              width={700}
              height={700}
              className="rounded-3xl object-cover"
            />

            <div
              className="
              absolute
              bottom-6
              left-6
              bg-[var(--surface)]
              rounded-2xl
              p-6
              shadow-lg
              border
              border-[var(--border)]
            "
            >
              <div className="flex gap-6">
                <div>
                  <h3 className="text-3xl font-bold text-[var(--primary)]">
                    120+
                  </h3>
                  <p className="text-xs text-[var(--muted)]">Markets</p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-[var(--primary)]">
                    $14B+
                  </h3>
                  <p className="text-xs text-[var(--muted)]">Volume</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
