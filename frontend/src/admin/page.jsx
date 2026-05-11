import {
  Briefcase,
  TrendingUp,
  TriangleAlert,
  User,
  Clock,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { IsMobileContext } from "./mobileContext";
import axios from "axios";

// --- Sub-components ---

export const MobileReportCard = ({ card }) => (
  <div className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm mb-4">
    <div className="flex justify-between items-start mb-4">
      <span className="text-xs font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded">
        #{card.id?.slice(-6)}
      </span>
      <StatusBadge status={card.status} />
    </div>
    <div className="flex items-center gap-2 mb-2">
      {card.type === "USER" ? <User size={18} className="text-blue-500" /> : <Briefcase size={18} className="text-green-600" />}
      <h2 className="text-lg font-bold text-gray-900">{card.type}</h2>
    </div>
    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{card.reason || "No reason provided"}</p>
    <div className="flex items-center gap-2 text-gray-400 text-xs">
      <Clock size={14} />
      <span>{new Date(card.time).toLocaleDateString()}</span>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    COMPLETED: "bg-green-100 text-green-700 border-green-200",
    PENDING: "bg-red-50 text-red-600 border-red-100",
    UNDER_REVIEW: "bg-amber-50 text-amber-700 border-amber-100",
  };
  return (
    <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider border rounded-full ${styles[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
};

const Cards = ({ card }) => (
  <div className="w-full bg-white rounded-2xl col-span-1 grid grid-cols-2 px-6 py-6 shadow-sm border border-gray-50 hover:shadow-md transition-all">
    <div className={`${card.style} flex items-center justify-center w-14 h-14 rounded-2xl`}>
      <card.icon className="w-7 h-7" />
    </div>
    <div className="flex justify-end">{card.sideContent}</div>
    <div className="space-y-0.5 mt-4">
      <div className="text-xs font-medium uppercase tracking-wider text-gray-400">{card.name}</div>
      <div className="text-3xl font-bold text-gray-800">{card.value}</div>
    </div>
  </div>
);

// --- Main Component ---

export default function AdminHome() {
  const isMobile = useContext(IsMobileContext);
  const [realTimeData, setRealTimeData] = useState([]);
  const [stats, setStats] = useState({ totalFlags: 0, urgentReports: 0, profileReports: 0, errandReports: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/admin/flagged");
        if (response.data) {
          setStats(response.data.stats || {});
          setRealTimeData(response.data.recentActivity || []);
        }
      } catch (err) {
        console.error("Failed to fetch admin data", err);
      }
    };
    fetchData();
  }, []);

  const adminHeroCards = [
    { name: "Total Flags", icon: TriangleAlert, value: stats.totalFlags, style: "bg-amber-100 text-amber-600", sideContent: <div className="text-amber-600 flex items-center text-xs font-bold"><TrendingUp size={14} className="mr-1"/> LIVE</div> },
    { name: "Urgent", icon: TriangleAlert, value: stats.urgentReports, style: "bg-red-100 text-red-600", sideContent: <div className="text-red-500 text-[10px] font-bold uppercase tracking-tighter">Action Required</div> },
    { name: "Profiles", icon: User, value: stats.profileReports, style: "bg-blue-100 text-blue-600", sideContent: <div className="text-blue-400 text-[10px] font-bold uppercase tracking-tighter">Verification</div> },
    { name: "Errands", icon: Briefcase, value: stats.errandReports, style: "bg-green-100 text-green-600", sideContent: <div className="text-green-500 text-[10px] font-bold uppercase tracking-tighter">Marketplace</div> }
  ];

  return (
    <div className="max-w-full min-h-screen bg-[#fafaf4] pb-20">
      <div className="px-6 md:px-12">
        {/* Header */}
        <div className="pt-12 pb-10 col-span-4">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-slate-500 mt-2 font-medium">Review and moderate reported activity across the platform.</p>
        </div>

        {/* Hero Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminHeroCards.map((card, i) => <Cards card={card} key={i} />)}
        </div>

        {/* Recent Activity Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Recent Activity</h2>
            <button className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1">
              View All <ExternalLink size={14} />
            </button>
          </div>

          {!isMobile && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-5 gap-4 px-8 py-4 bg-gray-50/50 border-b border-gray-100">
                {["Report ID", "Type", "Reason", "Status", "Time"].map((head) => (
                  <p key={head} className="text-[11px] font-black uppercase tracking-widest text-gray-400 last:text-right">
                    {head}
                  </p>
                ))}
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-50">
                {(realTimeData || []).map((activity, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={activity.id} 
                    className="grid grid-cols-5 gap-4 px-8 py-5 items-center hover:bg-gray-50/50 transition-colors cursor-pointer group"
                  >
                    <p className="font-mono text-xs text-gray-400 group-hover:text-blue-500 transition-colors">
                      #{activity.id?.slice(-6)}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${activity.type === "USER" ? "bg-blue-50 text-blue-500" : "bg-green-50 text-green-600"}`}>
                        {activity.type === "USER" ? <User size={14} /> : <Briefcase size={14} />}
                      </div>
                      <p className="text-sm font-bold text-slate-700">{activity.type}</p>
                    </div>
                    <p className="text-sm text-slate-500 truncate pr-4 italic">
                      "{activity.reason || "General report"}"
                    </p>
                    <div>
                      <StatusBadge status={activity.status} />
                    </div>
                    <p className="text-sm text-right text-slate-400 font-medium">
                      {new Date(activity.time).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Mobile View */}
          {isMobile && (realTimeData || []).map((card) => (
            <MobileReportCard card={card} key={card.id} />
          ))}
        </div>
      </div>
    </div>
  );
}