export default function TenderRequirements() {
  const items = [
    {
      title: "Materials",
      value: "Sustainable Grade",
    },

    {
      title: "Certification",
      value: "LEED Gold",
    },

    {
      title: "Timeline",
      value: "12 Months",
    },
  ];

  return (
    <section>
      <h2
        className="
        text-3xl
        font-bold
        mb-6
      "
      >
        Requirements
      </h2>

      <div
        className="
        grid
        md:grid-cols-3
        gap-6
      "
      >
        {items.map((item) => (
          <div
            key={item.title}
            className="
              bg-[var(--surface)]
              border
              border-[var(--border)]
              rounded-2xl
              p-6
            "
          >
            <p
              className="
              text-sm
              text-[var(--muted)]
            "
            >
              {item.title}
            </p>

            <h3
              className="
              mt-3
              font-semibold
              text-xl
            "
            >
              {item.value}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
