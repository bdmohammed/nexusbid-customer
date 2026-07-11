export default function TenderScope() {
  const scopes = [
    "Hardscaping & Landscaping",
    "Smart Lighting Installation",
    "Public Structure Construction",
    "Drainage Upgrades",
    "Sustainability Compliance",
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
        Scope of Work
      </h2>

      <div className="space-y-4">
        {scopes.map((scope) => (
          <div
            key={scope}
            className="
            flex
            items-center
            gap-4
          "
          >
            <span className="text-green-500">✓</span>

            <span>{scope}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
