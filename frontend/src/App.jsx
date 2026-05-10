import React, { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import Navbar from "./Components/Landing/Navbar";
import Hero from "./Components/Landing/Hero";
import Dashboard from "./Components/Landing/DashBoard";
import Footer from "./Components/Landing/Footer";
import AmigoLanding from "./Components/Landing/AmigoLanding";
import "./index.css";
import ServicePage from "./services/ServicePage.jsx";

export default function App() {
  const { scrollY } = useScroll();
  const [isLocked, setIsLocked] = useState(false);
  const contentRef = useRef(null); // Reference used to target the main landing content
  const logoDraw = useTransform(scrollY, [0, 300], [0, 1]);
  const logoOpacity = useTransform(scrollY, [200, 500], [1, 0]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 200) setIsLocked(true);
    else setIsLocked(false);
  });

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight, // Jumps exactly 100% of the viewport height
      behavior: "smooth",
    });
  };

  const LandingPage = (
    <div className="relative bg-[#FFFBF7] dark:bg-stone-950 transition-colors duration-300">
      <motion.div
        initial={false}
        animate={{ y: isLocked ? 0 : -100 }}
        className="fixed top-0 left-0 w-full z-[100]"
      >
        <Navbar />
      </motion.div>

      <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
        <motion.div style={{ opacity: logoOpacity }} className="w-full">
          <AmigoLanding progress={logoDraw} />
        </motion.div>
      </div>

      <motion.div
        style={{ opacity: useTransform(scrollY, [0, 100], [1, 0]) }}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 cursor-pointer"
        onClick={scrollToContent}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center text-stone-400"
        >
          <span className="text-xs uppercase tracking-widest mb-2">
            Explore
          </span>
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              d="M7 13l5 5 5-5M7 6l5 5 5-5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>

      <div className="relative z-10">
        <div className="h-[100vh]" />
        <main
          ref={contentRef}
          className="relative bg-[#FFFBF7] dark:bg-stone-950"
        >
          <div className="pt-32">
            <Hero />
          </div>
          <Dashboard />
          <Footer />
        </main>
      </div>
    </div>
  );

  return LandingPage;
}
