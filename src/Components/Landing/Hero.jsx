import React from 'react';
import { Rocket, ShieldCheck, Banknote, Search } from 'lucide-react'; // Icon set for visual context

/**
 * HERO COMPONENT:
 * The "First Fold" of the landing page designed to grab attention and provide immediate utility.
 */
const Hero = () => {
  return (
    /* MAIN WRAPPER: 
       Centered container that stacks vertically on mobile and side-by-side on desktop (md:flex-row). */
    <div className="max-w-7xl mx-auto px-8 py-16 flex flex-col md:flex-row gap-12">
      
      {/* 1. TEXT & SEARCH AREA (Left side on desktop) */}
      <div className="flex-1">
        {/* Main Headline with high-contrast typography and a serif accent for the "Collective" vibe */}
        <h1 className="text-7xl font-extrabold text-[#1a1a1a] leading-tight tracking-tighter">
          The Campus <br />
          <span className="text-[#8b2e5f] italic font-serif font-medium">Collective</span>
        </h1>
        
        {/* SEARCH BAR CONTAINER: 
            Relative positioning allows the button to sit inside the input field. */}
        <div className="mt-10 relative max-w-xl">
          <input 
            type="text" 
            placeholder="Search for specialized services, editors, or campus gigs..."
            // focus:ring-2 provides an accessible outline when a user clicks to type
            className="w-full bg-gray-100 border-none py-4 px-6 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-green-800"
          />
          {/* SEARCH BUTTON: Absolute positioned to the right of the input */}
          <button className="absolute right-3 top-2.5 bg-[#064e3b] p-2 rounded-md text-white">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* 2. CURATOR DASHBOARD MINI-CARD (Right side on desktop)
          This acts as a "Proof of Concept" UI to show users the earning potential of the platform. */}
      <div className="w-80 bg-white border border-gray-100 shadow-xl rounded-xl p-6 h-fit">
        {/* Small uppercase header for the card label */}
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Curator Dashboard</p>
        
        {/* STATS SECTION: Showing completion count vs monetary earnings */}
        <div className="flex justify-between items-end">
            <div>
                <p className="text-3xl font-bold">24</p>
                <p className="text-xs text-gray-500">Gigs Completed</p>
            </div>
            <div className="text-right">
                <p className="text-2xl font-bold text-[#8b2e5f]">$1,420</p>
                <p className="text-xs text-gray-500">Monthly Earnings</p>
            </div>
        </div>

        {/* PROGRESS BAR: Visual representation of reaching a monthly goal */}
        <div className="mt-4 w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div className="bg-[#064e3b] h-full w-3/4"></div> {/* Represents 75% progress */}
        </div>

        {/* GAMIFICATION TEXT: Encourages user engagement via social proof */}
        <p className="mt-3 text-[10px] text-gray-400 leading-tight">
            You are in the top 5% of campus contributors this month. Keep it up!
        </p>
      </div>
    </div>
  );
};

export default Hero;