import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Clock, 
  Eye, 
  CheckCircle2, 
  ChevronDown, 
  Trash2 
} from "lucide-react";

const STATUS_STYLES = {
  PENDING: {
    active: "bg-amber-50 border-amber-300 text-amber-800",
    idle: "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100",
  },
  UNDER_REVIEW: {
    active: "bg-blue-50 border-blue-300 text-blue-800",
    idle: "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100",
  },
  COMPLETED: {
    active: "bg-green-50 border-green-300 text-green-800",
    idle: "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100",
  },
};

const STATUS_OPTIONS = [
  { key: "PENDING", label: "Pending", icon: Clock },
  { key: "UNDER_REVIEW", label: "Reviewing", icon: Eye },
  { key: "COMPLETED", label: "Completed", icon: CheckCircle2 },
];

export default function AdminReviewBox({status,setStatus,reason,setReason,onUpdate,handleDismiss,handleRemove}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const showNotes = status === "UNDER_REVIEW" || status === "COMPLETED";
  const isCompletedWithoutReason = status === "COMPLETED" && reason.trim() === "";

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };


  useEffect(()=>{
    console.log(status)
  },[status])
  return (
    <div className="relative bg-gray-50">
      

      <motion.div
        initial={false}
        animate={{ 
          y: isCollapsed ? "calc(100% - 64px)" : 0 
        }}
        transition={{ type: "spring", damping: 20, stiffness: 150 }}
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 z-50 md:w-[320px] bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden"
      >
        <div 
          onClick={() => isCollapsed && setIsCollapsed(false)}
          className={`flex items-center justify-between px-5 py-4 border-b border-gray-100 select-none ${
            isCollapsed ? 'cursor-pointer hover:bg-gray-50' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 leading-tight">Admin review</p>
              {!isCollapsed && <p className="text-xs text-gray-400 leading-tight">Manage errand status</p>}
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsCollapsed(!isCollapsed);
            }}
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <motion.div animate={{ rotate: isCollapsed ? 180 : 0 }}>
              <ChevronDown size={20} />
            </motion.div>
          </button>
        </div>
        <div className="p-5 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Set Status</p>
            <div className="grid grid-cols-3 gap-2">
              {STATUS_OPTIONS.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => handleStatusChange(key)}
                  className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border text-[11px] font-bold transition-all duration-200 ${
                    status === key ? STATUS_STYLES[key].active : STATUS_STYLES[key].idle
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {showNotes && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Internal Notes</p>
                  {status === "COMPLETED" && (
                    <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                      Required
                    </span>
                  )}
                </div>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Explain the decision..."
                  className="w-full text-sm border border-gray-200 rounded-xl p-3 resize-none h-[90px] bg-gray-50 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all"
                />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex flex-col gap-2 pt-2 border-t border-gray-50">
            {status!=="COMPLETED"&&
            <button
              onClick={onUpdate}
              disabled={isCompletedWithoutReason}
              className="w-full py-3 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
            >
              Update Status
            </button>}
            {status==="COMPLETED"&&
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleDismiss}
                className="py-2.5 text-xs font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Dismiss
              </button>
              <button
                onClick={handleRemove}
                className="py-2.5 text-xs font-bold text-red-600 bg-red-50 border border-red-100 rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 size={14} />
                Remove
              </button>
            
            </div>
}
          </div>
        </div>
      </motion.div>
    </div>
  );
}