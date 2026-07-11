export default function MobileQuickLinks() {
  const links = [
    {
      icon: "✉️",
      title: "Email Support",
      subtitle: "support@nexusbid.com",
    },
    {
      icon: "📞",
      title: "Call Sales",
      subtitle: "+1 (800) 555-0199",
    },
    {
      icon: "❓",
      title: "Help Center",
      subtitle: "Browse documentation",
    },
  ];

  return (
    <section className="lg:hidden mt-6">
      <div className="space-y-3">
        {links.map((item) => (
          <button
            key={item.title}
            className="
              w-full
              flex
              items-center
              justify-between
              bg-[var(--surface)]
              border
              border-[var(--border)]
              rounded-2xl
              p-4
              text-left
              transition
              hover:border-[var(--primary)]
            "
          >
            <div className="flex items-center gap-4">
              <div
                className="
                  w-10
                  h-10
                  flex
                  items-center
                  justify-center
                  rounded-xl
                  bg-[var(--surface-secondary)]
                "
              >
                {item.icon}
              </div>

              <div>
                <h4
                  className="
                    font-medium
                    text-[var(--foreground)]
                  "
                >
                  {item.title}
                </h4>

                <p
                  className="
                    text-sm
                    text-[var(--muted)]
                  "
                >
                  {item.subtitle}
                </p>
              </div>
            </div>

            <span
              className="
                text-[var(--muted)]
                text-lg
              "
            >
              →
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
