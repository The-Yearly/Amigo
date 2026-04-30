import React from 'react';
import ServiceCard from './ServiceCard'; // Reusable component for displaying individual service listings
import { ArrowRight, Truck, GraduationCap } from 'lucide-react'; // Icon library for visual cues

/**
 * DASHBOARD COMPONENT:
 * The primary interface where students discover campus-restricted services.
 */
const Dashboard = () => {
  // Mock data for the category filter tags
  const categories = ["Tutoring", "Move-in Assist", "Photography", "Meal Prep", "Notes Swap", "Bike Repair"];

  return (
    /* MAIN SECTION WRAPPER: 
       Uses a responsive grid (lg:grid-cols-4) to separate the main feed (3/4) from the sidebar (1/4). */
    <section className="max-w-7xl mx-auto px-8 py-12 grid lg:grid-cols-4 gap-8">
      
      {/* 1. LEFT COLUMN: MAIN FEED (Occupies 3 columns on large screens) */}
      <div className="lg:col-span-3">
        
        {/* HEADER AREA: Title and "View All" link */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-[#3E2723] dark:text-gray-100">Recommended For You</h2>
            <p className="text-gray-500 dark:text-gray-400">Tailored based on your campus and major.</p>
          </div>
          <button className="flex items-center gap-2 text-[#7A3E22] dark:text-[#FF8A50] font-bold hover:underline">
            View All <ArrowRight size={18} />
          </button>
        </div>

        {/* SERVICE GRID: Displays recommended ServiceCard components in a 2-column layout */}
        <div className="grid md:grid-cols-2 gap-6">
          <ServiceCard 
            price="$25/hr" 
            category="Tutoring" 
            title="Organic Chemistry II Exam Prep Support"
            author="Sarah J." 
            rating="4.9" 
            image="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?w=400"
            avatar="https://i.pravatar.cc/150?u=1"
          />
          <ServiceCard 
            price="$150/session" 
            category="Creative" 
            title="Graduation Portrait Session - Spring '24"
            author="Marcus T." 
            rating="5.0" 
            image="https://images.unsplash.com/photo-1492691523567-6170f0295da4?w=400"
            avatar="https://i.pravatar.cc/150?u=2"
          />
        </div>
      </div>

      {/* 2. RIGHT COLUMN: SIDEBAR (Occupies 1 column) */}
      <div className="space-y-8">
        
        {/* CAMPUS PULSE WIDGET: A real-time activity/request feed */}
        <div className="bg-[#FBE9E7] dark:bg-[#2D1B15] p-6 rounded-[2rem] space-y-6">
          <h3 className="text-[#3E2723] dark:text-[#FFCCBC] font-bold flex items-center gap-2">
            <span className="w-2 h-2 bg-[#A34700] rounded-full"></span> Campus Pulse
          </h3>
          
          {/* Feed Items: Uses the PulseItem sub-component defined below */}
          <div className="space-y-4">
            <PulseItem icon={<Truck size={18}/>} title="Needed: Dorm Move-out help" meta="Just now • North Campus" />
            <PulseItem icon={<GraduationCap size={18}/>} title="Looking for: CS101 Tutor" meta="12m ago • Engineering Wing" />
          </div>
          
          {/* PRIMARY ACTION BUTTON: For users to create their own requests */}
          <button className="w-full py-3 bg-white dark:bg-[#3E2723] rounded-full font-bold text-[#3E2723] dark:text-white shadow-sm hover:opacity-90 transition-opacity">
            Post a Request
          </button>
        </div>

        {/* POPULAR CATEGORIES: Quick-filter chips for browsing */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-[#3E2723] dark:text-gray-200">Popular Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <span key={cat} className="px-4 py-2 bg-white dark:bg-[#262626] border border-gray-100 dark:border-gray-800 rounded-full text-sm font-medium text-gray-600 dark:text-gray-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * PULSEITEM SUB-COMPONENT:
 * Internal helper to render individual rows in the Sidebar feed.
 * @param {icon} Lucide icon element
 * @param {title} Main description of the request
 * @param {meta} Secondary info (time and location)
 */
const PulseItem = ({ icon, title, meta }) => (
  <div className="flex gap-4">
    {/* Icon Container with theme-aware background colors */}
    <div className="bg-[#FFCCBC] dark:bg-[#4A2C22] p-2 rounded-full h-fit text-[#A34700] dark:text-[#FF8A50]">
      {icon}
    </div>
    <div>
      <p className="text-sm font-bold text-[#3E2723] dark:text-gray-200">{title}</p>
      <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">{meta}</p>
    </div>
  </div>
);

export default Dashboard;