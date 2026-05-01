// RequirementCard.jsx
// A single card in the "What's Required" bento grid.
// Props:
//   icon     – Material Symbol icon name
//   title    – card heading
//   children – description text

export default function RequirementCard({ icon, title, children }) {
  return (
    <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/10">
      <span
        className="material-symbols-outlined text-primary mb-4 block"
        style={{ fontSize: 32 }}
      >
        {icon}
      </span>
      <h3 className="font-bold text-on-surface mb-2">{title}</h3>
      <p className="text-sm text-tertiary">{children}</p>
    </div>
  );
}
