import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Calendar, Filter, ArrowUpDown, 
  Ban, ShieldCheck, Settings, Database, 
  ChevronDown, ExternalLink, User, Briefcase 
} from "lucide-react";

const auditData = [
  {
    id: "LOG-8821",
    action: "User Account Suspended",
    category: "Moderation",
    time: "Today, 14:32",
    description: "Admin **Sarah Jenkins** (ID: ADM-892) suspended user account **@runner_boy_99** (ID: USR-4421) for 7 days.",
    reason: "Repeated violations of community guidelines regarding appropriate language in errand descriptions.",
    type: "user",
    targetId: "USR-4421",
    color: "bg-[#ffdad6] text-[#ba1a1a]",
    icon: Ban,
    details: {
      status: "Suspended",
      joined: "Oct 2025",
      previousFlags: 3,
      verified: false
    }
  },
  {
    id: "LOG-8819",
    action: "Role Elevated",
    category: "Permissions",
    time: "Today, 11:05",
    description: "SuperAdmin **Marcus Chen** (ID: ADM-001) elevated the role of **Elena Rodriguez** from 'Support Staff' to 'Senior Moderator'.",
    reason: "Access granted to financial dispute resolution queues.",
    type: "system", // No dropdown for system types
    color: "bg-[#b7f1b8] text-[#002108]",
    icon: ShieldCheck
  },
  {
    id: "LOG-8815",
    action: "Global Config Updated",
    category: "Settings",
    time: "Yesterday, 16:45",
    description: "System configuration value **MAX_ERRAND_RADIUS_KM** was modified from **50** to **75** by **System Operations**.",
    reason: "This change affects all active service zones globally.",
    type: "errand", // Dropdown for errand-related configs
    targetId: "CONFIG-RAD-01",
    color: "bg-[#ffd9e3] text-[#7b284b]",
    icon: Settings,
    details: {
      modifiedBy: "Ops_Bot_01",
      affectedZones: "Global",
      rollbackAvailable: true
    }
  },
  {
    id: "LOG-8810",
    action: "Automated Backup Completed",
    category: "System",
    time: "Yesterday, 02:00",
    description: "Routine automated database snapshot **SNAP-20231025-0200** completed successfully.",
    type: "system",
    color: "bg-[#efedf0] text-[#414940]",
    icon: Database
  }
];

export default function AuditLog() {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className="min-h-screen bg-[#fafaf4] px-12 py-16 font-inter text-[#1a1c1e]">
      <div className="mb-14">
        <h1 className="font-plus-jakarta text-[4rem] font-bold leading-tight tracking-tighter text-[#002107]">
          Audit Log
        </h1>
        <p className="text-[#414940] text-lg mt-2 max-w-3xl leading-relaxed">
          A comprehensive, immutable record of administrative actions, system events, and 
          security modifications across the platform. Use the filters below to isolate specific 
          incident timelines.
        </p>
      </div>
      <div className="bg-white p-4 rounded shadow-[0_8px_40px_rgba(0,0,0,0.03)] flex flex-wrap items-center gap-4 mb-12">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#dadad5]" size={18} />
          <input 
            type="text" 
            placeholder="Search logs by keyword, ID, or user..."
            className="w-full bg-[#fafaf4] border-none rounded-lg py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-[#003912] outline-none transition-all"
          />
        </div>
        
        <FilterButton icon={<Calendar size={16}/>} label="Date Range" />
        <FilterButton icon={<Filter size={16}/>} label="Category" active />
        <FilterButton icon={<ArrowUpDown size={16}/>} label="Newest First" />
      </div>
      <div className="space-y-6">
        {auditData.map((log) => (
          <LogCard 
            key={log.id} 
            log={log} 
            isExpanded={expandedId === log.id}
            onToggle={() => setExpandedId(expandedId === log.id ? null : log.id)}
          />
        ))}
      </div>
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
          isExpanded ? "rounded-t-[1.5rem] shadow-sm" : "rounded-[1.5rem] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-md"
        } ${hasDropdown ? "cursor-pointer" : ""}`}
      >
        <div className="flex gap-6 items-start">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${log.color}`}>
            <log.icon size={24} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-xl text-[#002107]">{log.action}</h3>
                <span className="bg-[#efedf0] text-[#727970] text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md">
                  {log.category}
                </span>
              </div>
              <span className="text-sm font-medium text-[#dadad5]">{log.time}</span>
            </div>
            <p 
              className="text-[#414940] leading-relaxed max-w-4xl"
              dangerouslySetInnerHTML={{ 
                __html: log.description.replace(/\*\*(.*?)\*\*/g, '<span class="font-bold text-[#1a1c1e]">$1</span>') 
              }}
            />

            {hasDropdown && (
              <div className="mt-4 flex items-center gap-2 text-[#dadad5] text-xs font-bold uppercase tracking-tighter transition-colors group-hover:text-[#003912]">
                <ChevronDown size={14} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                {isExpanded ? 'Hide Context' : 'View Action Context'}
              </div>
            )}
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-[#f4f3f5] rounded-b-[2.5rem] mb-6 shadow-inner"
          >
            <div className="px-20 py-10 grid grid-cols-3 gap-12">
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#727970]">Incident Context</p>
                <p className="text-sm italic text-[#414940]">"{log.reason}"</p>
              </div>

              <div className="space-y-4 border-l border-[#dadad5] pl-12">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#727970]">
                  Target {log.type === 'user' ? 'Profile' : 'Config'}
                </p>
                <div className="flex items-center gap-3">
                  {log.type === 'user' ? <User size={18} /> : <Briefcase size={18} />}
                  <span className="font-bold text-sm">{log.targetId}</span>
                  <ExternalLink size={14} className="text-[#dadad5] cursor-pointer hover:text-[#002107]" />
                </div>
              </div>
              <div className="space-y-4 border-l border-[#dadad5] pl-12">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#727970]">Snapshot Metadata</p>
                <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                  {Object.entries(log.details).map(([key, val]) => (
                    <React.Fragment key={key}>
                      <span className="text-[10px] text-[#727970] capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-[10px] font-bold">{val.toString()}</span>
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
    <button className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
      active 
      ? "bg-[#b7f1b8] text-[#002108] shadow-sm" 
      : "bg-white text-[#727970] hover:bg-gray-50"
    }`}>
      {icon}
      {label}
    </button>
  );
}