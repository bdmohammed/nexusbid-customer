import Image from "next/image";

export default function GlobalPresence() {
  return (
    <section className="pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="
          relative
          h-[300px]
          md:h-[400px]
          lg:h-[500px]
          overflow-hidden
          rounded-3xl
          border
          border-[var(--border)]
        "
        >
          <Image
            src="/contact/map.png"
            alt="Global Presence"
            fill
            className="object-cover"
          />

          <div
            className="
            absolute
            bottom-6
            left-6
            bg-[var(--surface)]
            border
            border-[var(--border)]
            rounded-2xl
            p-5
            max-w-xs
          "
          >
            <h4
              className="
              font-semibold
              text-[var(--primary)]
            "
            >
              Global Presence
            </h4>

            <p
              className="
              mt-2
              text-sm
              text-[var(--muted)]
            "
            >
              Supporting procurement operations across 120+ countries.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
