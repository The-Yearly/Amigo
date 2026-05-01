// NavItem.jsx
// Reusable bottom navigation item used in the mobile BottomNavBar

export default function NavItem({ href = "#", icon, label, active = false }) {
  return (
    <a
      href={href}
      className={`flex flex-col items-center justify-center transition-all duration-200 ${
        active
          ? "text-red-600 dark:text-red-500 scale-110"
          : "text-stone-400 dark:text-stone-600 hover:text-red-500"
      }`}
    >
      <span className="material-symbols-outlined">{icon}</span>
      <span className="font-['Inter'] text-[10px] font-semibold uppercase tracking-wider">
        {label}
      </span>
    </a>
  );
}
