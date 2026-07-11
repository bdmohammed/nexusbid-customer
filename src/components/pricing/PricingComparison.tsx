export default function PricingComparison() {
  const rows = [
    {
      feature: "Data Access",
      basic: "Public Only",
      enterprise: "Public + Private",
      custom: "Full Data Lake",
    },
    {
      feature: "AI Tools",
      basic: "—",
      enterprise: "Smart Matching",
      custom: "Predictive Analytics",
    },
    {
      feature: "Support",
      basic: "Email Only",
      enterprise: "Priority Support",
      custom: "24/7 Manager",
    },
    {
      feature: "Security",
      basic: "Standard",
      enterprise: "SSO + MFA",
      custom: "SOC2 / HIPAA",
    },
  ];

  return (
    <section className="pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2
          className="
            text-3xl
            font-bold
            text-center
            mb-10
          "
        >
          Detailed Comparison
        </h2>

        <div
          className="
            overflow-x-auto
            rounded-2xl
            border
            border-[var(--border)]
          "
        >
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="bg-[var(--surface-secondary)]">
                <th className="p-5 text-left">Feature</th>

                <th className="p-5">Basic</th>

                <th className="p-5">Enterprise</th>

                <th className="p-5">Custom</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.feature}
                  className="
                    border-t
                    border-[var(--border)]
                  "
                >
                  <td className="p-5 font-medium">{row.feature}</td>

                  <td className="p-5 text-center">{row.basic}</td>

                  <td className="p-5 text-center">{row.enterprise}</td>

                  <td className="p-5 text-center">{row.custom}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
