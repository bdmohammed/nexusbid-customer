export default function CategoriesHero() {
  return (
    <section className="pt-12 pb-12">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p
          className="
          uppercase
          tracking-[3px]
          text-xs
          text-[var(--primary)]
          font-semibold
        "
        >
          Institutional Marketplace
        </p>

        <h1
          className="
          mt-5
          text-5xl
          lg:text-6xl
          font-bold
          text-[var(--foreground)]
        "
        >
          Global Procurement Directory
        </h1>

        <p
          className="
          mt-6
          text-lg
          leading-8
          text-[var(--muted)]
        "
        >
          Browse active tenders across primary industrial sectors and discover
          procurement opportunities worldwide.
        </p>
      </div>
    </section>
  );
}
