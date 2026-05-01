// NavLink.jsx
// Reusable top navigation link with active state support

import { NavLink as RouterNavLink } from "react-router-dom";

export default function NavLink({ to = "/", children, active = false }) {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) => {
        const selected = active || isActive;
        return `font-bold font-['Inter'] hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors px-3 py-1 rounded-lg ${
          selected
            ? "text-red-600 dark:text-red-500"
            : "text-stone-500 dark:text-stone-400"
        }`;
      }}
    >
      {children}
    </RouterNavLink>
  );
}
