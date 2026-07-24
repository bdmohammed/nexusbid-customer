export default function Footer() {
  return (
    <footer
      className="
    bg-[var(--surface-secondary)]
    border-t
    border-[var(--border)]
  "
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-4
            gap-12
          "
        >
          {/* Brand */}

          <div>
            <h3
              className="
                text-3xl
                font-bold
                text-(--primary)
              "
            >
              RFPNexa
            </h3>

            <p
              className="
                mt-5
                text-sm
                leading-7
                text-(--muted)
              "
            >
              Redefining procurement for the digital age through precision,
              transparency and global scale.
            </p>
          </div>

          {/* Company */}

          <div>
            <h4
              className="
                font-semibold
                mb-5
                text-(--foreground)
              "
            >
              Company
            </h4>

            <ul className="space-y-3">
              <li>
                <a href="/aboutus">About Us</a>
              </li>
              <li>
                <a href="/contactus">Contact Us</a>
              </li>
              <li>
                <a href="/pricing">Pricing Plans</a>
              </li>
              <li>
                <a href="/faqs">FAQs & Help</a>
              </li>
            </ul>
          </div>

          {/* Legal */}

          <div>
            <h4
              className="
                font-semibold
                mb-5
                text-(--foreground)
              "
            >
              Legal & Support
            </h4>

            <ul className="space-y-3">
              <li>
                <a href="/contactus">Support Contact</a>
              </li>
              <li>
                <a href="/faqs">Frequently Asked Questions</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}

        <div
          className="
            mt-14
            pt-8
            border-t
            border-(--border)
            flex
            flex-col
            md:flex-row
            justify-between
            items-center
            gap-4
          "
        >
          <p
            className="
              text-sm
              text-[var(--muted)]
            "
          >
            © 2024 RFPNexa Technologies Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
