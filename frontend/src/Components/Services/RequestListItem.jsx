// RequestListItem.jsx
// A single request row card. Renders differently based on `status`.
// status: "pending" | "accepted" | "in-progress" | "skeleton"
//
// Props:
//   status       – see above
//   imageSrc     – thumbnail image URL
//   imageAlt     – alt text
//   badgeLabel   – category badge label
//   badgeVariant – "secondary" | "primary" | "tertiary"
//   title        – request title
//   price        – price string
//   requesterImg – requester avatar URL
//   requesterName – requester name
//   requesterRole – requester role string
//   timeAgo      – relative time string e.g. "2h ago"
//   excerpt      – short italic quote excerpt
//   progress     – 0-100 number (in-progress only)
//   onAccept     – pending only
//   onReject     – pending only
//   onStartWork  – accepted only
//   onComplete   – in-progress only
//   onClick      – click handler for selecting item

const BADGE_STYLES = {
  secondary: "bg-secondary/10 text-secondary",
  primary: "bg-primary-fixed text-on-primary-fixed-variant",
  tertiary: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
};

export default function RequestListItem({
  status = "pending",
  imageSrc,
  imageAlt,
  badgeLabel,
  badgeVariant = "secondary",
  title,
  price,
  requesterImg,
  requesterName,
  requesterRole,
  timeAgo,
  excerpt,
  progress = 0,
  onAccept,
  onReject,
  onStartWork,
  onComplete,
  onClick,
}) {
  // ── Skeleton ──────────────────────────────────────────────
  if (status === "skeleton") {
    return (
      <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 shadow-sm animate-pulse flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-32 h-32 bg-surface-container-high rounded-lg shrink-0" />
        <div className="flex-grow flex flex-col gap-3">
          <div className="h-4 w-24 bg-surface-container-high rounded" />
          <div className="h-6 w-3/4 bg-surface-container-high rounded" />
          <div className="flex gap-2 items-center mt-2">
            <div className="w-8 h-8 rounded-full bg-surface-container-high" />
            <div className="h-4 w-32 bg-surface-container-high rounded" />
          </div>
          <div className="h-10 w-40 bg-surface-container-high rounded-xl mt-4" />
        </div>
      </div>
    );
  }

  const badgeClass = BADGE_STYLES[badgeVariant] ?? BADGE_STYLES.secondary;
  const isPending = status === "pending";

  return (
    <div
      onClick={onClick}
      className="group bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 shadow-lg hover:shadow-xl hover:scale-[1.01] transition-transform flex flex-col md:flex-row gap-6 relative overflow-hidden cursor-pointer"
    >
      {/* Pending accent stripe */}
      {isPending && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary" />
      )}

      {/* Thumbnail */}
      <div className="w-full md:w-32 h-32 rounded-lg overflow-hidden shrink-0">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-grow">
        {/* Title row */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <span
              className={`${badgeClass} text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest mb-1 inline-block`}
            >
              {badgeLabel}
            </span>
            <h3 className="text-xl font-bold text-primary-container font-display">
              {title}
            </h3>
          </div>
          <span className="text-lg font-bold text-primary-container whitespace-nowrap ml-2">
            {price}
          </span>
        </div>

        {/* Requester row */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-surface-container overflow-hidden shrink-0">
            <img
              src={requesterImg}
              alt={requesterName}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold">{requesterName}</p>
            <p className="text-xs text-on-surface-variant">{requesterRole}</p>
          </div>
          <div className="ml-auto text-xs text-on-surface-variant flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">schedule</span>
            {timeAgo}
          </div>
        </div>

        {/* Excerpt */}
        <p className="text-sm text-on-surface-variant line-clamp-1 mb-4 italic">
          "{excerpt}"
        </p>

        {/* Progress bar (in-progress only) */}
        {status === "in-progress" && (
          <div className="w-full bg-surface-container rounded-full h-1.5 mb-4 overflow-hidden">
            <div
              className="bg-primary-container h-full rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          {status === "pending" && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAccept?.();
                }}
                className="bg-primary-container text-on-primary px-6 py-2 rounded-xl text-sm font-bold hover:shadow-lg transition-shadow"
              >
                Accept
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onReject?.();
                }}
                className="bg-surface-container text-on-surface px-6 py-2 rounded-xl text-sm font-bold hover:bg-surface-container-high transition-colors"
              >
                Reject
              </button>
            </>
          )}

          {status === "accepted" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStartWork?.();
              }}
              className="bg-secondary text-on-secondary px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:shadow-lg transition-shadow"
            >
              <span className="material-symbols-outlined text-sm">
                play_arrow
              </span>
              Start Work
            </button>
          )}

          {status === "in-progress" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onComplete?.();
              }}
              className="border-2 border-primary-container text-primary-container px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary-container hover:text-on-primary transition-all"
            >
              <span className="material-symbols-outlined text-sm">
                done_all
              </span>
              Mark Complete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
