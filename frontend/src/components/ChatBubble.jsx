// ChatBubble.jsx
// A single chat message bubble — either sent (right) or received (left).
// Props:
//   messages   – string[] — one or more bubbles in a group
//   sent       – bool, true = right-aligned primary bubble
//   avatarSrc  – avatar image URL (only shown for received)
//   avatarAlt  – avatar alt text
//   time       – timestamp string
//   read       – bool, show read receipt checkmark (sent only)

export default function ChatBubble({ messages = [], sent = false, avatarSrc, avatarAlt, time, read = false }) {
  if (sent) {
    return (
      <div className="flex flex-row-reverse gap-4 max-w-[80%] ml-auto">
        <div className="space-y-1 items-end flex flex-col">
          {messages.map((msg, i) => (
            <div
              key={i}
              className="bg-primary px-4 py-3 rounded-2xl rounded-br-none text-on-primary shadow-lg shadow-primary/10"
            >
              <p className="text-sm">{msg}</p>
            </div>
          ))}
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-[10px] text-tertiary">{time}</span>
            {read && (
              <span
                className="material-symbols-outlined text-primary text-xs"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4 max-w-[80%]">
      <img
        src={avatarSrc}
        alt={avatarAlt}
        className="h-8 w-8 rounded-full object-cover self-end mb-1 shrink-0"
      />
      <div className="space-y-1">
        {messages.map((msg, i) => (
          <div key={i} className="bg-surface-container-low px-4 py-3 rounded-2xl rounded-bl-none">
            <p className="text-sm text-on-surface">{msg}</p>
          </div>
        ))}
        <span className="text-[10px] text-tertiary ml-1">{time}</span>
      </div>
    </div>
  );
}
