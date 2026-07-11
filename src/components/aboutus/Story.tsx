import Image from "next/image";

export default function Story() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}

        <div className="max-w-3xl mx-auto text-center mb-16">
          <p
            className="
              uppercase
              tracking-[3px]
              text-xs
              text-[var(--primary)]
              mb-3
            "
          >
            Our Journey
          </p>

          <h2
            className="
              text-4xl
              lg:text-5xl
              font-bold
              text-[var(--foreground)]
            "
          >
            The Evolution of NexusBid
          </h2>

          <p
            className="
              mt-4
              text-lg
              text-[var(--muted)]
            "
          >
            From a boutique consultancy to a global procurement marketplace
            serving enterprises across 120+ countries.
          </p>
        </div>

        {/* Bento Grid */}

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-3
            gap-6
          "
        >
          {/* Card 1 */}

          <div
            className="
              lg:col-span-2
              bg-[var(--surface)]
              border
              border-[var(--border)]
              rounded-3xl
              p-8
              lg:p-10
            "
          >
            <span
              className="
                inline-block
                text-xs
                font-medium
                px-3
                py-1
                rounded-full
                bg-[var(--background)]
                border
                border-[var(--border)]
              "
            >
              2016 • THE GENESIS
            </span>

            <h3
              className="
                text-2xl
                lg:text-3xl
                font-semibold
                mt-6
                text-[var(--foreground)]
              "
            >
              Addressing Fragmentation
            </h3>

            <p
              className="
                mt-4
                text-[var(--muted)]
                leading-8
                max-w-2xl
              "
            >
              Founded as Nexus Advisory, we witnessed procurement inefficiencies
              firsthand. Vendors struggled with fragmented bidding systems,
              documentation complexity and limited global visibility.
            </p>

            <div
              className="
                mt-8
                pt-6
                border-t
                border-[var(--border)]
              "
            >
              <p
                className="
                  italic
                  text-sm
                  text-[var(--muted)]
                "
              >
                "The problem wasn't a lack of talent — it was a lack of a common
                procurement language."
              </p>
            </div>
          </div>

          {/* Office Image */}

          <div
            className="
              overflow-hidden
              rounded-3xl
              border
              border-[var(--border)]
              relative
              min-h-[320px]
            "
          >
            <Image
              src="/about/office.png"
              alt="Office"
              fill
              className="
                object-cover
                transition-transform
                duration-500
                hover:scale-105
              "
            />
          </div>

          {/* Blue Card */}

          <div
            className="
              rounded-3xl
              bg-[var(--primary)]
              text-white
              p-8
              lg:p-10
            "
          >
            <span
              className="
                inline-block
                px-3
                py-1
                text-xs
                rounded-full
                bg-white/15
              "
            >
              2019 • THE PIVOT
            </span>

            <h3
              className="
                text-2xl
                font-semibold
                mt-6
              "
            >
              Digitizing Precision
            </h3>

            <p
              className="
                mt-4
                text-white/80
                leading-8
              "
            >
              We launched our first SaaS platform, automating technical
              evaluation, compliance verification and RFP scoring.
            </p>
          </div>

          {/* Global Standard */}

          <div
            className="
              lg:col-span-2
              bg-[var(--surface)]
              border
              border-[var(--border)]
              rounded-3xl
              p-8
              lg:p-10
              flex
              items-center
              justify-between
              gap-8
            "
          >
            <div>
              <span
                className="
                  inline-block
                  px-3
                  py-1
                  text-xs
                  rounded-full
                  bg-[var(--primary)]
                  text-white
                "
              >
                TODAY • MARKETPLACE
              </span>

              <h3
                className="
                  text-2xl
                  lg:text-3xl
                  font-semibold
                  mt-6
                  text-[var(--foreground)]
                "
              >
                The Global Standard
              </h3>

              <p
                className="
                  mt-4
                  text-[var(--muted)]
                  leading-8
                  max-w-xl
                "
              >
                NexusBid now facilitates thousands of tenders every month,
                connecting public institutions, enterprises and service
                providers in over 120 markets.
              </p>
            </div>

            <div
              className="
                hidden
                lg:flex
                items-center
                justify-center
                w-32
                h-32
                rounded-full
                bg-[var(--background)]
              "
            >
              <svg
                width="60"
                height="60"
                fill="none"
                stroke="currentColor"
                className="text-[var(--primary)]"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth="1.5"
                  d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 0c2.5 2.7 4 6.3 4 10s-1.5 7.3-4 10m0-20C9.5 4.7 8 8.3 8 12s1.5 7.3 4 10m-9-10h18M4.5 7h15M4.5 17h15"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
