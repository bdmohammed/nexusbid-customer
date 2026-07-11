import RelatedTenderCard from "./RelatedTenderCard";

export default function RelatedTenders() {
  return (
    <section>
      <h2
        className="
        text-3xl
        font-bold
        mb-6
      "
      >
        Related Opportunities
      </h2>

      <div
        className="
        grid
        md:grid-cols-2
        gap-6
      "
      >
        <RelatedTenderCard title="Municipal Park Redevelopment" />

        <RelatedTenderCard title="Smart City Lighting Program" />
      </div>
    </section>
  );
}
