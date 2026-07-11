import Link from "next/link";
import Image from "next/image";

interface CategoryCardProps {
  title: string;
  subtitle: string;
  active: number;
  slug: string;
  icon: string;
}

export default function CategoryCard({
  title,
  subtitle,
  active,
  slug,
  icon,
}: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${slug}`}
      className="
        group
        bg-[var(--surface)]
        border
        border-[var(--border)]
        rounded-2xl
        p-6
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#003EC7]
      "
    >
      <div
        className="
          w-12
          h-12
          rounded-xl
          bg-[var(--surface-secondary)]
          flex
          items-center
          justify-center
        "
      >
        <Image
          src={icon}
          alt={title}
          width={22}
          height={22}
          className="w-auto h-auto"
        />
      </div>

      <h3
        className="
          mt-6
          text-2xl
          font-semibold
          text-[var(--foreground)]
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-2
          text-sm
          text-[var(--muted)]
        "
      >
        {subtitle}
      </p>

      <div
        className="
          mt-6
          flex
          justify-between
          items-center
        "
      >
        <span
          className="
            bg-green-100
            text-green-700
            text-xs
            px-3
            py-1
            rounded-full
            font-medium
          "
        >
          {active} Active
        </span>

        <span
          className="
            text-[var(--muted)]
            group-hover:text-[#003EC7]
          "
        >
          →
        </span>
      </div>
    </Link>
  );
}
