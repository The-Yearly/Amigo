// MobileNavPill.jsx
// Floating pill-style bottom navigation for mobile (used on Messages page).
// Pass `activeTab` to highlight the correct item.

const NAV_ITEMS = [
  { icon: "home", label: "Home", tab: "home" },
  { icon: "grid_view", label: "Services", tab: "services" },
  { icon: "add_circle", label: "Post", tab: "post" },
  { icon: "chat_bubble", label: "Chat", tab: "chat", filled: true },
  { icon: "person", label: "Profile", tab: "profile" },
];

export default function MobileNavPill({ activeTab = "chat" }) {
  return (
    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-sm z-50">
      <nav className="bg-white/80 dark:bg-stone-950/80 backdrop-blur-xl rounded-full h-16 flex justify-around items-center px-4 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
        {NAV_ITEMS.map((item) => {
          const isActive = item.tab === activeTab;
          return (
            <a
              key={item.tab}
              href="#"
              className={`flex flex-col items-center justify-center transition-all active:scale-90 ${
                isActive
                  ? "text-red-600 dark:text-red-500 scale-110"
                  : "text-stone-400 dark:text-stone-600 hover:text-red-500"
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={
                  isActive && item.filled
                    ? { fontVariationSettings: "'FILL' 1" }
                    : undefined
                }
              >
                {item.icon}
              </span>
              <span className="text-[8px] font-bold uppercase tracking-widest mt-1">
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
