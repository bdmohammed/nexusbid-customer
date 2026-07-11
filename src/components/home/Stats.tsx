import Container from "../common/Container";
import { stats } from "@/data/stats";

export default function Stats() {
  return (
    <section
      className="
      py-16
      border-y
      border-[var(--border)]
      bg-[var(--surface-secondary)]
      "
    >
      <Container>
        <div
          className="
          grid
          grid-cols-2
          lg:grid-cols-4
          gap-10
          "
        >
          {stats.map((item) => (
            <div key={item.label} className="text-center">
              <h3
                className="
                text-4xl
                md:text-5xl
                font-bold
                text-[#003EC7]
                "
              >
                {item.value}
              </h3>

              <p
                className="
                mt-3
                text-xs
                md:text-sm
                tracking-[0.12em]
                font-semibold
                text-[var(--muted)]
                "
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
