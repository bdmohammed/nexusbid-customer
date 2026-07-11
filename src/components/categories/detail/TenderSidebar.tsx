export default function TenderSidebar() {
  return (
    <div
      className="
      sticky
      top-28
      bg-[var(--surface)]
      border
      border-[var(--border)]
      rounded-3xl
      p-8
    "
    >
      <h3
        className="
        text-2xl
        font-bold
        mb-6
      "
      >
        Tender Summary
      </h3>

      <SidebarItem label="Budget" value="$750k - $1.2M" />

      <SidebarItem label="Location" value="Austin, Texas" />

      <SidebarItem label="Deadline" value="24 Oct 2026" />

      <SidebarItem label="Buyer" value="City of Austin" />

      <button
        className="
        mt-8
        w-full
        bg-[var(--primary)]
        text-white
        py-4
        rounded-xl
      "
      >
        Contact Advisor
      </button>
    </div>
  );
}

function SidebarItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-6">
      <p
        className="
        text-sm
        text-[var(--muted)]
      "
      >
        {label}
      </p>

      <h4
        className="
        mt-1
        font-medium
      "
      >
        {value}
      </h4>
    </div>
  );
}
