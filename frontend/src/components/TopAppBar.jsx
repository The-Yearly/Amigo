// TopAppBar.jsx
// Fixed top header with logo, desktop nav, and user avatar

import NavLink from "@/components/NavLink";

export default function TopAppBar({ avatarSrc }) {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-stone-950/80 backdrop-blur-xl flex justify-between items-center px-6 h-16">
      {/* Left: Menu + Logo */}
      <div className="flex items-center gap-4">
        <span className="material-symbols-outlined text-stone-500 cursor-pointer p-2 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors rounded-full active:scale-95 duration-150">
          menu
        </span>
        <span className="text-2xl font-black italic text-red-600 dark:text-red-500 font-['Inter'] tracking-tighter">
          AMIGO
        </span>
      </div>

      {/* Center: Desktop Nav */}
      <nav className="hidden md:flex items-center gap-8">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/service">Services</NavLink>
        <NavLink to="/messages">Chat</NavLink>
      </nav>

      {/* Right: Avatar */}
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border-2 border-white">
          <img
            src={avatarSrc}
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
