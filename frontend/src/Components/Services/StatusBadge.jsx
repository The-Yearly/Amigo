// StatusBadge.jsx
// Reusable status pill for request items.
// Props:
//   status – "In Progress" | "Accepted" | "Pending" | "Completed"

const STYLES = {
  "In Progress": "bg-secondary text-on-secondary",
  "Accepted":    "bg-primary-fixed text-on-primary-fixed",
  "Pending":     "bg-surface-container-highest text-on-surface-variant",
  "Completed":   "bg-surface-container-highest text-on-surface-variant",
};

export default function StatusBadge({ status }) {
  const cls = STYLES[status] ?? STYLES["Pending"];
  return (
    <span className={`${cls} px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block`}>
      {status}
    </span>
  );
}
