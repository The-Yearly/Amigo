// BookingCard.jsx
// Sticky booking sidebar card shown on the service detail page.
// Props:
//   title        – service name
//   rating       – numeric rating (e.g. 4.9)
//   reviewCount  – number of reviews
//   price        – price string (e.g. "$149")
//   duration     – session length string (e.g. "90 min session")
//   features     – array of { icon, label }
//   onBook       – callback for the CTA button

import StarRating from "./StarRating";
import FeatureBadge from "./FeatureBadge";

export default function BookingCard({
  title,
  rating,
  reviewCount,
  price,
  duration,
  features = [],
  onBook,
}) {
  return (
    <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/10 shadow-[0_32px_64px_rgba(26,28,28,0.06)]">
      <h1 className="text-3xl font-bold font-headline tracking-tight text-on-surface mb-2">
        {title}
      </h1>

      {/* Rating row */}
      <div className="flex items-center gap-2 mb-6">
        <span
          className="material-symbols-outlined text-yellow-500"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          star
        </span>
        <span className="font-bold text-on-surface">{rating}</span>
        <span className="text-tertiary text-sm">
          ({reviewCount} student reviews)
        </span>
      </div>

      {/* Price block */}
      <div className="mb-8 p-6 bg-surface-container-low rounded-lg">
        <p className="text-tertiary text-sm font-semibold uppercase tracking-widest mb-1">
          Total per session
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-black text-on-surface">{price}</span>
          <span className="text-tertiary font-medium">/ {duration}</span>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-4 mb-8">
        {features.map((f) => (
          <FeatureBadge key={f.label} icon={f.icon}>
            {f.label}
          </FeatureBadge>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={onBook}
        className="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-full font-bold text-lg hover:shadow-xl active:scale-95 transition-all duration-200 shadow-primary/20"
      >
        Book Session Now
      </button>
      <p className="text-center text-xs text-tertiary mt-4">
        No payment required until after session confirmation
      </p>
    </div>
  );
}
