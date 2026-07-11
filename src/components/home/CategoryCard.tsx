import Link from "next/link";

interface CategoryCardProps {
  category: {
    title: string;
    slug: string;
    description: string;
    openings: string;
  };
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="
      block
      bg-[var(--surface)]
      border
      border-[var(--border)]
      rounded-xl
      p-6
      hover:border-[#003EC7]
      hover:-translate-y-0.5
      transition-all
      duration-250
      "
    >
      <h3
        className="
        text-lg
        font-semibold
        text-[var(--foreground)]
        "
      >
        {category.title}
      </h3>

      <p
        className="
        mt-3
        text-sm
        text-[var(--muted)]
        line-clamp-2
        "
      >
        {category.description}
      </p>

      <p
        className="
        mt-6
        text-sm
        font-semibold
        text-[#003EC7]
        "
      >
        {category.openings}
      </p>
    </Link>
  );
}
