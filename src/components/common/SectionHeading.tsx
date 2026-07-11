import { ReactNode } from "react";

export default function SectionHeading({
  title,
  subtitle,
  center = false,
}: {
  title: ReactNode;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div
      className={`
      mb-12
      ${center ? "text-center" : ""}
      `}
    >
      <h2
        className="
        text-3xl
        md:text-5xl
        font-bold
        tracking-tight
        "
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className="
          mt-4
          text-[var(--muted)]
          "
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
