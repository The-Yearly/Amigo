import React, { useContext, useState, useEffect } from "react";
import { AdminRow } from "../components/adminRow";
import {
  Search,
  Plus,
  X,
  CheckCircle,
  Trash2,
  AlertCircle,
} from "lucide-react";
import { IsMobileContext } from "../mobileContext";
import axios from "axios";
import ConfirmModal from "../components/confirmModel";
import { useAuth } from "@/lib/authProvider";
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});
export default function ManageAdmins() {
  const [expandedId, setExpandedId] = useState(null);
  const isMobile = useContext(IsMobileContext);
  const { user, loading } = useAuth();
  const [permissions, setPermissions] = useState({});
  const [intialPerm, setIntialPerm] = useState({});
  const [search, setSearch] = useState("");
  const [bouncedSearch, setBouncedSearch] = useState("");
  const [filterdAdmins, setFilteredAdmins] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("admins");
  const [successMessage, setSuccessMessage] = useState("");
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    type: null,
    user: null,
    action: "add",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setBouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);
  useEffect(() => {
    if (!bouncedSearch) {
      setFilteredAdmins([]);
      return;
    }
    const fetchResults = async () => {
      try {
        const res = await api.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/searchAdmins/` +
            bouncedSearch,
        );
        setFilteredAdmins(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchResults();
  }, [bouncedSearch]);
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await api.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/getAdmins`,
        );
        const adminData = res.data.data;
        setAdmins(adminData);
        const permsMap = {};
        adminData.forEach((admin) => {
          permsMap[admin.id] = admin.admin;
        });
        setPermissions(permsMap);
        setIntialPerm(permsMap);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAdmins();
  }, []);
  useEffect(() => {
    if (activeTab === "users" && allUsers.length === 0) {
      const fetchAllUsers = async () => {
        try {
          const res = await api.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/getAllUsers`,
          );
          setAllUsers(res.data.data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchAllUsers();
    }
  }, [activeTab]);

  const savePermissions = async (id, perm) => {
    try {
      await api.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/managePermissions`,
        { perm, id: id },
      );
      setSuccessMessage("Permissions updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const resetPerms = (id) => {
    setPermissions((prev) => ({
      ...prev,
      [id]: intialPerm[id],
    }));
  };

  const togglePermissions = (adminId, perm) => {
    setPermissions((prev) => {
      const adminPerms = prev[adminId];
      if (perm === "isSuperAdmin") {
        const willBeSuper = !adminPerms.isSuperAdmin;
        return {
          ...prev,
          [adminId]: {
            isSuperAdmin: willBeSuper,
            canAdd: willBeSuper,
            canKick: willBeSuper,
            canOverride: willBeSuper,
          },
        };
      }

      const newPermissions = {
        ...adminPerms,
        [perm]: !adminPerms[perm],
      };
      return {
        ...prev,
        [adminId]: {
          ...newPermissions,
          isSuperAdmin:
            newPermissions.canAdd &&
            newPermissions.canKick &&
            newPermissions.canOverride,
        },
      };
    });
  };

  const handleAddAdmin = async () => {
    if (!confirmModal.user) return;

    try {
      await api.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/addAdmin`, {
        userIds: [confirmModal.user.id],
      });
      const res = await api.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/getAdmins`,
      );
      const adminData = res.data.data;
      setAdmins(adminData);
      const permsMap = {};
      adminData.forEach((admin) => {
        permsMap[admin.id] = admin.admin;
      });
      setPermissions(permsMap);
      setIntialPerm(permsMap);

      setSuccessMessage(
        `${confirmModal.user.name} promoted to admin successfully!`,
      );
      setConfirmModal({ ...confirmModal, isOpen: false });
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setSuccessMessage("Error promoting user. Please try again.");
      setConfirmModal({ ...confirmModal, sOpen: false });
    }
  };

  const handleRemoveAdmin = async () => {
    if (!confirmModal.user) return;

    try {
      await api.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/removeAdmin/` +
          confirmModal.user.id,
      );
      const res = await api.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/getAdmins`,
        { withCredentials: true },
      );
      const adminData = res.data.data;
      setAdmins(adminData);
      const permsMap = {};
      adminData.forEach((admin) => {
        permsMap[admin.id] = admin.admin;
      });
      setPermissions(permsMap);
      setIntialPerm(permsMap);
      setSuccessMessage(
        `${confirmModal.user.name} removed from admin successfully!`,
      );
      setConfirmModal({ ...confirmModal, isOpen: false });
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setSuccessMessage("Error removing admin. Please try again.");
      setConfirmModal({ ...confirmModal, isOpen: false });
    }
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
      <div className="flex gap-6 mb-10 border-b border-[#d4d6d0]">
        <button
          onClick={() => setActiveTab("admins")}
          className={`pb-4 px-2 font-semibold text-xs md:text-sm uppercase tracking-wide transition-all ${
            activeTab === "admins"
              ? "text-[#002107] border-b-2 border-[#002107]"
              : "text-[#727970] hover:text-[#414940]"
          }`}
        >
          Current Admins ({admins.length})
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`pb-4 px-2 text-xs md:text-sm font-semibold uppercase tracking-wide transition-all ${
            activeTab === "users"
              ? "text-[#002107] border-b-2 border-[#002107]"
              : "text-[#727970] hover:text-[#414940]"
          }`}
        >
          All Users
        </button>
      </div>
      {successMessage && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle size={20} className="text-green-600" />
          <p className="text-green-800 font-medium">{successMessage}</p>
        </div>
      )}
      <div className="relative max-w-2xl mb-4">
        <Search
          className="absolute left-5 top-1/2 -translate-y-1/2 text-[#727970]"
          size={20}
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by name or email .."
          className="w-full bg-white border-none rounded-2xl py-5 pl-14 pr-6 text-sm focus:ring-2 focus:ring-[#003912] transition-all outline-none"
        />
      </div>

      {activeTab === "admins" && (
        <>
          <div className="flex justify-between md:grid md:grid-cols-12 md:px-8 mb-6 text-[11px] font-black uppercase tracking-[0.2em] text-[#727970]">
            <div className="col-span-4">Profile</div>
            {!isMobile && (
              <div className="col-span-3 text-center">Role Designation</div>
            )}
            <div className="col-span-5">Permission Scope</div>
          </div>

          <div className="space-y-4">
            {(bouncedSearch ? filterdAdmins : admins).map((admin) => (
              <div key={admin.id} className="relative">
                <AdminRow
                  admin={admin}
                  perms={permissions[admin.id]}
                  isExpanded={expandedId === admin.id}
                  onToggleExpand={() =>
                    setExpandedId(expandedId === admin.id ? null : admin.id)
                  }
                  confirmModel={confirmModal}
                  setConfirmModal={setConfirmModal}
                  onPermissionChange={togglePermissions}
                  savePermissions={savePermissions}
                  resetPerms={resetPerms}
                />

                <button
                  onClick={() => openConfirmModal("remove", admin)}
                  className="absolute top-4 right-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 hover:opacity-100 group-hover:opacity-100"
                  title="Remove admin"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            {bouncedSearch && filterdAdmins.length === 0 && (
              <p className="text-center text-[#727970] py-8">No admins found</p>
            )}
          </div>
        </>
      )}

      {activeTab === "users" && (
        <>
          <div className="space-y-3">
            {allUsers
              .filter(
                (user) =>
                  !search ||
                  user.name?.toLowerCase().includes(search.toLowerCase()) ||
                  user.email?.toLowerCase().includes(search.toLowerCase()),
              )
              .map((User) => {
                const isAdmin = admins.some((admin) => admin.id === User.id);
                return (
                  <div
                    key={User.id}
                    onClick={() => {
                      if (user.canAdd || user.canKick) {
                        setConfirmModal({
                          ...confirmModal,
                          isOpen: true,
                          action: isAdmin ? "remove" : "add",
                          user: User,
                        });
                      }
                    }}
                    className={`bg-white rounded-xl justify-center  md:p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4 border transition-all cursor-pointer group ${
                      isAdmin && user.canKick && user.uid != User.id
                        ? "border-green-200 hover:border-red-300 hover:bg-red-50"
                        : "border-[#e0e2dc] hover:border-[#002107] hover:bg-[#f5f5f0]"
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[#002107] truncate">
                        {User.name}
                      </h3>
                      <p className="text-sm text-[#727970] truncate">
                        {User.email}
                      </p>
                    </div>

                    {isAdmin ? (
                      <div className="flex items-center justify-between md:justify-end gap-2 md:gap-3 flex-shrink-0">
                        <span className="text-xs font-bold uppercase tracking-wide px-2 md:px-3 py-1 bg-green-100 text-green-700 rounded-full whitespace-nowrap">
                          Admin
                        </span>
                        {user.canKick && user.uid != User.id && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setConfirmModal({
                                ...confirmModal,
                                isOpen: true,
                                user: User,
                                action: "remove",
                                user: User,
                              });
                            }}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all"
                            title="Remove admin"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    ) : (
                      user.canAdd && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setConfirmModal({
                              ...confirmModal,
                              isOpen: true,
                              user: User,
                              action: "add",
                              user: User,
                            });
                          }}
                          className="self-end md:self-auto p-2 text-green-600 hover:bg-green-100 rounded-lg transition-all"
                          title="Make admin"
                        >
                          <Plus size={18} />
                        </button>
                      )
                    )}
                  </div>
                );
              })}
          </div>
        </>
      )}

      {confirmModal.isOpen &&
        ((confirmModal.action === "remove" &&
          user.canKick &&
          user.uid != confirmModal.user.id) ||
          (confirmModal.action == "add" && user.canAdd)) && (
          <ConfirmModal
            isOpen={confirmModal.isOpen}
            data={confirmModal.user}
            config={{
              title:
                confirmModal.action === "add" ? "Add Admin" : "Remove Admin?",
              message:
                confirmModal.action === "add"
                  ? `Do you want to add ${confirmModal.user.name} as Admin`
                  : "This action cannot be undone.",
              confirmText:
                confirmModal.action === "add" ? "Add Admin" : "Remove Admin",
              confirmColor: confirmModal.action === "add" ? "green" : "red",
            }}
            onConfirm={() =>
              confirmModal.action === "add"
                ? handleAddAdmin()
                : handleRemoveAdmin()
            }
            onCancel={() => setConfirmModal({ ...confirmModal, isOpen: false })}
          />
        )}
    </div>
  );
}
