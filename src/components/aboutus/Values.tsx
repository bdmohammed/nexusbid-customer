import { values } from "@/data/values";

export default function Values() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-6
        "
        >
          {values.map((value) => (
            <div
              key={value.title}
              className="
                bg-[var(--surface)]
                border
                border-[var(--border)]
                rounded-2xl
                p-6
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-lg
              "
            >
              <div className="text-3xl mb-5">{value.icon}</div>

              <h3
                className="
                text-xl
                font-semibold
                mb-3
                text-[var(--foreground)]
              "
              >
                {value.title}
              </h3>

              <p
                className="
                text-sm
                leading-7
                text-[var(--muted)]
              "
              >
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
