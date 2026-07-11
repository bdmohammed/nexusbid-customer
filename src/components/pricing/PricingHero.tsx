"use client";

import PricingToggle from "./PricingToggle";

export default function PricingHero() {
  return (
    <section className="pt-32 pb-14">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p
          className="
            uppercase
            tracking-[3px]
            text-sm
            text-[var(--primary)]
            font-semibold
          "
        >
          Transparent Pricing
        </p>

        <h1
          className="
            mt-4
            text-5xl
            lg:text-6xl
            font-bold
            text-[var(--foreground)]
          "
        >
          Scalable Plans For
          <br />
          Global Procurement
        </h1>

        <p
          className="
            mt-6
            text-lg
            leading-8
            text-[var(--muted)]
          "
        >
          Empower your procurement team with AI-powered intelligence and global
          opportunity discovery.
        </p>

        <PricingToggle />
      </div>
    </section>
  );
}
