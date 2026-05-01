import React from "react";
import { motion } from "framer-motion";
import {
  Gavel,
  LockKeyhole,
  Flag,
  NotebookPen,
  Settings,
  House,
} from "lucide-react";
import { useContext } from "react";
import { IsMobileContext } from "../mobileContext";
const navItems = [
  { icon: House, label: "Community", href: "/", web: false },
  { icon: Gavel, label: "Overview", href: "/adminSettings", web: true },
  { icon: Flag, label: "Flags", href: "/adminSettings/flagged", web: true },
  {
    icon: LockKeyhole,
    label: "Permissions",
    href: "/admin/category",
    web: true,
  },
  {
    icon: NotebookPen,
    label: "Audit Logs",
    href: "/admin/products",
    web: true,
  },
  { icon: Settings, label: "Settings", href: "/admin/category", web: false },
];
export const Sidebar = () => {
  const isMobile = useContext(IsMobileContext);
  const filteredNavItems = !isMobile
    ? navItems.filter((item) => item.web)
    : navItems;
  return (
    <div className="h-full fixed overflow-hidden border border-gray-50 w-[200px] shadow-xl md:w-[300px] bg-white overflow-y-auto">
      <nav className="text-[#002107] pt-3 space-y-5">
        <div className="flex pl-4 flex-col space-y-1">
          <p className="text-3xl font-bold">Moderation Hub</p>
          <p className="text-sm font-semibold">Global Controls</p>
        </div>
        <ul>
          {filteredNavItems.map((item) => (
            <li key={item.label}>
              <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.95 }}>
                <a
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:text-white rounded-lg hover:bg-[#025714] transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium text-lg">{item.label}</span>
                </a>
              </motion.div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
