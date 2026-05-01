// ReviewCard.jsx
// Single student review card used in the reviews section.
// Props:
//   initials      – 2-letter avatar initials (string)
//   avatarBg      – Tailwind bg class for the avatar circle
//   avatarText    – Tailwind text class for the initials
//   name          – reviewer's name
//   meta          – e.g. "Class of 2024 • 2 weeks ago"
//   rating        – number of filled stars (0–5)
//   review        – review body text

import StarRating from "../../components/StarRating";

export default function ReviewCard({
  initials,
  avatarBg,
  avatarText,
  name,
  meta,
  rating,
  review,
}) {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/5">
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full ${avatarBg} flex items-center justify-center font-bold ${avatarText}`}
          >
            {initials}
          </div>
          <div>
            <h4 className="font-bold text-on-surface text-sm">{name}</h4>
            <p className="text-xs text-tertiary">{meta}</p>
          </div>
        </div>
        <StarRating rating={rating} size={18} />
      </div>
      <p className="text-tertiary text-sm leading-relaxed italic">"{review}"</p>
    </div>
  );
}
