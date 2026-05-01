// ActiveRequestItem.jsx
// A single active request card row.
// Props:
//   imageSrc    – thumbnail image URL
//   imageAlt    – alt text
//   status      – "In Progress" | "Accepted" | "Pending"
//   title       – service title
//   provider    – provider name string
//   date        – date label string e.g. "Scheduled for Oct 24, 2024"
//   price       – price string e.g. "$45.00 / hr"
//   onViewDetails – callback
//   onOpenChat    – callback (shown for In Progress / Accepted)
//   onCancel      – callback (shown for Pending)

import StatusBadge from "./StatusBadge";

export default function ActiveRequestItem({
  imageSrc,
  imageAlt,
  status,
  title,
  provider,
  date,
  price,
  onViewDetails,
  onOpenChat,
  onCancel,
}) {
  const isPending = status === "Pending";

  return (
    <div className="bg-surface-container-lowest rounded-lg p-8 flex flex-col md:flex-row items-center gap-8 hover:scale-[1.01] transition-transform duration-300 group shadow-md hover:shadow-lg border border-outline-variant/10">
      {/* Thumbnail */}
      <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
        <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" />
      </div>

      {/* Content grid */}
      <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {/* Col 1: title + provider */}
        <div className="space-y-1">
          <StatusBadge status={status} />
          <h3 className="font-headline font-bold text-xl text-on-surface">{title}</h3>
          <p className="text-on-surface-variant font-medium">Provider: {provider}</p>
        </div>

        {/* Col 2: date + price */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 text-on-surface-variant mb-1">
            <span className="material-symbols-outlined text-sm">calendar_today</span>
            <span className="text-sm font-medium">{date}</span>
          </div>
          <div className="flex items-center gap-2 text-primary font-bold">
            <span className="material-symbols-outlined text-sm">payments</span>
            <span>{price}</span>
          </div>
        </div>

        {/* Col 3: actions */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onViewDetails}
            className="px-5 py-2.5 rounded-lg text-on-primary bg-primary font-semibold shadow-md border border-primary/20 hover:shadow-lg hover:scale-105 active:scale-95 transition-all font-label"
          >
            View Details
          </button>

          {!isPending && (
            <button
              onClick={onOpenChat}
              className="px-5 py-2.5 rounded-lg bg-surface-container-high text-on-surface font-bold flex items-center gap-2 shadow-sm border border-outline-variant/20 hover:bg-secondary-container hover:text-secondary hover:shadow-md active:scale-95 transition-all font-label"
            >
              <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
              Open Chat
            </button>
          )}

          {isPending && (
            <button
              onClick={onCancel}
              className="px-5 py-2.5 rounded-lg text-error font-bold shadow-sm border border-error-container/30 hover:bg-error-container hover:shadow-md active:scale-95 transition-all font-label"
            >
              Cancel Request
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
