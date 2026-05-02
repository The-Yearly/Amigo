import React from "react";
import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import {
  LayoutGrid,
  Flag,
  ShieldCheck,
  FileText,
  Gavel,
  Settings,
  LogOut,
} from "lucide-react";
import { useContext } from "react";
import { IsMobileContext } from "../mobileContext";
export const Sidebar = () => {
  const isMobile = useContext(IsMobileContext);
  const path = useLocation();
  const activePath = path.pathname;
  const navItems = [
    { icon: LayoutGrid, label: "Community", href: "/", web: false },
    { icon: Gavel, label: "Overview", href: "/adminSettings", web: true },
    { icon: Flag, label: "Flags", href: "/adminSettings/flagged", web: true },
    {
      icon: ShieldCheck,
      label: "Permissions",
      href: "/adminSettings/permissions",
      web: true,
    },
    {
      icon: FileText,
      label: "Audit Logs",
      href: "/adminSettings/auditlogs",
      web: true,
    },
    { icon: Settings, label: "Settings", href: "/admin/category", web: false },
  ];
  const filteredNavItems = !isMobile
    ? navItems.filter((item) => item.web)
    : navItems;
  const bottomItems = [{ icon: LogOut, label: "Logout", href: "/logout" }];
  return (
    <div className="h-[calc(100vh-3rem)] shadow -xl fixed flex flex-col justify-between w-[260px] md:w-[280px] bg-white py-10 px-4 font-inter">
      <div>
        <div className="px-4 mb-12">
          <h1 className="font-plus-jakarta text-2xl font-bold text-[#002107] leading-tight">
            Amigo Admin
          </h1>
          <p className="text-[11px] font-semibold text-[#727970] tracking-wider uppercase mt-1">
            Modern Curator Panel
          </p>
        </div>
        <nav className="space-y-1">
          {filteredNavItems.map((item) => {
            const isActive = activePath === item.href;
            return (
              <Link key={item.label} to={item.href} className="block">
                <motion.div
                  className={`relative flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${
                    isActive
                      ? "bg-white shadow-[0_4px_12px_rgba(0,0,0,0.03)] text-[#002107]"
                      : "text-[#727970] hover:text-[#002107] hover:bg-gray-50"
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  <span
                    className={`text-sm ${isActive ? "font-bold" : "font-medium"}`}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute left-0 w-1 h-6 bg-[#003912] rounded-r-full"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="px-4">
        <div>
          <div className="space-y-1">
            {bottomItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="flex items-center gap-4 py-2 text-[#727970] hover:text-[#002107] transition-colors"
              >
                <item.icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
