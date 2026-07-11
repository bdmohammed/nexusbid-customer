import Image from "next/image";

export default function GlobalNetwork() {
  return (
    <section
      className="
    py-20
    lg:py-28
    bg-(--primary-hover)
    relative
    overflow-hidden
  "
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="
            grid
            lg:grid-cols-2
            gap-16
            items-center
          "
        >
          <div>
            <h2
              className="
              text-4xl
              lg:text-6xl
              font-bold
              text-white
              mb-10
            "
            >
              A Network Without Borders.
            </h2>

            <div
              className="
                grid
                grid-cols-2
                gap-8
              "
            >
              <Stat
                number="3"
                title="GLOBAL HUBS"
                text="Austin • London • Singapore"
              />

              <Stat
                number="120+"
                title="MARKETS SERVED"
                text="Across 5 continents"
              />

              <Stat
                number="24/7"
                title="SUPPORT"
                text="Global Procurement Experts"
              />

              <Stat
                number="99.9%"
                title="UPTIME"
                text="Enterprise Reliability"
              />
            </div>
          </div>

          <div
            className="
              bg-white/10
              backdrop-blur-md
              border
              border-white/20
              rounded-3xl
              p-4
            "
          >
            <div className="relative h-[400px] lg:h-[500px]">
              <Image
                src="/networks/NetworksBorder.png"
                alt="World Map"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div>
      <h3
        className="
        text-4xl
        lg:text-5xl
        font-bold
        text-white
      "
      >
        {number}
      </h3>

      <p
        className="
        text-xs
        tracking-widest
        mt-2
        text-white/70
      "
      >
        {title}
      </p>

      <p
        className="
        text-sm
        mt-2
        text-white/60
      "
      >
        {text}
      </p>
    </div>
  );
}
