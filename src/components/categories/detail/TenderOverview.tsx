import Image from "next/image";

export default function TenderOverview() {
  return (
    <section
      className="
      bg-[var(--surface)]
      border
      border-[var(--border)]
      rounded-3xl
      overflow-hidden
    "
    >
      <div className="relative h-[350px]">
        <Image
          src="/tenders/civic-plaza.png"
          alt="Tender"
          fill
          className="object-cover"
        />
      </div>

      <div className="p-8">
        <h2
          className="
          text-2xl
          font-bold
          mb-5
        "
        >
          Project Overview
        </h2>

        <p
          className="
          leading-8
          text-[var(--muted)]
        "
        >
          Comprehensive redevelopment of the central civic plaza including
          intelligent lighting systems, public structures, landscape
          architecture and sustainable hardscaping.
        </p>
      </div>
    </section>
  );
}
