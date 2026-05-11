// RequestDetailPanel.jsx
// Sticky right-column detail panel for the selected request.
// Props:
//   title      – request title
//   requestId  – e.g. "#REQ-94210"
//   description – full description text
//   attachments – array of { type: "file"|"link", name, icon }
//   timeline   – array of { label, time, done: bool }
//   requesterName – for the message CTA
//   onClose    – close button handler
//   onSendMessage – send button handler

export default function RequestDetailPanel({
  title,
  requestId,
  description,
  attachments = [],
  timeline = [],
  requesterName,
  onClose,
  onSendMessage,
}) {
  return (
    <aside className="lg:col-span-4 sticky top-28 bg-surface-container-lowest rounded-xl border border-outline-variant/20 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-outline-variant/20">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary">
            Active Selection
          </span>
          <button
            onClick={onClose}
            className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors"
          >
            close
          </button>
        </div>
        <h2 className="text-2xl font-black text-primary-container font-display leading-tight">
          {title}
        </h2>
        <p className="text-sm text-on-surface-variant mt-2">
          Request ID: {requestId}
        </p>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col gap-6">
        {/* Description */}
        <div>
          <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-3">
            Project Description
          </h4>
          <p className="text-sm leading-relaxed text-on-surface">
            "{description}"
          </p>
        </div>

        {/* Attachments */}
        {attachments.length > 0 && (
          <div>
            <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-3">
              Attachments ({attachments.length})
            </h4>
            <div className="flex flex-col gap-2">
              {attachments.map((att, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-surface-container rounded-lg border border-outline-variant/10 shadow-sm"
                >
                  <span className="material-symbols-outlined text-secondary">
                    {att.icon}
                  </span>
                  <span className="text-xs font-semibold truncate flex-1">
                    {att.name}
                  </span>
                  <span className="material-symbols-outlined text-xs text-on-surface-variant">
                    {att.type === "link" ? "open_in_new" : "download"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timeline */}
        {timeline.length > 0 && (
          <div>
            <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-3">
              Timeline
            </h4>
            <div className="flex flex-col gap-4 relative before:absolute before:left-[9px] before:top-2 before:bottom-2 before:w-0.5 before:bg-surface-container-high">
              {timeline.map((step, i) => (
                <div key={i} className="flex gap-4 relative z-10">
                  <div
                    className={`w-5 h-5 rounded-full ring-4 ring-white shrink-0 ${
                      step.done ? "bg-secondary" : "bg-surface-container"
                    }`}
                  />
                  <div>
                    <p
                      className={`text-xs font-bold ${step.done ? "" : "text-on-surface-variant"}`}
                    >
                      {step.label}
                    </p>
                    <p className="text-[10px] text-on-surface-variant">
                      {step.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Message CTA */}
        <div className="pt-6 border-t border-outline-variant/20">
          <div className="bg-surface-container-high p-4 rounded-xl flex items-center gap-3 border border-outline-variant/10 shadow-sm">
            <div className="flex-grow">
              <p className="text-xs font-bold text-primary-container">
                Send a direct message
              </p>
              <p className="text-[10px] text-on-surface-variant">
                Start a conversation with {requesterName}
              </p>
            </div>
            <button
              onClick={onSendMessage}
              className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-md"
            >
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
