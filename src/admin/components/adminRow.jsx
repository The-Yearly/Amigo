import { ChevronDown, UserMinus, UserPlus, ShieldCheck, ShieldAlert } from "lucide-react";
import { IsMobileContext } from "../mobileContext";
import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
export const AdminRow=({ admin, isExpanded, onToggleExpand, onPermissionChange })=>{
  const isMobile=useContext(IsMobileContext)
  return (
    <div className="group">
      <motion.div 
        onClick={onToggleExpand}
        className={`grid grid-cols-12 items-center md:px-8 md:py-6 bg-white cursor-pointer transition-all duration-500 relative z-10 ${
          isExpanded ? "rounded-t-3xl shadow-sm" : "rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-md"
        }`}
      >
        <div className="col-span-4 flex items-center gap-4">
          <img src={admin.avatar} className="w-12 h-12 rounded-xl object-cover grayscale-20 group-hover:grayscale-0 transition-all" alt="" />
          <div>
            <h3 className="font-bold text-lg leading-none">{admin.name}</h3>
            <p className="text-xs text-[#727970] mt-1">{admin.email}</p>
          </div>
        </div>
        {isMobile&& <div className="col-span-4"></div>}
        <div className="col-span-3  flex justify-center">
          <span className={`px-1 py-1 md:px-4 md:py-1.5 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-wider transition-colors ${
            admin.isSuper ? "bg-[#984063] text-white" : "bg-[#efedf0] text-[#414940]"
          }`}>
            {admin.isSuper ? "Super Admin" : "Admin"}
          </span>
        </div>
        <div className="col-span-1 md:col-span-5 flex justify-between items-center pr-4">
          {!isMobile&&<p className="text-sm text-[#414940] line-clamp-1 mr-4">{admin.scope}</p>}
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
            <ChevronDown size={20} className="text-[#dadad5]" />
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-white rounded-b-3xl mb-4 shadow-[0_20px_40px_rgba(0,0,0,0.04)]"
          >
            <div className="px-12 py-10 border-t border-[#efedf0] flex flex-wrap gap-x-16 gap-y-10 bg-[#faf9fb]/50">

              <PermissionToggle 
                label="Is Super Admin" 
                activeColor="text-[#984063]"
                isActive={admin.isSuper}
                onClick={() => onPermissionChange(admin.id, 'isSuper')}
                icon={<ShieldAlert size={18} />}
              />
              <PermissionToggle 
                label="Allow to Add Admins" 
                activeColor="text-[#003912]"
                isActive={admin.permissions.add}
                onClick={() => onPermissionChange(admin.id, 'add')}
                icon={<UserPlus size={18} />}
              />

              <PermissionToggle 
                label="Allow to Remove Admins" 
                activeColor="text-[#003912]"
                isActive={admin.permissions.remove}
                onClick={() => onPermissionChange(admin.id, 'remove')}
                icon={<UserMinus size={18} />}
              />

              <PermissionToggle 
                label="Overwrite Decisions" 
                activeColor="text-[#003912]"
                isActive={admin.permissions.overwrite}
                onClick={() => onPermissionChange(admin.id, 'overwrite')}
                icon={<ShieldCheck size={18} />}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PermissionToggle({ label, isActive, onClick, activeColor }) {
  return (
    <div className="flex items-center gap-4 cursor-pointer select-none group/toggle" onClick={onClick}>
      <div className={`w-12 h-6 rounded-full transition-all relative ${isActive ? 'bg-[#002107]' : 'bg-[#dadad5]'}`}>
        <motion.div 
          animate={{ x: isActive ? 26 : 4 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
        />
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-sm font-bold transition-colors ${isActive ? activeColor : "text-[#727970]"}`}>
          {label}
        </span>
      </div>
    </div>
  );
}