import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "./components/AdminsideBar";
import React, { useState, useEffect } from "react";
import { IsMobileContext } from "./mobileContext";
import { TopBar } from "./components/AdmintopBar";
export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 740);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);
  return (
    <IsMobileContext.Provider value={isMobile}>
      <div className=" relative w-full bg-gray-100/30">
        <TopBar openSideBar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="flex mt-16">
          <AnimatePresence mode="wait">
            {isSidebarOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 280, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-[280px] h-[calc(100vh-4rem)] z-30"
              >
                <Sidebar />
              </motion.div>
            )}
          </AnimatePresence>

          <main className="md:flex-1 transition-all duration-300">
            <Outlet />
          </main>
        </div>
      </div>
    </IsMobileContext.Provider>
  );
}
