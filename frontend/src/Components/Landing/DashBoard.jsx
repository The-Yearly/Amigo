import React, { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard"; // Reusable component for displaying individual service listings
import { ArrowRight, Truck, GraduationCap } from "lucide-react"; // Icon library for visual cues
import axios from "axios";

/**
 * DASHBOARD COMPONENT:
 * The primary interface where students discover campus-restricted services.
 */
const Dashboard = () => {
  // Mock data for the category filter tags
  const categories = [
    "Tutoring",
    "Move-in Assist",
    "Photography",
    "Meal Prep",
    "Notes Swap",
    "Bike Repair",
  ];
  const [data, setData] = useState(null);
  const [services, setServices] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:5000/api/dashboard", {
        withCredentials: true,
      }),
      axios.get("http://localhost:5000/api/services", {
        withCredentials: true,
      }),
      axios.get("http://localhost:5000/api/dashboard/stats", {
        withCredentials: true,
      }),
    ])
      .then(([dashboardRes, servicesRes, statsRes]) => {
        console.log("Dashboard Data:", dashboardRes.data);
        setData(dashboardRes.data);
        setServices(servicesRes.data);
        setStats(statsRes.data);
      })
      .finally(() => setLoading(false));
  }, []);

  function CardSkeleton() {
    return (
      <div className="bg-surface-container border rounded-2xl p-7">
        <div className="h-3 w-20 bg-surface-container-highest rounded mb-4 animate-intense-pulse"></div>
        <div className="h-6 w-40 bg-surface-container-highest rounded mb-2 animate-intense-pulse"></div>
        <div className="h-3 w-32 bg-surface-container-highest rounded animate-intense-pulse"></div>
      </div>
    );
  }

  function ServiceCardSkeleton() {
    return (
      <div className="bg-surface-container border border-outline-variant rounded-2xl overflow-hidden shadow-md">
        <div className="h-48 bg-surface-container-highest animate-intense-pulse" />
        <div className="p-4 space-y-3">
          <div className="h-6 bg-surface-container-highest rounded w-3/4 animate-intense-pulse" />
          <div className="h-4 bg-surface-container-highest rounded w-full animate-intense-pulse" />
          <div className="h-4 bg-surface-container-highest rounded w-5/6 animate-intense-pulse" />
          <div className="h-10 bg-surface-container-highest rounded w-full animate-intense-pulse" />
        </div>
      </div>
    );
  }

  // Animation styles for intense pulsating
  const pulseStyles = `
    @keyframes intensePulse {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 1; }
    }
    .animate-intense-pulse {
      animation: intensePulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
  `;

  return (
    <>
      <style>{pulseStyles}</style>

      <section className="max-w-7xl mx-auto px-8 py-12 grid lg:grid-cols-4 gap-8">
        {/* 1. LEFT COLUMN: MAIN FEED (Occupies 3 columns on large screens) */}
        <div className="lg:col-span-3">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loading ? (
              <>
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </>
            ) : (
              <>
                <div className="bg-surface-container border rounded-2xl p-7">
                  <p className="text-xs text-tertiary mb-2">Services</p>
                  <h2 className="text-3xl font-bold">{data?.services}</h2>
                </div>

                <div className="bg-surface-container border rounded-2xl p-7">
                  <p className="text-xs text-tertiary mb-2">Active Requests</p>
                  <h2 className="text-3xl font-bold">{data?.activeRequests}</h2>
                </div>

                <div className="bg-surface-container border rounded-2xl p-7">
                  <p className="text-xs text-tertiary mb-2">Messages</p>
                  <h2 className="text-3xl font-bold">{data?.messages}</h2>
                </div>
              </>
            )}
          </section>
          {/* HEADER AREA: Title and "View All" link */}
          <div className="mt-12 flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#3E2723] dark:text-gray-100">
                Recommended For You
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Tailored based on your campus and major.
              </p>
            </div>
            <a
              className="flex items-center gap-2 text-[#7A3E22] dark:text-[#FF8A50] font-bold hover:underline"
              href="/services"
            >
              View All <ArrowRight size={18} />
            </a>
          </div>

          {/* SERVICES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <>
                {[...Array(6)].map((_, i) => (
                  <ServiceCardSkeleton key={i} />
                ))}
              </>
            ) : (
              services.map((card) => <ServiceCard key={card.id} {...card} />)
            )}
          </div>
        </div>

        {/* 2. RIGHT COLUMN: SIDEBAR (Occupies 1 column) */}
        <div className="space-y-8">
          {/* CAMPUS PULSE WIDGET: A real-time activity/request feed */}
          <div className="bg-[#FBE9E7] dark:bg-[#2D1B15] p-6 rounded-[2rem] space-y-6">
            <h3 className="text-[#3E2723] dark:text-[#FFCCBC] font-bold flex items-center gap-2">
              <span className="w-2 h-2 bg-[#A34700] rounded-full"></span> Campus
              Pulse
            </h3>

            {/* Feed Items: Uses the PulseItem sub-component defined below */}
            <div className="space-y-4">
              <PulseItem
                icon={<Truck size={18} />}
                title="Needed: Dorm Move-out help"
                meta="Just now • North Campus"
              />
              <PulseItem
                icon={<GraduationCap size={18} />}
                title="Looking for: CS101 Tutor"
                meta="12m ago • Engineering Wing"
              />
            </div>

            {/* PRIMARY ACTION BUTTON: For users to create their own requests */}
            <button className="w-full py-3 bg-white dark:bg-[#3E2723] rounded-full font-bold text-[#3E2723] dark:text-white shadow-sm hover:opacity-90 transition-opacity">
              Post a Request
            </button>
          </div>

          {/* POPULAR CATEGORIES: Quick-filter chips for browsing */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-[#3E2723] dark:text-gray-200">
              Popular Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="px-4 py-2 bg-white dark:bg-[#262626] border border-gray-100 dark:border-gray-800 rounded-full text-sm font-medium text-gray-600 dark:text-gray-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
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
      <p className="text-sm font-bold text-[#3E2723] dark:text-gray-200">
        {title}
      </p>
      <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">
        {meta}
      </p>
    </div>
  </div>
);

export default Dashboard;
