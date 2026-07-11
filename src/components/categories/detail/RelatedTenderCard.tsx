interface RelatedTenderCardProps {
  title: string;
}

export default function RelatedTenderCard({ title }: RelatedTenderCardProps) {
  return (
    <div
      className="
      bg-[var(--surface)]
      border
      border-[var(--border)]
      rounded-2xl
      p-5
    "
    >
      <h4 className="font-semibold">{title}</h4>

      <button
        className="
        mt-4
        text-[var(--primary)]
      "
      >
        View →
      </button>
    </div>
  );
}
