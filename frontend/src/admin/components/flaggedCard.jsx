import {motion} from "framer-motion"
import {User, Briefcase } from "lucide-react";
export const FlaggedCard = ({ data }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-8 rounded-2xl shadow-[0_12px_40px_rgba(26,28,30,0.04)] relative overflow-hidden"
  >
    <div className="flex justify-between items-start mb-6">
      <div className="flex gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${data.type === "Errand" ? "bg-[#003912] text-white" : " bg-[#efedf0] font-bold text-[#414940]"} text-xl`}
        >
          {data.type === "Errand" ? (
            <Briefcase size={24} />
          ) : (
            <User size={28} />
          )}
        </div>
        <div>
          <h3 className="font-bold text-xl leading-tight">
            {" "}
            {data.type === "Errand" ? <p>Errand</p> : <p>User</p>}
          </h3>
          <p className="text-sm text-[#414940] font-medium">
            ID: <div className="font-mono">{data.reportId}</div>
          </p>
        </div>
      </div>

      <div
        className={`${data.status === "Pending" ? "bg-error-container text-on-error-container" : data.status === "Under Review" ? "bg-amber-300/20 text-amber-600" : "bg-green-300/20 text-green-600"}  text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-tighter`}
      >
        {data.status}
      </div>
    </div>

    <div
      className={`bg-[#f4f3f5] p-5 rounded-xl mb-6 border-l-4 ${data.type === "Errand" ? "border-[#1c7731]" : "border-[#984063]"}`}
    >
      <p className="text-sm italic text-[#414940] mb-2">Reason:</p>
      <p className="text-sm font-medium text-[#1a1c1e] leading-relaxed">
        {data.reason}
      </p>
    </div>
    <div className="flex gap-4">
      <button className="flex-1 bg-[#002107] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-black transition-colors">
        Review Details
      </button>
      <button className="flex-1 bg-[#efedf0] text-[#1a1c1e] py-3.5 rounded-xl font-bold text-sm hover:bg-[#e2e3de] transition-colors">
        Dismiss
      </button>
    </div>
  </motion.div>
);

export const EmptyState = ({ label }) => (
  <div className="py-20 text-center bg-[#f4f3f5]/50 rounded-3xl border-2 border-dashed border-[#dadad5]">
    <p className="font-bold text-[#dadad5] uppercase tracking-widest text-sm">
      No flagged {label} found
    </p>
  </div>
);


