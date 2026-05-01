import React, { useEffect, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { Sun, Moon } from 'lucide-react'; // Importing icons for the theme toggle UI

const AmigoLanding = ({ children }) => {
  // 1. STATE MANAGEMENT
  // Tracks whether the UI is in Dark Mode or Light Mode; affects Tailwind classes and SVG stroke colors.
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // 2. ANIMATION CONTROLS
  // useAnimationControls allows for "imperative" animation (triggering it manually via code logic).
  const controls = useAnimationControls();

  // 3. SIDE EFFECT (MOUNT LOGIC)
  // This hook runs once when the component is first rendered.
  useEffect(() => {
    // Starts the 'pathLength' animation to transition the SVG stroke from 0 to 1 (full draw).
    controls.start({
      pathLength: 1,
      transition: { duration: 7, ease: "easeInOut" } // Defines a 7-second smooth drawing duration.
    });
  }, [controls]); // Dependency array ensures this only reacts if 'controls' changes.

  // 4. HANDLER FUNCTIONS
  // Simple toggle to flip the boolean state for the theme.
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    // 5. THEME WRAPPER
    // If isDarkMode is true, the "dark" class is added, enabling Tailwind's dark mode utilities.
    <div className={isDarkMode ? "dark" : ""}>
      
      {/* Container providing the full-height background with a smooth color transition. */}
      <div className="flex flex-col min-h-screen transition-colors duration-500 bg-white dark:bg-stone-950">
        
        {/* 6. THEME TOGGLE BUTTON
            Positioned 'fixed' so it stays in the corner regardless of page scrolling. */}
        <button 
          onClick={toggleTheme}
          className="fixed z-[100] top-6 right-6 p-3 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:scale-110 transition-all"
        >
          {/* Conditional rendering: shows Sun icon for Dark Mode and Moon for Light Mode. */}
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* 7. HERO SECTION
            A full-screen (min-h-screen) flex container to center the logo vertically and horizontally. */}
        <div className="flex items-center justify-center w-full min-h-screen transition-colors duration-500 bg-[#b08cdf] dark:bg-stone-950">
          <div className="w-full max-w-2xl px-10">
            
            {/* 8. SVG LOGO
                The 'viewBox' acts as the internal coordinate system for the path data. */}
            <svg viewBox="0 14.25 137 50" className="w-full h-auto">
              <motion.path
                // 'd' contains the raw vector path coordinates for the word "Amigo".
                d="M26.30 17.80Q24.25 18.90 21.95 21.92Q19.65 24.95 17.30 29.65Q19.10 30.00 20.63 30.45Q22.15 30.90 23.40 31.40L26.30 17.80M30.20 14.25Q31.25 14.25 32.30 14.42Q33.35 14.60 34.15 14.95L26.30 51.75L19.10 51.75L22.95 33.60Q21.20 32.80 19.65 32.37Q18.10 31.95 16.25 31.80Q13.40 38.00 11.58 44.40Q9.75 50.80 9.75 54.65Q9.75 55.55 9.93 56.22Q10.10 56.90 10.45 57.45Q6.65 57.45 5.20 56.15Q3.75 54.85 3.75 52.15Q3.75 48.80 5.78 43.20Q7.80 37.60 11.10 31.80Q8.55 31.95 7.13 32.60Q5.70 33.25 5.25 34.40Q5.45 34.40 5.67 34.92Q5.90 35.45 5.90 35.95Q5.90 36.80 5.10 37.35Q4.30 37.90 3.10 37.90Q1.70 37.90 0.85 37.12Q0 36.35 0 35.00Q0 32.40 2.92 30.62Q5.85 28.85 10.20 28.85Q10.70 28.85 11.35 28.87Q12.00 28.90 12.80 29.00Q17.20 22.05 21.75 18.15Q26.30 14.25 30.20 14.25ZM57.45 46.40Q57.45 45.50 57.67 44.15Q57.90 42.80 58.60 39.85Q59.30 37.00 59.50 35.75Q59.70 34.50 59.70 33.65Q59.70 32.40 59.25 31.75Q58.80 31.10 57.90 31.10Q56.70 31.10 55.67 32.32Q54.65 33.55 54 35.70L50.60 51.75L43.40 51.75L47.05 34.50Q47.15 34.20 47.17 33.90Q47.20 33.60 47.20 33.25Q47.20 32.25 46.80 31.65Q46.40 31.05 45.70 31.05Q44.40 31.05 43.35 32.27Q42.30 33.50 41.65 35.70L38.25 51.75L31.05 51.75L36.35 26.75L43.55 26.75L43 29.35Q44.25 27.90 45.75 27.20Q47.25 26.50 49.10 26.50Q51.30 26.50 52.57 27.57Q53.85 28.65 54.25 30.80Q55.65 28.65 57.35 27.60Q59.05 26.55 61.20 26.55Q63.85 26.55 65.30 28.00Q66.75 29.45 66.75 32.20Q66.75 33.35 66.47 34.92Q66.20 36.50 65.40 39.75Q64.75 42.30 64.55 43.35Q64.35 44.40 64.35 45.10Q64.35 46.15 64.85 46.67Q65.35 47.20 66.35 47.20Q67.60 47.20 68.50 46.35Q69.40 45.50 70.55 42.80L72.65 42.80Q71.05 47.45 68.78 49.75Q66.50 52.05 63.35 52.05Q60.55 52.05 59 50.52Q57.45 49.00 57.45 46.40ZM82.90 20.10Q82.90 21.75 81.72 22.90Q80.55 24.05 78.90 24.05Q77.25 24.05 76.10 22.90Q74.95 21.75 74.95 20.10Q74.95 18.45 76.10 17.27Q77.25 16.10 78.90 16.10Q80.55 16.10 81.72 17.27Q82.90 18.45 82.90 20.10M70.15 46.05Q70.15 45.40 70.25 44.57Q70.35 43.75 70.55 42.80L73.95 26.75L81.15 26.75L77.55 43.75Q77.45 44.20 77.40 44.57Q77.35 44.95 77.35 45.35Q77.35 46.35 77.83 46.77Q78.30 47.20 79.40 47.20Q80.80 47.20 82.05 45.97Q83.30 44.75 83.90 42.80L86 42.80Q84.40 47.35 81.70 49.70Q79 52.05 75.50 52.05Q73 52.05 71.58 50.47Q70.15 48.90 70.15 46.05ZM100.15 29.05L100.15 29.35L100.70 26.75L107.90 26.75L102.95 49.95Q105.45 49.05 106.88 47.42Q108.30 45.80 109.25 42.80L111.35 42.80Q110.20 46.60 108.08 48.90Q105.95 51.20 102.50 52.15L101.75 55.75Q100.85 59.95 98.60 62.10Q96.35 64.25 92.75 64.25Q90.20 64.25 88.68 62.95Q87.15 61.65 87.15 59.40Q87.15 56.95 89.18 55.07Q91.20 53.20 95.30 51.95L95.90 49.30Q94.60 50.65 93.10 51.35Q91.60 52.05 89.90 52.05Q86.80 52.05 85.03 49.95Q83.25 47.85 83.25 44.00Q83.25 41.20 84.10 38.15Q84.95 35.10 86.45 32.60Q88.30 29.65 90.75 28.07Q93.20 26.50 96.10 26.50Q98.05 26.50 99.10 27.17Q100.15 27.85 100.15 29.05M99.70 31.45Q99.65 30.65 99.10 30.12Q98.55 29.60 97.65 29.60Q94.90 29.60 92.78 34.20Q90.65 38.80 90.65 43.30Q90.65 45.25 91.20 46.22Q91.75 47.20 93.15 47.20Q94.35 47.20 95.53 46.10Q96.70 45.00 97.15 43.30L99.70 31.45M94.80 54.45Q92.30 55.40 91.10 56.42Q89.90 57.45 89.90 58.70Q89.90 59.35 90.40 59.85Q90.90 60.35 91.60 60.35Q92.45 60.35 93.25 59.15Q94.05 57.95 94.50 55.90L94.80 54.45ZM108.20 44.05Q108.20 41.20 109.13 38.00Q110.05 34.80 111.65 32.30Q113.50 29.35 116.10 27.82Q118.70 26.30 121.90 26.30Q125.10 26.30 126.70 28.30Q128.30 30.30 128.30 34.30Q128.40 34.35 128.53 34.37Q128.65 34.40 128.85 34.40Q130.40 34.40 132.55 33.55Q134.70 32.70 136.55 31.40L137 32.75Q135.60 34.25 133.28 35.35Q130.95 36.45 128.15 36.90Q127.55 43.65 124.25 47.80Q120.95 51.95 116.20 51.95Q112.30 51.95 110.25 49.95Q108.20 47.95 108.20 44.05M122.30 29.35Q119.90 29.35 117.78 34.20Q115.65 39.05 115.65 43.40Q115.65 45.75 116.18 46.60Q116.70 47.45 118.20 47.45Q120.05 47.45 121.73 44.45Q123.40 41.45 124 37.05Q123.30 36.90 122.98 36.37Q122.65 35.85 122.65 34.95Q122.65 34.00 123.05 33.30Q123.45 32.60 123.45 32.25Q124.10 30.65 123.68 30.00Q123.25 29.35 122.30 29.35Z"
                fill="none" // Ensures only the outline is animated.
                
                // Dynamic stroke color selection using the ternary operator based on isDarkMode.
                stroke={isDarkMode ? "#b08cdf" : "#1D4ED8"} 
                
                strokeWidth="1.2"
                strokeLinecap="round" // Gives the path ends a smooth, circular look.
                strokeLinejoin="round" // Smooths the sharp corners of the path.
                
                // INITIAL state: The path starts completely hidden (0 length).
                initial={{ pathLength: 0 }}
                
                // ANIMATION target: Controlled by the 'controls' hook defined above.
                animate={controls}
              />
            </svg>
          </div>
        </div>

        {/* 9. MAIN CONTENT WRAPPER
            The area below the hero where the nested components (children) are rendered. */}
        <div className="w-full transition-colors duration-500 bg-white dark:bg-stone-950">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AmigoLanding;