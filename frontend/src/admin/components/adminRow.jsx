import {
  ChevronDown,
  UserMinus,
  UserPlus,
  ShieldCheck,
  ShieldAlert,
  Trash2,
} from "lucide-react";
import { IsMobileContext } from "../mobileContext";
import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/authProvider";
export const AdminRow = ({
  admin,
  isExpanded,
  perms,
  confirmModal,
  setConfirmModal,
  onToggleExpand,
  onPermissionChange,
  resetPerms,
  savePermissions,
}) => {
  const isMobile = useContext(IsMobileContext);
  const { user, loading } = useAuth();
  console.log(user, admin, "ASDasd");
  console.log(user, "S");
  return (
    <div className="group">
      <motion.div
        onClick={
          user?.isSuperAdmin && user.uid != admin.id
            ? onToggleExpand
            : undefined
        }
        className={`grid grid-cols-12 items-center md:px-8 md:py-6 bg-white cursor-pointer transition-all duration-500 relative z-10 ${isExpanded
          ? "rounded-t-3xl shadow-sm"
          : "rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-md"
          }`}
      >
        <div className="col-span-4 flex items-center gap-4">
          <img
            src={admin.avatar}
            className="w-12 h-12 rounded-xl object-cover grayscale-20 group-hover:grayscale-0 transition-all"
            alt=""
          />
          <div>
            <h3 className="font-bold text-lg leading-none">{admin.name}</h3>
            <p className="text-xs text-[#727970] mt-1">{admin.email}</p>
          </div>
        </div>
        {isMobile && <div className="col-span-4"></div>}
        <div className="col-span-3  flex justify-center">
          <span
            className={`px-1 py-1 md:px-4 md:py-1.5 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-wider transition-colors ${admin.admin.isSuperAdmin
              ? "bg-[#984063] text-white"
              : "bg-[#efedf0] text-[#414940]"
              }`}
          >
            {admin.admin.isSuperAdmin ? "Super Admin" : "Admin"}
          </span>
        </div>
        <div className="col-span-1 md:col-span-5 flex justify-between items-center pr-4">
          {!isMobile && (
            <p className="text-sm text-[#414940] line-clamp-1 mr-4">
              {admin.scope}
            </p>
          )}
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
            <ChevronDown size={20} className="text-[#dadad5]" />
          </motion.div>
          {user.canKick && user.uid != admin.id && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setConfirmModal({
                  ...confirmModal,
                  isOpen: true,
                  user: admin,
                  action: "remove",
                });
              }}
              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all opacity-100 "
              title="Remove admin"
            >
              <Trash2 size={18} />
            </button>
          )}
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
                isActive={perms.isSuperAdmin}
                onClick={() => onPermissionChange(admin.id, "isSuperAdmin")}
                icon={<ShieldAlert size={18} />}
              />
              <PermissionToggle
                label="Allow to Add Admins"
                activeColor="text-[#003912]"
                isActive={perms.canAdd}
                onClick={() => onPermissionChange(admin.id, "canAdd")}
                icon={<UserPlus size={18} />}
              />

              <PermissionToggle
                label="Allow to Remove Admins"
                activeColor="text-[#003912]"
                isActive={perms.canKick}
                onClick={() => onPermissionChange(admin.id, "canKick")}
                icon={<UserMinus size={18} />}
              />

              <PermissionToggle
                label="Overwrite Decisions"
                activeColor="text-[#003912]"
                isActive={perms.canOverride}
                onClick={() => onPermissionChange(admin.id, "canOverride")}
                icon={<ShieldCheck size={18} />}
              />

              <div className="flex gap-x-2 text-xs md:text-md">
                <button
                  className="px-2 py-3 md:px-6 md:py-2.5 rounded-xl border border-gray-300
               text-gray-700 bg-white hover:bg-gray-50 
               active:scale-95 transition-all duration-200
               font-medium shadow-sm"
                  onClick={() => resetPerms(admin.id)}
                >
                  Cancel
                </button>
                <button
                  className="px-2 py-3 md:px-6 md:py-2.5 rounded-xl
               bg-[#003912] text-white
               hover:bg-[#015a24]
               active:scale-95 transition-all duration-200
               font-medium shadow-md
               focus:outline-none focus:ring-2 focus:ring-[#003912]/30"
                  onClick={() => savePermissions(admin.id, perms)}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function PermissionToggle({ label, isActive, onClick, activeColor }) {
  return (
    <div
      className="flex items-center gap-4 cursor-pointer select-none group/toggle"
      onClick={onClick}
    >
      <div
        className={`w-12 h-6 rounded-full transition-all relative ${isActive ? "bg-[#002107]" : "bg-[#dadad5]"}`}
      >
        <motion.div
          animate={{ x: isActive ? 26 : 4 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
        />
      </div>
      <div className="flex items-center gap-2">
        <span
          className={`text-sm font-bold transition-colors ${isActive ? activeColor : "text-[#727970]"}`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}