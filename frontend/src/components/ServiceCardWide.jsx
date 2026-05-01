// ServiceCardWide.jsx
// Wide bento-style card that spans 2 columns on md+.
// Has side-by-side image and content layout.
// Props:
//   imageSrc     – hero image URL
//   imageAlt     – alt text
//   creatorImg   – creator avatar URL
//   creatorName  – creator name
//   creatorRole  – creator role/major
//   title        – service title
//   description  – short description paragraph
//   rating       – numeric rating
//   reviewCount  – number of reviews (shown as "X reviews")
//   price        – price string e.g. "$25/hr"
//   onClick      – click handler

export default function ServiceCardWide({
  imageSrc,
  imageAlt,
  creatorImg,
  creatorName,
  creatorRole,
  title,
  description,
  rating,
  reviewCount,
  price,
  onClick,
}) {
  return (
    <article
      onClick={onClick}
      className="group bg-surface-container-lowest rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 shadow-sm hover:shadow-xl md:col-span-2 cursor-pointer"
    >
      <div className="flex flex-col md:flex-row h-full">
        {/* Image */}
        <div className="relative w-full md:w-1/2 overflow-hidden">
          <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div className="p-8 w-full md:w-1/2 flex flex-col justify-center">
          {/* Creator */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary-fixed shrink-0">
              <img src={creatorImg} alt={creatorName} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-bold text-lg text-on-surface">{creatorName}</p>
              <p className="text-sm text-on-surface-variant">{creatorRole}</p>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-3xl font-extrabold text-on-surface mb-4 leading-tight font-display group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-on-surface-variant mb-6 text-lg">{description}</p>

          {/* Rating + Price */}
          <div className="flex justify-between items-center pt-6 border-t border-surface-container-low">
            <div className="flex items-center gap-1">
              <span
                className="material-symbols-outlined text-secondary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span className="font-bold">{rating.toFixed(1)}</span>
              <span className="text-on-surface-variant">({reviewCount} reviews)</span>
            </div>
            <p className="text-3xl font-extrabold text-primary">{price}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
