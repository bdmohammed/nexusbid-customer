"use client";

import { useState } from "react";

export default function PricingToggle() {
  const [yearly, setYearly] = useState(false);

  return (
    <div
      className="
        mt-10
        flex
        items-center
        justify-center
        gap-4
      "
    >
      <span className={!yearly ? "font-semibold" : "text-[var(--muted)]"}>
        Monthly
      </span>

      <button
        onClick={() => setYearly(!yearly)}
        className="
          relative
          w-14
          h-7
          rounded-full
          bg-[var(--border)]
        "
      >
        <span
          className={`
            absolute
            top-1
            h-5
            w-5
            rounded-full
            bg-[var(--primary)]
            transition-all
            ${yearly ? "left-8" : "left-1"}
          `}
        />
      </button>

      <span className={yearly ? "font-semibold" : "text-[var(--muted)]"}>
        Yearly
      </span>

      <span
        className="
          text-sm
          text-green-500
          font-medium
        "
      >
        Save 20%
      </span>
    </div>
  );
}
