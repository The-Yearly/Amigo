// StatTile.jsx
// A single stat tile with a left accent border.
// Props:
//   label    – uppercase label string
//   value    – stat value string
//   primary  – bool: true = full-opacity primary-container border, false = 40% opacity

export default function StatTile({ label, value, primary = false }) {
  return (
    <div
      className={`bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 shadow-lg flex flex-col gap-1 border-l-4 ${
        primary ? "border-primary-container" : "border-primary-container/40"
      }`}
    >
      <span className="text-on-surface-variant text-sm font-medium uppercase tracking-wider">
        {label}
      </span>
      <span className="text-3xl font-black text-primary-container font-display">
        {value}
      </span>
    </div>
  );
}
