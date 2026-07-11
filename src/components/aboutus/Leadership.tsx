import Image from "next/image";
import { leadership } from "@/data/leadership";

export default function Leadership() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="
          flex
          flex-col
          lg:flex-row
          lg:items-end
          lg:justify-between
          gap-8
          mb-16
        "
        >
          <div>
            <p
              className="
              uppercase
              tracking-[3px]
              text-xs
              text-[var(--primary)]
              mb-3
            "
            >
              Our Leadership
            </p>

            <h2
              className="
              text-4xl
              lg:text-6xl
              font-bold
              leading-tight
              text-[var(--foreground)]
            "
            >
              Driven by{" "}
              <span className="text-[var(--primary)]">Industry Experts</span>
            </h2>

            <p
              className="
              mt-5
              max-w-2xl
              text-[var(--muted)]
            "
            >
              Our team brings decades of experience from procurement, logistics
              and enterprise software.
            </p>
          </div>

          <button
            className="
              text-[var(--primary)]
              font-medium
              hover:underline
            "
          >
            See All Team Members →
          </button>
        </div>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-10
          "
        >
          {leadership.map((member) => (
            <div key={member.name} className="group">
              <div
                className="
                  aspect-[3/4]
                  overflow-hidden
                  rounded-3xl
                  mb-5
                "
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={500}
                  height={650}
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                />
              </div>

              <h3
                className="
                text-xl
                font-semibold
                text-[var(--foreground)]
              "
              >
                {member.name}
              </h3>

              <p
                className="
                mt-1
                text-[var(--primary)]
                font-medium
              "
              >
                {member.role}
              </p>

              <p
                className="
                mt-3
                text-sm
                leading-7
                text-[var(--muted)]
              "
              >
                Enterprise procurement leadership and marketplace innovation
                expertise.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
