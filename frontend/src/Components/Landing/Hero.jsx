import React, { useEffect, useState } from "react";
import { Rocket, ShieldCheck, Banknote, Search } from "lucide-react";
import axios from "axios";

const Hero = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/dashboard/stats",
          {
            withCredentials: true,
          },
        );
        setStats(res.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-8 py-16 flex flex-col md:flex-row gap-12">
      <div className="flex-1">
        <h1 className="text-7xl font-extrabold text-[#1a1a1a] leading-tight tracking-tighter">
          The Campus <br />
          <span className="text-[#8b2e5f] italic font-serif font-medium">
            Collective
          </span>
        </h1>

        <div className="mt-10 relative max-w-xl">
          <input
            type="text"
            placeholder="Search for specialized services, editors, or campus gigs..."
            className="w-full bg-gray-100 border-none py-4 px-6 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-green-800"
          />
          <button className="absolute right-3 top-2.5 bg-[#064e3b] p-2 rounded-md text-white">
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="w-80 bg-white border border-gray-100 shadow-xl rounded-xl p-6 h-fit">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
          Curator Dashboard
        </p>

        <div className="flex justify-between items-end">
          <div>
            <p className="text-3xl font-bold">{stats?.gigs || 0}</p>
            <p className="text-xs text-gray-500">Gigs Completed</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-[#8b2e5f]">
              ${stats?.earnings?.toFixed(2) || 0.0}
            </p>
            <p className="text-xs text-gray-500">Monthly Earnings</p>
          </div>
        </div>

        <div className="mt-4 w-full bg-gray-100 h-2 rounded-full overflow-hidden">
          <div className="bg-[#064e3b] h-full w-3/4"></div>
        </div>

        <p className="mt-3 text-[10px] text-gray-400 leading-tight">
          You are in the top 5% of campus contributors this month. Keep it up!
        </p>
      </div>
    </div>
  );
};

export default Hero;
