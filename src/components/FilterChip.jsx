// FilterChip.jsx
// A single filter chip. Active chips use primary-fixed bg; inactive ones use surface.
// Props:
//   label    – chip label text
//   active   – bool, true = highlighted style
//   icon     – optional Material Symbol icon name
//   onClick  – click handler

export default function FilterChip({ label, active = false, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-sm transition-colors ${
        active
          ? "bg-primary-fixed text-on-primary-fixed"
          : "bg-surface-container-lowest text-on-surface border border-outline-variant/20 hover:bg-surface-container"
      }`}
    >
      {icon && (
        <span className="material-symbols-outlined text-[18px]">{icon}</span>
      )}
      {label}
    </button>
  );
}
