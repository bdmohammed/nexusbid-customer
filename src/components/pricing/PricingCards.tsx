import { pricingPlans } from "@/data/pricingPlans";

export default function PricingCards() {
  return (
    <section className="pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="
            grid
            md:grid-cols-2
            lg:grid-cols-3
            gap-8
            items-stretch
          "
        >
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`
                relative
                rounded-3xl
                p-8
                flex
                flex-col
                border
                transition-all
                duration-300
                ${
                  plan.featured
                    ? "border-2 border-[var(--primary)] shadow-xl lg:scale-105 bg-[var(--surface)]"
                    : "border-[var(--border)] bg-[var(--surface)]"
                }
              `}
            >
              {plan.featured && (
                <div
                  className="
                    absolute
                    -top-4
                    left-1/2
                    -translate-x-1/2
                    bg-[var(--primary)]
                    text-white
                    text-xs
                    px-4
                    py-1
                    rounded-full
                    font-medium
                  "
                >
                  MOST POPULAR
                </div>
              )}

              <h3
                className="
                  text-2xl
                  font-bold
                  text-[var(--foreground)]
                "
              >
                {plan.name}
              </h3>

              <div className="mt-4">
                {plan.price !== null ? (
                  <>
                    <span
                      className="
                        text-5xl
                        font-bold
                        text-[var(--foreground)]
                      "
                    >
                      ${plan.price}
                    </span>

                    <span className="text-[var(--muted)]">/mo</span>
                  </>
                ) : (
                  <span
                    className="
                      text-4xl
                      font-bold
                      text-[var(--foreground)]
                    "
                  >
                    Contact Us
                  </span>
                )}
              </div>

              <p
                className="
                  mt-5
                  text-[var(--muted)]
                  leading-7
                "
              >
                {plan.description}
              </p>

              <ul className="mt-8 space-y-4 flex-1">
                {plan.features.map((item) => (
                  <li
                    key={item}
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <span className="text-green-500">✓</span>

                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`
                  mt-8
                  py-3
                  rounded-xl
                  font-medium
                  transition
                  ${
                    plan.featured
                      ? "bg-[var(--primary)] text-white"
                      : "border border-[var(--border)]"
                  }
                `}
              >
                {plan.button}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
