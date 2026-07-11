export default function TenderDocuments() {
  const docs = [
    "RFP Specification.pdf",
    "Site Drawings.pdf",
    "Budget Schedule.pdf",
  ];

  return (
    <section
      className="
      bg-[var(--surface)]
      border
      border-[var(--border)]
      rounded-3xl
      p-8
    "
    >
      <h2
        className="
        text-3xl
        font-bold
        mb-6
      "
      >
        Documents
      </h2>

      <div className="space-y-4">
        {docs.map((doc) => (
          <div
            key={doc}
            className="
            flex
            justify-between
            items-center
            border-b
            border-[var(--border)]
            pb-4
          "
          >
            <span>{doc}</span>

            <button
              className="
              text-[var(--primary)]
              font-medium
            "
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
