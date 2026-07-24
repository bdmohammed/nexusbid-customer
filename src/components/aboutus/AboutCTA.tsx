export default function AboutCTA() {
  return (
    <section className="py-24 lg:py-32">
      <div
        className="
          max-w-3xl
          mx-auto
          px-6
          text-center
        "
      >
        <h2
          className="
            text-4xl
            lg:text-6xl
            font-bold
            text-[var(--foreground)]
          "
        >
          Join the Future of Bidding.
        </h2>

        <p
          className="
            mt-6
            text-lg
            leading-8
            text-[var(--muted)]
          "
        >
          Whether you're a government entity, enterprise buyer, contractor or
          supplier, RFPNexa helps you unlock opportunities.
        </p>

        <div
          className="
            mt-10
            flex
            flex-col
            sm:flex-row
            justify-center
            gap-4
          "
        >
          <button
            className="
              px-8
              py-4
              rounded-xl
              bg-[var(--primary)]
              text-white
              font-medium
              hover:bg-[var(--primary-hover)]
              transition
            "
          >
            Get Started Free
          </button>

          <button
            className="
              px-8
              py-4
              rounded-xl
              border
              border-[var(--border)]
              bg-[var(--surface)]
              text-[var(--foreground)]
              font-medium
              transition
            "
          >
            Schedule Demo
          </button>
        </div>
      </div>
    </section>
  );
}
