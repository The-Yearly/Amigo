// MessageInput.jsx
// The message composer bar at the bottom of the chat pane.
// Props:
//   value      – controlled textarea value
//   onChange   – change handler
//   onSend     – send button click handler

export default function MessageInput({ value, onChange, onSend }) {
  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend?.();
    }
  }

  return (
    <footer className="p-6 bg-surface/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto flex items-end gap-3 bg-surface-container-low p-2 rounded-[2rem] focus-within:ring-2 focus-within:ring-primary/10 transition-all">
        <button className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-surface-container-high text-tertiary transition-colors">
          <span className="material-symbols-outlined">add_circle</span>
        </button>
        <textarea
          className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2.5 px-2 resize-none placeholder:text-tertiary/50 max-h-32"
          placeholder="Type a message..."
          rows={1}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={onSend}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-tr from-primary to-primary-container text-on-primary shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            send
          </span>
        </button>
      </div>
    </footer>
  );
}
