// MyServiceCard.jsx
// A listing card shown on the creator's "My Services" dashboard.
// Props:
//   imageSrc   – hero image URL
//   imageAlt   – alt text
//   status     – "Active" | "In Progress" | "Completed" (controls badge colour)
//   title      – service title
//   price      – price string e.g. "$45" or "$45/hr"
//   description – short description (line-clamped to 2)
//   stats      – array of { label, value } — up to 2 shown in the footer row
//   onView     – View button click handler
//   onEdit     – Edit button click handler
//   onDelete   – Delete button click handler

const STATUS_STYLES = {
  Active:      "bg-primary-container text-on-primary-container",
  "In Progress": "bg-secondary-container text-on-secondary-container",
  Completed:   "bg-surface-container-highest text-on-surface-variant",
};

export default function MyServiceCard({
  imageSrc,
  imageAlt,
  status = "Active",
  title,
  price,
  description,
  stats = [],
  onView,
  onEdit,
  onDelete,
}) {
  const badgeClass = STATUS_STYLES[status] ?? STATUS_STYLES.Active;

  return (
    <div className="group bg-surface-container-lowest rounded-lg overflow-hidden hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-lg border border-outline-variant/10">
      {/* Hero image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4">
          <span className={`${badgeClass} px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest`}>
            {status}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-8 space-y-6">
        {/* Title + Price */}
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-display font-bold text-2xl text-on-surface tracking-tight group-hover:text-secondary transition-colors">
              {title}
            </h3>
            <span className="text-primary font-extrabold text-xl font-display whitespace-nowrap ml-2">
              {price}
            </span>
          </div>
          <p className="text-on-surface-variant line-clamp-2 leading-relaxed">{description}</p>
        </div>

        {/* Stats row */}
        {stats.length > 0 && (
          <div className="flex items-center gap-6 pt-4 border-t border-outline-variant/10">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-outline tracking-tighter">
                  {stat.label}
                </span>
                <span className="text-on-surface font-bold">{stat.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={onView}
            className="flex-1 py-3 px-4 bg-primary text-on-primary rounded-lg font-bold text-sm shadow-md border border-primary/20 hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            View
          </button>
          <button
            onClick={onEdit}
            className="py-3 px-4 bg-surface-container-high text-on-surface rounded-lg shadow-sm border border-outline-variant/20 hover:bg-secondary-container hover:text-secondary hover:shadow-md active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-lg">edit</span>
          </button>
          <button
            onClick={onDelete}
            className="py-3 px-4 bg-surface-container-high text-on-surface rounded-lg shadow-sm border border-outline-variant/20 hover:bg-error-container hover:text-error hover:shadow-md active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-lg">delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
