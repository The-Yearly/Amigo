import {
  ArrowDownUp,
  Briefcase,
  ChevronDown,
  CircleCheckBig,
  Gavel,
  ListFilterPlus,
  TrendingUp,
  TriangleAlert,
  User,
  Clock,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { IsMobileContext } from "./mobileContext";
import axios from "axios"; // Assuming you use axios

export const MobileReportCard = ({ card }) => {
  // Utility to format ISO string to readable time
  const formatTime = (dateString) => new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm font-sans mb-4">
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm font-semibold text-gray-500 tracking-wide uppercase">
          #{card.id.slice(-6)}
        </span>
        <div
          className={`flex items-center w-fit px-3 py-1 text-sm rounded-2xl ${
            card.status === "COMPLETED" ? "bg-green-300/30 text-green-700" : 
            card.status === "PENDING" ? "bg-red-300/30 text-red-400" : "bg-gray-300/30 text-black"
          }`}
        >
          {card.status}
        </div>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">{card.type}</h2>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-gray-600">
          <Clock size={18} />
          <span className="text-base font-medium text-gray-500">
            {new Date(card.time).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

const Cards = ({ card }) => (
  <div className="w-full bg-white rounded-xl col-span-1 grid grid-cols-2 px-4 sm:px-6 py-5 shadow-sm hover:shadow-md transition-shadow">
    <div className={`${card.style} flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl`}>
      <card.icon className="w-6 h-6 sm:w-7 sm:h-7" />
    </div>
    <div>{card.sideContent}</div>
    <div className="space-y-1">
      <p className="text-sm sm:text-base text-gray-600">{card.name}</p>
      <p className="text-2xl sm:text-3xl md:text-4xl font-bold">{card.value}</p>
    </div>
  </div>
);

export default function AdminHome() {
  const isMobile = useContext(IsMobileContext);
  const [realTimeData, setRealTimeData] = useState([]);
  const [stats, setStats] = useState({ total: 0, urgent: 0, profile: 0, errand: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch stats and recent activity (limit 5)
        const [statsRes, activityRes] = await Promise.all([
          axios.get("/api/admin/stats"), 
          axios.get("/api/admin/flagged?limit=5")
        ]);
        setStats(statsRes.data.data);
        setRealTimeData(activityRes.data.data);
      } catch (err) {
        console.error("Failed to fetch admin data", err);
      }
    };
    fetchData();
  }, []);

  const adminHeroCards = [
    {
      name: "Total Flags",
      icon: TriangleAlert,
      value: stats.totalFlags || 0,
      style: "bg-amber-400/30 text-amber-800",
      sideContent: (
        <div className="bg-amber-400/30 text-amber-800 px-3 space-x-2 h-8 text-xs rounded-2xl justify-center py-1 flex items-center whitespace-nowrap">
          <TrendingUp className="w-4 h-4" />
          <p>Live</p>
        </div>
      ),
    },
    {
      name: "Urgent Reports",
      icon: TriangleAlert,
      value: stats.urgentReports || 0,
      style: "bg-red-300/30 text-red-400",
      sideContent: (
        <div className="bg-red-300/30 text-red-400 px-3 h-8 text-xs rounded-2xl py-1 flex justify-center items-center whitespace-nowrap">
          Requires Action
        </div>
      ),
    },
    {
      name: "Profile Reports",
      icon: User,
      value: stats.profileReports || 0,
      style: "bg-blue-300/20 text-blue-400",
      sideContent: (
        <div className="bg-blue-300/30 text-blue-400 px-3 h-8 text-xs rounded-2xl py-1 flex justify-center items-center whitespace-nowrap">
          Pending
        </div>
      ),
    },
    {
      name: "Errand Reports",
      icon: Briefcase,
      value: stats.errandReports || 0,
      style: "bg-green-300/30 text-green-700",
      sideContent: (
        <div className="bg-green-300/30 text-green-700 px-3 h-8 text-xs rounded-2xl py-1 flex items-center justify-center whitespace-nowrap">
          Pending
        </div>
      ),
    }
  ];

  return (
    <div className="max-w-full min-h-screen bg-[#fafaf4] gap-6 px-12 grid grid-cols-1 md:grid-cols-4">
      <div className="space-y-4 mt-8 col-span-1 md:col-span-4">
        <p className="text-5xl font-semibold text-[#002107]">Flagged Market Activity</p>
        <p className="font-sans">Review and moderate user-reported content requiring attention.</p>
      </div>

      {adminHeroCards.map((card, i) => (
        <Cards card={card} key={i} />
      ))}

      <div className="col-span-1 md:col-span-4 mt-16 flex w-full justify-between">
        <p className="text-2xl">Recent Activity</p>
        {/* Sort/Filter UI remains same */}
      </div>

      {!isMobile && (
        <div className="col-span-4 grid grid-cols-5 gap-4 items-center border-b pb-4 mb-2">
          <p className="font-bold text-gray-500">REPORT ID</p>
          <p className="font-bold text-gray-500">TYPE</p>
          <p className="font-bold text-gray-500">REASON</p>
          <p className="font-bold text-gray-500">STATUS</p>
          <p className="font-bold text-gray-500 text-right">TIME</p>
        </div>
      )}

      {!isMobile && realTimeData.map((activity, i) => (
        <React.Fragment key={activity.id}>
          <p className="col-span-1 font-sans truncate">#{activity.id.slice(-6)}</p>
          <div className="col-span-1 flex space-x-2 items-center">
            {activity.type === "USER" ? <User size={18}/> : <Briefcase size={18}/>}
            <p className="font-sans">{activity.type}</p>
          </div>
          <p className="col-span-1 font-sans truncate">{activity.reason || "No reason provided"}</p>
          <div className="col-span-1">
             <span className={`px-3 py-1 text-xs rounded-full ${
                activity.status === "COMPLETED" ? "bg-green-100 text-green-700" : 
                activity.status === "PENDING" ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
              }`}>
                {activity.status}
              </span>
          </div>
          <p className="col-span-1 text-right font-sans text-gray-500">
            {new Date(activity.time).toLocaleDateString()}
          </p>
        </React.Fragment>
      ))}

      {isMobile && realTimeData.map((card) => (
        <div key={card.id} className="col-span-1">
           <MobileReportCard card={card} />
        </div>
      ))}
    </div>
  );
}