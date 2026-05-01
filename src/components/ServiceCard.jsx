// ServiceCard.jsx
// Standard service listing card with 4:3 image, badge, creator info, rating, price.
// Props:
//   imageSrc     – card hero image URL
//   imageAlt     – alt text
//   badge        – { label, variant: "primary" | "secondary" } — optional
//   creatorImg   – creator avatar URL
//   creatorName  – creator name string
//   creatorRole  – creator role/major string
//   title        – service title
//   rating       – numeric rating
//   reviewCount  – number of reviews
//   price        – price string e.g. "$45"
//   onClick      – click handler

export default function ServiceCard({
  imageSrc,
  imageAlt,
  badge,
  creatorImg,
  creatorName,
  creatorRole,
  title,
  rating,
  reviewCount,
  price,
  onClick,
}) {
  const badgeClass =
    badge?.variant === "secondary"
      ? "bg-secondary text-on-secondary"
      : "bg-primary-container text-on-primary-container";

  return (
    <article
      onClick={onClick}
      className="group bg-surface-container-lowest rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 shadow-sm hover:shadow-xl cursor-pointer"
    >
      {/* Hero image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" />
        {badge && (
          <div className="absolute top-4 left-4">
            <span className={`${badgeClass} text-[10px] uppercase tracking-widest font-bold py-1 px-3 rounded-full`}>
              {badge.label}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Creator */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-fixed shrink-0">
            <img src={creatorImg} alt={creatorName} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="font-bold text-sm text-on-surface">{creatorName}</p>
            <p className="text-xs text-on-surface-variant">{creatorRole}</p>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-on-surface mb-2 leading-tight font-display group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          <span
            className="material-symbols-outlined text-secondary text-sm"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>
          <span className="font-bold text-sm">{rating.toFixed(1)}</span>
          <span className="text-on-surface-variant text-sm">({reviewCount})</span>
        </div>

        {/* Price row */}
        <div className="flex justify-between items-center pt-4 border-t border-surface-container-low">
          <p className="text-on-surface-variant text-xs uppercase tracking-widest font-semibold">Starting At</p>
          <p className="text-2xl font-extrabold text-primary">{price}</p>
        </div>
      </div>
    </article>
  );
}
