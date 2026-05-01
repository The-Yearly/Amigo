// ServicePreviewCard.jsx
// Sticky right-column live preview of the service card being created.
// Props:
//   title      – service title (from form)
//   price      – price string
//   imageSrc   – preview image URL
//   creatorImg – creator avatar URL
//   creatorName – creator name string (shown uppercase)

const PLACEHOLDER_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAC3l7a_RDPFhLkQiZwWpMmcek3Rbgqz7-FU4ix4Uz3Nz2GDY_GEdRJaR_FVsoFRwh7qu7E7VM5UBpWKyKAauxExWwE71Ed4cXtpAJotUS9GN48qrRghhml4Htbrg5qaKeSDvcE23HpjwpRqL_wuX5Nuvqn1EzvRKYMIxq_5GjG2LFrBacKdLhjeflum43ZQ_IBcLZVvx17lMpAbxRi7o3oQtBrj1AlAREqJ8EHF-fol5LLM8bDqertjioruloF_6FwJuHuWw6Xmd4_";

const CREATOR_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDL82M5z0BgRjMOOPFMCWt2_rWJFgOpIo7ms57KGfV76ECZWVoR_DOUh_ycvQHrFbq2GUfVrWjHQXFMPm6VwBBIkIPZouRpVLWcIQJBk9y2KXV7SD6ctVDQ06OjD8qdJFdqZq7fnytbkP9zuIS4GKw6WYICrQmWaPVCtvUjJ4A2Vwj5rK23ir6EFitQs6KZUr-NLIpRzj7nVyznCw7P0GJbaxTIWWlEVuUUdKx7QAemwBbsSIlMSbRFi6Nd7p6dL96mDRXJH7BCs-a3";

export default function ServicePreviewCard({
  title = "Editorial Portrait Session",
  price = "$45.00",
  imageSrc,
  creatorImg = CREATOR_IMG,
  creatorName = "Alex Rivera",
}) {
  return (
    <section className="lg:col-span-3 space-y-6 order-2 lg:order-3 sticky top-32">
      {/* Label */}
      <h3 className="font-display font-bold text-primary flex items-center gap-2">
        <span className="material-symbols-outlined text-xl">visibility</span>
        Live Preview
      </h3>

      {/* Preview card */}
      <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-xl border border-outline-variant/10 group transition-all duration-500 hover:scale-[1.02]">
        {/* Hero image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={imageSrc || PLACEHOLDER_IMG}
            alt="Service preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <span className="bg-secondary text-on-secondary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
              Top Rated
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Creator */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-primary-fixed overflow-hidden">
              <img src={creatorImg} alt={creatorName} className="w-full h-full object-cover" />
            </div>
            <span className="text-[10px] font-bold text-on-surface-variant font-label">
              {creatorName.toUpperCase()}
            </span>
          </div>

          {/* Title */}
          <h4 className="font-display font-bold text-xl text-primary leading-tight mb-2 group-hover:text-secondary transition-colors">
            {title || "Your Service Title"}
          </h4>

          {/* Rating */}
          <div className="flex items-center gap-1 text-secondary mb-4">
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span className="text-xs font-bold">5.0</span>
            <span className="text-xs text-outline ml-1">(0 reviews)</span>
          </div>

          {/* Price row */}
          <div className="flex items-center justify-between border-t border-outline-variant/20 pt-4">
            <div className="flex flex-col">
              <span className="text-[10px] text-outline font-bold uppercase tracking-tighter">
                Starting at
              </span>
              <span className="text-xl font-display font-extrabold text-primary">
                {price ? `$${price}` : "$0.00"}
              </span>
            </div>
            <span className="material-symbols-outlined text-primary-container">arrow_forward</span>
          </div>
        </div>
      </div>

      {/* Amigo Protection badge */}
      <div className="bg-primary-container text-on-primary-container p-6 rounded-xl relative overflow-hidden">
        <div className="relative z-10">
          <h4 className="font-display font-bold text-white mb-2">Amigo Protection</h4>
          <p className="text-xs text-on-primary-container leading-relaxed">
            Your payments are held in escrow until you and the client confirm the work is complete.
          </p>
        </div>
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary rounded-full blur-2xl opacity-50" />
      </div>
    </section>
  );
}
