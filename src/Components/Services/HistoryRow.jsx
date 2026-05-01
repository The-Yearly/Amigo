// HistoryRow.jsx
// A single row in the completed requests history table.
// Props:
//   imageSrc   – small thumbnail URL
//   imageAlt   – alt text
//   title      – service title
//   provider   – provider name + date string e.g. "Marcus Thorne • Sep 12, 2024"
//   price      – price string e.g. "$250.00"
//   rated      – bool — if true shows "X.X Rated" with star icon, else "Rate Experience" button
//   ratingValue – rating string e.g. "5.0" (only used when rated=true)
//   onRebook   – Re-book button callback
//   onRate     – Rate Experience callback (only when rated=false)

export default function HistoryRow({
  imageSrc,
  imageAlt,
  title,
  provider,
  price,
  rated = false,
  ratingValue,
  onRebook,
  onRate,
}) {
  return (
    <div className="p-8 flex flex-col md:flex-row items-center gap-8 hover:bg-surface-container/50 transition-colors border-b border-outline-variant/10 last:border-b-0">
      {/* Thumbnail */}
      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 opacity-80">
        <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover grayscale-[30%]" />
      </div>

      {/* Grid */}
      <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {/* Col 1: title + provider */}
        <div>
          <h3 className="font-headline font-bold text-lg text-on-surface">{title}</h3>
          <p className="text-on-surface-variant text-sm">{provider}</p>
        </div>

        {/* Col 2: status */}
        <div className="flex flex-col justify-center">
          <span className="text-sm font-semibold text-on-surface-variant mb-1">Status</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-outline-variant" />
            <span className="text-sm font-bold text-on-surface-variant uppercase tracking-tighter">
              Completed
            </span>
          </div>
        </div>

        {/* Col 3: price + actions */}
        <div className="flex items-center justify-end gap-3">
          <span className="text-primary font-bold mr-4">{price}</span>
          <button
            onClick={onRebook}
            className="px-4 py-2 rounded-lg border border-outline-variant text-on-surface font-bold shadow-sm hover:bg-primary hover:text-on-primary hover:border-primary hover:shadow-md active:scale-95 transition-all text-sm"
          >
            Re-book
          </button>
          {rated ? (
            <button className="px-4 py-2 rounded-lg text-on-surface-variant text-sm font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">star</span>
              {ratingValue} Rated
            </button>
          ) : (
            <button
              onClick={onRate}
              className="px-4 py-2 rounded-lg text-secondary text-sm font-bold hover:underline hover:scale-105 transition-all"
            >
              Rate Experience
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
