// MessagesTopAppBar.jsx
// Top app bar variant for the Messages page (no menu icon, has notification bell).

import NavLink from "@/components/NavLink";

export default function MessagesTopAppBar({ avatarSrc }) {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-stone-950/80 backdrop-blur-xl flex justify-between items-center px-6 h-16">
      <div className="flex items-center gap-8">
        <span className="text-2xl font-black italic text-red-600 dark:text-red-500 font-['Inter'] tracking-tighter">
          AMIGO
        </span>
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/service">Services</NavLink>
          <NavLink to="/messages" active>
            Chat
          </NavLink>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <button className="material-symbols-outlined p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors">
          notifications
        </button>
        <div className="h-8 w-8 rounded-full overflow-hidden">
          <img
            src={avatarSrc}
            alt="User avatar"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
