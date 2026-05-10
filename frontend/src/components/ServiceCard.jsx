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
  return (
    <article
      onClick={onClick}
      tabIndex={0}
      className="group bg-surface-container-lowest rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-2xl cursor-pointer border border-surface-container-low hover:border-primary/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
    >
      {/* Hero image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover"
        />

        <span className="absolute top-3 left-3 bg-[#8b2e5f] text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase">
          {badge?.label ? <span>{badge.label}</span> : "Top Curated"}
        </span>
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Creator */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-fixed shrink-0">
            <img
              src={creatorImg}
              alt={creatorName}
              className="w-full h-full object-cover"
            />
            <img
              src={creatorImg}
              alt={creatorName}
              className="w-full h-full object-cover"
            />
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
          <span className="font-bold text-sm">
            {Number(rating || 0).toFixed(1)}
          </span>
          <span className="text-on-surface-variant text-sm">
            ({reviewCount})
          </span>
          <span className="font-bold text-sm">
            {Number(rating || 0).toFixed(1)}
          </span>
          <span className="text-on-surface-variant text-sm">
            ({reviewCount})
          </span>
        </div>

        {/* Price row */}
        <div className="flex justify-between items-center pt-4 border-t border-surface-container-low">
          <p className="text-on-surface-variant text-xs uppercase tracking-widest font-semibold">
            Starting At
          </p>
          <p className="text-on-surface-variant text-xs uppercase tracking-widest font-semibold">
            Starting At
          </p>
          <p className="text-2xl font-extrabold text-primary">{price}</p>
        </div>
      </div>
    </article>
  );
}
