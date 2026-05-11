import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Calendar,
  Filter,
  ArrowUpDown,
  Ban,
  ShieldCheck,
  Settings,
  Database,
  ChevronDown,
  ExternalLink,
  User,
  Briefcase,
  UserPlus,
  UserMinus,
  ShieldAlert,
} from "lucide-react";

// Icon mapping - maps iconName from DB to actual icon component
const iconMap = {
  Ban,
  ShieldCheck,
  Settings,
  Database,
  UserPlus,
  UserMinus,
  ShieldAlert,
};

export default function AuditLog() {
  const [expandedId, setExpandedId] = useState(null);
  const [auditData, setAuditData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  const fetchAuditLogs = async () => {
    try {
      const response = await fetch("/api/admin/auditLogs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust based on your auth
        },
      });
      
      if (!response.ok) throw new Error("Failed to fetch audit logs");
      
      const result = await response.json();
      
      // Map the data to include the icon component
      const mappedData = result.data.map((log) => ({
        ...log,
        icon: iconMap[log.iconName] || Database, // Fallback to Database icon
        details: log.details || {}, // Ensure details exists
      }));
      
      setAuditData(mappedData);
    } catch (err) {
      console.error("Failed to fetch audit logs:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafaf4] px-12 py-16 font-inter text-[#1a1c1e] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#003912] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#414940]">Loading audit logs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fafaf4] px-12 py-16 font-inter text-[#1a1c1e] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-bold">Error: {error}</p>
          <button 
            onClick={fetchAuditLogs}
            className="mt-4 px-6 py-2 bg-[#003912] text-white rounded-lg hover:bg-[#015a24]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafaf4] px-12 py-16 font-inter text-[#1a1c1e]">
      <div className="mb-14">
        <h1 className="font-plus-jakarta text-[4rem] font-bold leading-tight tracking-tighter text-[#002107]">
          Audit Log
        </h1>
        <p className="text-[#414940] text-lg mt-2 max-w-3xl leading-relaxed">
          A comprehensive, immutable record of administrative actions, system
          events, and security modifications across the platform. Use the
          filters below to isolate specific incident timelines.
        </p>
      </div>
      
      <div className="bg-white p-4 rounded shadow-[0_8px_40px_rgba(0,0,0,0.03)] flex flex-wrap items-center gap-4 mb-12">
        <div className="relative flex-1 min-w-[300px]">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#dadad5]"
            size={18}
          />
          <input
            type="text"
            placeholder="Search logs by keyword, ID, or user..."
            className="w-full bg-[#fafaf4] border-none rounded-lg py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-[#003912] outline-none transition-all"
          />
        </div>

        <FilterButton icon={<Calendar size={16} />} label="Date Range" />
        <FilterButton icon={<Filter size={16} />} label="Category" active />
        <FilterButton icon={<ArrowUpDown size={16} />} label="Newest First" />
      </div>
      
      {auditData.length === 0 ? (
        <div className="bg-white rounded-[1.5rem] p-12 text-center">
          <Database size={48} className="mx-auto text-[#dadad5] mb-4" />
          <p className="text-[#727970] text-lg">No audit logs found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {auditData.map((log) => (
            <LogCard
              key={log.id}
              log={log}
              isExpanded={expandedId === log.id}
              onToggle={() =>
                setExpandedId(expandedId === log.id ? null : log.id)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

function LogCard({ log, isExpanded, onToggle }) {
  const hasDropdown = log.type === "user" || log.type === "errand";

  return (
    <div className="group">
      <motion.div
        layout
        onClick={hasDropdown ? onToggle : undefined}
        className={`bg-white p-8 transition-all duration-500 relative z-10 ${
          isExpanded
            ? "rounded-t-[1.5rem] shadow-sm"
            : "rounded-[1.5rem] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-md"
        } ${hasDropdown ? "cursor-pointer" : ""}`}
      >
        <div className="flex gap-6 items-start">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${log.color}`}
          >
            <log.icon size={24} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-xl text-[#002107]">
                  {log.action}
                </h3>
                <span className="bg-[#efedf0] text-[#727970] text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md">
                  {log.category}
                </span>
              </div>
              <span className="text-sm font-medium text-[#dadad5]">
                {log.time}
              </span>
            </div>
            <p
              className="text-[#414940] leading-relaxed max-w-4xl"
              dangerouslySetInnerHTML={{
                __html: log.description.replace(
                  /\*\*(.*?)\*\*/g,
                  '<span class="font-bold text-[#1a1c1e]">$1</span>',
                ),
              }}
            />

            {hasDropdown && log.details && Object.keys(log.details).length > 0 && (
              <div className="mt-4 flex items-center gap-2 text-[#dadad5] text-xs font-bold uppercase tracking-tighter transition-colors group-hover:text-[#003912]">
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                />
                {isExpanded ? "Hide Context" : "View Action Context"}
              </div>
            )}
          </div>
        </div>
      </motion.div>
      
      <AnimatePresence>
        {isExpanded && log.details && Object.keys(log.details).length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-[#f4f3f5] rounded-b-[2.5rem] mb-6 shadow-inner"
          >
            <div className="px-20 py-10 grid grid-cols-3 gap-12">
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#727970]">
                  Incident Context
                </p>
                <p className="text-sm italic text-[#414940]">
                  "{log.reason || 'No additional context provided'}"
                </p>
              </div>

              {log.targetId && (
                <div className="space-y-4 border-l border-[#dadad5] pl-12">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#727970]">
                    Target {log.type === "user" ? "Profile" : "Config"}
                  </p>
                  <div className="flex items-center gap-3">
                    {log.type === "user" ? (
                      <User size={18} />
                    ) : (
                      <Briefcase size={18} />
                    )}
                    <span className="font-bold text-sm">{log.targetId}</span>
                    <ExternalLink
                      size={14}
                      className="text-[#dadad5] cursor-pointer hover:text-[#002107]"
                    />
                  </div>
                </div>
              )}
              
              <div className="space-y-4 border-l border-[#dadad5] pl-12">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#727970]">
                  Snapshot Metadata
                </p>
                <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                  {Object.entries(log.details).map(([key, val]) => (
                    <React.Fragment key={key}>
                      <span className="text-[10px] text-[#727970] capitalize">
                        {key.replace(/([A-Z])/g, " $1")}
                      </span>
                      <span className="text-[10px] font-bold">
                        {typeof val === 'object' ? JSON.stringify(val) : val.toString()}
                      </span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterButton({ icon, label, active }) {
  return (
    <button
      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
        active
          ? "bg-[#b7f1b8] text-[#002108] shadow-sm"
          : "bg-white text-[#727970] hover:bg-gray-50"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}