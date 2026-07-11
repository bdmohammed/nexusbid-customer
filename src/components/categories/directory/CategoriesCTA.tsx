import Image from "next/image";

export default function CategoriesCTA() {
  return (
    <section
      className="
        py-24
        bg-[var(--surface-secondary)]
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          grid
          lg:grid-cols-2
          gap-16
          items-center
        "
      >
        <div>
          <h2
            className="
              text-5xl
              font-bold
              text-[var(--foreground)]
            "
          >
            Can't find your specific niche?
          </h2>

          <p
            className="
              mt-6
              text-lg
              leading-8
              text-[var(--muted)]
            "
          >
            Our procurement advisors can help navigate our extended database of
            opportunities and specialized RFPs.
          </p>

          <div
            className="
              mt-10
              flex
              flex-wrap
              gap-4
            "
          >
            <button
              className="
                bg-[var(--primary)]
                text-white
                px-6
                py-3
                rounded-xl
              "
            >
              Request Consultation
            </button>

            <button
              className="
                border
                border-[var(--border)]
                px-6
                py-3
                rounded-xl
              "
            >
              Contact Support
            </button>
          </div>
        </div>

        <div
          className="
            relative
            h-[350px]
            rounded-3xl
            overflow-hidden
            shadow-xl
          "
        >
          <Image
            src="/categories/cta-building.png"
            alt="Building"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
