const faqs = [
  {
    question: "How does the billing cycle work?",
    answer:
      "Monthly and yearly plans are available. Annual subscriptions save up to 20%.",
  },
  {
    question: "Where do you source procurement data?",
    answer:
      "We aggregate public and private procurement opportunities from global sources.",
  },
  {
    question: "Can I add team members?",
    answer:
      "Yes. Enterprise and Custom plans support multi-user collaboration.",
  },
];

export default function PricingFAQ() {
  return (
    <section className="pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <h2
          className="
            text-3xl
            font-bold
            text-center
            mb-10
          "
        >
          Frequently Asked Questions
        </h2>

        <div className="space-y-5">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="
                bg-[var(--surface)]
                border
                border-[var(--border)]
                rounded-2xl
                p-5
              "
            >
              <summary
                className="
                  cursor-pointer
                  font-medium
                "
              >
                {faq.question}
              </summary>

              <p
                className="
                  mt-4
                  text-[var(--muted)]
                  leading-7
                "
              >
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
