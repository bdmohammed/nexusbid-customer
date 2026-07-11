import { Search } from "lucide-react";

import Container from "../common/Container";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section
      className="
      py-20
      md:py-28
      lg:py-36
      "
    >
      <Container>
        <div
          className="
          max-w-5xl
          mx-auto
          text-center
          "
        >
          {/* Trust Badge */}

          <div
            className="
            inline-flex
            items-center
            gap-2
            rounded-full
            px-4
            py-2
            bg-[#EEF2FF]
            text-[#565E74]
            text-xs
            font-medium
            "
          >
            Trusted by 500+ Global Enterprises
          </div>

          {/* Heading */}

          <h1
            className="
            mt-8
            font-bold
            tracking-[-0.03em]
            leading-[1.05]
            text-4xl
            md:text-6xl
            lg:text-7xl
            "
          >
            Access the World's Most
            <br />
            High-Value
            <span className="text-[#003EC7]"> RFPs & Tenders.</span>
          </h1>

          {/* Description */}

          <p
            className="
            mt-8
            max-w-3xl
            mx-auto
            text-[15px]
            md:text-lg
            text-[var(--muted)]
            leading-relaxed
            "
          >
            NexusBid connects premium service providers with complex
            institutional procurement opportunities. Navigate a billion-dollar
            marketplace with surgical precision and AI-driven insights.
          </p>

          {/* Search Bar */}

          <div
            className="
            mt-12
            bg-[var(--surface)]
            border
            border-[var(--border)]
            rounded-xl
            shadow-lg
            p-2
            flex
            flex-col
            md:flex-row
            gap-2
            "
          >
            <div
              className="
              flex
              items-center
              flex-1
              px-4
              "
            >
              <Search size={20} className="text-gray-400" />

              <input
                type="text"
                placeholder="Search by industry, region, or contract value..."
                className="
                flex-1
                bg-transparent
                px-4
                py-4
                outline-none
                "
              />
            </div>

            <Button
              className="
              md:min-w-[180px]
              "
            >
              Search Tenders
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
