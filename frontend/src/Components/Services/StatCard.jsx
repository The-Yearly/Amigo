// StatCard.jsx
// A single bento-style stat tile used in the dashboard overview.
// Props:
//   label      – uppercase label string
//   value      – main stat value string
//   badge      – optional { label, text } badge shown next to value (revenue card)
//   variant    – "default" | "muted" | "accent"
//              default = surface-container-lowest (white), wide layout
//              muted   = surface-container (grey), centered
//              accent  = primary-container (dark green), centered
//   wide       – bool, spans 2 cols on md+

export default function StatCard({ label, value, badge, variant = "default", wide = false }) {
  const bgClass = {
    default: "bg-surface-container-lowest",
    muted:   "bg-surface-container",
    accent:  "bg-primary-container",
  }[variant];

  const labelClass = {
    default: "text-on-surface-variant",
    muted:   "text-on-surface-variant",
    accent:  "text-on-primary-fixed-variant",
  }[variant];

  const valueClass = {
    default: "text-primary",
    muted:   "text-primary",
    accent:  "text-on-primary-container",
  }[variant];

  const centered = variant !== "default";

  return (
    <div
      className={`
        ${bgClass}
        ${wide ? "md:col-span-2" : ""}
        p-8 rounded-lg flex flex-col justify-between min-h-[200px]
        ${centered ? "items-center text-center" : ""}
        cursor-default shadow-md border border-outline-variant/10 hover:shadow-lg transition-shadow
      `}
    >
      <span className={`${labelClass} font-label font-semibold text-sm uppercase tracking-widest`}>
        {label}
      </span>
      <div className={`mt-4 flex items-baseline gap-4 ${centered ? "justify-center" : ""}`}>
        <span className={`text-5xl font-display font-extrabold ${valueClass}`}>{value}</span>
        {badge && (
          <span className="text-secondary font-bold text-sm bg-secondary-container px-3 py-1 rounded-full">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}
