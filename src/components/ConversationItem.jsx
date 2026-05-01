// ConversationItem.jsx
// A single row in the conversations list.
// Props:
//   avatarSrc    – image URL
//   avatarAlt    – alt text
//   name         – contact name
//   preview      – last message preview text
//   time         – timestamp string
//   unread       – bool, shows bold preview + colored time
//   online       – bool, shows green dot
//   active       – bool, highlights as selected
//   isPending    – bool, shows "NEW" badge + red dot + bold service line
//   serviceLabel – service label string (used when isPending)
//   onClick      – click handler

export default function ConversationItem({
  avatarSrc,
  avatarAlt,
  name,
  preview,
  time,
  unread = false,
  online = false,
  active = false,
  isPending = false,
  serviceLabel,
  onClick,
}) {
  const containerClass = isPending
    ? "bg-surface-container-lowest p-4 rounded-xl shadow-sm cursor-pointer hover:bg-white transition-colors relative"
    : active
      ? "bg-surface-container-highest p-4 rounded-xl cursor-pointer transition-all flex gap-4"
      : "p-4 rounded-xl cursor-pointer hover:bg-surface-container-high transition-all flex gap-4";

  if (isPending) {
    return (
      <div className={containerClass} onClick={onClick}>
        <div className="flex gap-4">
          <div className="relative">
            <img
              src={avatarSrc}
              alt={avatarAlt}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/20"
            />
            <div className="absolute bottom-0 right-0 h-3 w-3 bg-primary rounded-full border-2 border-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-on-surface text-sm truncate">
                {name}
              </h3>
              <span className="text-[10px] font-semibold text-primary">
                NEW
              </span>
            </div>
            <p className="text-xs text-on-surface font-semibold truncate mt-0.5">
              {serviceLabel}
            </p>
            <p className="text-[11px] text-tertiary truncate mt-1">{preview}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClass} onClick={onClick}>
      <div className="relative shrink-0">
        <img
          src={avatarSrc}
          alt={avatarAlt}
          className="h-12 w-12 rounded-full object-cover"
        />
        {online && (
          <div className="absolute bottom-0 right-0 h-3 w-3 bg-primary rounded-full border-2 border-white" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-on-surface text-sm truncate">{name}</h3>
          <span
            className={`text-[10px] ${unread ? "text-primary font-bold" : "text-tertiary"}`}
          >
            {time}
          </span>
        </div>
        <p
          className={`text-xs truncate mt-1 ${unread ? "text-on-surface font-bold" : "text-tertiary"}`}
        >
          {preview}
        </p>
      </div>
    </div>
  );
}
