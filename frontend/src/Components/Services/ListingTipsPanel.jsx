// ListingTipsPanel.jsx
// Sidebar panel with numbered listing tips and a help link.

const TIPS = [
  "Use high-resolution imagery that highlights your workspace or finished results.",
  "Be specific in your description. List exactly what's included in the price.",
  "Mention your campus availability to help peers book you faster.",
];

export default function ListingTipsPanel() {
  return (
    <aside className="lg:col-span-3 space-y-8 order-3 lg:order-1">
      {/* Tips card */}
      <div className="bg-surface-container p-8 rounded-lg shadow-md border border-outline-variant/10">
        <span
          className="material-symbols-outlined text-secondary mb-4 block"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          lightbulb
        </span>
        <h3 className="font-display font-bold text-xl text-primary mb-4">Listing Tips</h3>
        <ul className="space-y-6">
          {TIPS.map((tip, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-primary-container font-bold text-sm shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm text-on-surface-variant">{tip}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Help card */}
      <div className="p-8 border border-outline-variant/20 rounded-lg shadow-sm">
        <h4 className="font-display font-bold text-primary mb-2">Need help?</h4>
        <p className="text-xs text-on-surface-variant mb-4">
          Contact our campus support team for assistance with your listing.
        </p>
        <a href="#" className="text-primary font-bold text-xs underline decoration-secondary">
          Visit Help Center
        </a>
      </div>
    </aside>
  );
}
