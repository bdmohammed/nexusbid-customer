export default function TenderHeader() {
  return (
    <section>
      <span
        className="
        bg-green-100
        text-green-700
        px-3
        py-1
        rounded-full
        text-xs
        font-medium
      "
      >
        VERIFIED OPPORTUNITY
      </span>

      <h1
        className="
        mt-5
        text-4xl
        lg:text-6xl
        font-bold
        text-[var(--foreground)]
      "
      >
        Downtown Civic Plaza Modernization
      </h1>

      <p
        className="
        mt-5
        text-lg
        text-[var(--muted)]
      "
      >
        Tender ID: NEX-88219
      </p>

      <div
        className="
        mt-8
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
          Download RFP
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
          Save Tender
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
          Share
        </button>
      </div>
    </section>
  );
}
