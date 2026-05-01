// FeatureBadge.jsx
// A single icon + label row used inside the booking card features list.
// Props:
//   icon     – Material Symbol icon name
//   children – label text

export default function FeatureBadge({ icon, children }) {
  return (
    <div className="flex items-center gap-4 text-on-surface">
      <span className="material-symbols-outlined text-secondary">{icon}</span>
      <span className="text-sm font-medium">{children}</span>
    </div>
  );
}
