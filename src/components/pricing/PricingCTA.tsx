export default function PricingCTA() {
  return (
    <section className="pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="
            bg-[#002B7F]
            rounded-3xl
            px-8
            py-16
            text-center
            text-white
          "
        >
          <h2
            className="
              text-4xl
              lg:text-5xl
              font-bold
            "
          >
            Ready to transform your procurement process?
          </h2>

          <p
            className="
              mt-6
              max-w-2xl
              mx-auto
              text-white/80
              leading-8
            "
          >
            Join hundreds of organizations using NexusBid to discover
            opportunities and streamline procurement.
          </p>

          <div
            className="
              mt-10
              flex
              flex-col
              sm:flex-row
              justify-center
              gap-4
            "
          >
            <button
              className="
                bg-white
                text-[#002B7F]
                px-8
                py-3
                rounded-xl
                font-medium
              "
            >
              Start Free Trial
            </button>

            <button
              className="
                border
                border-white/30
                px-8
                py-3
                rounded-xl
              "
            >
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
