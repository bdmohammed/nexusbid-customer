import Link from "next/link";
import { Tender } from "@/types";

interface TenderCardProps {
  tender: Tender;
  categorySlug: string;
}

export default function TenderCard({ tender, categorySlug }: TenderCardProps) {
  // Compute days left
  const deadlineDate = new Date(tender.deadline);
  const diffTime = deadlineDate.getTime() - Date.now();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const daysLeft = diffDays > 0 ? diffDays : 0;

  // Format budget price
  const formattedBudget = (tender.priceCents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  // Location display
  const location = tender.city
    ? `${tender.city}, ${tender.state?.code || "USA"}`
    : `${tender.state?.name || "United States"}`;

  // Formatted posted date
  const postedDate = new Date(tender.postedDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400";
      case "expired":
        return "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400";
      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400";
    }
  };

  return (
    <div
      className="
      bg-[var(--surface)]
      border
      border-[var(--border)]
      rounded-2xl
      p-6
      flex
      flex-col
      lg:flex-row
      justify-between
      gap-6
      hover:border-[#003EC7]
      transition-all
      duration-200
    "
    >
      <div className="flex-1">
        <span
          className={`
          text-xs
          font-bold
          uppercase
          px-3
          py-1
          rounded-full
          ${getStatusStyles(tender.status)}
        `}
        >
          {tender.status}
        </span>

        <h3
          className="
          mt-4
          text-2xl
          font-bold
          text-[var(--foreground)]
        "
        >
          {tender.title}
        </h3>

        <p
          className="
          mt-3
          text-sm
          text-[var(--muted)]
          leading-relaxed
          line-clamp-2
        "
        >
          {tender.description || "No description provided."}
        </p>

        <div
          className="
          flex
          flex-wrap
          gap-x-6
          gap-y-2
          mt-5
          text-xs
          font-medium
          text-[var(--muted)]
        "
        >
          <span className="flex items-center gap-1">📍 {location}</span>
          <span className="flex items-center gap-1">
            💰 Budget: {formattedBudget}
          </span>
          <span className="flex items-center gap-1">
            📅 Posted: {postedDate}
          </span>
        </div>
      </div>

      <div
        className="
        flex
        flex-row
        lg:flex-col
        justify-between
        items-center
        lg:items-end
        border-t
        lg:border-t-0
        lg:border-l
        border-[var(--border)]
        pt-4
        lg:pt-0
        lg:pl-6
        min-w-[150px]
      "
      >
        <div
          className="
          w-24
          h-16
          rounded-xl
          bg-red-500/10
          border border-red-500/20
          text-red-500
          flex
          flex-col
          items-center
          justify-center
        "
        >
          <span className="text-2xl font-bold leading-none">{daysLeft}</span>
          <span className="text-[10px] font-bold mt-1 tracking-wider uppercase">
            Days Left
          </span>
        </div>

        <Link
          href={`/tenders/${tender.slug}`}
          className="
          mt-0
          lg:mt-4
          bg-[#003EC7]
          hover:bg-[#002fad]
          text-white
          text-xs
          font-bold
          px-5
          py-2.5
          rounded-lg
          transition-all
          duration-150
        "
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
