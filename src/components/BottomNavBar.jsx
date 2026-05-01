// BottomNavBar.jsx
// Mobile-only fixed bottom navigation bar

import NavItem from "./NavItem";

const NAV_ITEMS = [
  { icon: "home", label: "Home", href: "#" },
  { icon: "grid_view", label: "Services", href: "#", active: true },
  { icon: "add_circle", label: "Post", href: "#" },
  { icon: "chat_bubble", label: "Chat", href: "#" },
  { icon: "person", label: "Profile", href: "#" },
];

export default function BottomNavBar() {
  return (
    <nav className="md:hidden fixed bottom-0 w-full z-50 pb-safe bg-white/80 dark:bg-stone-950/80 backdrop-blur-xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)] flex justify-around items-center h-20 px-4">
      {NAV_ITEMS.map((item) => (
        <NavItem key={item.label} {...item} />
      ))}
    </nav>
  );
}
