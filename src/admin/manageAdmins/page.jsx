import React, { useContext, useState } from "react";
import { AdminRow } from "../components/adminRow";
import { Search} from "lucide-react"
import { IsMobileContext } from "../mobileContext";
const initialAdmins = [
  {
    id: 1,
    name: "Elena Rostova",
    email: "elena.r@amigo.sys",
    scope: "Unrestricted platform access. Can modify core architecture.",
    avatar: "https://i.pravatar.cc/150?u=elena",
    permissions: { remove: true, add: true, overwrite: true },
    isSuper: true,
  },
  {
    id: 2,
    name: "Marcus Chen",
    email: "m.chen@amigo.sys",
    scope: "Normal Admin",
    avatar: "https://i.pravatar.cc/150?u=marcus",
    permissions: { remove: false, add: false, overwrite: true },
    isSuper: false,
  },
];

export default function ManageAdmins() {
  const [admins, setAdmins] = useState(initialAdmins);
  const [expandedId, setExpandedId] = useState(null);
 const isMobile=useContext(IsMobileContext)
  const togglePermissions = (adminId, perm) => {
    setAdmins((prevAdmins) =>
      prevAdmins.map((admin) => {
        if (admin.id !== adminId) return admin;

        if (perm === "isSuper") {
          const willBeSuper = !admin.isSuper;
          return {
            ...admin,
            isSuper: willBeSuper,
            permissions: willBeSuper
              ? { remove: true, add: true, overwrite: true }
              : admin.permissions,
          };
        }

        const newPermissions = {
          ...admin.permissions,
          [perm]: !admin.permissions[perm],
        };

        return {
          ...admin,
          isSuper: newPermissions.remove && newPermissions.add && newPermissions.overwrite,
          permissions: newPermissions,
        };
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#fafaf4] px-12 py-16 font-inter text-[#1a1c1e]">
      <header className="mb-14">
        <h1 className="font-plus-jakarta text-[4rem] font-bold leading-tight tracking-tighter text-[#002107]">
          Manage Admin
        </h1>
        <p className="text-[#414940] text-lg mt-2 max-w-2xl leading-relaxed">
          Manage system access and structural oversight. Curate the core team 
          responsible for maintaining platform integrity.
        </p>
      </header>

      <div className="relative max-w-2xl mb-16">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#727970]" size={20} />
        <input 
          type="text"
          placeholder="Filter by name, email or role..."
          className="w-full bg-white border-none rounded-2xl py-5 pl-14 pr-6 text-sm focus:ring-2 focus:ring-[#003912] transition-all outline-none"
        />
      </div>

      <div className="flex justify-between md:grid md:grid-cols-12 md:px-8 mb-6 text-[11px] font-black uppercase tracking-[0.2em] text-[#727970]">
        <div className="col-span-4">Profile</div>
        {!isMobile&& <div className="col-span-3 text-center">Role Designation</div>}
        <div className="col-span-5">Permission Scope</div>
      </div>

      <div className="space-y-4">
        {admins.map((admin) => (
          <AdminRow 
            key={admin.id} 
            admin={admin} 
            isExpanded={expandedId === admin.id}
            onToggleExpand={() => setExpandedId(expandedId === admin.id ? null : admin.id)}
            onPermissionChange={togglePermissions}
          />
        ))}
      </div>
    </div>
  );
}

