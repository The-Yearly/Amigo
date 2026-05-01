import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Routes, Route } from 'react-router-dom';
import Navbar from "./Components/Landing/Navbar";
import Hero from "./Components/Landing/Hero";
import Dashboard from "./Components/Landing/DashBoard";
import Footer from "./Components/Landing/Footer";
import AmigoLanding from "./Components/Landing/AmigoLanding";
import CuratorWorkspace from "./Components/CreateService/CuratorWorkspace";
import "./index.css";

/**
 * APP COMPONENT:
 * The root component of the Amigo platform. It manages:
 * 1. Global Routing (using React Router).
 * 2. Scroll-linked animations (using Framer Motion).
 * 3. The "Locking" logic of the Navbar based on user position.
 */
export default function App() {
  /* 
     1. SCROLL TRACKING:
     'scrollY' provides the current vertical scroll position in pixels. 
  */
  const { scrollY } = useScroll();
  const [isLocked, setIsLocked] = useState(false);
  const contentRef = useRef(null); // Reference used to target the main landing content

  /* 
     2. INTERPOLATION (useTransform):
     These hooks map the scroll range to specific output values.
     - logoDraw: As the user scrolls from 0 to 300px, it returns a value from 0 to 1 (used for SVG tracing).
     - logoOpacity: Fades the logo out as the user moves deeper into the site (200px to 500px).
  */
  const logoDraw = useTransform(scrollY, [0, 300], [0, 1]);
  const logoOpacity = useTransform(scrollY, [200, 500], [1, 0]);

  /* 
     3. SCROLL EVENTS:
     We listen for scroll changes. If the user scrolls past 200px, 
     we 'lock' the navbar into view. This prevents the navbar from 
     cluttering the initial splash screen.
  */
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 200) setIsLocked(true);
    else setIsLocked(false);
  });

  /* 
     4. SMOOTH NAVIGATION:
     A helper function to jump past the initial splash screen (100vh) 
     directly to the marketplace content.
  */
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight, // Jumps exactly 100% of the viewport height
      behavior: "smooth"
    });
  };

  /* 
     LANDING PAGE LAYOUT:
     Defined as a constant for cleaner organization within the Routes.
  */
  const LandingPage = (
    <div className="relative bg-[#FFFBF7] dark:bg-stone-950 transition-colors duration-300">
      
      {/* 5. ANIMATED NAVBAR:
          Moves from -100px (hidden) to 0 (visible) when 'isLocked' is true. */}
      <motion.div 
        initial={false} 
        animate={{ y: isLocked ? 0 : -100 }}
        className="fixed top-0 left-0 w-full z-[100]"
      >
        <Navbar />
      </motion.div>

      {/* 6. SPLASH LOGO (AmigoLanding):
          The logo is 'fixed' and uses 'pointer-events-none' so it doesn't block 
          clicks to the content underneath as it fades out. */}
      <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
        <motion.div style={{ opacity: logoOpacity }} className="w-full">
          {/* We pass the 'logoDraw' progress (0 to 1) into the child component */}
          <AmigoLanding progress={logoDraw} />
        </motion.div>
      </div>

      {/* 7. JUMP ARROW:
          Fades out quickly as soon as scrolling starts. 
          Contains a bouncing animation (y: [0, 10, 0]) to catch the user's eye. */}
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
          <span className="text-xs uppercase tracking-widest mb-2">Explore</span>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>

      {/* 8. CONTENT RUNWAY:
          The first 100vh is empty to let the splash logo shine. 
          The 'main' content starts after that. */}
      <div className="relative z-10">
        <div className="h-[100vh]" /> 
        <main ref={contentRef} className="relative bg-[#FFFBF7] dark:bg-stone-950">
          <div className="pt-32"> 
            <Hero />
          </div>
          <Dashboard />
          <Footer />
        </main>
      </div>
    </div>
  );

  /* 
     9. REACT ROUTER:
     Defines the navigation paths for the app.
     - "/" renders the main landing page and marketplace.
     - "/CuratorWorkspace" renders the form to create new services.
  */
  return (
    <Routes>
      <Route path="/" element={LandingPage} />
      <Route path="/CuratorWorkspace" element={<CuratorWorkspace />} />
    </Routes>
  );
}